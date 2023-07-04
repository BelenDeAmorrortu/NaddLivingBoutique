"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Image as Img } from "antd";
import Image from "next/image";

type Props = {
  images: string[];
};

export default function Carousel({ images }: Props) {
  const [activeThumb, setActiveThumb] = useState<any>();
  const [preview, setPreview] = useState<boolean>(false);

  useEffect(() => {
    console.log("activeThumb", activeThumb);
  }, [activeThumb]);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className="w-full relative p-2"
        onSlideChange={(e) => setActiveThumb(e)}
      >
        {images &&
          images.map((image, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center"
              >
                <div className="w-[280px] min-[500px]:w-[300px] h-[300px] md:h-[350px] md:w-[350px] min-[880px]:w-[380px] lg:h-[400px] lg:w-[460px] min-[1243px]:w-[530px] flex justify-center items-center">
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
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        loop={true}
        spaceBetween={4}
        slidesPerView={6}
        modules={[Navigation, Thumbs]}
        className="my-5"
      >
        {images &&
          images.map((image, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center mx-4"
              >
                <Image
                  src={image}
                  alt="Imagen ilustrativa del producto"
                  width={1000}
                  height={1000}
                  className=" h-14 md:h-16 w-auto"
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
      <div style={{ display: "none" }}>
        <Img.PreviewGroup
          preview={{
            visible: preview,
            onVisibleChange: (visible) => setPreview(visible),
            current: activeThumb ? activeThumb.activeIndex : 0,
          }}
        >
          {images &&
            images.map((image, index) => {
              return (
                <Img
                  src={image}
                  alt="Imagen ilustrativa del producto"
                  width={1000}
                  height={1000}
                  className="object-contain object-center"
                />
              );
            })}
        </Img.PreviewGroup>
      </div>
    </>
  );
}
