import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";
import { NextResponse } from "next/server";
import { parseMetaobjects } from "../../(helpers)/parseMetaobjects";

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  const { type } = params;

  try {
    const { data } = await storefront(queries.metaobjects, { type });

    const metaobjectsValues = parseMetaobjects(data);

    return NextResponse.json(metaobjectsValues);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch metaobjects" },
      { status: 500 }
    );
  }
}
