"use client";

import { getDay_Month_Year } from "@/helper/formateDate";
import {
  getMetaValueByMetaName,
  getMetaValueFromExtra_Fields,
} from "@/helper/metaHelpers";
import Image from "next/image";
import React, { useState, useMemo } from "react";

export default function SingleBlogDetailsCard({ blog, settings }) {
  const [language, setLanguage] = useState("jp");
  const [page, setPage] = useState(0);

  const charsPerPage = 1200;

  const day = getDay_Month_Year(blog?.created_at, "day");
  const month = getDay_Month_Year(blog?.created_at, "month");
  const year = getDay_Month_Year(blog?.created_at, "year");

  const blog_number = getMetaValueFromExtra_Fields(blog, "blog_number");
  const jpDescription = blog?.description || "";
  const enDescription =
    getMetaValueFromExtra_Fields(blog, "description_secondary") || "";

  const company_email =
    getMetaValueByMetaName(settings, "company_email") || "";

  /** Select description by language */
  const activeDescription =
    language === "en" && enDescription ? enDescription : jpDescription;

  /** Paginate HTML (WITHOUT removing tags) */
  const pages = useMemo(() => {
    if (!activeDescription) return [];
    const chunks = [];
    for (let i = 0; i < activeDescription.length; i += charsPerPage) {
      chunks.push(activeDescription.slice(i, i + charsPerPage));
    }
    return chunks;
  }, [activeDescription]);

  const currentPageContent = pages[page] || "";

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start sm:items-center bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4 gap-3">
        <h4 className="text-lg sm:text-2xl font-semibold text-[#333333]">
          {blog?.name}
        </h4>

        <div className="flex items-center gap-3">
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

          <div className="bg-[#00401A] text-white h-[40px] sm:h-[56px] rounded-[50px] px-5 flex items-center text-sm sm:text-base">
            Blog No {blog_number}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row gap-5 px-4 py-8">
        {/* Image */}
        <div className="relative w-full sm:w-[250px] h-[200px] sm:h-[220px] rounded-xl overflow-hidden">
          <Image
            src={blog?.featured_image}
            alt="blog-image"
            fill
            className="object-cover"
          />
        </div>

        {/* Description */}
        <div className="flex-1">
          <div className="flex justify-between border-b pb-2 mb-3 text-sm sm:text-base">
            <p>{blog?.sub_title}</p>
            <p>
              {month} {day}th, {year}
            </p>
          </div>

          <div
            className="prose max-w-none text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: currentPageContent }}
          />

          {/* Pagination */}
          {pages.length > 1 && (
            <div className="flex justify-between items-center mt-6 gap-3">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className={`px-4 py-2 rounded border ${
                  page === 0
                    ? "text-gray-400 border-gray-200"
                    : "text-[#00401A] border-[#00401A] hover:bg-[#00401A] hover:text-white"
                }`}
              >
                ← Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page + 1} of {pages.length}
              </span>

              <button
                disabled={page === pages.length - 1}
                onClick={() => setPage((p) => p + 1)}
                className={`px-4 py-2 rounded border ${
                  page === pages.length - 1
                    ? "text-gray-400 border-gray-200"
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
      <div className="flex flex-col md:flex-row justify-between bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4">
        <p className="text-sm sm:text-lg">Email: {company_email}</p>
        <a
          href="https://www.osakamasjid.org"
          className="text-sm sm:text-lg hover:underline"
        >
          www.osakamasjid.org
        </a>
      </div>
    </div>
  );
}
