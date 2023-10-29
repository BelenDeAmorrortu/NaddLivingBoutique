import Link from "next/link";
import { getSpotlight } from "../sanity/requests/sanity-requests";
import Card from "./Card";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { navigation } from "@/utils/navigation";

export default function Spotlight() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Component />
    </>
  );
}

async function Component() {
  let products = await getSpotlight();

  return (
    <section className="flex-col-center w-full h-fit">
      <h4 className="subtitle-1">Nuestros Productos</h4>
      <h3 className="title-3 m-3 mb-16">Destacados</h3>
      <div className="mb-7 flex-center flex-wrap w-[95%] md:w-[80%]">
        {products.length > 0 ? (
          products.map((p) => <Card {...p} key={p._id} />)
        ) : (
          <p>There are no products</p>
        )}
      </div>
      <Link
        href={navigation.productos}
        className="flex-row-center text-red font-bold hover:underline underline-offset-4 cursor-pointer"
      >
        Ver catálogo completo <ChevronRightIcon className="w-5 h-5 ml-2" />
      </Link>
    </section>
  );
}
