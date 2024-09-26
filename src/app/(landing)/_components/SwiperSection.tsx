"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

function SwiperSection() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="mt-10 md:mt-20 xl:mt-[160px]">
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{
          delay: 1500,
        }}
        speed={750}
        slidesPerView={3.5}
        spaceBetween={10}
        centeredSlides
        onSlideChange={() => {
          setToggle(!toggle);
        }}
        breakpoints={{
          768: {
            spaceBetween: 20,
            slidesPerView: 4.5,
          },
          1280: {
            spaceBetween: 30,
            slidesPerView: 5.1,
          },
          1440: {
            spaceBetween: 50,
            slidesPerView: 5.5,
          },
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <SwiperSlide key={String(index + 1)}>
            <div
              className={`relative aspect-square h-full ${index % 2 === (toggle ? 1 : 0) ? "opacity-15" : "opacity-100"} transition-opacity duration-700`}
            >
              <Image
                src={`/images/landingSwiper${(index % 4) + 1}.webp`}
                alt="슬라이드 이미지"
                fill
                sizes="max-width:100%"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperSection;
