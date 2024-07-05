"use client";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "@/contexts/CartContext";
import CartItem from "./CartItem";
import { BsBag } from "react-icons/bs";
import { formatPrice } from "@/utils/formatPrice";
import { ICartItem } from "@/types/CartItem";

interface IProps {
  isOpen: boolean;
  close: () => void;
  items: ICartItem[];
  total: number;
  checkout: () => void;
}

export default function Cart({
  isOpen,
  close,
  items,
  total,
  checkout,
}: IProps) {
  return (
    <>
      <div
        className={`${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        } veil transition-opacity duration-75 delay-75`}
      ></div>
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } cart-sheet transition-transform duration-300`}
      >
        <div className="cart-sheet-header">
          <h3 className="text-black font-bold text-xl">CARRITO</h3>
          <button
            onClick={close}
            className=" border-none bg-transparent p-0 m-0"
            name="Cerrar"
            aria-label="Cerrar carrito"
          >
            <IoClose size={25} />
          </button>
        </div>
        <ul className={`cart-sheet-ul`}>
          {items?.length > 0 ? (
            items.map((p) => <CartItem {...p} />)
          ) : (
            <div className="flex-1 w-full flex-col-center opacity-50 gap-10">
              <BsBag size={50} className="text-black" />
              <p className=" text-base text-center">
                Aún no hay productos en su carrito
              </p>
            </div>
          )}
        </ul>
        <div className="cart-sheet-bottom">
          <h4 className="flex justify-between w-full h-fit ">
            <span className="font-bold">TOTAL:</span>
            <span>{"$" + formatPrice(String(total))}</span>
          </h4>
          <button
            className="contact-button w-full hover:bg-black hover:text-white transition-all duration-150"
            onClick={checkout}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}
