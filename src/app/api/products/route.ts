import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";
import { getMinPrice } from "@/utils/getMinPrice";
import { NextResponse } from "next/server";
// import { getLqip } from "@/app/api/(helpers)/getLqip";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filterParam = searchParams.get("filters");
  const filters = filterParam ? filterParam.split(",") : [];
  const search = searchParams.get("search");
  const cursor = searchParams.get("cursor");

  try {
    const { data } = await storefront(queries.products, {
      cursor: cursor ?? null,
      filter:
        filters.length > 0
          ? filters
              .map((f) => `tag:${f}`)
              .join(" OR ")
              .concat(search ? ` AND (title:${search}* OR tag:${search}*)` : "")
          : search
          ? `(tag:${search}* OR title:${search}*)`
          : null,
    });

    // const imageUrls = data.products.edges.flatMap((p: any) =>
    //   p.node.images.edges.slice(0, 2).map((i: any) => i.node.url)
    // );

    // const lqip = await getLqip(imageUrls);

    // let lqipIndex = 0;

    const products = data.products.edges.map((p: any) => {
      const { title, id, handle, images, descriptionHtml, variants, tags } =
        p.node;

      const productImages = images.edges
        .slice(0, 2)
        .map((i: any) => i.node.url);

      // const productLqip = lqip.slice(
      //   lqipIndex,
      //   lqipIndex + productImages.length
      // );
      // lqipIndex += productImages.length;

      return {
        _id: id,
        images: productImages,
        category: tags,
        description: descriptionHtml,
        url: handle,
        name: title,
        // lqip: productLqip,
        price: getMinPrice(variants.nodes),
      };
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
