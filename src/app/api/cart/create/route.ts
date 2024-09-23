import { NextResponse } from "next/server";
import { storefront } from "@/app/api/(helpers)/storefront";
import { queries } from "@/app/api/(helpers)/queries";

export async function POST() {
  try {
    const { data } = await storefront(queries.createCart, {
      products: [],
      attributes: [{ key: "custom.fabric", value: "-" }],
    });
    return NextResponse.json(data.cartCreate.cart);
  } catch (e) {
    return NextResponse.json({}, { status: 500 });
  }
}
