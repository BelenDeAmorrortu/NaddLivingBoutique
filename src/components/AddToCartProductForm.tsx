"use client";
import { Form } from "antd";
import React from "react";
import { BsBagFill } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import { formatPrice } from "@/utils/formatPrice";
import { Variant } from "@/types/Variant";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/Product";
import { Button, CustomSelect, CustomNumberInput } from "@/components";

interface IProps {
  product: Product;
}

export default function AddToCartProductForm({ product }: IProps) {
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);
  const amount = Form.useWatch("amount", form);

  const { addToCart } = useCart();

  const initialValues = {
    variant: product?.variants?.find((v: Variant) => v.price === product.price)
      .id,
    amount: 1,
    color: "A elección",
  };

  const sizeVariants = product?.variants?.map((v: Variant) => {
    return {
      value: v.id,
      label: v.title,
    };
  });

  const handleSubmit = async () => {
    await addToCart(
      product,
      product?.variants?.find((v: Variant) => v.id === variant),
      amount
    );
  };

  return (
    <Form
      form={form}
      className="w-full flex-col-center gap-5 my-5"
      initialValues={initialValues}
    >
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
          name="variant"
          className="w-full h-fit"
          style={{ margin: 0 }}
          required
        >
          <CustomSelect
            prefix="Modelo"
            options={sizeVariants}
            value={variant}
            onChange={(value) => form.setFieldValue("variant", value)}
            style={{ width: "100%" }}
            aria-label="Seleccionar modelo"
          />
        </Form.Item>
      </div>
      <div className="flex flex-col min-[850px]:flex-row justify-start items-start min-[850px]:items-center w-full gap-4">
        <Form.Item
          name="amount"
          initialValue={1}
          className="h-fit"
          style={{ margin: 0 }}
          required
        >
          <CustomNumberInput
            setValue={(value: number) => form.setFieldValue("amount", value)}
            value={amount}
            size="large"
          />
        </Form.Item>
        <div className="flex flex-col">
          <h5 className=" text-2xl font-extra-bold">
            {"$" +
              (variant && amount
                ? formatPrice(
                    String(
                      product.variants.find((v: Variant) => v.id === variant)
                        .price * amount
                    )
                  )
                : 0)}
            <span className="text-xl ml-1">ARS</span>
          </h5>
          <h6 className="flex justify-center items-start text-whatsapp ">
            <CiCreditCard1 size={20} className="mr-1 mt-[2px]" />
            Hasta 6 cuotas sin interes
          </h6>
        </div>
      </div>
      <Button onClick={handleSubmit} solid>
        <BsBagFill
          className={`w-4 h-4 mr-3 fill-white group-hover/button:fill-black transition-colors duration-75`}
        />
        Agregar al carrito
      </Button>
    </Form>
  );
}
