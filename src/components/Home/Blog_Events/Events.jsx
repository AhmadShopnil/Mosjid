
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import EventCard from './EventCard';


const eventss = [
  { date: "14 August 2025", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { date: "14 August 2025", text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { date: "14 August 2025", text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
  { date: "14 August 2025", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
  { date: "14 August 2025", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
];


export default async function Events({events}) {


// console.log("events",events)

  return (
    <div  className='gradient-border rounded-3xl p-5 bg-white h-full'>
{/* heading */}
     <div className='gradient-border_b pb-2 flex justify-between'>
          <h4 className='text-[#00401A] font-bold text-base  ' >
          Upcoming Events
        </h4>
        <Link
        href=''
        className='text-[#00401A] font-bold text-sm flex gap-2 items-center '
        >
        View More
        <Image
         src="/images/others/arrowR.png"
          alt='a1'
           width={18}
           height={18}
            />
        </Link>
    </div>
{/* Events */}
    <div className="mt-6 flex flex-col gap-3">
        {events?.slice(0,3).map((event, i) => (
          <EventCard key={i} event={event}/>
          // <div
          //   key={i}
          //   className="flex space-x-3 bg-white/90 backdrop-blur-sm border border-gray-300 p-2 rounded-md shadow-sm"
          // >
          //   {/* Date Section */}
          //   <div className="w-22 text-center bg-gray-100 rounded-md px-3 py-2 leading-5 space-y-0.5">
          //     <p className="text-2xl font-bold text-green-900 leading-5">
          //       {notice.date.split(" ")[0]}
          //     </p>
          //     <p className="text-xs text-green-900">{notice.date.split(" ")[1]}</p>
          //     <p className="text-xs text-green-900">{notice.date.split(" ")[2]}</p>
          //   </div>

          //   {/* Notice Text */}
          //   <div className=''>
          //     <p className="text-[#00401A] text-sm">{notice.text}</p>
          //     <Link
          //       href={`/notice`}
          //       className="mt-2 text-xs font-semibold text-[#001609]
          //        hover:text-green-800 cursor-pointer"
          //     >
          //       Read More --
          //     </Link>
          //   </div>
          // </div>
        ))}

    </div>

    </div>
  )
}
