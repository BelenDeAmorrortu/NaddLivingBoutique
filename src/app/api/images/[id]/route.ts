import { NextResponse } from "next/server";
import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await storefront(queries.imageReferenceURL, {
      id: params.id,
    });
    return NextResponse.json({ url: data.node.image.url });
  } catch (e) {
    return NextResponse.json({}, { status: 500 });
  }
}
