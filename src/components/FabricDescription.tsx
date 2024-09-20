"use client";
import { Fabric, Color } from "@/types/Fabric";
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Divider } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { placeholderImage } from "@/constants";

interface IProps {
  fabric: Fabric;
  setActiveFabric: (arg: string) => void;
  setPreview: (arg: boolean) => void;
  setSelectedFabricColors: (arg: Color[]) => void;
  setActiveColorIndex: (arg: number) => void;
}

export default function FabricDescription({
  fabric,
  setActiveFabric,
  setPreview,
  setSelectedFabricColors,
  setActiveColorIndex,
}: IProps) {
  const ref = useRef(null);

  const isInView = useInView(ref, { margin: "0px 100px -50px 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveFabric(fabric.id);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      id={fabric.id}
      key={fabric.id}
      className="h-fit w-full my-10 min-h-[90vh] flex flex-col gap-6"
    >
      <h2 className="title-2 lg:text-4xl my-0">{fabric.nombre}</h2>
      <p className="text-dark-grey font-regular">{fabric.descripcion}</p>
      <div className="flex flex-row flex-wrap justify-center md:justify-start items-start gap-6">
        {fabric.colores.map((c, i) => {
          return (
            <div
              key={c.id}
              className="flex-col-center gap-3 max-w-[90px] md:max-w-[100px]"
            >
              <button
                className="relative group/color w-[90px] h-[90px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden"
                onClick={() => {
                  setSelectedFabricColors(fabric.colores);
                  setPreview(true);
                  setActiveColorIndex(i);
                }}
              >
                <Image
                  src={c.foto}
                  alt="Imagen ilustrativa del producto"
                  width={100}
                  height={100}
                  className="object-contain object-center"
                  placeholder="blur"
                  blurDataURL={placeholderImage}
                />
                <div className="opacity-0 group-hover/color:opacity-100 transition-opacity duration-75 absolute h-full w-full bg-black/50 flex-row-center top-0">
                  <EyeOutlined style={{ color: "white", fontSize: 18 }} />
                </div>
              </button>
              <h4 className="uppercase text-xs md:text-sm font-bold text-dark-grey text-center">
                {c.nombre.replace(" - ", "/ ")}
              </h4>
            </div>
          );
        })}
      </div>
      <Divider className=" self-end"></Divider>
    </motion.div>
  );
}
