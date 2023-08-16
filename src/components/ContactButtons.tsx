"use client";
import { FaInstagram } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { useEffect, useState } from "react";
import { navigation } from "@/utils/navigation";

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
    <div className="flex flex-col-center space-y-5 md:space-y-0 md:flex-row md:justify-between w-full">
      <button
        onClick={() =>
          window.open(
            `https://api.whatsapp.com/send?phone=541153463845&text=${whatsappMessage}`,
            "_blank"
          )
        }
        className={"contact-button ".concat(
          isContactSection
            ? "border-white text-white hover:border-white-hover hover:text-white-hover"
            : " border-black hover:text-whatsapp hover:border-whatsapp"
        )}
      >
        <BsWhatsapp className="w-6 h-6 mr-3" />
        Whatsapp
      </button>
      <button
        onClick={() =>
          window.open(
            "https://www.instagram.com/nadd.living.boutique/",
            "_blank"
          )
        }
        className={"contact-button ".concat(
          isContactSection
            ? "border-white text-white hover:border-white-hover hover:text-white-hover"
            : " border-black hover:text-instagram hover:border-instagram"
        )}
      >
        <FaInstagram className="w-6 h-6 mr-3" />
        Instagram
      </button>
    </div>
  );
}
