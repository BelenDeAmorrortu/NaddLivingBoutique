import { NextResponse } from "next/server";
import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = decodeURIComponent(searchParams.get("id") ?? "");

    const { data } = await storefront(queries.imageReferenceURL, {
      id,
    });
    return NextResponse.json({ url: data.node.image.url });
  } catch (e) {
    return NextResponse.json({}, { status: 500 });
  }
}
