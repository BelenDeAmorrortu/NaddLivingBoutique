import { NextResponse } from "next/server";
import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";

export async function POST(request: Request) {
  const { id, products } = await request.json();
  try {
    const { data } = await storefront(queries.addCart, { id, products });
    return NextResponse.json(data.cartLinesAdd.cart);
  } catch (e) {
    return NextResponse.json({}, { status: 500 });
  }
}
