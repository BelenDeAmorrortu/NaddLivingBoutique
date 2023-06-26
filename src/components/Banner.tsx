import { Sofa } from "@/assets/images";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center my-28 h-fit min-h-[65vh] w-screen">
      <div className="w-[90%] sm:w-[40%] flex-center">
        <Image
          src={Sofa}
          alt="Ilustración Sofá"
          className=" brightness-110 w-[78%]"
        />
      </div>
      <div className="w-[85%] sm:w-[50%]">
        <h3 className="title-2-secondary">
          Nuestro compromiso, la <span className="text-red">excelencia</span>.
        </h3>
        <p>
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
    </div>
  );
}
