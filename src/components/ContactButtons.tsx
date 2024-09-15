"use client";
import { FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { useEffect, useState } from "react";
import { navigation } from "@/constants";
import { sendWhatsappMessage } from "@/utils/sendWhatsappMessage";
import { Button } from "@/components";

export default function ContactButtons() {
  const [isContactSection, setIsContactSection] = useState<boolean>();
  const [whatsappMessage, setWhatsappMessage] = useState<string>();

  useEffect(() => {
    setIsContactSection(!window.location.href.includes(navigation.productos));
    setWhatsappMessage(
      !window.location.href.includes(navigation.productos)
        ? 'Hola! Vengo de visitar la página web de "Nadd Living Boutique". Me gustaría realizar una consulta.'
        : `Hola! Vengo de visitar la página web de "Nadd Living Boutique". Me gustaría consultar por el siguiente producto: ${window.location.href}`
    );
  }, []);

  return (
    <div className="flex flex-col-center md:flex-row md:justify-between w-full gap-5">
      <Button
        tailwindStyles="hover:text-white"
        color="whatsapp"
        onClick={() => {
          if (whatsappMessage) sendWhatsappMessage(whatsappMessage);
        }}
      >
        <BsWhatsapp className="w-6 h-6 mr-3 group-hover/button:fill-white" />
        Whatsapp
      </Button>
      <Button
        tailwindStyles="hover:text-white"
        color="instagram"
        onClick={() =>
          window.open(
            "https://www.instagram.com/nadd.living.boutique/",
            "_blank"
          )
        }
      >
        <FaInstagram className="w-6 h-6 mr-3 group-hover/button:fill-white" />
        Instagram
      </Button>
    </div>
  );
}
