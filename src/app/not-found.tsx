"use client";
import { Sofa } from "@/assets/images";
import { Button } from "@/components";
import { navigation } from "@/constants";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="mt-16 flex-col-center md:flex-row-center md:gap-14 h-full">
      <Image
        src={Sofa}
        alt="Ilustración Sofá"
        className=" brightness-110 w-[30%] opacity-50"
      />
      <div className="flex flex-col justify-center items-center md:items-start md:justify-start  gap-5">
        <h3 className="title-2 text-3xl text-center md:text-left">
          Lo sentimos, la página que busca no existe
        </h3>
        <Button
          tailwindStyles="w-[300px]"
          onClick={() => window.location.replace(navigation.home)}
        >
          Ir a la página principal
        </Button>
      </div>
    </section>
  );
}
