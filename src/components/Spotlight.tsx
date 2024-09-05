"use client";
import Link from "next/link";
import Card from "./Card";
import { HiChevronRight } from "react-icons/hi";
import { navigation } from "@/constants";
import Reveal from "@/transitions/Reveal";
import CascadeReveal from "@/transitions/CascadeReveal";
import useFetch from "@/hooks/useFetch";
import CardSkeleton from "./CardSkeleton";
import { getSpotlight } from "@/requests";

export default function Spotlight() {
  const { data: products, isLoading } = useFetch("spotlight", getSpotlight);

  return (
    <section className="flex-col-center w-full h-fit">
      <Reveal tailwindStyles="flex-col-center">
        <h4 className="subtitle-1 text-black/80">Nuestros Productos</h4>
        <h3 className="title-2 uppercase m-3 mb-16">Destacados</h3>
      </Reveal>
      <div className="mb-10 grid grid-cols-1 gap-[70px] md:grid-cols-2 min-[1080px]:grid-cols-3 min-[640px]:gap-[2vw]">
        {!isLoading && products?.length === 0 ? (
          <p>No hay productos destacados</p>
        ) : (
          products?.map((p, i) => (
            <CascadeReveal key={i}>
              {isLoading ? <CardSkeleton /> : <Card {...p} key={p._id} />}
            </CascadeReveal>
          ))
        )}
      </div>
      <Link
        href={navigation.productos}
        className="flex-row-center text-red font-bold hover:underline underline-offset-4 cursor-pointer"
      >
        Ver catálogo completo <HiChevronRight className="w-5 h-5 ml-2" />
      </Link>
    </section>
  );
}
