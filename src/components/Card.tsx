import { navigation } from "@/constants/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Card({
  _id,
  name,
  category,
  url,
  images,
  lqip,
}: IProps) {
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
        <h4 className="mt-4 mb-2 title-4 text-center">{name}</h4>
        <h5 className="capitalize text-xs">{category.join(" - ")}</h5>
      </div>
    );
  }
  return <div></div>;
}
