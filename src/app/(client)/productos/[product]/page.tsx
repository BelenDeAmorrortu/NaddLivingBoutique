import { getProduct } from "../../../../../sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { Carousel } from "@/components";

type Props = {
  params: { product: "string" };
};

export default async function page({ params }: Props) {
  const slug = params.product;
  const { name, images, category, description } = await getProduct(slug);

  return (
    <div className="flex flex-col md:flex-row h-fit py-10 justify-around items-center mt-28">
      <div className="w-[80vw] md:w-[40vw]">
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
