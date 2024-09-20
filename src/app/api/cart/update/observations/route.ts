import { NextResponse } from "next/server";
import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";

export async function PUT(request: Request) {
  const { id, observations } = await request.json();
  try {
    await storefront(queries.updateCartAttributes, {
      id,
      attributes: [{ key: "custom.fabric", value: observations ?? "-" }],
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
