"use client";
import { useState, useEffect } from "react";
import UseAnimations from "react-useanimations";
import arrowUp from "react-useanimations/lib/arrowUp";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  function goToTop() {
    window.scrollTo(0, 0);
  }

  function onScroll() {
    window.scrollY > 10 && !isVisible
      ? setIsVisible(true)
      : setIsVisible(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className="z-10 fixed bottom-7 right-7 w-[50px] h-[50px] rounded-full bg-[#000] flex items-center justify-center hover:scale-105 transition-all duration-100"
      onClick={goToTop}
      style={{ opacity: isVisible ? "1" : "0" }}
      aria-label="Volver al inicio de la página"
      name="Subir"
    >
      <UseAnimations animation={arrowUp} loop={false} strokeColor="#ffff" />
    </button>
  );
}
