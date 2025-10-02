
"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import Container from '../Shared/Container'
import { TbMailFilled } from "react-icons/tb";
import { ImFacebook2 } from "react-icons/im";
import {  FaPhoneVolume } from 'react-icons/fa6';
import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import Link from 'next/link';

const languages = [
  {
    title: "English",
    icon: "/images/others/English.png"
  },
  {
    title: "Japanese",
    icon: "/images/others/Japan.png"
  },
  {
    title: "Arabic",
    icon: "/images/others/Arabic.png"
  },
]

export default  function Topbar({settings}) {
  const [selectedLanguage, setSelectedLanguage] = useState("English")



  const phone = getMetaValueByMetaName(settings, "company_phone") || "";
  const company_email = getMetaValueByMetaName(settings, "company_email") || "";
  const facebookLink = getMetaValueByMetaName(settings, "facebook_url") || "#";
  const linkedinLink = getMetaValueByMetaName(settings, "linkedin_url") || "#";
  const instagramLink =
    getMetaValueByMetaName(settings, "instagram_url") || "#";

  return (
    <Container className='bg-white my-2 min-h-[20px]'>
      <div className="justify-end  items-center gap-4 md:gap-6 hidden xl:flex ">

        {/* language selection */}
        <div className="flex items-center gap-2  justify-end">
          <span className='text-lg text-[#00401A] font-bold'>Select Language: </span>
          {languages.map((language) => (
            <button
              key={language?.title}
              onClick={() => setSelectedLanguage(language?.title)}
              className={`px-5 flex gap-1 py-2 rounded-full text-base font-bold  transition-colors ${selectedLanguage === language?.title ? "bg-[#00401A] text-white" :
                  "bg-white text-[#00401A] hover:bg-gray-300 border border-[#00401a51]"
                }`}
            >

              <div className=" my-auto">
                <Image
                  src={language?.icon}
                  alt='a1'
                  width={20}
                  height={10}
                />
              </div>
              <div className="text-sm font-bold my-auto">
                {language?.title}
              </div>
            </button>
          ))}
        </div>
        {/* mail */}
        <div className='flex gap-2 items-center'>
          <span className='text-xl text-[#00401A] '>
            <TbMailFilled />
          </span>
          <span className='text-base text-[#00401A] '>
            {company_email}
          </span>
        </div>

        {/* phone no */}
        <div className='flex gap-2 items-center'>
          <span className='text-xl text-[#00401A] '>
            <FaPhoneVolume className="" />
          </span>
          <span className='text-base text-[#00401A] '>
            {phone}
          </span>
        </div>

        {/* social links */}
        <div className='flex gap-2 justify-center  items-center'>
          <Link
            href={facebookLink}
            className='text-blue-500'>
            <ImFacebook2 />
          </Link>
          <Link
            href={instagramLink}
            className=''>
            <Image
              src="/images/footer/insta.png"
              alt='a1'
              width={30}
              height={30}
              className='hidden sm:flex'
            />
          </Link>
          <Link
            href={linkedinLink}
            className='text-blue-500'>
            <Image
              src="/images/footer/linkdin.png"
              alt='a1'
              width={22}
              height={22}
              className='hidden sm:flex'
            />

          </Link>
        </div>

      </div>
    </Container>
  )
}
