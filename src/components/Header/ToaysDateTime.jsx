
"use client";

import { useEffect, useState } from "react";





export default function ToaysDateTime({ location }) {
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

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-[#00401A] min-w-[260px]">
      <span className="whitespace-nowrap">{today}</span>
      <span className="whitespace-nowrap">{time}</span>

      {location && (
        <span className="whitespace-nowrap">
          • {location.city}, {location.country}
        </span>
      )}
    </div>
  );
}
