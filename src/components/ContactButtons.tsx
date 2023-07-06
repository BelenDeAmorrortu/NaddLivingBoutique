"use client";
import { FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function ContactButtons() {
  const [screenWidth, setScreenWidth] = useState<number>();

  useEffect(() => {
    setScreenWidth(document.body.clientWidth);
  }, []);

  return (
    <div className="flex justify-between w-full">
      <button
        onClick={() =>
          window.open(
            `https://api.whatsapp.com/send?phone=541153463845&text=Hola!%20Me%20gustar%C3%ADa%20consultar%20por%20el%20siguiente%20producto%20que%20vi%20en%20la%20p%C3%A1gina%20web%20%22Nadd%20Living%20Boutique%22.%20${window.location.href}`,
            "_blank"
          )
        }
        className="flex-row-center text-sm lg:text-base w-[49%] p-2 border-2 border-black uppercase font-bold hover:text-whatsapp hover:border-whatsapp transition-all duration-300"
      >
        <BsWhatsapp className="w-6 h-6 mr-3" />
        Whatsapp
      </button>
      <button
        onClick={() =>
          window.open(
            screenWidth && screenWidth < 500
              ? "https://ig.me/m/nadd.living.boutique"
              : "https://www.instagram.com/nadd.living.boutique/",
            "_blank"
          )
        }
        className="flex-row-center text-sm lg:text-base w-[49%] p-2 border-2 border-black uppercase font-bold hover:text-instagram hover:border-instagram transition-all duration-300"
      >
        <FaInstagram className="w-6 h-6 mr-3" />
        Instagram
      </button>
    </div>
  );
}
