"use client";

import Container from "@/components/Shared/Container";
import { getImageUrl } from "@/helper/getImageUrl";
import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import { splitBySlash } from "@/helper/splitBySpace";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ImageGallery({
  gallery,
  img_gallery_Extradata,
  view_more_button_text,
}) {
  const images = transformGalleryData(gallery);

  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const showPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);


  const heading_part_1 = splitBySlash(img_gallery_Extradata?.title)[0];
  const heading_part_2 = splitBySlash(img_gallery_Extradata?.title)[1];
  const image = getImageUrl(img_gallery_Extradata?.image_media);
  const icon = getImageUrl(img_gallery_Extradata?.background_media);



  return (
    <Container className="p-6 mt-6 0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">

        <div className="flex justify-between items-center  gap-2.5 gradient-border_b mb-4 sm:mb-0 pb-3  ">
          <Image
            // src="/images/gallery/icon2.png"
            src={icon}
            alt="Book Icon"
            width={70}
            height={64}
            className=""
          />

          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
            <p><span >{heading_part_1} </span>
              <span className="text-[#F7BA2A]">{heading_part_2}</span>
            </p>
            <p>{img_gallery_Extradata?.sub_title}</p>

          </div>
        </div>


        <Link
          href="/gallery"
          className="px-5 py-2.5 text-sm sm:text-base font-bold text-[#001609] border border-[#00401A] rounded-full
          hover:bg-[#00401A] hover:text-white transition-colors duration-400 cursor-pointer">
          {view_more_button_text}
        </Link>
      </div>

      {/* Gallery Grid */}
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr_1.4fr] gap-6">
        {/* 1️⃣ First column - tall image */}
        <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-[600px]">
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <ImageOverlay onClick={() => openModal(0)} />
        </div>

        {/* 2️⃣ Second column - two stacked images */}
        <div className="flex flex-col gap-4 h-[600px]">
          <div className="relative group cursor-pointer overflow-hidden rounded-2xl flex-1">
            <img
              src={images[1].src}
              alt={images[1].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <ImageOverlay onClick={() => openModal(1)} />
          </div>
          <div className="relative group cursor-pointer overflow-hidden rounded-2xl flex-1">
            <img
              src={images[2].src}
              alt={images[2].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <ImageOverlay onClick={() => openModal(2)} />
          </div>
        </div>

        {/* 3️⃣ Third column - tall image */}
        <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-[600px]">
          <img
            src={images[3].src}
            alt={images[3].alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <ImageOverlay onClick={() => openModal(3)} />
        </div>

        {/* 4️⃣ Fourth column - two stacked images */}
        <div className="flex flex-col gap-4 h-[600px]">
          <div className="relative group cursor-pointer overflow-hidden rounded-2xl flex-1">
            <img
              src={images[4].src}
              alt={images[4].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <ImageOverlay onClick={() => openModal(4)} />
          </div>
          <div className="relative group cursor-pointer overflow-hidden rounded-2xl flex-1">
            <img
              src={images[5].src}
              alt={images[5].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <ImageOverlay onClick={() => openModal(5)} />
          </div>
        </div>
      </div>


      {/* Modal with slider */}
      {/* Modal with navigation (same style as InnerPage gallery) */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4 mt-22"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="relative flex items-center justify-center bg-white rounded-t-[20px]">
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-t-2xl"
              />

              {/* Close Button */}
              <button
                type="button"
                aria-label="close"
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full 
            px-3 py-1.5 transition-all duration-200 backdrop-blur-sm font-semibold"
              >
                ✕
              </button>

              {/* Prev Button */}
              <button
                type="button"
                aria-label="previous"
                onClick={showPrev}
                className="absolute -left-24 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Image
                  src="/images/others/arr_left.png"
                  alt="prev"
                  width={54}
                  height={54}
                />
              </button>

              {/* Next Button */}
              <button
                type="button"
                aria-label="next"
                onClick={showNext}
                className="absolute -right-24 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Image
                  src="/images/others/arr_right.png"
                  alt="next"
                  width={54}
                  height={54}
                />
              </button>
            </div>

            {/* Description Section */}
            <div className="bg-[#FFFFFF] w-full p-4 rounded-b-[20px] shadow-lg text-gray-800 text-center">
              <p className="text-sm leading-relaxed text-[#00401A]">
                {images[selectedIndex]?.description ||
                  "No Description"}
              </p>
            </div>

            {/* Social Share */}
            <div className="mt-4 flex justify-end w-full">
              <div className="flex items-center gap-6 text-[#D9E2DD]">
                <div className="border-r-2 border-gray-300 pr-3">
                  <Image src="/images/others/twiter.png" alt="" width={24} height={24} />
                </div>
                <div className="border-r-2 border-gray-300 pr-3">
                  <Image src="/images/others/fb.png" alt="" width={16} height={16} />
                </div>
                <div className="border-r-2 border-gray-300 pr-3">
                  <Image src="/images/others/whatsapp.png" alt="" width={21} height={21} />
                </div>
                <div className="border-r-2 border-gray-300 pr-3">
                  <Image
                    src="/images/others/printer_white.png"
                    alt=""
                    width={23}
                    height={23}
                  />
                </div>
                <div>
                  <Image
                    src="/images/others/download_white.png"
                    alt=""
                    width={23}
                    height={23}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </Container>
  );
}

/** Reusable overlay button */
function ImageOverlay({ onClick }) {
  return (
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
      <div
        className="relative opacity-0 group-hover:opacity-100 cursor-pointer transform hover:scale-110 transition-all duration-200"
        onClick={onClick}
      >
        <div className="absolute inset-0 -m-4 rounded-full bg-black/30 backdrop-blur-[1px]"></div>
        <svg
          className="relative w-6 h-6 text-[#F7BA2A] z-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>
    </div>
  );
}

export function transformGalleryData(apiData) {
  return apiData.map((item, index) => ({
    id: index + 1,
    src: item.featured_image || "/images/gallery/default.png",
    alt: item.name || "Gallery Image",
     description: getMetaValueFromExtraFields(item, "short_description_image_gallery")
  }));
}
