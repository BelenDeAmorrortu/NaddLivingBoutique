import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  solid?: boolean;
  color?: string;
  children: React.ReactNode;
  tailwindStyles?: string;
}

export default function Button({
  children,
  solid,
  color = "black",
  tailwindStyles,
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
      <div className="z-10 flex-row-center">{children}</div>
    </button>
  );
}
