"use client";
import { Fabric, Color } from "@/types/Fabric";
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Divider, Image as Img } from "antd";

interface IProps {
  fabric: Fabric;
  setActiveFabric: (arg: string) => void;
  setPreview: (arg: boolean) => void;
  setSelectedFabricColors: (arg: Color[]) => void;
  setActiveColorIndex: (arg: number) => void;
}

function sortColors(colors: Color[]): Color[] {
  // Helper function to extract the base name of the color
  const getBaseName = (nombre: string): string => {
    const index = nombre.lastIndexOf("-");
    return index !== -1 ? nombre.substring(0, index).trim() : nombre.trim();
  };

  // Group colors by their base name
  const groupedColors: { [key: string]: Color[] } = colors.reduce(
    (acc, color: Color) => {
      const baseName = getBaseName(color?.nombre);
      if (!acc[baseName]) {
        acc[baseName] = [];
      }
      acc[baseName].push(color);
      return acc;
    },
    {} as { [key: string]: Color[] }
  );

  // Sort each group and combine the groups
  const sortedColors: Color[] = Object.values(groupedColors).reduce(
    (acc, group) => {
      group.sort((a, b) => a?.nombre?.localeCompare(b?.nombre));
      return acc.concat(group);
    },
    [] as Color[]
  );

  return sortedColors;
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
      <h3 className="title-2 text-4xl my-0">{fabric.nombre}</h3>
      <p className="text-dark-grey font-regular">{fabric.descripcion}</p>
      <div className="flex flex-row flex-wrap items-start gap-6">
        {fabric.colores.map((c, i) => {
          return (
            <div key={c.id} className="flex-col-center gap-3 max-w-[100px]">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                <Img
                  preview={{ visible: false }}
                  src={c.foto}
                  alt="Imagen ilustrativa del producto"
                  width={100}
                  height={100}
                  className="object-contain object-center"
                  onClick={() => {
                    setSelectedFabricColors(fabric.colores);
                    setPreview(true);
                    setActiveColorIndex(i);
                  }}
                  placeholder={
                    <Image
                      alt="Placeholder"
                      className="object-contain object-center"
                      width={100}
                      height={100}
                      src={c.foto + "?blur=500&px=16&auto=format"}
                      placeholder="blur"
                      blurDataURL={c.foto + "?blur=500&px=16&auto=format"}
                    />
                  }
                />
              </div>
              <h4 className="uppercase text-sm font-bold text-dark-grey text-center">
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
