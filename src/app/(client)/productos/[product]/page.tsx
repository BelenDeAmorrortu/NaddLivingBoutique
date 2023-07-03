import { getProduct } from "../../../../../sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { Carousel } from "@/components";
import { navigation } from "@/utils/navigation";

type Props = {
  params: { product: "string" };
};

export async function generateMetadata({ params }: Props) {
  try {
    const { product } = params;

    const { name, images, category } = await getProduct(product);

    if (!name) throw Error("product not found");
    return {
      title: `${category[0].toLocaleUpperCase() + category.slice(1)} ${name}`,
      alternates: {
        canonical: `${navigation.productos}/${product}`,
      },
      openGraph: {
        title: `${category} ${name}`,
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
  const { name, images, category, description } = await getProduct(slug);

  return (
    <div className="flex flex-col md:flex-row h-fit py-10 justify-around items-center mt-[5.5rem]">
      <div className="w-[80vw] md:w-[42vw]">
        <Carousel images={images} />
      </div>
      <div className="w-[90vw] md:w-[40vw] flex flex-col justify-center space-y-5">
        <h1 className="title-2 text-red">{name}</h1>
        <h4 className="subtitle-1">{category}</h4>
        <PortableText value={description} />
        <button className="text-sm lg:text-base w-full py-3 border-4 border-black uppercase font-bold hover:bg-black hover:text-white transition-all duration-300">
          Consultar
        </button>
      </div>
    </div>
  );
}
