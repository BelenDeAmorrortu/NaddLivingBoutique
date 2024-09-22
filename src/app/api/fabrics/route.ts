import { NextResponse } from "next/server";
import { axiosInstance } from "@/app/api/(helpers)/axiosInstance";

export async function GET() {
  try {
    const { data: fabricsData } = await axiosInstance.get("/metaobjects/telas");
    const { data: colorsData } = await axiosInstance.get(
      "/metaobjects/color_tela"
    );

    const fabrics = fabricsData.map((f: any) => {
      const relatedColors = colorsData.filter((c: any) => c.tipo_tela === f.id);
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
