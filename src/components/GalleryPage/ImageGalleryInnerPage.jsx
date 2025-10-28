"use client";

import Container from "@/components/Shared/Container";
import { useState, useEffect } from "react";

export default function ImageGalleryInnerPage({ gallery }) {
  const images = transformGalleryData(gallery);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  const showPrev = () =>
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const showNext = () =>
    setSelectedIndex((prev) => (prev + 1) % images.length);

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

  return (
    <div className=" mt-6">
      {/* Simple 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  w-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative group cursor-pointer overflow-hidden rounded-[10px] aspect-4/3"
            onClick={() => openModal(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <ImageOverlay />
          </div>
        ))}
      </div>

      {/* Modal with navigation */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
            >
              ✕
            </button>

            {/* Prev Button */}
            <button
              onClick={showPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
            >
              ◀
            </button>

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Overlay icon on hover */
function ImageOverlay() {
  return (
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
      <svg
        className="w-6 h-6 text-[#F7BA2A] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
  );
}

/** Transform gallery data */
export function transformGalleryData(apiData) {
  return apiData.map((item, index) => ({
    id: index + 1,
    src: item.featured_image || "/images/gallery/default.png",
    alt: item.name || "Gallery Image",
  }));
}
