import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer bg-black w-screen h-fit md:h-[40vh] flex flex-col md:flex-row justify-evenly items-center md:items-start py-12 space-y-10 md:space-y-0 ">
      <div className="min-w-[200px]">
        <h4>Ayuda</h4>
        <ul>
          <li>Contacto</li>
          <li>Preguntas Frecuentes</li>
        </ul>
      </div>
      <div className="min-w-[200px]">
        <h4>Nadd living boutique</h4>
        <ul>
          <li className="group">
            <MapPinIcon className="footer-icon" /> es la direc
          </li>
          <li className="group">
            <PhoneIcon className="footer-icon" />
            {"(+54) 11 5346-3845"}
          </li>
          <li className="group">
            <EnvelopeIcon className="footer-icon" />
            naddliving@gmail.com
          </li>
        </ul>
      </div>
      <div className="min-w-[200px]">
        <h4>Redes Sociales</h4>
        <ul>
          <li className="group">
            <FaInstagram className="footer-icon" />
            nadd.living.boutique
          </li>
          <li className="group">
            <FaFacebook className="footer-icon" />
            NADD living boutique
          </li>
        </ul>
      </div>
    </div>
  );
}
