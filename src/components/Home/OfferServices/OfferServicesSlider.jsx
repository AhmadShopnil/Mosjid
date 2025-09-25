"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CircleArrowOutUpRight, Download } from "lucide-react";
import Container from "@/components/Shared/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


const services = [
  { id: 1, name: "Daily 5 time prayers ", writer: "Writer Name", selected: false, image: "/images/offerServices/Daily 5 time prayers.png" },
  { id: 2, name: "Jumma Prayer", writer: "Writer Name", selected: true, image: "/images/offerServices/Jumma prayer.png" },
  { id: 3, name: "Eid Prayer", writer: "Writer Name", selected: false, image: "/images/offerServices/Eid prayers.png" },
  { id: 4, name: "Marriage facilities & certification", writer: "Writer Name", selected: false, image: "/images/offerServices/Marriage facilities & certification.png" },
  { id: 5, name: "Islamic library", writer: "Writer Name", selected: false, image: "/images/offerServices/Islamic library.png" },
  { id: 6, name: "Eid Prayer", writer: "Writer Name", selected: false, image: "/images/offerServices/Eid prayers.png" },
  { id: 7, name: "Marriage facilities & certification", writer: "Writer Name", selected: false, image: "/images/offerServices/Marriage facilities & certification.png" },
  { id: 8, name: "Islamic library", writer: "Writer Name", selected: false, image: "/images/offerServices/Islamic library.png" },

];

export default function OfferServicesSlider({services}) {



  const [hoveredCard, setHoveredCard] = useState(null);


  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);



  return (
    <div className="px-4 py-10">

      <div className="max-w-6xl  mx-auto ">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3">
              <Image
                src="/images/isamicBooks/bookIcon.png"
                alt="Book Icon"
                width={24}
                height={24}
              />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                <span className="text-[#DEA726]">Offered</span>{" "}
                <span className="text-green-700">Services</span>
              </h2>
            </div>

          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              src="/images/offerServices/arabictext.png"
              alt="Arabic text"
              width={160}
              height={50}
              className="object-contain hidden sm:flex"
            />
            <Image
              src="/images/offerServices/arabictext.png"
              alt="Arabic text"
              width={135}
              height={40}
              className="object-contain sm:hidden"
            />
            {/* <button className="border border-[#00401A] text-[#00401A]
               font-bold rounded-full px-5 py-2.5 text-sm sm:text-base cursor-pointer">
                Find More
              </button> */}
          </div>
        </div>

        {/* Service slider */}
        <div className="relative">
          {/* Swiper Slider */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              320: { slidesPerView: 1.8 },
              370: { slidesPerView: 2 },
              500: { slidesPerView: 2.3 },
              550: { slidesPerView: 3.3 },
              680: { slidesPerView: 3.6 },
              840: { slidesPerView: 4 },
              1024: { slidesPerView: 4.7 },
              1250: { slidesPerView: 5.4 },
              // 1424: { slidesPerView: 4 },
              // 1524: { slidesPerView: 4 },
            }}
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <div
                  className={`w-[150px] h-[250px] sm:w-[180px] sm:h-[300px] md:w-[210px] md:h-[340px]  relative flex flex-col 
                    items-center justify-between text-center rounded-full 
                    shadow-md bg-white mx-auto cursor-pointer
                    group hover:border hover:border-green-500 p-2 sm:p-3
                `}
                  onMouseEnter={() => setHoveredCard(service?.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="p-1.5 sm:p-3 rounded-full mt-2 sm:mt-4 bg-[#F8F8F8]">
                    <Image
                      src={service?.featured_image}
                      alt="Book"
                      width={100}
                      height={100}
                    />
                  </div>

                  <div className="flex flex-col items-center mt-2 sm:mt-4">
                    <p className="text -lg md:text-xl font-bold text-[#333333] leading-6 md:leading-8">{service?.name}</p>
                    {/* <p className="text-sm text-[#333333]">{service.writer}</p> */}
                  </div>

                  <div className="pb-4">

                    {/* details button */}
                    <button
                      className={`cursor-pointer  p-2 rounded-full  text-gray-300 
                        transition-colors duration-300
                         
                    `}
                    >
                      <Image
                        src={
                          hoveredCard === service.id
                            ? "/images/offerServices/hover.png"
                            : "/images/offerServices/1.png"
                        }
                        alt="Details Button"
                        width={50}
                        height={100}
                      />

                    </button>
                  </div>
                </div>

              </SwiperSlide>
            ))}
          </Swiper>

          {/* Left Arrow */}
          <button
            ref={prevRef}
            className="cursor-pointer  absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-green-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            ref={nextRef}
            className="cursor-pointer absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-green-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

    </div>
  )
}
