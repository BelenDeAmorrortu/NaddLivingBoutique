import { useCart } from "@/contexts/CartContext";
import { ICartItem } from "@/types/CartItem";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import React from "react";
import CustomNumberInput from "./CustomNumberInput";
import { navigation } from "@/constants";
import Link from "next/link";

export default function CartItem({
  name,
  image,
  variant,
  amount,
  _id,
  url,
}: ICartItem) {
  const { removeFromCart, updateAmount, setIsOpen } = useCart();

  return (
    <li className="cart-sheet-li" key={_id}>
      <div className={`cart-sheet-img`}>
        <Image
          src={image}
          alt={`Imagén del Producto`}
          width={500}
          height={500}
          className={`object-cover h-auto w-14 aspect-square md:w-auto rounded-sm`}
        />
      </div>
      <div className="w-3/5 md:max-w-[145px] flex flex-col justify-start items-start">
        <h4 className=" font-bold uppercase text-[12px] md:text-[14px]">
          {name}
        </h4>
        <h4 className="uppercase text-[8px] md:text-[11px] leading-tight">
          Color a eleccion
        </h4>
        <h4 className="uppercase text-[8px] md:text-[11px] leading-tight">
          {variant.title}
        </h4>
        <h4 className="text-sm uppercase md:text-[14px] font-bold">
          {"$" + formatPrice(String(variant.price * amount))}
        </h4>
      </div>
      <CustomNumberInput
        value={amount}
        setValue={(value) => updateAmount(_id, value)}
        handleRemove={() => removeFromCart(_id)}
        size="small"
      />
      <Link
        href={`${navigation.productos}/${url}`}
        className="absolute h-full w-[calc(100%-70px)] left-0"
        onClick={() => setIsOpen(false)}
      ></Link>
    </li>
  );
}
