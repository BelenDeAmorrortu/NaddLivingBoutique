import { Fabrics2 } from "@/assets/images";
import { AnimatedIcon } from "@/components";
import FabricsNavigator from "@/components/FabricsNavigator";
import { navigation } from "@/constants";
import { getFabrics } from "@/requests";
import { CascadeReveal, Reveal } from "@/transitions";
import Image from "next/image";
import Link from "next/link";
import arrowDown from "react-useanimations/lib/arrowDown";

export async function generateMetadata() {
  return {
    title: "Telas",
    description:
      "En NADD Living Boutique nos encanta que cada cliente sea parte del proceso creativo de su próximo mueble. Por eso ofrecemos una gran variedad de telas para que tu mueble refleje tu estilo único.",
    alternates: {
      canonical: `/${navigation.telas}`,
    },
    openGraph: {
      title: "Telas",
      description:
        "En NADD Living Boutique nos encanta que cada cliente sea parte del proceso creativo de su próximo mueble. Por eso ofrecemos una gran variedad de telas para que tu mueble refleje tu estilo único.",
    },
  };
}

export default async function Page() {
  const fabrics = await getFabrics();

  return (
    <div className="h-fit pt-[92px]">
      <div className="h-fit md:h-[85vh] w-full">
        <Reveal tailwindStyles="flex-col-center px-10 gap-5 my-7">
          <h1 className="title-2 text-black text-center uppercase p-0 m-0">
            Descubrí nuestras telas
          </h1>
          <p className="md:max-w-[900px] text-center">
            En NADD Living Boutique nos encanta que cada cliente sea parte del
            proceso creativo de su próximo mueble. Por eso ofrecemos una gran
            variedad de telas para que tu mueble refleje tu estilo único.
          </p>
          <Link
            href={navigation.telas + "#telas"}
            className="capitalize  flex-row-center text-red font-bold text-lg w-fit hover:opacity-75 transition-opacity duration-100"
          >
            Continuar
            <AnimatedIcon
              animation={arrowDown}
              size={30}
              strokeColor="#B50706"
              className="ml-2"
            />
          </Link>
        </Reveal>
        <div className="photo-grid md:h-[57vh]">
          <CascadeReveal position={1} twStyles="photo-grid-item">
            <video
              className="absolute inset-0 w-full h-full object-cover object-bottom brightness-75"
              src="/antimanchas1.mp4"
              muted
              loop
              autoPlay
              placeholder=""
              preload="auto"
              controls={false}
            />
          </CascadeReveal>
          <CascadeReveal position={3} twStyles="photo-grid-item">
            <Image
              className="absolute inset-0 w-full h-full object-cover brightness-75"
              src={Fabrics2}
              alt="Description"
              placeholder="blur"
            />
          </CascadeReveal>
          <CascadeReveal position={5} twStyles="photo-grid-item">
            <video
              className="absolute inset-0 w-full h-full object-cover brightness-75"
              src="/antimanchas2.mp4"
              muted
              loop
              autoPlay
              placeholder=""
              preload="auto"
              controls={false}
            />
          </CascadeReveal>
        </div>
      </div>
      <FabricsNavigator fabrics={fabrics} />
    </div>
  );
}
