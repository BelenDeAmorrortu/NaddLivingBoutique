"use client";
import { Form, Input, notification } from "antd";
import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function ContactForm() {
  const [form] = Form.useForm();

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(values),
      }).then(() => {
        // Toast notification
        api.success({
          message: "Email enviado exitosamente",
          placement: "topRight",
        });
      });
    } catch {
      api.error({
        message: "Error al enviar email",
        placement: "topRight",
      });
    }
  };

  return (
    <section
      className="h-fit w-full flex flex-col md:flex-row justify-center gap-20 px-10 pb-20"
      id="contacto"
    >
      <div className="flex flex-1 h-full flex-col gap-5">
        <h3 className="title-3 uppercase text-black">¿Tenés una consulta?</h3>
        <p className="text-xl">
          Completá el formulario o escribinos en nuestras redes.
        </p>
        <ul className="flex flex-col gap-5">
          <li className="group">
            <a href="tel:1153463845" className="flex-row-center w-fit">
              <FaWhatsapp className="w-6 h-6 mr-3 fill-whatsapp" />
              {"(+54) 11 5346-3845"}
            </a>
          </li>
          <li className="group">
            <a
              target="_blank"
              href="https://www.instagram.com/nadd.living.boutique/"
              className="flex-row-center w-fit"
            >
              <FaInstagram className="w-6 h-6 mr-3 fill-instagram" />
              nadd.living.boutique
            </a>
          </li>
          <li className="group">
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100092571386435"
              className="flex-row-center w-fit"
            >
              <FaFacebook className="w-6 h-6 mr-3 fill-[#1877f2]" />
              NADD living boutique
            </a>
          </li>
        </ul>
      </div>
      <div className="contact-form flex-1 h-full">
        <Form
          form={form}
          className="w-full flex-col-center gap-5 my-5"
          initialValues={initialValues}
          layout="vertical"
        >
          <div className="flex-col-center md:flex-row-center gap-5 w-full">
            <Form.Item
              name={"name"}
              className="w-full h-fit flex flex-col"
              style={{ margin: 0 }}
              required
              label="Nombre y apellido"
            >
              <Input placeholder="Nombre y apellido" />
            </Form.Item>
            <Form.Item
              name="email"
              className="w-full h-fit flex flex-col"
              style={{ margin: 0 }}
              required
              label="Email"
            >
              <Input placeholder="Email" />
            </Form.Item>
          </div>

          <Form.Item
            name="message"
            className="w-full h-fit flex flex-col"
            style={{ margin: 0 }}
            required
            label="Mensaje"
          >
            <Input.TextArea
              placeholder="Mensaje"
              autoSize
              size="large"
              className="ant-textarea"
            />
          </Form.Item>
          <button className="w-full button-solid" onClick={handleSubmit}>
            Enviar
          </button>
        </Form>
      </div>
    </section>
  );
}
