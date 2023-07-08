"use client";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  input: string;
  setInput: (args: string) => void;
  props?: any;
}

export default function SearchInput({ input, setInput, props }: Props) {
  const [screenWidth, setScreenWidth] = useState<number>();

  useEffect(() => {
    window?.addEventListener("resize", () =>
      setScreenWidth(document.body.clientWidth)
    );

    () =>
      window?.removeEventListener("resize", () =>
        setScreenWidth(document.body.clientWidth)
      );
  }, []);

  return (
    <div className="flex justify-between items-align w-full">
      <button>
        <MagnifyingGlassIcon className="w-5 h-5 mr-3 stroke-white" />
      </button>
      <TextField
        {...props}
        variant="standard"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        InputProps={{
          ...props.InputProps,
          disableUnderline: true,
          style: {
            background: "transparent",
            color: "#f5f5f5",
            width: screenWidth && screenWidth < 500 ? "35vw" : "20vw",
          },
        }}
        placeholder="Buscar..."
        loading={true}
        loadingText="Cargando..."
        onBlur={() => setInput("")}
      />
    </div>
  );
}
