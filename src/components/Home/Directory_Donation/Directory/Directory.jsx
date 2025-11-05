import React from 'react'
import { DictionaryIcon, DonationIcon, GalleryIcon, PrayerTimesIcon } from '../../../Icons/QuickLinks';
import Image from 'next/image';
import SearchSection from './SearchSection';
import { getCategories } from '@/helper/actions';
import Link from 'next/link';

const quickLinks = [
  { name: "Find People", icon: "/images/directory/1.png" },
  //   { name: "Fatwa", icon: <FatwaIcon/> },
  { name: "Mosque", icon: "/images/directory/5.png" },
  { name: "Madrasha", icon: "/images/directory/3.png" },
  { name: "Islamic Center", icon: "/images/directory/2.png" },
  { name: "Quranic Center", icon: "/images/directory/6.png" },
];


export default async function Directory() {

 
const directory_categories = await getCategories("directory_categories")

// console.log("directory_categories",directory_categories)

  return (
    <div 
    id='directory'
    className='gradient-border h-full  px-5 sm:px-8 pt-5 sm:pt-8 pb-20 rounded-2xl bg-white relative'>
      <div
        className="absolute right-0 top-0"
      >
        <Image
          src="/images/directory/Directory bg.png"
          alt='img'
          width={510}
          height={200}
          className="object-contain transition-all duration-300"
        />
      </div>

      {/* heading */}
      <div className='flex justify-between mb-3 '>

        <div className="flex justify-between items-center  gap-1 gradient-border_b mb-4 sm:mb-0 pb-3  ">
          <Image
            src="/images/directory/icon.png"
            alt="Book Icon"
            width={60}
            height={60}
            className=""
          />

          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
            <p> Directory</p>
            {/* <p>{donation_title_2?.value}</p> */}
            <p>ディレクトリ</p>

          </div>
        </div>

        {/* arabic text */}
        <div className='flex '>
          <Image
            src="/images/directory/a2.png"
            alt='a1'
            width={300}
            height={60}
            className="object-contain hidden sm:flex"
          />

          <Image
            src="/images/directory/a2.png"
            alt="Arabic text"
            width={150}
            height={40}
            className="object-contain sm:hidden"
          />
        </div>
      </div>
      <p className='text-sm '>Where Worship, Knowledge, and Remembrance Unite</p>
      {/* inputs */}
      <div className='mt-6'>
        <SearchSection />
      </div>

      {/* Links with icons */}

      <div className="mt-8 md:mt-11 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-5 gap-2.5 ">


        {directory_categories?.map((item, i) => (
          <Link
            key={i}
            href={`/directory/${item?.id}`}
            className="gradient-borderDirectory h-[140px] flex flex-col items-center justify-center
             bg-white  rounded-[20px] px-3 py-3  hover:bg-teal-50
              transition cursor-pointer text-center"
            // className="gradient-border2 h-[140px] flex flex-col items-center justify-center
            //  bg-white  rounded-[20px] px-3 py-3  hover:bg-teal-50
            //   transition cursor-pointer text-center"
          >

            <div className=' '>

              <Image
                src={item?.image}
                alt='a1'
                width={55}
                height={55}
              />
            </div>
            <p className="mt-2 text-base font-bold text-gray-700">{item?.name}</p>
          </Link>
        ))}
      </div>

    </div>
  )
}
