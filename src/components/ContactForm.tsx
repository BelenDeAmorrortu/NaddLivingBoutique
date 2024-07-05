"use client";
import { Form, Input, notification } from "antd";
import axios from "axios";
import React from "react";

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
    <div className="h-fit w-full flex-col-center p-20 gap-10">
      <h3 className="title-2 uppercase text-black">Contactanos</h3>
      <div className="h-fit w-full flex flex-row justify-center gap-20">
        <div className="flex-1 h-full max-h-[640px] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.350614541125!2d-58.431391824458764!3d-34.59529457295726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab9a1d5c4ad%3A0x74afd8399ecd97d3!2sNadd%20Living!5e0!3m2!1ses!2sar!4v1720029646904!5m2!1ses!2sar"
            width="100%"
            height="380"
            style={{ border: 0, position: "absolute" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* <p>Completa el formulario o escribinos en nuestras redes.</p> */}
        </div>
        <div className="flex-1 h-full">
          <Form
            form={form}
            className="w-full flex-col-center gap-5 my-5"
            initialValues={initialValues}
            layout="vertical"
          >
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

            <Form.Item
              name="message"
              className="w-full h-fit flex flex-col"
              style={{ margin: 0 }}
              required
              label="Mensaje"
            >
              <Input.TextArea placeholder="Mensaje" autoSize />
            </Form.Item>
            <button className="w-full button-solid" onClick={handleSubmit}>
              Enviar
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
