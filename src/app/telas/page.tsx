"use client";
import { Fabrics, Fabrics2 } from "@/assets/images";
import FabricsNavigator from "@/components/FabricsNavigator";
import { CascadeReveal, Reveal } from "@/transitions";
import Image from "next/image";

export default function Page() {
  return (
    <div className="h-fit pt-16">
      <div className="h-[90vh] w-full p-5">
        <Reveal>
          <h4 className="title-2 text-black text-center my-16 uppercase">
            Descubrí nuestras telas
          </h4>
        </Reveal>
        <div className="grid grid-cols-3 h-[60vh] w-full relative gap-5">
          <CascadeReveal
            key={1}
            twStyles="relative aspect-w-16 aspect-h-9 flex items-end"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover object-bottom brightness-50"
              src="/IMG_7499.MOV"
              muted
              loop
              autoPlay
              placeholder=""
              preload=""
            />
          </CascadeReveal>
          <CascadeReveal key={3} twStyles="relative aspect-w-16 aspect-h-9">
            <Image
              className="absolute inset-0 w-full h-full object-cover brightness-50"
              src={Fabrics2}
              alt="Description"
              placeholder="blur"
            />
          </CascadeReveal>
          <CascadeReveal key={5} twStyles="relative aspect-w-16 aspect-h-9">
            <video
              className="absolute inset-0 w-full h-full object-cover  brightness-50"
              src="/VID_20240701_105753766 (1).mp4"
              muted
              loop
              autoPlay
              placeholder=""
              preload=""
            />
          </CascadeReveal>
          <div className="absolute h-full w-full flex-col-center"></div>
        </div>
      </div>

      <FabricsNavigator />
    </div>
  );
}
