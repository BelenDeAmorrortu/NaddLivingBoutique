import { getProduct } from "../../../../sanity/requests/sanity-requests";
import { PortableText } from "@portabletext/react";
import { Carousel, ContactButtons } from "@/components";
import { navigation } from "@/constants/navigation";
import AddToCartProductForm from "@/components/AddToCartProductForm";
import { HiArrowLongRight } from "react-icons/hi2";
import { CTA } from "@/assets/images";
import Image from "next/image";

type Props = {
  params: { product: "string" };
};

export async function generateMetadata({ params }: Props) {
  try {
    const { product } = params;

    const { name, category } = await getProduct(product);

    if (!name) throw Error("product not found");
    return {
      title: `${category[0][0].toUpperCase() + category[0].slice(1)} ${name}`,
      alternates: {
        canonical: `${navigation.productos}/${product}`,
      },
      openGraph: {
        title: `${category[0][0].toUpperCase() + category[0].slice(1)} ${name}`,
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist",
    };
  }
}

export default async function page({ params }: Props) {
  const slug = params.product;
  const { name, images, category, description, lqip } = await getProduct(slug);

  return (
    <div className="flex flex-col h-fit w-full">
      <div className="description flex flex-col md:flex-row h-fit pb-10 pt-32 justify-evenly items-center">
        <div className="mb-12 w-[95vw] sm:mb-0 md:w-[50vw] md:sticky md:top-32 min-[1243px]:w-[45vw] md:self-baseline">
          <Carousel images={images} lqip={lqip} />
        </div>
        <div className="w-[90vw] md:w-[40vw] flex flex-col justify-center">
          <h1 className="title-3 text-red">{name}</h1>
          <h2 className="subtitle-1 my-5">{category.join(" - ")}</h2>
          <PortableText value={description} />
          <AddToCartProductForm />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row justify-evenly items-center w-full h-fit my-6">
        <div className="flex flex-col w-[90vw] md:max-w-[45vw] gap-4">
          <h4 className="md:hidden text-3xl font-bold text-red">
            ¿Querés tu producto a medida?
          </h4>
          <h5 className="md:hidden text-xl flex-row-center w-full">
            <span className="flex flex-1">Contactanos en nuestras redes</span>
          </h5>
          <Image
            src={CTA}
            alt="¿Querés tu producto personalizado? Contactanos en nuestras redes"
            className="hidden md:flex w-full h-auto"
          />
        </div>
        <div className="flex flex-col flex-1 w-[90vw] md:max-w-[40vw]">
          <ContactButtons />
        </div>
      </div>
    </div>
  );
}
