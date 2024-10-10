import { navigation, placeholderImage } from "@/constants";
import { Product } from "@/types/Product";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

interface IProps extends Product {
  color?: "black" | "white";
}

export default function Card({
  _id,
  name,
  category,
  url,
  images,
  lqip,
  price,
  color,
}: IProps) {
  if (_id && name && category && url && images) {
    return (
      <div
        key={_id}
        className={
          "flex flex-col items-center justify-start w-[80vw] sm:w-[65vw] min-h-[185px] md:w-[25vw] min-[1080px]:w-[20vw] md:min-h-[225px] lg:min-h-[255px]"
        }
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
              blurDataURL={placeholderImage}
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
                  blurDataURL={placeholderImage}
                />
              </div>
            ) : null}
          </div>
        </Link>
        <div className="flex-col-center w-full my-4 gap-2">
          <h4
            className={`title-4 text-sm text-${
              color ?? "black"
            } w-full text-start`}
          >
            {name}
          </h4>
          <div className="flex justify-between items-end w-full">
            <h5 className={`capitalize text-xs text-${color ?? "black"}`}>
              {category.join(" - ")}
            </h5>
            <h4
              className={`text-sm font-bold flex flex-col justify-center items-end ${
                color ? `text-${color}/80` : "text-black/80"
              }`}
            >
              {"$" + formatPrice(price)}
            </h4>
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
}
