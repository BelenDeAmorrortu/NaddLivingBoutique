import { NextResponse } from "next/server";
import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";

export async function PUT(request: Request) {
  const { id, productIds } = await request.json();
  try {
    const { data } = await storefront(queries.removeCart, { id, productIds });
    return NextResponse.json(data.cartLinesRemove.cart);
  } catch (e) {
    return NextResponse.json({}, { status: 500 });
  }
}
