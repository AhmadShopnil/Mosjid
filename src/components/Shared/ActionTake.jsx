"use client";

import React from "react";
import Link from "next/link";

export default function ActionTake({
  application,
  openCancel,
  onFillForm,
  isFormFilled,
}) {
  const expired = isBookingExpired(
    application?.booked_date,
    application?.start_time,
    application?.end_time
  );

  // Certificate is available
  if (
    application?.form_status == 1 ||
    isFormFilled?.(application)
  ) {
    if (application?.download_status == 1) {
      return (
        <Link
          href={`/services/marriage-facilities/certificate-download/${application?.id}`}
          className="bg-[#52B920] hover:bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer inline-flex items-center gap-1 mx-auto"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Certificate
        </Link>
      );
    }

    return (
      <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
        Certificate Not Generated Yet
      </span>
    );
  }

  // Pending and not expired
  if (application?.status == 0 && !expired) {
    return (
      <button
        type="button"
        className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
        onClick={() => openCancel?.(application)}
      >
        Cancel
      </button>
    );
  }

  // Approved but form not filled and not expired
  if (
    application?.form_status == 0 &&
    application?.status == 1 &&
    !expired
  ) {
    return (
      <button
        type="button"
        onClick={() => onFillForm?.(application)}
        className="bg-[#52B920] hover:bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
      >
        Fill Form
      </button>
    );
  }

  return null;
}

const isBookingExpired = (bookedDate, startTime, endTime) => {
  if (!bookedDate || !startTime || !endTime) {
    return false;
  }

  const bookingEndDateTime = new Date(
    `${bookedDate}T${endTime}:00`
  );

  if (isNaN(bookingEndDateTime.getTime())) {
    return false;
  }

  return new Date() > bookingEndDateTime;
};