"use client";
import { Form, Input, notification } from "antd";
import React, { useMemo, useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { Button, Loader } from "@/components";

const Context = React.createContext({
  name: "Default",
});

export default function ContactForm() {
  const [form] = Form.useForm();

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = form.getFieldsValue();
      const templateParams = {
        full_name: values.name,
        message: values.message,
        reply_to: values.email,
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
      );

      if (response.status === 200) {
        setLoading(false);
        api.success({
          description: "Recibirás una respuesta al mail dentro de 48 horas.",
          message: "Mensaje enviado",
          duration: 6000,
          placement: "topRight",
        });
        form.resetFields();
      } else {
        throw Error();
      }
    } catch {
      setLoading(false);
      api.error({
        message: "Error al enviar email",
        placement: "topRight",
        duration: 6000,
      });
    }
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <section
        className="h-fit w-full flex flex-col md:flex-row justify-center gap-20 py-10"
        id="contacto"
      >
        <div className="flex flex-1 h-full flex-col gap-5">
          <h3 className="title-3 uppercase text-black">¿Tenés una consulta?</h3>
          <p className="text-xl">
            Completá el formulario o escribinos en nuestras redes.
          </p>
          <ul className="flex flex-col gap-5">
            <li className="group">
              <a
                href="https://api.whatsapp.com/send?phone=541153463845"
                className="flex-row-center w-fit"
              >
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
            onFinish={handleSubmit}
          >
            <div className="flex-col-center md:flex-row md:items-baseline md:justify-center gap-5 w-full">
              <Form.Item
                name={"name"}
                className="w-full h-fit flex flex-col"
                style={{ margin: 0 }}
                required
                label="Nombre y apellido"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa tu nombre y apellido.",
                  },
                ]}
              >
                <Input placeholder="Nombre y apellido" />
              </Form.Item>
              <Form.Item
                name="email"
                className="w-full h-fit flex flex-col"
                style={{ margin: 0 }}
                required
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Por favor, ingresa tu email.",
                  },
                  {
                    pattern:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Email inválido.",
                  },
                ]}
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
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa un mensaje.",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Mensaje"
                autoSize
                size="large"
                className="ant-textarea"
              />
            </Form.Item>
            <Button tailwindStyles="w-full h-[42px]" solid type="submit">
              {loading ? <Loader color="white" size="xsmall" /> : "Enviar"}
            </Button>
          </Form>
        </div>
      </section>
    </Context.Provider>
  );
}
