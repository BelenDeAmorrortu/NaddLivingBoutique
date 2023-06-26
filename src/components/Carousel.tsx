"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type Props = {
  images: string[];
};

export default function Carousel({ images }: Props) {
  const [activeThumb, setActiveThumb] = useState();

  useEffect(() => {
    console.log("activeThumb", activeThumb);
  }, [activeThumb]);

  return (
    <>
      {/* <div>
        <span className="swiper-button-prev" onClick={() => {}} /> */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{ swiper: activeThumb }}
        className="h-[35vh] md:h-[45vh] lg:h-[55vh] w-full relative p-2"
      >
        {images &&
          images.map((image, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center"
              >
                <Image
                  src={image}
                  alt="Imagen ilustrativa del producto"
                  width={1000}
                  height={1000}
                  className=" h-full w-auto"
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
      {/* <span className="swiper-button-next" />
      </div> */}
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
                className="flex justify-center items-center mx-2"
              >
                <Image
                  src={image}
                  alt="Imagen ilustrativa del producto"
                  width={1000}
                  height={1000}
                  className=" h-14 md:h-16 lg:h-20 w-auto"
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
