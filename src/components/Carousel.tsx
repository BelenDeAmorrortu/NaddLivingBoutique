"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Image as Img } from "antd";
import Image from "next/image";
import { SwiperRef } from "swiper/react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Reveal } from "@/transitions";

type Props = {
  images: string[];
  lqip: string[];
};

export default function Carousel({ images, lqip }: Props) {
  const [activeIndex, setActiveIndex] = useState<any>(0);
  const [preview, setPreview] = useState<boolean>(false);

  const sliderRef = useRef<SwiperRef>(null);

  const handleNext = () => {
    if (sliderRef.current) {
      if (activeIndex < images.length - 1) {
        sliderRef.current.swiper.slideNext();
        setActiveIndex(activeIndex + 1);
      } else {
        sliderRef.current.swiper.slideTo(0);
        setActiveIndex(0);
      }
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      if (activeIndex > 0) {
        sliderRef.current.swiper.slidePrev();

        setActiveIndex(activeIndex - 1);
      } else {
        sliderRef.current.swiper.slideTo(images.length - 1);
        setActiveIndex(images.length - 1);
      }
    }
  };

  const handleNavigateTo = (current: number) => {
    if (sliderRef.current) {
      sliderRef.current.swiper.slideTo(current);
      setActiveIndex(current);
    }
  };

  return (
    <Reveal>
      <Swiper
        loop={true}
        ref={sliderRef}
        spaceBetween={10}
        navigation={false}
        modules={[Navigation]}
        grabCursor={true}
        className="w-full relative p-2"
      >
        {images &&
          images.map((image, index) => {
            return (
              <SwiperSlide key={index} className="swiperSlide">
                <div className="w-[90vw] h-[40vh] min-[500px]:h-[400px] md:w-[45vw] lg:w-[40vw] lg:h-[70vh] flex justify-center items-center">
                  <Img
                    key={index}
                    preview={{ visible: false }}
                    src={image}
                    alt="Imagen ilustrativa del producto"
                    width={1000}
                    height={1000}
                    className="object-contain object-center"
                    onClick={() => {
                      setPreview(true);
                    }}
                    placeholder={
                      <Image
                        alt="Placeholder"
                        className="object-contain object-center"
                        width={1000}
                        height={1000}
                        src={lqip[index]}
                        placeholder="blur"
                        blurDataURL={lqip[index]}
                      />
                    }
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div className="flex-row-center my-5">
        <button
          onClick={handlePrev}
          className="mx-3 border-none outline-none w-fit h-fit hover:scale-105 transition-transform cursor-pointer"
          aria-label="Anterior"
        >
          <IoChevronBack size={25} />
        </button>

        {images &&
          images.map((_, index) => {
            return (
              <button
                aria-label={`Imagen ${index + 1}`}
                key={index}
                className={`h-2 w-2 m-2 rounded-full outline-none ${
                  index === activeIndex
                    ? "bg-red border-none"
                    : "bg-transparent border-[1.5px] border border-black-hover"
                } hover:scale-110 transition-all duration-300`}
                onClick={() => handleNavigateTo(index)}
              ></button>
            );
          })}
        <button
          onClick={handleNext}
          className="mx-3 border-none outline-none w-fit h-fit hover:scale-105 transition-transform cursor-pointer"
          aria-label="Siguiente"
        >
          <IoChevronForward size={25} />
        </button>
      </div>
      <div style={{ display: "none" }}>
        <Img.PreviewGroup
          preview={{
            visible: preview,
            onVisibleChange: (visible) => setPreview(visible),
            current: activeIndex,
            onChange: (current) => handleNavigateTo(current),
          }}
        >
          {images &&
            images.map((image, i) => {
              return (
                <Img
                  src={image}
                  alt="Imagen ilustrativa del producto"
                  width={1000}
                  height={1000}
                  className="object-contain object-center"
                  key={i}
                />
              );
            })}
        </Img.PreviewGroup>
      </div>
    </Reveal>
  );
}
