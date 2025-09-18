"use client";
import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Container from "@/components/Shared/Container";

const books = [
  { id: 1, name: "Book Name", writer: "Writer Name", selected: false },
  { id: 2, name: "Book Name", writer: "Writer Name", selected: true },
  { id: 3, name: "Book Name", writer: "Writer Name", selected: false },
  { id: 4, name: "Book Name", writer: "Writer Name", selected: false },
];

export default function IslamicBooks() {
  return (
    <Container className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src="/images/isamicBooks/bookImage.png" 
            alt="Islamic Illustration"
            width={350}
            height={350}
            className="object-contain"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-2/3">
          {/* Top Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/isamicBooks/bookIcon.png" 
                  alt="Book Icon"
                  width={24}
                  height={24}
                />
                <h2 className="text-2xl font-semibold">
                  <span className="text-orange-500">Islamic</span>{" "}
                  <span className="text-green-700">Books</span>
                </h2>
              </div>
              <div className="h-[1px] bg-green-700 mt-1 w-20"></div>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src="/images/isamicBooks/arabic-islamicbooks.png" 
                alt="Arabic text"
                width={100}
                height={30}
                className="object-contain"
              />
              <button className="border border-green-700 text-green-700 rounded-full px-4 py-1 hover:bg-green-700 hover:text-white transition">
                Find More Books
              </button>
            </div>
          </div>

          {/* BOOK SLIDER */}
          <div className="relative">
            {/* Left Arrow */}
            <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-green-50">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Books List */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide px-8">
              {books.map((book) => (
                <div
                  key={book.id}
                  className={`relative flex flex-col  items-center justify-between text-center rounded-full shadow-md bg-white w-40 h-56 flex-shrink-0 border transition ${
                    book.selected ? "border-green-500" : "border-gray-100"
                  }`}
                >
                  <div className="pt-6">
                    <Image
                      src="/images/isamicBooks/bookIcon.png" 
                      alt="Book"
                      width={40}
                      height={40}
                    />
                  </div>

                  <div className="flex flex-col items-center mt-4">
                    <p className="text-sm font-semibold">{book.name}</p>
                    <p className="text-xs text-gray-500">{book.writer}</p>
                  </div>

                  <div className="pb-4">
                    <button
                      className={`p-2 rounded-full border ${
                        book.selected
                          ? "border-orange-400 text-orange-400"
                          : "border-gray-300 text-gray-300"
                      }`}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-green-50">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
