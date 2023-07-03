import { navigation } from "@/utils/navigation";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../types/Product";

export default function Card({ _id, name, category, URL, images }: Product) {
  return (
    <div key={_id} className="flex-col-center my-6 m-2 md:m-4 lg:m-10">
      <Link href={`${navigation.productos}/${URL}`}>
        <div className="card-image">
          {images.length > 1 ? (
            <>
              <Image
                src={images[0]}
                alt={`Imagén de ${name}`}
                width={500}
                height={500}
                className="object-cover h-full rounded-sm"
              />
              <div className="card-image second-image absolute opacity-0 hover:opacity-100">
                <Image
                  src={images[1]}
                  alt={`Imagén de ${name}`}
                  width={500}
                  height={500}
                  className="object-cover h-full rounded-sm"
                />
              </div>
            </>
          ) : (
            <Image
              src={images[0]}
              alt={`Imagén de ${name}`}
              width={500}
              height={500}
              className="object-cover h-full rounded-sm"
            />
          )}
        </div>
      </Link>
      <h4 className="mt-4 mb-2 title-3">{name}</h4>
      <h5 className="capitalize text-xs">{category}</h5>
    </div>
  );
}
