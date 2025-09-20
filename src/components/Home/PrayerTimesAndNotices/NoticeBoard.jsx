// components/NoticeBoard.tsx
import Link from "next/link";
import React from "react";
import { PageSearchPrayerTimesIcon } from "@/components/Icons/Dictionary";

const notices = [
  { date: "14 August 2025", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { date: "14 August 2025", text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { date: "14 August 2025", text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
  { date: "14 August 2025", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
  { date: "14 August 2025", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
];

export default function NoticeBoard() {
  return (
    <div
      className=" rounded-2xl p-5 bg-cover bg-center h-full gradient-border"
      style={{
        backgroundImage: "url('/images/home/noticeBg.png')",
      }}
    >
      {/* Last Update */}
      <p className="text-sm mb-2 text-gray-700">Last Update: 17 Aug 2015 at 9:30pm</p>

      {/* Header with Icon */}
      <div className="flex items-center gap-3 mb-4">
        <span>
          <PageSearchPrayerTimesIcon w={30} h={34} />
        </span>
        <h2 className="text-2xl font-bold text-[#00401A]">
          Notice <span className="text-yellow-400">Board</span>
        </h2>
      </div>

      {/* Notices List */}
      <ul className="space-y-3">
        {notices.map((notice, i) => (
          <li
            key={i}
            className="flex space-x-3 bg-white/90 backdrop-blur-sm border border-gray-300 p-2 rounded-md shadow-sm"
          >
            {/* Date Section */}
            <div className="w-16 text-center bg-gray-100 rounded-md p-2 leading-5">
              <p className="text-lg font-bold text-green-900 leading-4">
                {notice.date.split(" ")[0]}
              </p>
              <p className="text-xs text-green-900">{notice.date.split(" ")[1]}</p>
              <p className="text-xs text-green-900">{notice.date.split(" ")[2]}</p>
            </div>

            {/* Notice Text */}
            <div>
              <p className="text-green-800 text-sm">{notice.text}</p>
              <Link
                href={`/notice`}
                className="text-xs font-semibold text-gray-700 hover:text-green-800"
              >
                Read More --
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
