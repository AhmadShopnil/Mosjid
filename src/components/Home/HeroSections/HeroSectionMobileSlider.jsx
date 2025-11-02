"use client";

import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { getMetaValueFromExtra_Fields, getMetaValueFromExtraFields } from "@/helper/metaHelpers";

export default function HeroSectionMobileSlider({ sliders }) {
    if (!sliders || sliders.length === 0) {
        return <p className="text-center text-gray-500">No slides available</p>;
    }



    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="w-full"
        >
            {sliders.map((slide, index) => (
                <SwiperSlide key={index}>
                    <div className="bg-white px-4 py-10 ">
                        {/* Title */}
                        <h3 className="text-3xl sm:text-4xl text-[#00401A] font-bold leading-snug">
                            {slide?.name }
                        </h3>

                        {/* Subtitle */}
                        {slide?.sub_title && (
                            <p className="text-xl sm:text-2xl text-[#00401A] font-semibold leading-8 my-2">
                                {slide?.sub_title}
                            </p>
                        )}

                        {/* Description */}
                       
                            <p className="text-base text-[#001609] mb-6">
                                { getMetaValueFromExtraFields(
                                    slide,
                                    "short_description"
                                )}
                            </p>
                       

                        {/* Button */}
                     
                            <Link
                                href="/"
                                className="inline-block bg-[#F7BA2A] px-5 py-2 sm:py-2.5 rounded-xl text-white text-sm sm:text-base font-medium transition hover:bg-[#d9a11f]"
                            >
                                 Read more
                            </Link>
                   
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
