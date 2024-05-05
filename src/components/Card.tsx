import { navigation } from "@/constants/navigation";
import { Product } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";

export default function Card({
  _id,
  name,
  category,
  url,
  images,
  lqip,
  price,
}: Product) {
  if (_id && name && category && url && images && lqip) {
    return (
      <div
        key={_id}
        className="flex flex-col items-center justify-start w-[80vw] min-h-[185px] min-[640px]:w-[25vw] min-[1080px]:w-[20vw] md:min-h-[225px] lg:min-h-[255px]"
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
        <div className="flex-col-center w-full my-4 gap-2">
          <div className="flex flex-col justify-start items-start w-full">
            <h4 className="title-4 text-sm">{name}</h4>
            {/* <h4 className="text-sm font-semi-bold flex justify-center items-end">
              {"$" + price}
            </h4>
            <h5 className="capitalize text-xs">{category.join(" - ")}</h5> */}
          </div>
          <div className="flex justify-between items-end w-full">
            <h5 className="capitalize text-xs">{category.join(" - ")}</h5>
            <h4 className="text-sm font-semi-bold flex flex-col justify-center items-end">
              $1.000.000
            </h4>
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
}
