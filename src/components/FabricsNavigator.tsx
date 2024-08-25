"use client";
import useFetch from "@/hooks/useFetch";
import { getFabrics } from "@/requests";
import React, { useEffect, useRef, useState } from "react";
import FabricDescription from "./FabricDescription";
import { Image as Img } from "antd";
import { Color } from "@/types/Fabric";

export default function FabricsNavigator() {
  const [preview, setPreview] = useState<boolean>(false);
  const [selectedFabricColors, setSelectedFabricColors] = useState<Color[]>([]);
  const [activeColorIndex, setActiveColorIndex] = useState<any>(undefined);
  const [activeFabric, setActiveFabric] = useState<string>();
  const { data, isLoading } = useFetch(
    "fabrics",
    async () => await getFabrics()
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setActiveFabric(data[0].id);
    }
  }, [data]);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleNavigateTo = (id: string) => {
    setActiveFabric(id);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (
      selectedFabricColors &&
      typeof activeColorIndex === "number" &&
      preview
    ) {
      const timeOut = setTimeout(() => {
        const element = document.getElementsByClassName(
          "ant-image-preview-progress"
        )[0];
        if (element) {
          element.innerHTML = `<h3 class="ant-image-preview-progress text-lg uppercase font-bold z-50 text-black bg-white rounded-3xl py-2 px-5 transition-all duration-75">${
            selectedFabricColors.length > 0
              ? selectedFabricColors[activeColorIndex].nombre.replace(
                  " - ",
                  "/ "
                )
              : ""
          }</h3>`;
          element.className =
            "ant-image-preview-progress absolute bottom-[80vh]";
        }
        clearTimeout(timeOut);
      }, 100);
    }
  }, [selectedFabricColors, activeColorIndex, preview]);

  return (
    <div
      className="h-fit p-5 md:p-10 my-10 grid grid-cols-1 md:grid-cols-4"
      id="telas"
    >
      <div className="hidden md:flex h-[80vh] col-span-1 flex-col justify-center items-start lg:mx-5 gap-5 border-l border-l-black-hover sticky top-28">
        {data &&
          data.map((i) => {
            return (
              <button
                onClick={() => handleNavigateTo(i.id)}
                key={i.id}
                className={`${
                  activeFabric === i.id
                    ? "text-xl lg:text-2xl font-bold border-l-red border-l-4 -translate-x-[2px]"
                    : "text-lg lg:text-xl font-regular border-none"
                } px-5 transition-all duration-300 text-left`}
              >
                {i.nombre}
              </button>
            );
          })}
      </div>
      <div className="col-span-3" ref={containerRef}>
        {data &&
          data.map((i) => {
            return (
              <FabricDescription
                key={i.id}
                fabric={i}
                setPreview={setPreview}
                setActiveFabric={setActiveFabric}
                setSelectedFabricColors={setSelectedFabricColors}
                setActiveColorIndex={setActiveColorIndex}
              />
            );
          })}
      </div>
      <div style={{ display: "none" }}>
        <Img.PreviewGroup
          preview={{
            visible: preview,
            onVisibleChange: (visible) => setPreview(visible),
            current: activeColorIndex,
            onChange: (current) => setActiveColorIndex(current),
          }}
        >
          <h4 className="title-3 uppercase font-bold absolute z-50 top-16 text-white">
            {selectedFabricColors.length > 0 && activeColorIndex
              ? selectedFabricColors[activeColorIndex].nombre
              : ""}
          </h4>

          {selectedFabricColors.length > 0 &&
            selectedFabricColors.map((c) => {
              return (
                <Img
                  src={c.foto}
                  alt={c.nombre}
                  width={1000}
                  height={1000}
                  className="object-contain object-center"
                  key={c.id}
                />
              );
            })}
        </Img.PreviewGroup>
      </div>
    </div>
  );
}
