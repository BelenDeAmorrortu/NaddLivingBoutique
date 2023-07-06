import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="footer bg-black w-screen h-fit md:h-[40vh] flex flex-col md:flex-row justify-evenly items-center md:items-start py-12 space-y-10 md:space-y-0 ">
      <div className="w-[300px]">
        <h4>Ayuda</h4>
        <ul>
          <li>Contacto</li>
          <li>Preguntas Frecuentes</li>
        </ul>
      </div>
      <div className="w-[300px] max-w-[300px]">
        <h4>Nadd living boutique</h4>
        <ul>
          <li className="group">
            <a
              className="adress"
              target="_blank"
              href="https://www.google.com/maps/place/Av.+C%C3%B3rdoba+4454,+C1414+Villa+Crespo,+Buenos+Aires/@-34.5952946,-58.4375716,15z/data=!4m16!1m9!3m8!1s0x95bcca79e275f0f7:0x8e0e2a2a0b74e3a3!2sAv.+C%C3%B3rdoba+4454,+C1414+Villa+Crespo,+Buenos+Aires!3b1!8m2!3d-34.5952946!4d-58.4288169!10e5!16s%2Fg%2F11c2blxhw6!3m5!1s0x95bcca79e275f0f7:0x8e0e2a2a0b74e3a3!8m2!3d-34.5952946!4d-58.4288169!16s%2Fg%2F11c2blxhw6?entry=ttu"
            >
              <MapPinIcon className="footer-icon h-5 w-5" /> Av. Córdoba 4454,
              CABA, Argentina.
            </a>
          </li>
          <li className="group">
            <PhoneIcon className="footer-icon" />
            {"(+54) 11 5346-3845"}
          </li>
          <li className="group">
            <a href="mailto:naddliving@gmail.com">
              <EnvelopeIcon className="footer-icon" />
              naddliving@gmail.com
            </a>
          </li>
        </ul>
      </div>
      <div className="w-[300px]">
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
    </div>
  );
}
