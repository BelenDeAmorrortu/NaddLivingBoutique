import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";
import { isJsonString } from "@/utils/isJsonString";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const { data } = await storefront(queries.metaobject, { id });

    const values = data.metaobject.fields.reduce(
      (acc: any, current: any) => {
        acc[current.key] = isJsonString(current.value)
          ? JSON.parse(current.value)
          : current.value;
        return acc;
      },
      { id: data.metaobject.id }
    );

    return NextResponse.json(values);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch metaobject" },
      { status: 500 }
    );
  }
}
