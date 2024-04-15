"use client";
import { sendWhatsappMessage } from "@/utils/sendWhatsappMessage";
import { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";

export default function Whatsapp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [firstDisplayExecuted, setFirstDisplayExecuted] = useState(false);

  const input = useRef<HTMLInputElement>(null);

  function onScroll() {
    window.scrollY > 10 ? setIsVisible(true) : setIsVisible(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isVisible && !firstDisplayExecuted) {
      setIsDialogVisible(true);
      setFirstDisplayExecuted(true);
      setTimeout(() => {
        setIsDialogVisible(false);
      }, 10000);
    }
  }, [isVisible]);

  const handleMessage = () => {
    console.log(input?.current?.value);
    if (input?.current?.value && input.current.value.trim() !== "") {
      sendWhatsappMessage(input.current.value);
    }
  };

  return (
    <div
      className={`whatsapp-container ${
        isDialogVisible ? "h-fit" : " h-10 w-10"
      }`}
    >
      <div
        className={`${
          isDialogVisible
            ? "-translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        } whatsapp-dialog`}
      >
        <div className="whatsapp-dialog-header">
          <div className="flex flex-col gap-1">
            <h4 className="text-white font-bold">Nadd Living Boutique</h4>
            <p className="text-white/80 font-regular text-xs p-0 m-0">
              +54 11 5346 3845
            </p>
          </div>
          <button
            className="border-none m-0 p-0 outline-none"
            onClick={() => setIsDialogVisible(false)}
          >
            <IoClose
              size={25}
              className="fill-white hover:fill-white-hover transition duration-75"
            />
          </button>
        </div>
        <div className="whatsapp-dialog-chat">
          <p className="whatsapp-dialog-message">
            Hola, mi nombre es Tomi. En que puedo ayudarte?
          </p>
        </div>
        <div className="whatsapp-dialog-bottom-bar">
          <input
            ref={input}
            className="whatsapp-dialog-text-input"
            placeholder="Escribe un mensaje..."
          />
          <button
            className="border-none m-0 p-0 outline-none"
            onClick={handleMessage}
          >
            <VscSend
              size={25}
              className="fill-black hover:fill-whatsapp transition-all duration-75"
            />
          </button>
        </div>
      </div>
      <button
        className="whatsapp-button"
        style={{ opacity: isVisible || isDialogVisible ? "1" : "0" }}
        onClick={() => setIsDialogVisible(!isDialogVisible)}
      >
        <FaWhatsapp size={25} className="fill-white" />
      </button>
    </div>
  );
}
