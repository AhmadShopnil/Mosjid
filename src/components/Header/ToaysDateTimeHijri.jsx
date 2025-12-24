"use client";

import { useEffect, useState } from "react";

export default function ToaysDateTimeHijri({ location }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Hijri Date
  const hijriDate = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-[#00401A] min-w-[260px]">
      <span className="whitespace-nowrap">{hijriDate}</span>
      <span className="whitespace-nowrap">{time}</span>

      {location && (
        <span className="whitespace-nowrap">
          • {location.city}, {location.country}
        </span>
      )}
    </div>
  );
}
