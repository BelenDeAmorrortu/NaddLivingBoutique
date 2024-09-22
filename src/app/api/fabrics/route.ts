import { NextResponse } from "next/server";
import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";
import { axiosInstance } from "@/app/api/(helpers)/axiosInstance";

export async function GET() {
  try {
    const [metaobjectsResponse, colorsResponse] = await Promise.all([
      storefront(queries.metaobjects, { type: "telas" }),
      storefront(queries.metaobjects, { type: "color_tela" }),
    ]);

    const metaobjects = metaobjectsResponse.data.metaobjects.edges;
    const colors = colorsResponse.data.metaobjects.edges;

    const metaobjectsValues = await Promise.all(
      metaobjects.map(async (o: any) => {
        const { data } = await axiosInstance.get(
          "/metaobject?id=" + encodeURIComponent(o.node.id)
        );
        return data;
      })
    );

    const colorsPromises = colors.map(async (o: any) => {
      const { data } = await axiosInstance.get(
        "/metaobject?id=" + encodeURIComponent(o.node.id)
      );
      const { data: image } = await axiosInstance.get(
        "/images?id=" + encodeURIComponent(data.foto)
      );
      return {
        ...data,
        foto: image.url,
      };
    });

    const colorsValues = await Promise.all(colorsPromises);

    const fabrics = metaobjectsValues.map((f) => {
      const relatedColors = colorsValues.filter((c) => c.tipo_tela === f.id);
      return {
        ...f,
        colores: relatedColors,
      };
    });

    return NextResponse.json(fabrics);
  } catch (e) {
    console.error("Error in fetching data:", e);
    return NextResponse.json([], { status: 500 });
  }
}
