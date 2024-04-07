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
    <div
      className={`${
        isOpen ? "visible" : "invisible"
      } w-full h-screen bg-black-hover z-50 fixed top-0 left-0 flex justify-end items-start`}
    >
      <div className="w-[400px] h-screen px-5 bg-white flex flex-col justify-center items-start">
        <div className="w-full h-[65px] flex justify-between items-center border-b border-black">
          <h3 className="text-black font-bold text-xl">CARRITO</h3>
          <button
            onClick={close}
            className=" border-none bg-transparent p-0 m-0"
          >
            <IoClose size={25} />
          </button>
        </div>
        <ul className="flex w-full flex-1 flex-col justify-start items-start">
          <li className=" my-5 flex justify-between items-center w-full min-h-16 h-fit">
            <div
              className={`w-[100px] aspect-square overflow-hidden flex justify-center items-center`}
            >
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
        <div className="flex flex-col w-full justify-center items-center gap-5 py-5 border-t border-t-black">
          <h4 className="flex justify-between w-full h-fit ">
            <span className="font-bold">TOTAL:</span>
            <span>$1.600.000</span>
          </h4>
          <button className="contact-button w-full">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}
