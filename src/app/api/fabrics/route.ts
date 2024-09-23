import { NextResponse } from "next/server";
import { storefront } from "../(helpers)/storefront";
import { queries } from "../(helpers)/queries";
import { parseMetaobjects } from "../(helpers)/parseMetaobjects";

export async function GET() {
  try {
    const [fabricsResponse, colorsResponse] = await Promise.all([
      storefront(queries.metaobjects, { type: "telas" }),
      storefront(queries.metaobjects, { type: "color_tela" }),
    ]);
    const fabricsData = parseMetaobjects(fabricsResponse.data);
    const colorsData = parseMetaobjects(colorsResponse.data);

    const groupByFabric = colorsData.reduce((acc: any, color: any) => {
      if (!acc[color.tipo_tela]) {
        acc[color.tipo_tela] = [];
      }
      acc[color.tipo_tela].push(color);
      return acc;
    }, {});

    const fabrics = fabricsData.map((f: any) => {
      return {
        ...f,
        colores: groupByFabric[f.id] ?? [],
      };
    });

    return NextResponse.json(fabrics);
  } catch (e) {
    console.error("Error in fetching data:", e);
    return NextResponse.json([], { status: 500 });
  }
}
