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

type Props = {
  images: string[];
  lqip: string[];
};

export default function Carousel({ images, lqip }: Props) {
  const [activeThumb, setActiveThumb] = useState<any>();
  const [preview, setPreview] = useState<boolean>(false);

  const sliderRef = useRef<SwiperRef>(null);

  return (
    <>
      <Swiper
        loop={true}
        ref={sliderRef}
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
      <Swiper
        onSwiper={setActiveThumb}
        loop={true}
        spaceBetween={0}
        slidesPerView={7}
        modules={[Navigation, Thumbs]}
        className="my-5"
      >
        {images &&
          images.map((image, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center mx-2 md:mx-0"
              >
                <div className="h-14 md:h-16 w-16 md:w-20">
                  <Image
                    src={image}
                    alt="Imagen ilustrativa del producto"
                    width={1000}
                    height={1000}
                    className="object-cover h-full w-full"
                    placeholder="blur"
                    blurDataURL={lqip[index]}
                  />
                </div>
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
            onChange: (current) => sliderRef?.current?.swiper?.slideTo(current),
          }}
        >
          {images &&
            images.map((image) => {
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
