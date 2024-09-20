import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";
import { getMinPrice } from "@/utils/getMinPrice";
import { NextResponse } from "next/server";
import { getLqip } from "@/app/api/(helpers)/getLqip";

export async function GET() {
  try {
    const { data } = await storefront(queries.spotlight, {
      collection: "Spotlight",
    });

    const spotlightProducts = await Promise.all(
      data.collectionByHandle.products.edges.map(async (p: any) => {
        const { title, id, tags, handle, images, descriptionHtml, variants } =
          p.node;
        const imageUrls = images.edges.map((i: any) => i.node.url);
        const lqip = await getLqip(imageUrls);

        return {
          _id: id,
          images: imageUrls,
          category: tags,
          description: descriptionHtml,
          url: handle,
          name: title,
          lqip,
          price: getMinPrice(variants.nodes),
        };
      })
    );

    return NextResponse.json(spotlightProducts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch spotlight products" },
      { status: 500 }
    );
  }
}
