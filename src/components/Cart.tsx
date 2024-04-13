"use client";
import { Sofas } from "@/assets/images";
import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";

interface IProps {
  isOpen: boolean;
  close: () => void;
}

export default function Cart({ isOpen, close }: IProps) {
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
          >
            <IoClose size={25} />
          </button>
        </div>
        <ul className={`cart-sheet-ul`}>
          <li className="cart-sheet-li">
            <div className={`cart-sheet-img`}>
              <Image
                src={Sofas}
                alt={`Imagén del Producto`}
                width={500}
                height={500}
                className={`object-cover h-full rounded-sm`}
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <h4 className=" font-bold uppercase text-base">
                Nombre producto
              </h4>
              <h4 className="uppercase text-xs">Color a eleccion</h4>
              <h4 className="uppercase text-xs">1.80m x 0.80m</h4>
              <h4 className="text-base font-bold">$1.600.000</h4>
            </div>
            <div>
              <AiFillDelete size={20} />
            </div>
          </li>
        </ul>
        <div className="cart-sheet-bottom">
          <h4 className="flex justify-between w-full h-fit ">
            <span className="font-bold">TOTAL:</span>
            <span>$1.600.000</span>
          </h4>
          <button className="contact-button w-full">CHECKOUT</button>
        </div>
      </div>
    </>
  );
}
