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

  const { images, name } = await getProduct(product);

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={images[0]}
          alt={`Imagén de ${name}`}
          width={500}
          height={500}
          className="object-cover h-full w-full"
        />
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
