"use client";
import { Form } from "antd";
import React from "react";
import CustomSelect from "./CustomSelect";
import CustomNumberInput from "./CustomNumberInput";
import { BsBagFill } from "react-icons/bs";

export default function AddToCartProductForm() {
  const [form] = Form.useForm();

  return (
    <Form form={form} className="w-full flex-col-center gap-4 my-5">
      <div className="flex items-center justify-between w-full h-fit gap-3">
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
          />
        </Form.Item>
      </div>
      <div className="flex-row-center w-full">
        <Form.Item
          name="cantidad"
          initialValue={1}
          className="h-fit"
          style={{ margin: 0 }}
        >
          <CustomNumberInput form={form} />
        </Form.Item>
        <button className="flex flex-1 button-solid ml-3">
          <BsBagFill className={`w-4 h-4 mr-3 fill-white`} />
          Agregar al carrito
        </button>
      </div>
    </Form>
  );
}
