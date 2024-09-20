import { NextResponse } from "next/server";
import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";
import axios from "axios";
import { getLqip } from "@/app/api/(helpers)/getLqip";
import { axiosInstance } from "@/app/api/(helpers)/axiosInstance";

export async function GET() {
  try {
    const { data } = await storefront(queries.metaobjects, { type: "telas" });
    const metaobjectsValuesPromises = data.metaobjects.edges.map(
      async (o: any) => {
        const { data } = await axiosInstance.get("/metaobject/" + o.node.id);
        return data;
      }
    );

    const metaobjectsValues = await Promise.all(metaobjectsValuesPromises);

    const { data: colors } = await storefront(queries.metaobjects, {
      type: "color_tela",
    });
    const colorsPromises = colors.metaobjects.edges.map(async (o: any) => {
      const { data } = await axios.get("/metaobject/" + o.node.id);
      const { data: image } = await axios.get("/images/" + data.foto);
      const lqip = await getLqip([image]);
      return {
        ...data,
        foto: image,
        lqip: lqip[0],
      };
    });

    const colorsValues = await Promise.all(colorsPromises);

    const fabrics = metaobjectsValues.map((f) => {
      const colors = colorsValues.filter((c) => c.tipo_tela === f.id);
      return {
        ...f,
        colores: colors,
      };
    });

    return NextResponse.json(fabrics);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}
