"use client"

import Image from 'next/image'
import React, { useState } from 'react'

import { getDonationsMethods } from '@/helper/actions';
import { getImageUrl } from '@/helper/getImageUrl';
import { splitBySlash, splitBySpace } from '@/helper/splitBySpace';
import BankInfoInner from './BankInfoInner';
import DonationInputSection from './DonationInputSection';


function MakeDonationInner({ donations, settings, homePage, loading, currentPage, setCurrentPage, totalPages }) {
  const [activeTab, setActiveTab] = useState(donations[0]);

  // console.log("donations", donations)

  const sections = homePage.sections_on_api;
  const make_your_donation = sections.find((s) => s.title_slug === "make-your-doantion");
  

  const heading_part_1 = splitBySlash(make_your_donation?.title)[0]
   const heading_part_2 = splitBySlash(make_your_donation?.title)[1]
  const image_arabic = getImageUrl(make_your_donation?.image_media);

  // const donation_title_2 = make_your_donation?.custom_information.find((item) => item.label === "donation_title_2")
  const donate_now_button = make_your_donation?.custom_information.find((item) => item.label === "donate_button") || " Donate Now"
  const info_2 = make_your_donation?.custom_information.find((item) => item.label === "info_2") || "Religious Corporation Osaka Masjid"

  return (
    <div>
      <div className=' border border-[#B0C4B8] bg-white  px-5 sm:px-20 pt-5 sm:pt-8  pb-20 p-4 rounded-2xl'>
        <div className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-[#00401A] flex gap-4 justify-center 
            border-b border-[#B0C4B8] pb-2 mb-10 ">
          <p><span className="text-[#F7BA2A]">{heading_part_1}</span> {heading_part_2} </p> /

          <p>{make_your_donation?.sub_title}</p>
        </div>
        <DonationInputSection donate_now_button={donate_now_button}/>
      </div>

      <div className='border border-[#B0C4B8] bg-white  px-5 sm:px-8 pt-5 sm:pt-8 pb-20p-4 rounded-2xl mt-6'>


        <div className='text-center'>
          <h3 className='text-base text-[#333333] mb-2'>{make_your_donation?.description} </h3>
          <h2 className='text-xl font-bold text-[#00401A] border-b-2 border-[#B0C4B8] pb-2 mb-2'>{info_2.value}</h2>
        </div>
        <BankInfoInner selectedDonation={donations[0]} />



      </div>
    </div>
  )
}

export default MakeDonationInner