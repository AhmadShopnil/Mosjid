"use client";

import { getMetaValueByMetaName, getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import { Download } from "lucide-react";
import Image from "next/image";
import React from "react";

const colorClasses = [
  "bg-red-50",
  "bg-green-50",
  "bg-blue-100",
  "bg-yellow-100",
  "bg-teal-100",
  "bg-orange-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-amber-100",
];

export default function BookCardInnerPage({ book, index = 0, settings,download_books_button }) {
  const read_more_button_text = getMetaValueByMetaName(settings, "read_more") || "";
  const colorClass = colorClasses[index % colorClasses.length];

  const writer_name_books = getMetaValueFromExtraFields(book, "writer_name_books");
  const published_date_books = getMetaValueFromExtraFields(book, "published_date_books");

  return (
    <div
      className={`borderDonationHome  flex flex-col md:flex-row md:space-x-4 bg-white/90 backdrop-blur-sm  p-4 sm:p-6
         rounded-[20px] shadow-md ${colorClass} `}
    >
      {/* Image Section */}
      <div className="flex justify-center md:justify-start mb-4 md:mb-0">
        <div className="relative w-[180px] h-[240px] sm:w-[200px] sm:h-[270px] md:w-[230px] md:h-[300px] 
        overflow-hidden rounded-[10px]  ">
          <Image
            src={book?.featured_image}
            alt={book?.name || "Book Image"}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 space-y-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm sm:text-base text-gray-900">
              <span className="font-medium">Book Name:</span>{" "}
              <span className="font-bold text-lg">{book?.name}</span>
            </p>
            <p className="text-sm sm:text-base text-gray-900">
              <span className="font-medium">Writer Name:</span>{" "}
              <span className="font-bold text-lg">{writer_name_books}</span>
            </p>
            <p className="text-sm sm:text-base text-gray-900">
              <span className="font-medium">Published Date:</span>{" "}
              <span className="font-bold text-lg">{published_date_books}</span>
            </p>
          </div>

          <button

            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full 
              border border-[#00401A] text-[#00401A] font-semibold text-sm sm:text-base 
              hover:bg-[#00401A] hover:text-white transition-colors duration-200 cursor-not-allowed"
          >
            {download_books_button?.value}
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-gray-900 text-lg font-bold mb-1">Summary / まとめ</h4>
          <div
            className="text-gray-700 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: book?.description }}
          />
        </div>
      </div>
    </div>
  );
}
