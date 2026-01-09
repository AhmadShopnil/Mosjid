"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { getDay_Month_Year } from "@/helper/formateDate";
import SocialShare from "../Shared/SocialShare";


export default function NoticeDetailsModal({
  isOpen,
  onClose,
  notice,
}) {
  if (!isOpen || !notice) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="view"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          {/* Date Box */}
          <div className="rounded-md w-[80px] h-[80px] flex flex-col items-center justify-center bg-[#F2F2F2] text-[#00401A]">
            <span className="text-3xl font-bold leading-tight">
              {getDay_Month_Year(notice?.created_at, "day")}
            </span>
            <span className="text-sm text-gray-600 leading-none">
              {getDay_Month_Year(notice?.created_at, "month")}
            </span>
            <span className="text-sm font-medium text-gray-500 leading-none">
              {getDay_Month_Year(notice?.created_at, "year")}
            </span>
          </div>

          {/* Title */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-[#00401A] leading-snug mb-1">
              {notice?.name}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div
          className="text-gray-700 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: notice?.description }}
        />

        {/* Divider + Icons */}
        <div className="border-t pt-4 flex items-center gap-3 text-[#D9E2DD]">
          <SocialShare />
        </div>
      </div>
    </div>
  );
}
