import { navigation } from "@/constants";
import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { HiMapPin, HiPhone, HiEnvelope } from "react-icons/hi2";

export default function Footer() {
  return (
    <footer className="bg-black w-full h-fit md:h-[40vh] flex flex-col md:flex-row justify-between items-center md:items-start p-10 space-y-10 md:space-y-0 ">
      <div className="w-[250px] md:w-[300px]">
        <h4>Redes Sociales</h4>
        <ul>
          <li className="group">
            <a
              target="_blank"
              href="https://www.instagram.com/nadd.living.boutique/"
            >
              <FaInstagram className="footer-icon" />
              nadd.living.boutique
            </a>
          </li>
          <li className="group">
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100092571386435"
            >
              <FaFacebook className="footer-icon" />
              NADD living boutique
            </a>
          </li>
        </ul>
      </div>
      <div className="w-[250px] md:w-[300px] max-w-[300px]">
        <h4>Nadd living boutique</h4>
        <ul>
          <li className="group">
            <a
              className="adress"
              target="_blank"
              href="https://www.google.com/maps/place/Nadd/@-34.5952946,-58.4313918,17z/data=!3m1!4b1!4m6!3m5!1s0x95bccab9a1d5c4ad:0x74afd8399ecd97d3!8m2!3d-34.5952946!4d-58.4288169!16s%2Fg%2F1td9fyx2?entry=ttu"
            >
              <HiMapPin className="footer-icon h-5 w-5" /> Av. Córdoba 4454,
              CABA, Argentina.
            </a>
          </li>
          <li className="group">
            <a href="tel:1153463845">
              <HiPhone className="footer-icon" />
              {"(+54) 11 5346-3845"}
            </a>
          </li>
          <li className="group">
            <a href="mailto:naddliving@gmail.com">
              <HiEnvelope className="footer-icon" />
              naddliving@gmail.com
            </a>
          </li>
        </ul>
      </div>
      <div className=" w-[250px] md:w-[300px]">
        <h4>Ayuda</h4>
        <ul>
          <li>
            <Link href={navigation.contacto}>Contacto</Link>
          </li>
          <li>
            <Link href={navigation.faq}>Preguntas Frecuentes</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
