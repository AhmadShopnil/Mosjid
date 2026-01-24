"use client";

import { getDay_Month_Year } from "@/helper/formateDate";
import { getMetaValueByMetaName, getMetaValueFromExtra_Fields } from "@/helper/metaHelpers";
import Image from "next/image";
import React, { useState, useMemo } from "react";

export default function SingleBookDetails({ book, settings }) {
  const [page, setPage] = useState(0);
  const [language, setLanguage] = useState("jp");

  const charsPerPage = 1200;

  // const day = getDay_Month_Year(book?.created_at, "day");
  // const month = getDay_Month_Year(book?.created_at, "month");
  // const year = getDay_Month_Year(book?.created_at, "year");

  const jpDescription = book?.description || "";
  const enDescription =
    getMetaValueFromExtra_Fields(book, "description_secondary_books") || "";

  const activeDescription =
    language === "en" && enDescription ? enDescription : jpDescription;

  /** HTML-safe pagination */
  const pages = useMemo(() => {
    if (!activeDescription) return [];
    const chunks = [];
    for (let i = 0; i < activeDescription.length; i += charsPerPage) {
      chunks.push(activeDescription.slice(i, i + charsPerPage));
    }
    return chunks;
  }, [activeDescription]);

  const currentPage = pages[page] || "";

  const company_email =
    getMetaValueByMetaName(settings, "company_email") || "";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start sm:items-center bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4 gap-3">
        <h4 className="text-lg sm:text-2xl font-semibold text-[#333333]">
          {book?.name}
        </h4>

        {/* Language Switch */}
        <div className="flex border rounded-full overflow-hidden">
          <button
            onClick={() => {
              setLanguage("jp");
              setPage(0);
            }}
            className={`px-4 py-1 text-sm font-medium cursor-pointer ${
              language === "jp"
                ? "bg-[#00401A] text-white"
                : "bg-white text-[#00401A]"
            }`}
          >
            日本語
          </button>
          <button
            onClick={() => {
              setLanguage("en");
              setPage(0);
            }}
            className={`px-4 py-1 text-sm font-medium cursor-pointer ${
              language === "en"
                ? "bg-[#00401A] text-white"
                : "bg-white text-[#00401A]"
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white flex flex-col sm:flex-row gap-4 md:gap-5 px-3 md:px-6 py-5 md:py-10">
        {/* Image */}
        <div className="relative rounded-[10px] w-full sm:w-[247px] h-[200px] sm:h-[215px] flex-shrink-0 overflow-hidden">
          <Image
            src={book?.featured_image}
            alt="book-image"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between w-full">
          <div className="px-1 overflow-hidden">
            {/* Optional date */}
            {/* <p className="text-xs text-gray-500 mb-2">
              {month} {day}, {year}
            </p> */}

            <div
              className="text-[#333333] text-sm sm:text-base leading-relaxed prose max-w-none"
              dangerouslySetInnerHTML={{ __html: currentPage }}
            />
          </div>

          {/* Pagination */}
          {pages.length > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className={`px-4 py-2 rounded-md border ${
                  page === 0
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "text-[#00401A] border-[#00401A] hover:bg-[#00401A] hover:text-white"
                }`}
              >
                ← Previous
              </button>

              <span className="text-xs sm:text-sm text-gray-600">
                Page {page + 1} of {pages.length}
              </span>

              <button
                onClick={() =>
                  setPage((p) => Math.min(p + 1, pages.length - 1))
                }
                disabled={page === pages.length - 1}
                className={`px-4 py-2 rounded-md border ${
                  page === pages.length - 1
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
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4">
        <p className="text-sm sm:text-lg font-medium break-all">
          Email: {company_email}
        </p>
        <a
          href="https://www.osakamasjid.org"
          className="text-sm sm:text-lg font-medium hover:underline break-all"
        >
          www.osakamasjid.org
        </a>
      </div>
    </div>
  );
}
