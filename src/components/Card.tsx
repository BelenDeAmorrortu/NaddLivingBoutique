import Image from "next/image";
import Link from "next/link";
import { Product } from "../../types/Product";

export default function Card({ _id, name, category, URL, images }: Product) {
  return (
    <div key={_id} className="flex-col-center my-6 m-2 md:m-4 lg:m-10">
      <Link href={`/productos/${URL}`}>
        {/* <figure
          className={`bg-[image:var(--first-image)] hover:bg-[image:var(--second-image)] focus:bg-[image:var(--second-image)] w-[160px] md:w-[200px] lg:w-[280px] aspect-[3/2] bg-cover bg-no-repeat bg-center rounded-sm transition-all duration-100`}
          style={{
            ["--first-image" as any]: `url(${images[0]})`,
            ["--second-image" as any]: `url(${
              images[1] ? images[1] : images[0]
            })`,
          }}
        /> */}
        <div className="w-[160px] md:w-[200px] lg:w-[280px] aspect-[3/2] overflow-hidden justify-center items-center flex">
          {images.length > 1 ? (
            <>
              <Image
                src={images[0]}
                alt={`Imagén de ${name}`}
                width={500}
                height={500}
                className="object-cover h-full rounded-sm"
              />
              <div className="absolute  transition-all duration-100 opacity-0 hover:opacity-100 w-[160px] md:w-[200px] lg:w-[280px] aspect-[3/2] overflow-hidden justify-center items-center flex">
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
