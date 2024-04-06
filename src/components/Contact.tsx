import { Contact1 } from "@/assets/images";
import Image from "next/image";
import ContactButtons from "./ContactButtons";

export default function Contact() {
  return (
    <section
      id="contacto"
      className="relative h-[55vh] w-full flex-center overflow-hidden"
    >
      <Image
        src={Contact1}
        alt="Imagén sillón Pistachio"
        fill
        placeholder="blur"
        className="object-cover brightness-50"
      />
      <div className="flex-col-center absolute w-full space-y-6">
        <h3 className="title-3 text-white my-3">Contacto</h3>
        <div className="w-[60vw] sm:w-[40vw]">
          <ContactButtons />
        </div>
      </div>
    </section>
  );
}
