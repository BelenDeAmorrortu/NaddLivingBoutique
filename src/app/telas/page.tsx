"use client";
import { Fabrics, Fabrics2 } from "@/assets/images";
import FabricsNavigator from "@/components/FabricsNavigator";
import { navigation } from "@/constants/navigation";
import { CascadeReveal, Reveal } from "@/transitions";
import Image from "next/image";
import Link from "next/link";
import UseAnimations from "react-useanimations";
import arrowDown from "react-useanimations/lib/arrowDown";

export default function Page() {
  return (
    <div className="h-fit pt-16">
      <div className="h-fit md:h-[85vh] w-full">
        <Reveal tailwindStyles="flex-col-center px-10 gap-5 my-6">
          <h1 className="title-2 text-black text-center uppercase p-0 m-0">
            Descubrí nuestras telas
          </h1>
          <p className="md:max-w-[900px] text-center">
            En NADD Living Boutique nos encanta que cada cliente sea parte del
            proceso creativo de su próximo mueble. Por eso ofrecemos una gran
            variedad de telas para que tu mueble refleje tu estilo único.
          </p>
          <Link
            href={navigation.telas + "#telas"}
            className="capitalize  flex-row-center text-red font-bold text-lg w-fit hover:opacity-75 transition-opacity duration-100"
          >
            Continuar
            <UseAnimations
              animation={arrowDown}
              size={30}
              strokeColor="#B50706"
              className="ml-2"
            />
          </Link>
        </Reveal>
        <div className="photo-grid md:h-[60vh]">
          <CascadeReveal key={1} twStyles="photo-grid-item">
            <video
              className="absolute inset-0 w-full h-full object-cover object-bottom brightness-75"
              src="/IMG_7499.MOV"
              muted
              loop
              autoPlay
              placeholder=""
              preload=""
            />
          </CascadeReveal>
          <CascadeReveal key={3} twStyles="photo-grid-item">
            <Image
              className="absolute inset-0 w-full h-full object-cover brightness-75"
              src={Fabrics2}
              alt="Description"
              placeholder="blur"
            />
          </CascadeReveal>
          <CascadeReveal key={5} twStyles="photo-grid-item">
            <video
              className="absolute inset-0 w-full h-full object-cover brightness-75"
              src="/VID_20240701_105753766 (1).mp4"
              muted
              loop
              autoPlay
              placeholder=""
              preload=""
            />
          </CascadeReveal>
        </div>
      </div>
      <FabricsNavigator />
    </div>
  );
}
