import React from 'react'
import Image from "next/image";
import { Download } from "lucide-react";
import { getFatwa, getFatwah, getPage, getSettings } from '@/helper/actions';
import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import Link from 'next/link';
import { getImageUrl } from '@/helper/getImageUrl';
import { FaLongArrowAltRight } from "react-icons/fa";


export default async function FatwahBox() {

 const fatwahs = await getFatwah();
  // const fatwahs = await getFatwa();
  const settings = await getSettings()
  const view_more = getMetaValueByMetaName(settings, "view_more") || "";
  const read_more = getMetaValueByMetaName(settings, "read_more") || "";
  const download = getMetaValueByMetaName(settings, "download") || "";
  const homePage = await getPage("home-sections-heading-management")
  const sections = homePage?.sections_on_api;
  const fatwah_ExtraData = sections.find((s) => s.title_slug === "fatwah");
  const image = getImageUrl(fatwah_ExtraData?.image_media)
 const fatwah_title_2 = fatwah_ExtraData?.custom_information.find((item) => item.label === "fatwah_title_2")
  return (

    <div className="  px-4 py-10 relative">

      {/* Top Section - Logo & Arabic Title */}
      <div className="max-w-7xl   mx-auto flex
         justify-between items-end mb-6">
        {/* Logo */}
        <div>
          <Image
            src="/images/fatwah/fatwahHeader.png"
            alt="Logo"
            width={160}
            height={181}
            className='hidden sm:flex'
          />
          <Image
            src="/images/fatwah/fatwahHeader.png"
            alt="Logo"
            width={110}
            height={80}
            className='flex sm:hidden'
          />
        </div>

        {/* Arabic Heading */}
        <div className=''>
          {/* for big screen */}
          <div className="hidden sm:flex  flex-col justify-end items-end gap-3 ">
            <Image
              src="/images/fatwah/fatwahArabicheader.png"
              alt="Logo"
              width={515}
              height={70}
            />
            <Image
              src="/images/fatwah/arabic3.png"
              alt="Logo"
              width={157}
              height={36}
            />
          </div>
          {/* for small screen */}
          <div className=" flex sm:hidden flex-col justify-end items-end gap-3 ">
            <Image
              src="/images/fatwah/fatwahArabicheader.png"
              alt="Logo"
              width={210}
              height={50}
            />
            <Image
              src="/images/fatwah/arabic3.png"
              alt="Logo"
              width={120}
              height={30}
            />
          </div>
        </div>


      </div>

      {/* Fatwah Content Box */}
      <div className="max-w-7xl  mx-auto relative gradient-bg-fatwah 
        rounded-2xl shadow-lg overflow-hidden p-4 md:p-12"

      >
        {/* Mosque Image Positioned at Bottom Right */}
        <div className="absolute bottom-0 right-0 w-[180px] md:w-[250px] lg:w-[400px]">
          <Image
            src="/images/fatwah/fatwahbg.png"
            alt="Mosque"
            width={400}
            height={400}
            className="object-contain pointer-events-none select-none"
          />
        </div>

        {/* Content Area */}
        <div className="relative  w-full lg:w-[70%] z-10 items-center">
          {/* heading */}
          <div className='flex justify-between mb-6 '>

            <div className="flex justify-between  gap-2 gradient-border_b mb-4 sm:mb-0 pb-3   ">

              <Image
                src="/images/fatwah/pen2.png"
                alt="Book Icon"
                width={65}
                height={53}
                className="mb-2"
              />
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
                <p> {fatwah_ExtraData?.sub_title} </p>
                <p>{fatwah_title_2?.value}</p>

              </div>
            </div>
       
            {/* arabic text */}
            <div className="flex gap-4 items-center">
              <Image
                src={image}
                alt='a1'
                width={186}
                height={50}
                className='w-[186px] h-[50px] hidden sm:flex'
              />

              <div className=' my-auto'>
                <Link 
                 href="/fatwah"
                className="px-5 sm:px-6 py-3  text-sm sm:text-base
                font-bold text-white border border-[#00401A] rounded-full bg-[#00401A]
                  hover:bg-[#00401A] hover:text-white transition-colors duration-400 cursor-pointer">
                  {view_more}
                </Link>
              </div>

            </div>

          </div>
          {/* List */}
          <ul className="space-y-4">
            {fatwahs?.data?.slice(0, 6).map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border bg-white
                   border-[#D9E2DD] p-1.5  rounded-full relative z-10"
              >
                {/* Left Content */}
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* icon */}
                  <div
                    className=" border border-[#E6ECE8] rounded-full p-1.5 md:p-2 "
                  >
                    <Image
                      src="/images/fatwah/pen.png"
                      alt="icon"
                      width={45}
                      height={45}
                      className='hidden sm:flex'
                    />
                    <Image
                      src="/images/fatwah/pen.png"
                      alt="icon"
                      width={40}
                      height={40}
                      className='flex sm:hidden'
                    />
                  </div>
                  <div>
                    <p className="text-[#00401A] truncate w-[110px] sm:w-[250px] md:w-[420px] 
                     text-sm md:text-lg font-bold">
                       {item?.description_en}
                    </p>
                    <Link
                       href={`/fatwah/${item?.id}`}
                      className="text-[#00401A] font-bold text-xs md:text-sm hover:text-[#F7BA2A] 
                      flex gap-1 items-center "
                    >
                      {read_more} 
                     <span className='mt-0.5'><FaLongArrowAltRight /></span>
                    </Link>
                  </div>
                </div>

                {/* Download Button */}
                <button className="flex items-center gap-2 px-4 md:px-5 py-3 cursor-pointer gradient-border3 
                  rounded-[100px] text-[#00401A] font-bold text-xs sm:text-sm md:text-lg ">
                  {download}
                  <Download className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
