"use client";

import React from "react";

export default function GetStatusBadge({ app }) {
  const status = app?.status;

  const expired = isBookingExpired(
    app?.booked_date || app?.intended_date || app?.visit_date ,
    app?.start_time,
    app?.end_time
  );

  
  // console.log("status",app?.visit_date)
  if (status == 4 || status == "4"  ) {
  
    return (
      <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
        Cancelled
      </span>
    );
  }

  if (status == 2) {
    return (
      <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
        Rejected
      </span>
    );
  }

  if (expired && !app?.form_status == 1) {
    return (
      <span className="bg-yellow-100 text-red-500 text-xs font-semibold px-3 py-1 rounded-full">
        Expired
      </span>
    );
  }

  if (status == 1) {
    return (
      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
        Approved
      </span>
    );
  }

  return (
    <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
      Pending
    </span>
  );
}
export const isBookingExpired = (bookedDate, startTime = null, endTime = null) => {
  if (!bookedDate) return false;

  let expiryDateTime;

  if (endTime) {
    // Expire at the booking end time
    expiryDateTime = new Date(`${bookedDate}T${endTime}:00`);
  } else {
    // No time provided → expire at end of the booking day (23:59:59.999)
    expiryDateTime = new Date(`${bookedDate}T23:59:59.999`);
  }

  if (isNaN(expiryDateTime.getTime())) return false;

  return new Date() > expiryDateTime;
};


// old when only with start time nad end time
// const isBookingExpired = (bookedDate, startTime, endTime) => {
//   if (!bookedDate || !startTime || !endTime) {
//     return false;
//   }

//   const bookingEndDateTime = new Date(
//     `${bookedDate}T${endTime}:00`
//   );

//   if (isNaN(bookingEndDateTime.getTime())) {
//     return false;
//   }

//   return new Date() > bookingEndDateTime;
// };