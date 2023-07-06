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
              className="flex"
              href="https://www.google.com/maps/place/Av.+C%C3%B3rdoba+4454,+C1414+Villa+Crespo,+Buenos+Aires/@-34.595119,-58.4287119,3a,77.9y,193.89h,96.78t/data=!3m7!1e1!3m5!1sJxFwvuzsPZfHNDGtSYOCFA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DJxFwvuzsPZfHNDGtSYOCFA%26cb_client%3Dsearch.gws-prod.gps%26w%3D86%26h%3D86%26yaw%3D203.0275%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192!4m7!3m6!1s0x95bcca79e275f0f7:0x8e0e2a2a0b74e3a3!8m2!3d-34.5952946!4d-58.4288169!10e5!16s%2Fg%2F11c2blxhw6?entry=ttu"
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
            <EnvelopeIcon className="footer-icon" />
            naddliving@gmail.com
          </li>
        </ul>
      </div>
      <div className="w-[300px]">
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
