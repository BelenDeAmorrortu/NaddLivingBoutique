import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";
import { getMinPrice } from "@/utils/getMinPrice";
import { NextResponse } from "next/server";
import { getLqip } from "@/app/api/(helpers)/getLqip";

export async function GET(
  request: Request,
  { params }: { params: { handle: string } }
) {
  const { handle } = params;

  try {
    const { data } = await storefront(queries.product, { handle });

    const { title, id, tags, images, descriptionHtml, variants } =
      data.productByHandle;

    const parseVariants = variants.nodes.map((v: any) => ({
      ...v,
      price: v.price.amount,
    }));

    const imageUrls = images.edges.map((i: any) => i.node.url);
    const lqip = await getLqip(imageUrls);

    const product = {
      _id: id,
      images: images.edges.map((i: any) => i.node.url),
      category: tags,
      description: descriptionHtml,
      url: handle,
      name: title,
      lqip,
      price: getMinPrice(variants.nodes),
      variants: parseVariants,
    };

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
