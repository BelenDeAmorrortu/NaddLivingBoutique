"use client";
import { Form } from "antd";
import React from "react";
import CustomSelect from "./CustomSelect";
import CustomNumberInput from "./CustomNumberInput";
import { BsBagFill } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";

export default function AddToCartProductForm() {
  const [form] = Form.useForm();

  return (
    <Form form={form} className="w-full flex-col-center gap-5 my-5">
      <div className="flex flex-col min-[1200px]:flex-row items-center justify-between w-full h-fit gap-5">
        <Form.Item
          name={"color"}
          className="w-full h-fit"
          initialValue={"A elección"}
          style={{ margin: 0 }}
        >
          <CustomSelect
            prefix="Color"
            options={[{ value: "A elección", label: "A elección" }]}
            value={"A elección"}
            style={{ width: "100%" }}
            aria-label="Seleccionar Color"
          />
        </Form.Item>
        <Form.Item
          name="medida"
          className="w-full h-fit"
          initialValue={"Small"}
          style={{ margin: 0 }}
        >
          <CustomSelect
            prefix="Medida"
            options={[
              { value: "Small", label: "Small" },
              { value: "Medium", label: "Medium" },
              { value: "Large", label: "Large" },
            ]}
            value={"Small"}
            style={{ width: "100%" }}
            aria-label="Seleccionar medida"
          />
        </Form.Item>
      </div>
      <div className="flex flex-col min-[850px]:flex-row justify-start items-start min-[850px]:items-center w-full gap-4">
        <Form.Item
          name="cantidad"
          initialValue={1}
          className="h-fit"
          style={{ margin: 0 }}
        >
          <CustomNumberInput form={form} />
        </Form.Item>
        <div className="flex flex-col">
          <h5 className=" text-2xl font-extra-bold">
            $600.000<span className="text-xl ml-1">ARS</span>
          </h5>
          <h6 className="flex justify-center items-start text-red ">
            <CiCreditCard1 size={20} className="mr-1 mt-[2px]" />
            Hasta 3 cuotas sin interes
          </h6>
        </div>
        {/* <button className="flex flex-1 button-solid">
          <BsBagFill className={`w-4 h-4 mr-3 fill-white`} />
          Agregar al carrito
        </button> */}
      </div>
      <button className="flex flex-1 button-solid">
        <BsBagFill className={`w-4 h-4 mr-3 fill-white`} />
        Agregar al carrito
      </button>
    </Form>
  );
}
