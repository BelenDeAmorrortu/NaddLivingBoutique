"use client";
import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import CartItem from "./CartItem";
import { BsBag } from "react-icons/bs";
import { formatPrice } from "@/utils/formatPrice";
import { ICartItem } from "@/types/CartItem";
import { Form, Input } from "antd";
import { navigation } from "@/constants/navigation";
import Link from "next/link";

interface IProps {
  isOpen: boolean;
  close: () => void;
  items: ICartItem[];
  total: number;
  checkout: (fabric?: string) => void;
}

export default function Cart({
  isOpen,
  close,
  items,
  total,
  checkout,
}: IProps) {
  const cartRef = useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();

  const plural = items.length > 1 || items.some((i) => i.amount > 1);
  const fabricCTA = `¿Ya elegiste la${plural ? "s" : ""} tela${
    plural ? "s" : ""
  } y color${plural ? "es" : ""} de tu${plural ? "s" : ""} producto${
    plural ? "s" : ""
  }?`;

  useEffect(() => {
    // Listener to close the component when clicking outside of it
    const handleMouseDown = (e: any) => {
      if (
        !cartRef?.current?.contains(e.target) &&
        !e.target.closest(".ant-popconfirm")
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

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
        ref={cartRef}
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
        {items.length > 0 && (
          <Form form={form} className="w-full">
            <h5 className="text-sm font-bold my-2 w-full">
              Oberservaciones
              {/* <span className=" font-regular"> Comentanos abajo:</span> */}
            </h5>
            <Form.Item name={"fabric"}>
              <Input.TextArea
                className="h-[43px] w-full"
                size="small"
                id="cart-textarea"
                placeholder='EJ: tela pana lisa color "Azul/ Pan"'
              />
            </Form.Item>
          </Form>
        )}
        <div className="cart-sheet-bottom">
          <h4 className="flex justify-between w-full h-fit ">
            <span className="font-bold">TOTAL:</span>
            <span>{"$" + formatPrice(String(total))}</span>
          </h4>
          <button
            className="contact-button w-full hover:bg-black hover:text-white transition-all duration-150"
            onClick={() => {
              checkout(form.getFieldValue("fabric"));
            }}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}
