// components/NoticeBoard.tsx
import Link from "next/link";
import React from "react";
import { PageSearchPrayerTimesIcon } from "@/components/Icons/Dictionary";
import Image from "next/image";
import { getNotices, getPage, getSettings } from "@/helper/actions";
import { getDay_Month_Year } from "@/helper/formateDate";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import { splitBySpace } from "@/helper/splitBySpace";



export default async function NoticeBoard() {
  const notices = await getNotices();
  const settings = await getSettings()
  const view_more = getMetaValueByMetaName(settings, "view_more") || "";
  
  // get notice extra data from home page section management
  const homePage = await getPage("home-sections-heading-management")
  const sections = homePage?.sections_on_api;
  const notice_heading = sections.find((s) => s.title_slug === "notice-board");
  const heading_part_1 = splitBySpace(notice_heading?.sub_title)[0]
  const heading_part_2 = splitBySpace(notice_heading?.sub_title)[1]




  // console.log("string",string)

  return (
    <div
      className=" rounded-2xl p-5 sm:p-8 bg-cover bg-center h-full gradient-border"
      style={{
        backgroundImage: "url('/images/home/noticeBg.png')",
      }}
    >
      {/* heading */}
      <p className="text-sm mb-2 text-center sm:text-start ">Last Update: 17 Aug 2015 at 9:30pm</p>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">

        <div className="flex items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3">
          <Image
            src="/images/prayertimes/noticeicon.png"
            alt="Book Icon"
            width={35}
            height={24}
          />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
            {heading_part_1} <span className="text-yellow-400"> {heading_part_2}</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">

          <button className="border border-[#00401A] text-[#00401A]
               font-bold rounded-full px-5 py-2.5 text-sm sm:text-base cursor-pointer">
            {view_more}
          </button>
        </div>

      </div>



      {/* Notices List */}
      <ul className="space-y-3">
        {notices?.slice(0,6).map((notice, i) => (


          <li
            key={i}
            className="flex space-x-3 bg-white/90 backdrop-blur-sm border border-gray-300 p-2 rounded-md shadow-sm"
          >

            {/* Date Section */}
            <div className="w-16 text-center bg-gray-100 rounded-md p-2 leading-5">
              <p className="text-lg font-bold text-green-900 leading-4">

                {getDay_Month_Year(notice?.created_at, "day")}
              </p>
              <p className="text-xs text-green-900"> {getDay_Month_Year(notice?.created_at, "month")}</p>
              <p className="text-xs text-green-900"> {getDay_Month_Year(notice?.created_at, "year")}</p>
            </div>

            {/* Notice Text */}
            <div>
              <p className="text-green-800 text-sm">{notice?.name}</p>
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
