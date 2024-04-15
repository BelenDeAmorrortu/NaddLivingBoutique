"use client";
import { Form, FormInstance, InputNumber } from "antd";
import React, { useRef } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface IProps {
  form: FormInstance<any>;
}

export default function CustomNumberInput({ form }: IProps) {
  const inputRef = useRef(null);
  const cantidad = Form.useWatch("cantidad", form);

  return (
    <div className="flex justify-around items-center border-2 h-[43px] w-fit">
      <button
        className="h-full flex items-center justify-center bg-transparent outline-none border-none border-r-black border-2 mx-3"
        onClick={() => {
          if (cantidad > 1) {
            form.setFieldValue("cantidad", cantidad - 1);
          }
        }}
      >
        <AiOutlineMinus />
      </button>
      <InputNumber
        ref={inputRef}
        min={1}
        //defaultValue={1}
        controls={false}
        className="w-[25px] border-none outline-none p text-center"
        value={cantidad}
      />
      <button
        className="h-full flex items-center justify-center bg-transparent outline-none border-none border-l-black border border-2 mx-3"
        onClick={() => {
          form.setFieldValue("cantidad", cantidad + 1);
        }}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
}
