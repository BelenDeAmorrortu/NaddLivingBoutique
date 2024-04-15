import { getProduct } from "../../../../sanity/requests/sanity-requests";
import { PortableText } from "@portabletext/react";
import { Carousel, ContactButtons } from "@/components";
import { navigation } from "@/constants/navigation";
import AddToCartProductForm from "@/components/AddToCartProductForm";

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
    <div className="description flex flex-col md:flex-row h-fit pb-10 pt-32 justify-around items-center">
      <div className="mb-12 w-[95vw] sm:mb-0 md:w-[50vw] min-[1243px]:w-[47vw]">
        <Carousel images={images} lqip={lqip} />
      </div>
      <div className="w-[90vw] md:w-[40vw] flex flex-col justify-center">
        <h1 className="title-3 text-red">{name}</h1>
        <h4 className="subtitle-1 my-5">{category.join(" - ")}</h4>
        <PortableText value={description} />
        <AddToCartProductForm />
        <h4 className="text-sm lg:text-base uppercase font-bold border-b-2 border-grey text-black py-3 my-5">
          Consultar
        </h4>
        <ContactButtons />
      </div>
    </div>
  );
}
