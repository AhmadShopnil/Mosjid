"use client";

import { getMetaValueFromExtra_Fields } from "@/helper/metaHelpers";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import SocialShare from "../Shared/SocialShare";

export default function SingleEventDetailsCard({ event }) {
  const [page, setPage] = useState(0);
  const charsPerPage = 300; // Adjust number of characters per "page"

  const day = getMetaValueFromExtra_Fields(event, "day");
  const month = getMetaValueFromExtra_Fields(event, "month");
  const time = getMetaValueFromExtra_Fields(event, "time");
  const year = getMetaValueFromExtra_Fields(event, "year");
  const location = getMetaValueFromExtra_Fields(event, "location");

  // Split long description into chunks
  const descriptionParts = useMemo(() => {
    if (!event?.description) return [];
    const cleanText = event.description.replace(/<\/?[^>]+(>|$)/g, ""); // remove tags for better split
    const chunks = [];
    for (let i = 0; i < cleanText.length; i += charsPerPage) {
      chunks.push(cleanText.slice(i, i + charsPerPage));
    }
    return chunks;
  }, [event?.description]);

  const currentPart = descriptionParts[page] || "";

  return (
    <div>
      {/* Event Card */}
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-3 p-5 sm:p-7 bg-white rounded-xl
       shadow-md overflow-hidden  gradient-border">
        {/* Left Column — Event Time */}
        <div className="col-span-1 flex  xl:flex-col  xl:items-start gap-4">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#000000]">
            Event Time <br />
            イベント時間
          </h4>

          <div className="bg-[#F2F2F2] rounded-md text-[#000000] w-[140px] 
          sm:w-[170px] h-[90px] sm:h-[100px] p-3 xl:mt-5 space-y-2 flex flex-col justify-center items-start">
            <div className="space-x-1">
              <span className="text-[#00401A] font-semibold text-2xl md:text-3xl">
                {day}
              </span>
              <span className="text-[#00401A] text-sm">{month}</span>
            </div>
            <p className="text-[#00401A] text-xs sm:text-sm">{time}</p>
          </div>
        </div>

        {/* Middle Column — Event Name + Description */}
        <div className="lg:col-span-3 flex flex-col justify-start">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#000000]">
            Event Name <br />
            イベント名
          </h4>

          <div className="mt-5 sm:mt-7">
            <h4 className="text-lg sm:text-xl text-[#52B920] font-semibold border-b border-gray-300 pb-2 mb-3">
              {event?.name}
            </h4>

            {/* Description */}
            <div
              className="text-[#333333] text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentPart }}
            />

            {/* Pagination Controls */}
            {descriptionParts.length > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                  className={`w-full sm:w-auto px-4 py-2 rounded-md border text-sm sm:text-base transition ${
                    page === 0
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
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(prev + 1, descriptionParts.length - 1)
                    )
                  }
                  disabled={page === descriptionParts.length - 1}
                  className={`w-full sm:w-auto px-4 py-2 rounded-md border text-sm sm:text-base transition ${
                    page === descriptionParts.length - 1
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

        {/* Right Column — Event Image */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="hidden sm:block h-[20%]"></div>

          <div className="w-full rounded-[10px] overflow-hidden h-[240px] sm:h-[300px] lg:h-[400px]">
            <Image
              src={event?.featured_image}
              alt="event-image"
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Footer (Social Share) */}
      <div className="mt-5">
        <SocialShare />
      </div>
    </div>
  );
}
