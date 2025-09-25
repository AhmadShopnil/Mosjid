"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import BankInfo from './BankInfo'
import { getDonationsMethods } from '@/helper/actions';
import { getImageUrl } from '@/helper/getImageUrl';

function MakeDonation({ donationMethods, make_your_donation }) {

  const [activeTab, setActiveTab] = useState(donationMethods[0]);
  const image_arabic = getImageUrl(make_your_donation?.image_media);

  return (
    <div className='gradient-border bg-white  px-5 sm:px-8 pt-5 sm:pt-8 pb-20p-4 rounded-2xl'>

      {/* heading */}
      <div className='flex justify-between mb-3 '>

        <div className='flex gap-1.5 sm:gap-2 items-center   gradient-border_b w-[90%] sm:w-[60% pb-2  '>
          <Image
            src="/images/directory/icon.png"
            alt='a1'
            width={40}
            height={40}
            className="object-contain hidden sm:flex"
          />
          <Image
            src="/images/directory/icon.png"
            alt='a1'
            width={40}
            height={30}
            className="object-contain sm:hidden"
          />
          <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]'>
            <span className='text-[#F7BA2A]'>Make</span> a Donation
          </h3>
        </div>
        {/* arabic text */}
        <div className='flex'>
          <Image
          src={image_arabic}
            // src="/images/directory/a1.png"
            alt='a1'
            width={300}
            height={60}
            className="object-contain hidden sm:flex"
          />

          {/* <Image
               src="/images/directory/a1.png"
               alt="Arabic text"
              width={135}
             height={40}
              className="object-contain sm:hidden"
              /> */}
        </div>
      </div>

      <p className='text-sm '>{make_your_donation?.sub_title}</p>




      <div className="flex gap-3 flex-wrap mt-6">
        {donationMethods?.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-semibold text-sm border transition duration-300 ${activeTab?.name === tab?.name
              ? "bg-[#F7BA2A] text-white border-[#F7BA2A]"
              : "text-[#00401A] border-[#F7BA2A] hover:bg-[#F7BA2A] hover:text-white"
              }`}
          >
            {tab?.name}
          </button>
        ))}

      </div>




      <div>
        {/* Bank Info */}
        <div className=" p-6   ">
          <h4 className="text-xl font-bold mb-4 text-[#00401A]">
            {/* {make_your_donation?.short_description} */}
          </h4>
          <div
            className="text-[#333333] text-sm"
            dangerouslySetInnerHTML={{
              __html: activeTab?.description,
            }}
          />

        </div>

      </div>

    </div>
  )
}

export default MakeDonation