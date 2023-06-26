import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
export default function Footer() {
  return (
    <div className="bg-black w-screen h-fit md:h-[40vh] flex flex-col md:flex-row justify-evenly items-center md:items-start py-12 space-y-10 md:space-y-0 ">
      <div className="min-w-[200px]">
        <h4 className="title-3 text-white">Ayuda</h4>
        <ul className="flex flex-col items-start">
          <li className="text-grey hover:text-white transition-all cursor-pointer">
            Contacto
          </li>
          <li className="text-grey hover:text-white transition-all cursor-pointer">
            Preguntas Frecuentes
          </li>
        </ul>
      </div>
      <div className="min-w-[200px]">
        <h4 className="title-3 text-white">Nadd living boutique</h4>
        <ul className="flex flex-col items-start">
          <li className="group flex-row-center text-grey hover:text-white transition-all cursor-pointer">
            <MapPinIcon className="w-3 h-3 mr-3 fill-grey group-hover:fill-white" />{" "}
            es la direc
          </li>
          <li className="group flex-row-center text-grey hover:text-white transition-all cursor-pointer">
            <PhoneIcon className="w-3 h-3 mr-3 fill-grey group-hover:fill-white" />
            1153463845
          </li>
          <li className="group flex-row-center text-grey hover:text-white transition-all cursor-pointer">
            <EnvelopeIcon className="w-3 h-3 mr-3 fill-grey group-hover:fill-white" />
            naddliving@gmail.com
          </li>
        </ul>
      </div>
      <div className="min-w-[200px]">
        <h4 className="title-3 text-white">Redes Sociales</h4>
        <ul className="flex flex-col items-start">
          <li className="group flex-row-center text-grey hover:text-white transition-all cursor-pointer">
            <MapPinIcon className="w-3 h-3 mr-3 fill-grey group-hover:fill-white" />
            nadd.living.boutique
          </li>
          <li className="group flex-row-center text-grey hover:text-white transition-all cursor-pointer">
            <PhoneIcon className="w-3 h-3 mr-3 fill-grey group-hover:fill-white" />
            NADD living boutique
          </li>
        </ul>
      </div>
    </div>
  );
}
