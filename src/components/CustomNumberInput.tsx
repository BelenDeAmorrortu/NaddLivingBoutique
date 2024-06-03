"use client";
import { Form, FormInstance, InputNumber, Popconfirm } from "antd";
import React, { useRef } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
interface IProps {
  setValue: (value: number) => void;
  value: number;
  size: "large" | "small";
  handleRemove?: () => void;
}

export default function CustomNumberInput({
  setValue,
  value,
  size,
  handleRemove,
}: IProps) {
  const inputRef = useRef(null);

  return (
    <Popconfirm
      title="Eliminar"
      description="¿Está seguro que desea eliminar el producto del carrito?"
      okText="Si, Eliminar"
      cancelText="No, Cancelar"
      disabled={!handleRemove && value > 1}
      onConfirm={handleRemove}
      icon={<MdDelete size={20} className="text-red flex-col-center mx-1" />}
    >
      <div
        className={`flex justify-around items-center border-2 w-fit`.concat(
          size === "large" ? " h-[43px]" : " h-[35px]"
        )}
      >
        <button
          className={"group h-full flex items-center justify-center bg-transparent outline-none border-none border-r-black border-2".concat(
            size === "large" ? " mx-3 " : " mx-1"
          )}
          onClick={(e) => {
            if (value > 1) {
              e.stopPropagation();
              setValue(value - 1);
            }
          }}
          name="Restar"
          aria-label="Restar"
        >
          <AiOutlineMinus
            className=" group-hover:fill-red fill-black transition-all duration-75"
            size={size === "large" ? undefined : 10}
          />
        </button>
        <InputNumber
          ref={inputRef}
          min={1}
          //defaultValue={1}
          controls={false}
          className={" border-none outline-none p text-center font-bold".concat(
            size === "large" ? " w-[80px]" : " w-[35px] h-[30px] text-sm"
          )}
          style={{ padding: "0px !important" }}
          value={value}
          aria-label="Cantidad"
          readOnly={true}
          onClick={(e) => e.stopPropagation()}
          // size={size === "large" ? undefined : "small"}
        />
        <button
          className={"group h-full flex items-center justify-center bg-transparent outline-none border-none border-l-black border-2".concat(
            size === "large" ? " mx-3 " : " mx-1"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setValue(value + 1);
          }}
          name="Sumar"
          aria-label="Sumar"
        >
          <AiOutlinePlus
            className="group-hover:fill-red fill-black transition-all duration-75"
            size={size === "large" ? undefined : 10}
          />
        </button>
      </div>
    </Popconfirm>
  );
}
