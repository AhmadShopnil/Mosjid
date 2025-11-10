"use client";

import Container from "@/components/Shared/Container";
import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import SingleSlider from "./SingleSlider";


export default function HeroSectionSlider({ sliders, read_more_button }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);


  return (
    <section className="bg-green-50 h-[570px] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        onBeforeInit={(swiper) => {
          // Attach navigation refs before Swiper initializes
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="h-full w-full"
      >
        {sliders?.map((slide, index) => (
          <SwiperSlide key={index}>
           <SingleSlider slide={slide} read_more_button={read_more_button}/>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div
          ref={prevRef}
          className="custom-prev absolute top-1/2 left-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-[#F7BA2A] hover:text-white transition duration-300 cursor-pointer -translate-y-1/2"
        >
          <span className="text-xl font-bold"><MdKeyboardDoubleArrowLeft /></span>
        </div>

        <div
          ref={nextRef}
          className="custom-next absolute top-1/2 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-[#F7BA2A] hover:text-white transition duration-300 cursor-pointer -translate-y-1/2"
        >
          <span className="text-xl font-bold"><MdKeyboardDoubleArrowRight /></span>
        </div>
      </Swiper>
    </section>
  );
}
