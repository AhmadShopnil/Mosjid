"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { splitBySlash, splitBySpace } from "@/helper/splitBySpace";
import { getImageUrl } from "@/helper/getImageUrl";

export default function OfferServicesSlider({ services, offered_services_ExtraData }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const scrollRef = useRef(null);

  const heading_part_1 = splitBySlash(offered_services_ExtraData?.title)[0];
  const heading_part_2 = splitBySlash(offered_services_ExtraData?.title)[1];
  const image = getImageUrl(offered_services_ExtraData?.image_media);
   const icon = getImageUrl(offered_services_ExtraData?.background_media);
  
 
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.7;
    scrollRef.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <div className="flex justify-between gap-2.5 gradient-border_b mb-4 sm:mb-0 pb-3 items-center">
            <Image
              // src="/images/offerServices/icon.png"
              src={icon}
              alt="Icon"
              width={60}
              height={64}
            />
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
              <p>
                <span className="text-[#F7BA2A]">{heading_part_1}</span> {heading_part_2}
              </p>
              <p>{offered_services_ExtraData?.sub_title}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Image
              src={image}
              alt="Arabic text"
              width={252}
              height={70}
              className="object-contain hidden sm:flex"
            />
            <Image
              src={image}
              alt="Arabic text"
              width={160}
              height={50}
              className="object-contain sm:hidden"
            />
          </div>
        </div>

        {/* Custom Horizontal Slider */}
        <div className="relative ">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-10  "
          >
            {services.map((service) => (
              <div
                key={service.id}
 className="snap-start flex-shrink-0 w-[150px] h-[250px] sm:w-[180px] sm:h-[300px] md:w-[195px] md:h-[360px] 
                  flex flex-col items-center justify-between text-center rounded-full shadow-xl bg-white mx-auto cursor-pointer
                  group islamicBookHome p-2 sm:p-3 "


                // className="snap-start flex-shrink-0 w-[150px] h-[250px] sm:w-[180px] sm:h-[300px] md:w-[195px] md:h-[360px] 
                //   flex flex-col items-center justify-between text-center rounded-full shadow-xl bg-white mx-auto cursor-pointer
                //   group hover:border hover:border-[#00FF1E] p-2 sm:p-3 "
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="p-1.5 sm:p-3 rounded-full mt-2 sm:mt-4 bg-[#F8F8F8]">
                  <Image
                    src={service?.featured_image}
                    alt={service?.name}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col items-center mt-2 sm:mt-4 px-3">
                  <p className="text-lg md:text-xl font-bold text-[#333333] leading-6 md:leading-8">
                    {service?.name}
                  </p>
                </div>

                <div className="pb-4">
                  <button className="cursor-pointer p-2 rounded-full transition-colors duration-300">
                    <Image
                      src={
                        hoveredCard === service.id
                          ? "/images/offerServices/hover.png"
                          : "/images/offerServices/1.png"
                      }
                      alt="Details Button"
                      width={50}
                      height={50}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-green-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-green-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
