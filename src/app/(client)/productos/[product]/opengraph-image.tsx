import Image from "next/image";
import { ImageResponse } from "next/server";
import { getProduct } from "../../../../../sanity/sanity-utils";

// Route segment config
export const runtime = "edge";

export const alt = "Imagén del producto";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation

type Props = {
  params: { product: "string" };
};

export default async function OgImage({ params }: Props) {
  const { product } = params;

  const { images, name, category } = await getProduct(product);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {category + " " + name}
      </div>
    ),
    {
      ...size,
    }
  );
}
