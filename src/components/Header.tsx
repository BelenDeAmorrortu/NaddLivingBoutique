"use client";
import { Banner, Logo } from "@/assets/images";
import Image from "next/image";
import UseAnimations from "react-useanimations";
import instagram from "react-useanimations/lib/instagram";
import arrowDown from "react-useanimations/lib/arrowDown";

export default function Header() {
  return (
    <div className="w-screen max-w-[100vw] h-screen flex-center">
      {/* <video
        src="/mockup.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-screen object-cover -z-10 absolute left-0 brightness-50"
      /> */}
      <Image
        src={Banner}
        alt="Imagén sillón París"
        className="w-full h-screen object-cover -z-10 absolute left-0 brightness-50"
      />
      <div className="flex-col-center w-full">
        <h4 className="subtitle-1 text-grey">Nadd Living Boutique</h4>
        <h3 className="title-1 text-white my-3">
          The Perfect <span className="text-red">Style</span>
        </h3>
        <a
          href="https://www.instagram.com/nadd.living.boutique/"
          target="_blank"
          className="group transition-all duration-75 absolute bottom-3 right-3 flex-row-center mx-3 text-grey uppercase text-xs md:text-sm"
        >
          <UseAnimations
            animation={instagram}
            size={30}
            strokeColor="rgb(156 163 175)"
            className="sm:mr-2"
          />
          <span className="hidden sm:block">@nadd.living.boutique</span>
        </a>
        <span className="absolute bottom-3 flex-col-center text-grey uppercase text-xs md:text-sm">
          Scroll Down
          <UseAnimations
            animation={arrowDown}
            size={30}
            strokeColor="rgb(209 213 219)"
            className="mr-2"
          />
        </span>
      </div>
    </div>
  );
}
