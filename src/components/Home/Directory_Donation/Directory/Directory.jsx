import React from 'react'
import { DictionaryIcon, DonationIcon, GalleryIcon, PrayerTimesIcon } from '../../../Icons/QuickLinks';
import Image from 'next/image';
import SearchSection from './SearchSection';

const quickLinks = [
  { name: "Find People", icon: "/images/directory/1.png" },
  //   { name: "Fatwa", icon: <FatwaIcon/> },
  { name: "Mosque", icon: "/images/directory/5.png" },
  { name: "Madrasha", icon: "/images/directory/3.png" },
  { name: "Islamic Center", icon: "/images/directory/2.png" },
  { name: "Quranic Center", icon: "/images/directory/6.png" },
];


export default function Directory() {
  return (
    <div className='gradient-border h-full  px-5 sm:px-8 pt-5 sm:pt-8 pb-20 rounded-2xl bg-white '>
      {/* heading */}
      <div className='flex justify-between mb-3 '>
        <div className='flex gap-1.5 sm:gap-2 items-center   gradient-border_b w-[60%] pb-2  '>
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
            width={30}
            height={30}
            className="object-contain sm:hidden"
          />
          <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]'>
            Directory
          </h3>
        </div>
        {/* arabic text */}
        <div className='flex '>
          <Image
            src="/images/directory/a1.png"
            alt='a1'
            width={300}
            height={60}
            className="object-contain hidden sm:flex"
          />

          <Image
            src="/images/directory/a1.png"
            alt="Arabic text"
            width={150}
            height={40}
            className="object-contain sm:hidden"
          />
        </div>
      </div>
      <p className='text-sm '>Where Worship, Knowledge, and Remembrance Unite</p>
      {/* inputs */}
      <div className='my-6'>
        <SearchSection />
      </div>

      {/* Links with icons */}

      <div className="mt-8 md:mt-14 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-5 gap-2 ">


        {quickLinks.map((link, i) => (
          <div
            key={i}
            className="gradient-border2 flex flex-col items-center justify-center
             bg-white  rounded-[20px] px-3 py-6  hover:bg-teal-50
              transition cursor-pointer text-center"
          >

            <div className=' '>

              <Image
                src={link?.icon}
                alt='a1'
                width={55}
                height={55}
              />
            </div>
            <p className="mt-2 text-sm text-gray-700">{link.name}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
