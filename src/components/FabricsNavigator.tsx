"use client";
import useFetch from "@/hooks/useFetch";
import { getFabrics } from "@/requests";
import React, { useEffect, useRef, useState } from "react";
import FabricDescription from "./FabricDescription";
import { Image as Img, Spin } from "antd";
import { Color } from "@/types/Fabric";
import Loader from "./Loader";
import { HiOutlineSwatch } from "react-icons/hi2";

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
      {isLoading ? (
        <div className="col-span-4 flex-col-center  min-h-[80vh] gap-5">
          <Loader color="black" size="large" />
          <p className="text-dark-grey">
            Cargando telas. Aguarde un instante...
          </p>
        </div>
      ) : data && data.length > 0 ? (
        <>
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
          <div
            className="col-span-3 min-h-[80vh] flex-col-center"
            ref={containerRef}
          >
            {data.map((i) => {
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
          {preview && (
            <div className="fixed z-[1000] flex-col-center w-screen h-screen top-0 left-0">
              <Spin size="large" />
            </div>
          )}
          <div style={{ display: "none" }}>
            <Img.PreviewGroup
              preview={{
                visible: preview,
                onVisibleChange: (visible) => setPreview(visible),
                current: activeColorIndex,
                onChange: (current) => setActiveColorIndex(current),
              }}
            >
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
        </>
      ) : (
        <div className="col-span-4 flex-col-center opacity-50 gap-5 min-h-[80vh]">
          <HiOutlineSwatch size={75} className="text-black" />
          <p className="text-lg text-center">No se encontraron resultados</p>
        </div>
      )}
    </div>
  );
}
