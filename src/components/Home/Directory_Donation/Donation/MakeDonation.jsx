"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import BankInfo from './BankInfo'
import { getImageUrl } from '@/helper/getImageUrl';
import { splitBySpace } from '@/helper/splitBySpace';
import Link from 'next/link';

function MakeDonation({ donationMethods, make_your_donation }) {
  const [activeTab, setActiveTab] = useState(donationMethods[0]);

  const heading_part_1 = splitBySpace(make_your_donation?.sub_title)[0]
  const heading_part_2 = splitBySpace(make_your_donation?.sub_title)[1]
  const image_arabic = getImageUrl(make_your_donation?.image_media);

  const donation_title_2 = make_your_donation?.custom_information.find((item) => item.label === "donation_title_2")
  const donate_now_button = make_your_donation?.custom_information.find((item) => item.label === "donate_button") || " Donate Now"
  const info_2 = make_your_donation?.custom_information.find((item) => item.label === "info_2")  || "Religious Corporation Osaka Masjid"


  // console.log("make_your_donation",make_your_donation)

  return (
    <div className='gradient-border bg-white  px-5 sm:px-8 pt-5 sm:pt-8 pb-20p-4 rounded-2xl'>

      {/* heading */}
      <div className='flex justify-between mb-3 '>
        <div className="flex justify-between items-center  gap-2 gradient-border_b mb-4 sm:mb-0 pb-3  ">
          <Image
            src="/images/donation/icon.png"
            alt="Book Icon"
            width={60}
            height={70}
            className=""
          />

          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
            <p><span className="text-[#F7BA2A]">{heading_part_1}</span> {heading_part_2} </p>
            <p>{donation_title_2?.value}</p>

          </div>
        </div>


        {/* arabic text */}
        <div className='flex gap-3'>
          <Image
            src={image_arabic}
            alt='a1'
            width={60}
            height={60}
            className="object-contain hidden sm:flex"
          />
          <div className="flex items-center gap-3 sm:gap-4">

            <Link 
            href="/donation"
            className="border border-[#00401A] text-[#001609] hover:bg-[#00401A] hover:text-white transition-colors duration-400
               font-bold rounded-full px-5 py-2.5 text-sm sm:text-base cursor-pointer">
              {donate_now_button?.value}
            </Link>
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
        <h3 className='text-base text-[#333333] mb-2'>{make_your_donation?.description} </h3>
        <h2 className='text-xl font-bold text-[#00401A] gradient-border_b pb-2'>{info_2.value}</h2>
        <BankInfo selectedDonation={activeTab}/>
      </div>


    </div>
  )
}

export default MakeDonation