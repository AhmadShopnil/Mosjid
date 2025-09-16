import React from 'react'
import { DictionaryIcon, DonationIcon, GalleryIcon, PrayerTimesIcon } from '../Icons/QuickLinks';

const quickLinks = [
  { name: "Prayer Times", icon:  <PrayerTimesIcon/> },
//   { name: "Fatwa", icon: <FatwaIcon/> },
  { name: "Dictionary", icon: <DictionaryIcon/> },
  { name: "Gallery", icon: <GalleryIcon/> },
  { name: "Donation", icon: <DonationIcon/> },
];


export default function Dictionary() {
  return (
    <div className='border border-teal-300 p-4 rounded-2xl h-[300px]'>
        <div>
            <div>
                <h3 className='text-2xl text-[#00401A]'>
                    Dictionary
                </h3>
            </div>
            {/* arabic text */}
            <div>

            </div>
        </div>
    <p className='text-sm'>Where Worship, Knowledge, and Remembrance Unite</p>
{/* inputs */}
        <div>

        </div>

{/* Links with icons */}

     <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
       
       
        {quickLinks.map((link, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center
             bg-white shadow rounded-3xl py-2  hover:bg-teal-50
              transition cursor-pointer text-center"
          >
           

            {link.icon}
            <p className="mt-2 text-sm text-gray-700">{link.name}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
