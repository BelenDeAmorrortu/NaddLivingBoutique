import { navigation } from "@/utils/navigation";
import Image from "next/image";
import Link from "next/link";
import { sanityImage } from "../../sanity/sanity-utils";
import { Product } from "../../types/Product";

export default function Card({
  _id,
  name,
  category,
  url,
  images,
  lqip,
}: Product) {
  return (
    <div
      key={_id}
      className="flex flex-col items-center justify-start w-[160px] max-[370px]:w-[220px] min-h-[185px] md:w-[200px] md:min-h-[225px] lg:w-[250px] lg:min-h-[255px] my-6 m-2 md:m-4 lg:m-10"
    >
      <Link href={`${navigation.productos}/${url}`}>
        <div className="card-image">
          <Image
            src={images[0]}
            alt={`Imagén de ${name}`}
            width={500}
            height={500}
            className="object-cover h-full rounded-sm"
            placeholder="blur"
            blurDataURL={lqip[0]}
          />
          {images.length > 1 ? (
            <div className="card-image second-image absolute opacity-0 hover:opacity-100">
              <Image
                src={images[1]}
                alt={`Imagén de ${name}`}
                width={500}
                height={500}
                className="object-cover h-full rounded-sm"
                placeholder="blur"
                blurDataURL={lqip[1]}
              />
            </div>
          ) : null}
        </div>
      </Link>
      <h4 className="mt-4 mb-2 title-4 text-center">{name}</h4>
      <h5 className="capitalize text-xs">{category}</h5>
    </div>
  );
}
