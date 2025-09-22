"use client";

import Container from "@/components/Shared/Container";
import Image from "next/image";
import { useState } from "react";

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      src: "/images/gallery/1.png",
      alt: "Historic Islamic Building",
    },
    {
      id: 2,
      src: "/images/gallery/2.png",
      alt: "Dome of the Rock",
    },
    {
      id: 3,
      src: "/images/gallery/3.png",
      alt: "Blue Mosque",
    },
    {
      id: 4,
      src: "/images/gallery/1.png",
      alt: "Traditional Islamic Architecture",
    },
    {
      id: 5,
      src: "/images/gallery/5.png",
      alt: "Prophet's Mosque",
    },
    {
      id: 6,
      src: "/images/gallery/6.png",
      alt: "Sheikh Zayed Grand Mosque",
    },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <Container className="p-6 mt-6 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 gradient-border_b pb-3">
          <Image
            src="/images/gallery/icon.png"
            alt="gallery-icon"
            width={40}
            height={40}
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00401A]">
            Gallery
          </h1>
        </div>

         <button className="px-5 py-2 text-sm sm:text-base font-bold text-[#00401A] border border-[#00401A] rounded-full hover:bg-gray-100 transition-colors">
          View More
        </button>

      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* First column - tall image */}
        <div className="relative group cursor-pointer overflow-hidden rounded-lg h-[250px] sm:h-[300px] lg:h-[400px]">
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <ImageOverlay onClick={() => openModal(images[0])} />
        </div>

        {/* Second column - two stacked images */}
        <div className="flex flex-col gap-4">
          <div className="relative group cursor-pointer overflow-hidden rounded-lg h-[120px] sm:h-[140px] lg:h-[190px]">
            <img
              src={images[1].src}
              alt={images[1].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <ImageOverlay onClick={() => openModal(images[1])} />
          </div>
          <div className="relative group cursor-pointer overflow-hidden rounded-lg h-[120px] sm:h-[140px] lg:h-[190px]">
            <img
              src={images[2].src}
              alt={images[2].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <ImageOverlay onClick={() => openModal(images[2])} />
          </div>
        </div>

        {/* Third column - tall image */}
        <div className="relative group cursor-pointer overflow-hidden rounded-lg h-[250px] sm:h-[300px] lg:h-[400px]">
          <img
            src={images[3].src}
            alt={images[3].alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <ImageOverlay onClick={() => openModal(images[3])} />
        </div>

        {/* Fourth column - two stacked images */}
        <div className="flex flex-col gap-4">
          <div className="relative group cursor-pointer overflow-hidden rounded-lg h-[120px] sm:h-[140px] lg:h-[190px]">
            <img
              src={images[4].src}
              alt={images[4].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <ImageOverlay onClick={() => openModal(images[4])} />
          </div>
          <div className="relative group cursor-pointer overflow-hidden rounded-lg h-[120px] sm:h-[140px] lg:h-[190px]">
            <img
              src={images[5].src}
              alt={images[5].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <ImageOverlay onClick={() => openModal(images[5])} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full animate-in zoom-in-95 duration-300">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
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
        {/* Soft dark circular background behind the icon */}
        <div className="absolute inset-0 -m-4 rounded-full bg-black/30 backdrop-blur-[1px]"></div>

        {/* Eye icon */}
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
