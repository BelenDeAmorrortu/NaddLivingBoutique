"use client";
import React from "react";
import Image from "next/image";
import { Local, Local2, Local3 } from "@/assets/images";
import { CascadeReveal, Reveal } from "@/transitions";
import { CiLocationOn } from "react-icons/ci";

export default function OurShop() {
  return (
    <section className="flex flex-col gap-10 py-10">
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
        <CascadeReveal key={1} twStyles="photo-grid-item">
          <Image
            src={Local3}
            alt="Intorior del local en Av. Córdoba 4454"
            placeholder="blur"
            className="absolute object-cover w-full h-full"
          />
        </CascadeReveal>
        <CascadeReveal key={3} twStyles="photo-grid-item">
          <Image
            src={Local}
            alt="Exterior del local en Av. Córdoba 4454"
            placeholder="blur"
            className="absolute object-cover w-full h-full"
          />
        </CascadeReveal>
        <CascadeReveal key={5} twStyles="photo-grid-item">
          <Image
            src={Local2}
            alt="Intorior del local en Av. Córdoba 4454"
            placeholder="blur"
            className="absolute object-cover w-full h-full"
          />
        </CascadeReveal>
      </div>
      {/* <div className="w-full flex-row-center gap-5 h-[70vh]">
        <div className="flex-1 h-full relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.350614541125!2d-58.431391824458764!3d-34.59529457295726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab9a1d5c4ad%3A0x74afd8399ecd97d3!2sNadd%20Living!5e0!3m2!1ses!2sar!4v1720029646904!5m2!1ses!2sar"
            width="100%"
            height="380"
            style={{ border: 0, position: "absolute" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="flex flex-1"></div>
      </div> */}
    </section>
  );
}
