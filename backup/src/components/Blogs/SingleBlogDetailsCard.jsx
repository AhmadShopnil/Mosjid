"use client";

import { getDay_Month_Year } from "@/helper/formateDate";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import Image from "next/image";
import React, { useState, useMemo } from "react";

export default function SingleBlogDetailsCard({ blog, settings }) {
  const [page, setPage] = useState(0);
  const charsPerPage = 1000; // Adjust page size

  const day = getDay_Month_Year(blog?.created_at, "day");
  const month = getDay_Month_Year(blog?.created_at, "month");
  const year = getDay_Month_Year(blog?.created_at, "year");

  // Split description into mock pages
  const descriptionParts = useMemo(() => {
    if (!blog?.description) return [];
    const cleanText = blog.description.replace(/<\/?[^>]+(>|$)/g, ""); // remove HTML tags for splitting
    const chunks = [];
    for (let i = 0; i < cleanText.length; i += charsPerPage) {
      chunks.push(cleanText.slice(i, i + charsPerPage));
    }
    return chunks;
  }, [blog?.description]);

  const currentPart = descriptionParts[page] || "";


  const company_email = getMetaValueByMetaName(settings, "company_email") || "";


  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex  justify-between items-start sm:items-center bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4 gap-2 sm:gap-0">
        <h4 className="text-lg sm:text-2xl font-semibold text-[#333333] leading-snug">
          {blog?.name}
        </h4>

        <div className="bg-[#00401A] text-white h-[40px] sm:h-[56px] rounded-[50px] px-5 sm:w-[168px] flex justify-center items-center text-sm sm:text-base md:text-[22px] whitespace-nowrap">
          <span>Blog No {blog?.id}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white flex flex-col sm:flex-row gap-4 md:gap-5 px-3 md:px-6 py-5 md:py-10">
        {/* Image */}
        <div className="relative rounded-[10px] w-full sm:w-[247px] h-[200px] sm:h-[215px] flex-shrink-0 overflow-hidden">
          <Image
            src={blog?.featured_image}
            alt="blog-image"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between w-full">
          <div className="px-1 overflow-hidden">
            <p className="text-[#333333] text-xs sm:text-sm mb-3 border-b pb-2 border-gray-200">
              {month} {day}th, {year}
            </p>

            <div
              className="text-[#333333] text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentPart }}
            />
          </div>

          {/* Pagination Controls */}
          {descriptionParts.length > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
                className={`w-full sm:w-auto px-4 py-2 rounded-md border text-sm sm:text-base transition ${page === 0
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-[#00401A] border-[#00401A] hover:bg-[#00401A] hover:text-white"
                  }`}
              >
                ← Previous
              </button>

              <span className="text-xs sm:text-sm text-gray-600">
                Page {page + 1} of {descriptionParts.length}
              </span>

              <button
                type="button"
                aria-label="Next"
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, descriptionParts.length - 1)
                  )
                }
                disabled={page === descriptionParts.length - 1}
                className={`w-full sm:w-auto px-4 py-2 rounded-md border text-sm sm:text-base transition ${page === descriptionParts.length - 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-[#00401A] border-[#00401A] hover:bg-[#00401A] hover:text-white"
                  }`}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2 bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4">
        <p className="text-[#000000] text-sm sm:text-lg md:text-xl font-medium hover:underline break-all">
          Email: {company_email}
        </p>
        <a
          href="https://www.osakamasjid.com"
          className="text-[#000000] text-sm sm:text-lg md:text-xl font-medium hover:underline break-all"
        >
          www.osakamasjid.org
        </a>
      </div>
    </div>
  );
}
