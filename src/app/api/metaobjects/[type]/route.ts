import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";
import { NextResponse } from "next/server";
import { axiosInstance } from "@/app/api/(helpers)/axiosInstance";

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  const { type } = params;

  try {
    const { data } = await storefront(queries.metaobjects, { type });

    const metaobjectsValuesPromises = data.metaobjects.edges.map(
      async (o: any) => {
        const { data } = await axiosInstance.get(
          "/metaobject?id=" + encodeURIComponent(o.node.id)
        );
        return data;
      }
    );

    const metaobjectsValues = await Promise.all(metaobjectsValuesPromises);
    return NextResponse.json(metaobjectsValues);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch metaobjects" },
      { status: 500 }
    );
  }
}
