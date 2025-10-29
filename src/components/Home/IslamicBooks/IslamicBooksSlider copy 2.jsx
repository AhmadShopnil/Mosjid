"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

export default function IslamicBooksSlider({ books }) {
  const scrollRef = useRef(null);

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
    <div className="w-full max-w-[1780px] mx-auto py-12 bg-white relative">
      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* LEFT IMAGE */}
        <div className="w-full lg:w-[32%] flex h-full">
          <Image
            src="/images/isamicBooks/bookImage.png"
            alt="Islamic Illustration"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-[60%] relative">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
            <div>
              <div className="flex justify-between items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3">
                <Image
                  src="/images/isamicBooks/bookIcon.png"
                  alt="Book Icon"
                  width={55}
                  height={55}
                />

                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
                  <p>
                    <span className="text-[#F7BA2A]">Islamic</span> Books
                  </p>
                  <p>イスラム教の書籍</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/images/isamicBooks/arabic-islamicbooks.png"
                alt="Arabic text"
                width={160}
                height={50}
                className="object-contain hidden sm:flex"
              />
              <Image
                src="/images/isamicBooks/arabic-islamicbooks.png"
                alt="Arabic text"
                width={135}
                height={40}
                className="object-contain sm:hidden"
              />
              <button
                className="border border-[#00401A] text-[#00401A]
                font-bold rounded-full px-5 py-2.5 text-sm sm:text-base cursor-pointer
                hover:bg-[#00401A] hover:text-white transition-colors duration-400"
              >
                Find More Books
              </button>
            </div>
          </div>

          {/* CUSTOM BOOK SLIDER */}
          <div className="relative">
            {/* Scroll Container */}
            <div
              ref={scrollRef}
              className="flex justify-start gap-5 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-6"
            >
              {books.map((book) => (
                <div
                  key={book.id}
                  className={`snap-start flex-shrink-0 w-[150px] h-[250px] sm:w-[240px] sm:h-[380px] 
                    flex flex-col items-center justify-between text-center rounded-full 
                    shadow-md bg-white mx-auto cursor-pointer
                    group hover:border hover:border-green-500 `}
                >
                  <div className="p-4 sm:p-9 rounded-full mt-2 sm:mt-4 bg-[#F8F8F8]">
                    <Image
                      src={book?.featured_image || "/images/isamicBooks/bookIcon.png"}
                      alt={book?.name}
                      width={90}
                      height={90}
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-center mt-4">
                    <p className="text-lg sm:text-xl font-bold text-[#333333]">
                      {book?.name}
                    </p>
                    <p className="text-xs sm:text-sm text-[#333333]">{book?.sub_title}</p>
                  </div>

                  <div className="pb-4">
                    <button
                      className="cursor-pointer p-2 rounded-full border border-gray-300 text-gray-300
                      transition-colors duration-300 group-hover:border-orange-400 group-hover:text-orange-400"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-green-50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-green-50"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
