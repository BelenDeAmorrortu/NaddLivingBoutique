import React from "react";
import Loader from "./Loader";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  solid?: boolean;
  color?: string;
  children: React.ReactNode;
  tailwindStyles?: string;
  loading?: boolean;
}

export default function Button({
  children,
  solid,
  color = "black",
  tailwindStyles,
  loading,
  ...rest
}: IProps) {
  return (
    <button
      className={`group/button flex flex-1 ${
        solid ? "button-solid" : "button-outline"
      } ${tailwindStyles ?? ""}`}
      style={
        {
          "--animation-color": `rgba(var(--${color}))`,
        } as React.CSSProperties
      }
      {...rest}
    >
      <div className="z-10 flex-row-center">
        {loading && color === "black" ? (
          <Loader
            size="xsmall"
            color={solid ? "white" : "black"}
            tailwindStyles="group-hover/button:invert invert-0"
          />
        ) : (
          children
        )}
      </div>
    </button>
  );
}
