"use client";

import Container from "@/components/Shared/Container";
import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function HeroSectionSlider({ sliders,read_more_button }) {
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
            <div className="relative h-full w-full">
              {/* Full-width Banner Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={
                   slide?.featured_image ||
                    "/images/banner/ban1.png"
                  }
                  alt={slide?.name || "Hero Banner"}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Content on top of the banner */}
              <Container className="relative flex h-full">
                <div className="absolute top-1/4 w-[40%] min-h-[280px] flex flex-col justify-between ">
                <div>
                    <h3 className="text-2xl 2xl:text-4xl text-[#00401A] font-bold leading-12">
                    {slide?.name}
                  </h3>
                  <p className="text-lg 2xl:text-2xl text-[#00401A] font-bold leading-10 my-2">
                    {slide?.sub_title}
                  </p>
                  <p className="text-base text-[#001609] mb-10">
                    {getMetaValueFromExtraFields(slide, "short_description")}
                  </p>
                </div>
                  <Link
                    href="/about"
                    className="bg-[#F7BA2A] px-5 py-4 rounded-[10px] text-[#00401A] text-xl font-semibold w-[148px]
                    h-[60px]"
                  >
                    {read_more_button}
                  </Link>
                </div>
              </Container>
            </div>
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
