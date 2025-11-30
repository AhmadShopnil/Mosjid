
"use client"

import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/helper/getImageUrl";
import { splitBySlash } from "@/helper/splitBySpace";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useState } from "react";
import DuaModal from "./DuaModal";

export default  function DuaBox({homePage,settings,duas}) {

  const [selectedDua, setSelectedDua] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sections = homePage?.sections_on_api;


  const dua_extraData = sections.find((s) => s.title_slug === "dua");

  const heading_part_1 = splitBySlash(dua_extraData?.title)[0];
  const heading_part_2 = splitBySlash(dua_extraData?.title)[1];

  const arabic_image = getImageUrl(dua_extraData?.image_media);
  const image_icon = getImageUrl(dua_extraData?.background_media);

  const find_more_dua_button = dua_extraData?.custom_information.find(
    (item) => item.label === "find_more_dua_button"
  );

  const read_more = getMetaValueByMetaName(settings, "read_more") || "";


  const handleOpenModal = (dua) => {
    setSelectedDua(dua);
    setIsModalOpen(true);
    console.log("from dua  modal",dua)
  };




  return (
    <div id="dua" className="px-4 py-12 relative">
      
     

      {/* MAIN BOX – matches Fatwah container */}
      <div
        className="max-w-7xl mx-auto relative gradient-bg-fatwah rounded-2xl 
        shadow-lg overflow-hidden p-4 md:p-12"
      >
        {/* Background Mosque Image (bottom-right like Fatwah) */}
        <div className="absolute bottom-0 right-0 w-[180px] md:w-[250px] lg:w-[380px] opacity-90 p-3">
          <Image
          src="/images/dua/Dua.svg"
              // src="/images/fatwah/fatwahbg.png"
            alt="Mosque"
            width={400}
            height={400}
            className="object-contain pointer-events-none select-none"
          />
        </div>

        {/* CONTENT AREA */}
        <div className="relative w-full lg:w-[70%] z-10">

          {/* heading */}
          <div className="flex justify-between mb-6">
            
            {/* Left side heading */}
            <div className="flex gap-2 gradient-border_b pb-3">
              <Image
                src={image_icon}
                alt="Book Icon"
                width={65}
                height={65}
              />
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
                <p>
                  <span className="text-[#F7BA2A]">{heading_part_1}</span>{" "}
                  {heading_part_2}
                </p>
                <p>{dua_extraData?.sub_title}</p>
              </div>
            </div>

            {/* Right side – Arabic + Button */}
            <div className="flex gap-4 items-center">
              <Image
                src={arabic_image}
                alt="arabic"
                width={150}
                height={45}
                className="hidden sm:flex"
              />

              <Link
                href="/dua"
                className="px-5 sm:px-6 py-3 text-sm sm:text-base
                font-bold text-white border border-[#00401A] rounded-full bg-[#00401A]
                hover:bg-[#00401A]/90 hover:text-white transition-colors duration-400 cursor-pointer"
              >
                {find_more_dua_button?.value}
              </Link>
            </div>
          </div>

          {/* DUA LIST – matches Fatwah list style */}
          <ul className="grid grid-cols-1  gap-4">
            {duas.map((dua) => (
              <li
                key={dua.id}
                className="flex justify-between items-center border bg-white
                border-[#D9E2DD] p-1.5 rounded-full relative z-10"
              >
                {/* Left side */}
                <div className="flex items-center gap-2 sm:gap-4">
                  
                  {/* Icon */}
                  <div className="border border-[#E6ECE8] bg-[#F2F2F2] 
                    rounded-full p-1.5 md:p-2">
                    <Image
                      src="/images/dua/icon.png"
                      alt="icon"
                      width={45}
                      height={45}
                      className="hidden sm:flex"
                    />
                    <Image
                      src="/images/dua/icon.png"
                      alt="icon"
                      width={32}
                      height={32}
                      className="flex sm:hidden"
                    />
                  </div>

                  {/* Title + Read More */}
                  <div>
                    <p className="text-[#00401A] truncate w-[110px] sm:w-[250px] md:w-[420px] 
                      text-sm md:text-lg font-bold">
                      {dua?.sub_title}
                    </p>

                    <button
                      // href={`/dua/${dua.id}`}
                       onClick={() => handleOpenModal(dua)}
                      className="text-[#00401A] font-bold text-xs md:text-sm hover:text-[#F7BA2A] 
                      flex gap-1 items-center cursor-pointer"
                    >
                      {read_more} 
                      <span className="mt-0.5">
                        <FaLongArrowAltRight />
                      </span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
        <DuaModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              dua={selectedDua}
            />
    </div>
  );
}
