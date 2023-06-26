import Link from "next/link";
import { getSpotlight } from "../../sanity/sanity-utils";
import Card from "./Card";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default async function Spotlight() {
  let products = await getSpotlight();

  return (
    <div className="flex-col-center w-screen h-fit my-8">
      <h4 className="subtitle-1">Nuestros Productos</h4>
      <h3 className="title-2 m-3 mb-16">Destacados</h3>
      <div className="mb-7 flex-center flex-wrap w-[95%] md:w-[80%]">
        {products.length > 0 ? (
          products.map((p) => <Card {...p} />)
        ) : (
          <p>There are no products</p>
        )}
      </div>
      <Link
        href="/productos"
        className="flex-row-center text-red font-bold hover:underline underline-offset-4 cursor-pointer"
      >
        Ver catálogo completo <ChevronRightIcon className="w-5 h-5 ml-2" />
      </Link>
    </div>
  );
}
