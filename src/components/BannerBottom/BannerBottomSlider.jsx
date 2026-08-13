"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";

import {
  getImageFromExtraFields,
  getMetaValueFromExtraFields,
} from "@/helper/metaHelpers";

export default function BannerBottomSlider({ banners = [] }) {
  return (
    <div className="relative w-full group">
      {/* Previous Button */}
      <button
        type="button"
        aria-label="Previous banner"
        className="
          banner-prev
          absolute left-3 top-1/2 -translate-y-1/2 z-20

          flex
          h-9 w-9
          md:h-11 md:w-11

          items-center
          justify-center

          rounded-full
          bg-white/90
          backdrop-blur-sm

          text-gray-700
          shadow-lg

          transition-all
          duration-300

          hover:bg-primary
          hover:text-yellow-600

          cursor-pointer

          opacity-0
          group-hover:opacity-100

          focus:outline-none
          focus:ring-2
          focus:ring-primary
        "
      >
        <FaChevronLeft className="text-sm md:text-base" />
      </button>

      {/* Next Button */}
      <button
        type="button"
        aria-label="Next banner"
        className="
          banner-next
          absolute right-3 top-1/2 -translate-y-1/2 z-20

          flex
          h-9 w-9
          md:h-11 md:w-11

          items-center
          justify-center

          rounded-full
          bg-white/90
          backdrop-blur-sm

          text-gray-700
          shadow-lg

          transition-all
          duration-300

          hover:bg-primary
          hover:text-yellow-600

          cursor-pointer

          opacity-0
          group-hover:opacity-100

          focus:outline-none
          focus:ring-2
          focus:ring-primary
        "
      >
        <FaChevronRight className="text-sm md:text-base" />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Navigation]}
        autoHeight={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".banner-next",
          prevEl: ".banner-prev",
        }}
        loop={banners.length > 1}
        slidesPerView={1}
        spaceBetween={0}
        className="w-full overflow-hidden rounded-xl"
      >
        {banners.map((banner, index) => {
          const bannerLink =
            getMetaValueFromExtraFields(banner, "banner_link") || "/";

          // Desktop
          const desktopImage =
            getImageFromExtraFields(banner, "desktop_banner") ||
            banner?.featured_image ||
            "";

          // Tablet
          const tabletImage =
            getImageFromExtraFields(banner, "medium_image") ||
            desktopImage;

          // Mobile
          const mobileImage =
            getImageFromExtraFields(banner, "small_image") ||
            tabletImage ||
            desktopImage;

          // Skip if no image
          if (!desktopImage && !tabletImage && !mobileImage) {
            return null;
          }

          return (
            <SwiperSlide key={banner.id || index}>
              <Link
                href={bannerLink}
                className="block w-full"
                aria-label={banner.title || "Banner"}
              >
                <picture className="block w-full">
                  {/* Mobile */}
                  {mobileImage && (
                    <source
                      media="(max-width: 767px)"
                      srcSet={mobileImage}
                    />
                  )}

                  {/* Tablet */}
                  {tabletImage && (
                    <source
                      media="(min-width: 768px) and (max-width: 1199px)"
                      srcSet={tabletImage}
                    />
                  )}

                  {/* Desktop */}
                  <img
                    src={desktopImage}
                    alt={banner.title || "Banner"}
                    className="
                      block
                      w-full
                      h-auto
                      max-w-full
                    "
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                </picture>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}