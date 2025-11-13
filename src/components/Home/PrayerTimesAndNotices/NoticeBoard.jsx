"use client"

import Link from "next/link";
import React, { useState } from "react";

import Image from "next/image";


import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import { splitBySlash, splitBySpace } from "@/helper/splitBySpace";
import { getImageUrl } from "@/helper/getImageUrl";
import NoticeCardHome from "./NoticeCardHome";
import NoticeDetailsModal from "@/components/Notice/NoticeModal";



export default function NoticeBoard({ settings, notices, homePage }) {

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const view_more = getMetaValueByMetaName(settings, "view_more") || "";
  const read_more = getMetaValueByMetaName(settings, "read_more") || "";

  // get notice extra data from home page section management
  const sections = homePage?.sections_on_api;
  const notice_Extra_data = sections.find((s) => s.title_slug === "notice-board");
  const heading_part_1 = splitBySlash(notice_Extra_data?.title)[0]
  const heading_part_2 = splitBySlash(notice_Extra_data?.title)[1]

   const icon = getImageUrl(notice_Extra_data?.background_media)
   
  // const notice_board_title_2 = notice_Extra_data?.custom_information.find((item) => item.label === "notice_board_title_2")


  const handleOpenModal = (notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };


  return (
    <div
    id="notices"
      className=" p-5 sm:p-8 bg-cover bg-center h-full gradient-border"
      style={{
        backgroundImage: "url('/images/home/noticeBg.png')",
      }}
    >
      <div
        className="absolute right-0 top-2/5"
      >
        <Image
          src="/images/notice/noticeBg.png"
          alt='img'
          width={60}
          height={160}
          className="object-contain transition-all duration-300"
        />
      </div>

      {/* heading */}
      <p className="text-sm mb-2 text-center sm:text-start ">{notice_Extra_data?.short_description}</p>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">

        <div className="flex items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3 ">

          <Image
            // src="/images/prayertimes/noticeicon2.png"
            src={icon}
            alt="Book Icon"
            width={55}
            height={73}
          />

          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
            <p><span >{heading_part_1} </span>
              <span className="text-[#F7BA2A]">{heading_part_2}</span>
            </p>
            <p>{notice_Extra_data?.sub_title}</p>

          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">

          <Link
            href="/notices"
            className="border border-[#00401A] text-[#001609] hover:bg-[#00401A] hover:text-white transition-colors duration-400
               font-bold rounded-full px-5 py-2.5 text-sm sm:text-base cursor-pointer">
            {view_more}
          </Link>
        </div>

      </div>



      {/* Notices List */}
      <ul className="space-y-3">
        {notices?.slice(0, 7).map((notice, i) => (
          <NoticeCardHome key={i} notice={notice} settings={settings} handleOpenModal={handleOpenModal} />
        ))}
      </ul>

      <NoticeDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notice={selectedNotice}
      />
    </div>
  );
}
