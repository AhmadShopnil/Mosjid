"use client"


import { getDay_Month_Year } from '@/helper/formateDate'
import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import React, { useState } from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa';

export default function NoticeCardHome({ notice, settings, handleOpenModal }) {
  
    const read_more = getMetaValueByMetaName(settings, "read_more") || "";


    return (
        <div

            className="flex space-x-3 bg-white/90 backdrop-blur-sm border border-gray-300 p-2 rounded-md shadow-sm"
        >

            {/* Date Section */}
            <div className="w-[30%] sm:w-[18%] text-center bg-gray-100 rounded-md pt-3 sm:pt-3 leading-5">
                <p className="text-3xl font-bold text-[#00401A] leading-6">

                    {getDay_Month_Year(notice?.created_at, "day")}
                </p>
                <p className="text-sm text-[#00401A] leading-5"> {getDay_Month_Year(notice?.created_at, "month")}</p>
                <p className="text-sm text-[#00401A]"> {getDay_Month_Year(notice?.created_at, "year")}</p>
            </div>


            {/* Notice Text */}
            <div className="w-[70%] sm:w-[82%] flex flex-col justify-between  ">
                <p className="sm:hidden text-[#00401A] text-sm">{notice?.sub_title.slice(0, 40)}</p>
                <p className="hidden sm:block text-[#00401A] text-sm">{notice?.sub_title.slice(0, 120)}</p>
                <button
                    onClick={() => handleOpenModal(notice)}
                    className="text-[#001609] font-semibold sm:font-bold text-xs md:text-sm hover:text-[#F7BA2A]
                      flex gap-1 items-center  cursor-pointer"
                >
                    {read_more}
                    <span className='mt-0.5'><FaLongArrowAltRight /></span>
                </button>
              
            </div>

        </div>
    )
}
