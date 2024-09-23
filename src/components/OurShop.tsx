"use client";
import React from "react";
import Image from "next/image";
import { Local, Local2, Local3 } from "@/assets/images";
import { CascadeReveal, Reveal } from "@/transitions";
import { CiLocationOn } from "react-icons/ci";

export default function OurShop() {
  return (
    <section className="flex flex-col gap-10 px-0">
      <Reveal>
        <div className="flex-col-center sm:flex-row-center gap-5 my-2">
          <CiLocationOn className="text-red h-[100px] w-[100px]" />
          <div className="flex flex-col gap-2">
            <h3 className="text-center sm:text-left title-2 uppercase p-0 m-0">
              Visitanos en nuestro local
            </h3>
            <a
              className="text-center sm:text-left title-2 text-red md:text-4xl p-0 m-0 active:text-red visited:text-red"
              target="_blank"
              href="https://www.google.com/maps/place/Nadd/@-34.5952946,-58.4313918,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccab9a1d5c4ad:0x74afd8399ecd97d3!8m2!3d-34.5952946!4d-58.4288169!16s%2Fg%2F1td9fyx2?entry=ttu"
            >
              Av. Córdoba 4454, CABA.
            </a>
          </div>
        </div>
      </Reveal>
      <div className="photo-grid">
        <CascadeReveal position={1} twStyles="photo-grid-item">
          <Image
            src={Local3}
            alt="Intorior del local en Av. Córdoba 4454"
            placeholder="blur"
            className="absolute object-cover w-full h-full"
          />
        </CascadeReveal>
        <CascadeReveal position={3} twStyles="photo-grid-item">
          <Image
            src={Local}
            alt="Exterior del local en Av. Córdoba 4454"
            placeholder="blur"
            className="absolute object-cover w-full h-full"
          />
        </CascadeReveal>
        <CascadeReveal position={5} twStyles="photo-grid-item">
          <Image
            src={Local2}
            alt="Intorior del local en Av. Córdoba 4454"
            placeholder="blur"
            className="absolute object-cover w-full h-full"
          />
        </CascadeReveal>
      </div>
    </section>
  );
}
