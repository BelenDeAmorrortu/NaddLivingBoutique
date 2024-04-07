"use client";
import Link from "next/link";
import { getSpotlight } from "../sanity/requests/sanity-requests";
import Card from "./Card";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { navigation } from "@/constants/navigation";
import Reveal from "@/transitions/Reveal";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import CascadeReveal from "@/transitions/CascadeReveal";

const queryClient = new QueryClient();

export default function Spotlight() {
  return (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  );
}

function Component() {
  const { data: products } = useQuery({
    queryFn: () => getSpotlight(),
    placeholderData: [],
  });

  return (
    <section className="flex-col-center w-full h-fit my-10">
      <Reveal tailwindStyles="flex-col-center">
        <h4 className="subtitle-1">Nuestros Productos</h4>
        <h3 className="title-3 m-3 mb-16">Destacados</h3>
      </Reveal>
      <div className="mb-7 flex-center flex-wrap w-[95%] md:w-[80%]">
        {products && products.length > 0 ? (
          products?.map((p, i) => (
            <CascadeReveal key={i}>
              <Card {...p} key={p._id} />
            </CascadeReveal>
          ))
        ) : (
          <p>No hay productos destacados</p>
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
