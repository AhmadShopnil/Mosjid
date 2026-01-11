"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axiosInstance from "@/helper/axiosInstance";
import SocialShare from "../Shared/SocialShare";

// LabelBox component remains same
const LabelBox = ({ label, value }) => (
  <div
    className="flex flex-col items-start border border-[#E0E0E0] rounded-[10px] min-h-[50px] overflow-hidden"
  >
    <div className="w-full min-h-[50px] px-3 py-2 bg-[#e0e0e06d] flex items-center justify-between text-base text-[#000000]">
      <span>{label}</span>
    </div>
    <div className="flex-1 w-full px-3 py-2 text-[#333] break-words">
      {value || "-"}
    </div>
  </div>
);

export default function SelectedWordDetails({ selectedItem }) {
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedItem?.id) return; // No item selected

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get(
          `/dictionary/${selectedItem.id}`
        ); 
        setItemDetails(response?.data?.data); 
      } catch (err) {
        console.error(err);
        setError("Failed to fetch item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [selectedItem?.id]);

  if (!selectedItem) return null; // or a placeholder message

  console.log("items itemDetails",itemDetails)

  return (
    <div>
      <div className="gradient-border rounded-2xl p-4 sm:p-6 md:p-8 bg-white shadow-md relative">
        {/* Background Image */}
        <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/directory/bg2.png"
            alt="img"
            width={340}
            height={425}
            className="object-contain transition-all duration-300"
          />
        </div>

        <div className="bg-[#E5F5DE] h-[50px] flex items-center justify-center rounded-[8px] mb-6">
          <h2 className="text-center text-xl font-semibold text-[#00401A]">
            {itemDetails?.word_en || selectedItem?.word_en || "Details"}
          </h2>
        </div>

        {/* Loading / Error */}
        {loading && <p className="text-center text-[#555]">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && itemDetails && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side */}
              <div className="space-y-4">
                <LabelBox label="Japanese" value={itemDetails?.word_ja} />
                <LabelBox
                  label="Japanese Reading(kana)"
                  value={itemDetails?.pronunciation_ja}
                />
                <LabelBox
                  label="Romaji"
                  value={itemDetails?.romaji_ja}
                />
                <LabelBox label="Synonym" value={itemDetails?.synonyms_ja} />
              </div>

              {/* Right Side */}
              <div className="space-y-4">
                <LabelBox label="Arabic" value={itemDetails?.word_ar} />
                <LabelBox label="English" value={itemDetails?.word_en} />
                <LabelBox label="Usage" value={itemDetails?.usage_ja} />
                <LabelBox label="Antonym" value={itemDetails?.antonyms_ja} />
              </div>
            </div>

            <div className="mt-4">
              <LabelBox label="Explanation" value={itemDetails.explanation_ja} />
            </div>

            <div className="text-center mt-6 text-[#000000] text-xl md:text-2xl">
              www.osakamasjid.org
            </div>
          </>
        )}
      </div>

      {/* Social icons bottom */}
      <div className="py-4 flex justify-end items-center">
        <SocialShare />
      </div>
    </div>
  );
}
