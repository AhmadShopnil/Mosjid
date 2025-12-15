import React from 'react'
import Image from "next/image";
import { getFatwah, getPage, getSettings } from '@/helper/actions';
import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import Link from 'next/link';
import { getImageUrl } from '@/helper/getImageUrl';
import FatwaListClient from './FatwaListClient';



export default async function FatwahBox() {
  const fatwahs = await getFatwah();
  const settings = await getSettings()
  const view_more = getMetaValueByMetaName(settings, "view_more") || "";
  const homePage = await getPage("home-sections-heading-management");
  const sections = homePage?.sections_on_api;
  const fatwah_ExtraData = sections.find((s) => s.title_slug === "fatwah");
  const fatwah_Top_header_ExtraData = sections.find((s) => s.title_slug === "fatwa-section-header");
  const image = getImageUrl(fatwah_ExtraData?.image_media)
  const penIcon = getImageUrl(fatwah_ExtraData?.background_media);
  const Arabic_header_image = getImageUrl(fatwah_Top_header_ExtraData?.image_media);
  const header_image = getImageUrl(fatwah_Top_header_ExtraData?.background_media);
  const fatwah_title_2 = fatwah_ExtraData?.custom_information.find((item) => item.label === "fatwah_title_2")




  return (

    <div className="  px-4 py-10 relative">
      {/* Top Section - Logo & Arabic Title */}
      <div className="max-w-7xl   mx-auto flex
         justify-between items-end mb-6">
        {/* Logo */}
        <div>
          <Image
            src={header_image}
            alt="Logo"
            width={200}
            height={181}
            className='hidden sm:flex'
          />
          <Image
            src={header_image}
            alt="Logo"
            width={150}
            height={80}
            className='flex sm:hidden'
          />
        </div>

        {/* Arabic Heading */}
        <div className=''>
          {/* for big screen */}
          <div className="hidden sm:flex  flex-col justify-end items-end gap-3 ">
            <Image
              src={Arabic_header_image}

              alt="Logo"
              width={515}
              height={70}
            />
            <p className='text-[#F7BA2A] font-semibold text-[20px]  '>{fatwah_Top_header_ExtraData?.sub_title}</p>
          
          </div>
          {/* for small screen */}
          <div className=" flex sm:hidden flex-col justify-end items-end gap-3 ">
            <Image
              src={Arabic_header_image}
              alt="Logo"
              width={210}
              height={50}
            />
            <p className='text-[#F7BA2A] font-semibold text-[16px]  '>{fatwah_Top_header_ExtraData?.sub_title}</p>
          </div>
        </div>


      </div>

      {/* Fatwah Content Box */}
      <div className="max-w-7xl  mx-auto relative gradient-bg-fatwah 
        rounded-2xl shadow-lg overflow-hidden p-4 md:p-12"

      >
        {/* Mosque Image Positioned at Bottom Right */}
        <div className="absolute bottom-0 right-0 w-[180px] md:w-[250px] lg:w-[400px] opacity-80">
          <Image
            src="/images/fatwah/fatwahbg.png"
            alt="Mosque"
            width={400}
            height={400}
            className="object-contain pointer-events-none select-none"
          />
        </div>

        {/* Content Area*/}
        <div className="relative  w-full lg:w-[70%] z-10 items-center">
          {/* heading */}
          <div className='flex justify-between mb-6 '>

            <div className="flex justify-between  gap-2 gradient-border_b mb-4 sm:mb-0 pb-3   ">

              <Image
                src={penIcon}
                alt="Book Icon"
                width={65}
                height={60}
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
          <FatwaListClient fatwahs={fatwahs} penIcon={penIcon} settings={settings} />
        </div>
      </div>
    </div>
  )
}
