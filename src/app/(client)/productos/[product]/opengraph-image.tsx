import { ImageResponse } from "next/server";
import { getProduct, sanityImage } from "../../../../../sanity/sanity-utils";

// Route segment config
export const runtime = "edge";

export const alt = "Imagén del producto";
export const size = {
  width: 500,
  height: 500,
};

export const contentType = "image/png";

// Image generation

type Props = {
  params: { product: "string" };
};

export default async function OgImage({ params }: Props) {
  const { product } = params;

  const { lqip, name } = await getProduct(product);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={sanityImage(lqip[0]).quality(50).url()}
          alt={`Imagén de ${name}`}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
