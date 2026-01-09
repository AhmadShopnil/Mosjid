"use client"


import Image from "next/image"
import FatwaSearchForm from "./FatwaSearchForm"
import { getImageUrl } from "@/helper/getImageUrl"
import InnerHeader from "../Shared/InnerHeader"

export default function FatwaFinder({ data_for_filter, fatwahExtraData }) {



  const image = getImageUrl(fatwahExtraData?.image_media)

  const fatwah_header_title = fatwahExtraData?.custom_information.find((item) => item.label === "fatwah_header_title")

  // console.log({books})


  return (
    <div className=" ">

      {/* Header */}
      <InnerHeader
        title={fatwah_header_title?.value}
        image={image}
      />



      {/* Main Content */}
      <div className="bg-white  mt-4 rounded-lg shadow-lg">
        {/* Title Section */}
        <div className="bg-[#E5F5DE] text-center py-4  ">
          <h2 className="text-3xl font-bold text-[#00401A]">Fatwa Finder</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Left Sidebar - Logo Section */}
          <div className="w-full lg:w-[30%] flex flex-col items-center justify-center">
            <Image
              src="/images/fatwah/fatwahHeader.png"
              alt="Logo"
              width={320}
              height={300}
              className=''
            />
          </div>

          {/* Right Section - Search Form */}
          <div className="w-full lg:w-[65%]">
            <div className="">
              <FatwaSearchForm data_for_filter={data_for_filter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
