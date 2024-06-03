import { useCart } from "@/contexts/CartContext";
import { ICartItem } from "@/types/CartItem";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import CustomNumberInput from "./CustomNumberInput";

export default function CartItem({
  name,
  image,
  variant,
  amount,
  _id,
}: ICartItem) {
  const { removeFromCart, updateAmount } = useCart();

  return (
    <li className="cart-sheet-li" key={_id}>
      <div className={`cart-sheet-img`}>
        <Image
          src={image}
          alt={`Imagén del Producto`}
          width={500}
          height={500}
          className={`object-cover h-full rounded-sm`}
        />
      </div>
      <div className="flex flex-col justify-start items-start gap-1">
        <h4 className=" font-bold uppercase text-sm md:text-base">{name}</h4>
        <h4 className="uppercase text-[10px] md:text-xs">Color a eleccion</h4>
        <h4 className="uppercase text-[10px] md:text-xs">
          {variant.title.split("/")[0]}
        </h4>
        <h4 className=" text-sm md:text-base font-bold">
          {"$" + formatPrice(String(variant.price * amount))}
        </h4>
      </div>
      <CustomNumberInput
        value={amount}
        setValue={(value) => updateAmount(_id, value)}
        handleRemove={() => removeFromCart(_id)}
        size="small"
      />
      {/* <button onClick={() => removeFromCart(_id)}>
        <AiFillDelete size={20} />
      </button> */}
    </li>
  );
}
