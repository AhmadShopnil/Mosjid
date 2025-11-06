"use client";

import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { getImageFromExtraFields, getMetaValueFromExtra_Fields, getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import Image from "next/image";

export default function HeroSectionMobileSlider({ sliders, read_more_button }) {
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

                        <div
                            className=" flex justify-center items-center  "
                        >
                            <Image
                                src={getImageFromExtraFields(slide, "slider_logo")}
                                // src="/images/bannerNew/logo2.png"
                                alt='img'
                                width={410}
                                height={310}
                                className="object-contain transition-all duration-300"
                            />
                        </div>


                        <div  className="flex justify-center items-center mt-4">
                            {/* <h3 className="text-3xl sm:text-4xl text-[#00401A] font-bold leading-snug">
                                {slide?.name}
                            </h3>
                            {slide?.sub_title && (
                                <p className="text-xl sm:text-2xl text-[#00401A] font-semibold leading-8 my-2">
                                    {slide?.sub_title}
                                </p>
                            )}
                            <p className="text-base text-[#001609] mb-6">
                                {getMetaValueFromExtraFields(
                                    slide,
                                    "short_description"
                                )}
                            </p> */}
                             {/* Button */}

                        <Link
                            href="/about"
                            className="inline-block bg-[#F7BA2A] px-5 py-2 sm:py-2.5 rounded-[10px] text-[#00401A] text-sm sm:text-base font-medium transition hover:bg-[#d9a11f]"
                        >
                            {read_more_button}
                        </Link>
                        </div>




                       

                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
