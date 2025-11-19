"use client"

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import { splitBySlash } from "@/helper/splitBySpace";
import { getImageUrl } from "@/helper/getImageUrl";
import NoticeCardHome from "./NoticeCardHome";
import NoticeDetailsModal from "@/components/Notice/NoticeModal";

export default function NoticeBoard({ settings, notices, homePage }) {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const view_more = getMetaValueByMetaName(settings, "view_more") || "";

  const sections = homePage?.sections_on_api;
  const notice_Extra_data = sections.find((s) => s.title_slug === "notice-board");
  const heading_part_1 = splitBySlash(notice_Extra_data?.title)[0];
  const heading_part_2 = splitBySlash(notice_Extra_data?.title)[1];

  const icon = getImageUrl(notice_Extra_data?.background_media);

  const handleOpenModal = (notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  return (
    <div
      id="notices"
      className="p-5 sm:p-8 bg-cover bg-center h-full gradient-border"
      style={{ backgroundImage: "url('/images/home/noticeBg.png')" }}
    >
      {/* heading */}
      <p className="text-sm mb-2 text-center sm:text-start">
        {notice_Extra_data?.short_description}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3">
          <Image src={icon} alt="Book Icon" width={56} height={72} />
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
            <p>
              <span>{heading_part_1} </span>
              <span className="text-[#F7BA2A]">{heading_part_2}</span>
            </p>
            <p>{notice_Extra_data?.sub_title}</p>
          </div>
        </div>

        <Link
          href="/notices"
          className="border border-[#00401A] text-[#001609] hover:bg-[#00401A] hover:text-white 
          transition-colors duration-400 font-bold rounded-full px-5 py-2.5 text-sm sm:text-base cursor-pointer"
        >
          {view_more}
        </Link>
      </div>

      {/* Notices List with Scroll Triggered Animation */}
      <div className="space-y-3">
        {notices?.slice(0, 7).map((notice, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}          // Start below
            whileInView={{ opacity: 1, y: 0 }}      // Animate to visible
            viewport={{ once: true, amount: 0.2 }}  // Trigger when 20% visible, animate once
            transition={{
              duration: 0.5,
              delay: i * 0.15,                      // Stagger effect
              ease: "easeOut",
            }}
          >
            <NoticeCardHome
              notice={notice}
              settings={settings}
              handleOpenModal={handleOpenModal}
            />
          </motion.div>
        ))}
      </div>

      <NoticeDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notice={selectedNotice}
      />
    </div>
  );
}
