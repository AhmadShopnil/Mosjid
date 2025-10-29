"use client"

import Image from 'next/image'
import React, { useState } from 'react'

import { getDonationsMethods } from '@/helper/actions';
import { getImageUrl } from '@/helper/getImageUrl';
import { splitBySpace } from '@/helper/splitBySpace';
import BankInfo from '../Home/Directory_Donation/Donation/BankInfo';

function MakeDonationInner({ donationMethods, make_your_donation }) {
  const [activeTab, setActiveTab] = useState(donationMethods[0]);

  const heading_part_1 = splitBySpace(make_your_donation?.sub_title)[0]
  const heading_part_2 = splitBySpace(make_your_donation?.sub_title)[1]
  const image_arabic = getImageUrl(make_your_donation?.image_media);

  // const donation_title_2 = make_your_donation?.custom_information.find((item) => item.label === "donation_title_2")
  // console.log("make_your_donation",make_your_donation?.custom_information)

  return (
    <div className='gradient-border bg-white  px-5 sm:px-8 pt-5 sm:pt-8 pb-20p-4 rounded-2xl'>

      {/* heading */}
      <div className='flex justify-between mb-6 '>
        <div className="flex justify-between items-center  gap-2 gradient-border_b mb-4 sm:mb-0 pb-3  ">
          {/* <Image
            src="/images/donation/icon.png"
            alt="Book Icon"
            width={60}
            height={70}
            className=""
          /> */}

          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A] flex gap-4">
            <p><span className="text-[#F7BA2A]">{heading_part_1}</span> {heading_part_2} </p> /
            {/* <p>{donation_title_2?.value}</p> */}
            <p>寄付をする</p>

          </div>
        </div>



      </div>

      <p className='text-sm '>{make_your_donation?.short_description}</p>

      <div className="flex gap-3 flex-wrap mt-6">
        {donationMethods?.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-extrabold cursor-pointer text-sm border text-[#001609] transition duration-300 ${activeTab?.name === tab?.name
              ? "bg-[#F7BA2A]  border-[#F7BA2A]"
              : " border-[#F7BA2A] hover:bg-[#F7BA2A] "
              }`}
          >
            {tab?.name}
          </button>
        ))}

      </div>



      <div className='pt-4'>
        <h3 className='text-base text-[#333333] mb-2'>Bank information (BANK DETAIL) </h3>
        <h2 className='text-xl font-bold text-[#00401A] gradient-border_b pb-2'>Religious Corporation Osaka Masjid</h2>
        <BankInfo />
      </div>


    </div>
  )
}

export default MakeDonationInner