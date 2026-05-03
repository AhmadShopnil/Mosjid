"use client";

import { useEffect, useState } from "react";

export default function TodaysDateTimeHijri({
  // timezone = "Asia/Dhaka",
  timezone = "Asia/Tokyo",
  location,
  showGregorian = false,
}) {
  const [time, setTime] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Time
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

      // Hijri Date
      const formattedHijri = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
        timeZone: timezone,
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now);

      // Gregorian Date
      const formattedGregorian = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now);

      setTime(formattedTime);
      setHijriDate(formattedHijri);
      setGregorianDate(formattedGregorian);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs xl:text-sm font-semibold text-[#00401A]">
      <span className="whitespace-nowrap">{hijriDate}</span>

      {showGregorian && (
        <>
          <span className="opacity-60">•</span>
          <span className="whitespace-nowrap">{gregorianDate}</span>
        </>
      )}

      <span className="opacity-60">•</span>
      <span className="whitespace-nowrap">{time}</span>

      {/* {location?.city && location?.country && (
        <>
          <span className="opacity-60">•</span>
          <span className="whitespace-nowrap">
            {location.city}, {location.country}
          </span>
        </>
      )} */}
    </div>
  );
}