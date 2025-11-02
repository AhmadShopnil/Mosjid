"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import BooksCarHome from "./BooksCarHome";

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
                  width={60}
                  height={64}
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
                width={171}
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
             <BooksCarHome   key={book.id} book={book} />
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
