"use client";
import { useInView } from "framer-motion";
import React, { useRef } from "react";

interface IProps {
  children: string;
  tailwindStyles?: string;
  highlightColor: string;
  textColor?: string;
}

export default function Highlight({
  children,
  highlightColor,
  textColor,
  tailwindStyles,
}: IProps) {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });
  return (
    <span
      ref={ref}
      className={`text-highlight`}
      data-text={children}
      style={
        {
          "--highlight-width": isInView ? "100%" : "0%",
          "--highlight-color": `rgba(var(--${highlightColor}))`,
          "--text-color": `rgba(var(--${textColor ?? "white"}))`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
