"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";

export default function BannerBottomSlider({ banners }) {
  return (
    <div className="relative w-full group">
      {/* Left Button */}
      <button className="banner-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 
        h-10 w-10 md:h-12 md:w-12 
        rounded-full bg-white/90 backdrop-blur 
        shadow-lg flex items-center justify-center
        text-gray-700 hover:bg-primary hover:text-yellow-600 cursor-pointer 
        transition-all duration-300 opacity-0 group-hover:opacity-100">
        <FaChevronLeft />
      </button>

      {/* Right Button */}
      <button className="banner-next absolute right-3 top-1/2 -translate-y-1/2 z-10 
        h-10 w-10 md:h-12 md:w-12 
        rounded-full bg-white/90 backdrop-blur 
        shadow-lg flex items-center justify-center
        text-gray-700 hover:bg-primary hover:text-yellow-600 cursor-pointer
        transition-all duration-300 opacity-0 group-hover:opacity-100">
        <FaChevronRight />
      </button>

      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".banner-next",
          prevEl: ".banner-prev",
        }}
        loop
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-xl overflow-hidden"
      >
        {banners?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-[180px] md:h-[220px] lg:h-[260px]">
              <Image
                src={banner.featured_image}
                alt={banner.title || "Banner"}
                fill
                className="object-fit"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
