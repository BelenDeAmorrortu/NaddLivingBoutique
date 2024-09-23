import { Sofa } from "@/assets/images";
import Reveal from "@/transitions/Reveal";
import Image from "next/image";

export default function Banner() {
  return (
    <Reveal
      isSection
      tailwindStyles="flex flex-col md:flex-row justify-around items-center h-fit min-h-[65vh] w-full pb-10"
    >
      <div className="w-[90%] md:w-[40%] flex-center">
        <Image
          src={Sofa}
          alt="Ilustración Sofá"
          className=" brightness-110 w-[78%]"
        />
      </div>
      <div className="w-full md:w-[60%]">
        <h3 className="title-2 text-center md:text-left">
          Nuestro compromiso, la <span className="text-red">excelencia</span>.
        </h3>
        <p className="text-center md:text-left">
          Somos fabricantes de sillones de la más alta calidad, enfocados en el
          detallismo en cada pieza. Contamos con los mejores materiales y telas
          para garantizar{" "}
          <span className="text-red font-bold">resistencia</span>,{" "}
          <span className="text-red font-bold">durabilidad</span>,{" "}
          <span className="text-red font-bold">limpieza</span> y 
          <span className="text-red font-bold">confort</span> en cada sillón que
          producimos de manera artesanal y con los diseños más innovadores.
        </p>
      </div>
    </Reveal>
  );
}
