
import { getMetaValueFromExtraFields } from '@/helper/metaHelpers';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RelatedEventCard({ data, link }) {


    
 const day = getMetaValueFromExtraFields(data, "day");
  const month = getMetaValueFromExtraFields(data, "month");
//   const time = getMetaValueFromExtraFields(data, "time");
  const year = getMetaValueFromExtraFields(data, "year");
//   const location = getMetaValueFromExtraFields(data, "location");


//   console.log("data",data)

    return (
        <div className='border border-[#F7BA2A] w-[370px] h-[625px] flex flex-col  rounded-[20px]
             bg-white hover:shadow-xl/30 cursor-pointer overflow-hidden' >

            <div className='flex justify-center mt-6 '>
                <div className='  mx-auto rounded-full  w-[254px] h-[254px]'>
                    <Image
                        src={data?.featured_image}
                        alt='a1'
                        width={254}
                        height={254}
                        className='rounded-full w-[254px] h-[254px] border-5 border-[#FFDA82]'
                    />
                </div>

            </div>
            <div className='p-6 flex flex-col justify-between  h-full overflow-hidden'>
             <div className='my-2.5 space-y-2'>
                   <p className="text-[#00401A] text-xs sm:text-sm  md:text-base  bg-gray-50 rounded-[10px] ">{month} {day}th, {year}</p>
                <p className="text-[#F7BA2A] mb-1 text-xs sm:text-sm  md:text-base font-bold ">{data?.name}</p>
             </div>
             <div className=' h-full flex flex-col justify-between overflow-hidden '>

                   <div
                    className="text-[#181A2A] text-xs sm:text-sm md:text-base overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: data?.description?.slice(0,300) }}
                />
                <Link
                    href={link}
                    className='flex items-center justify-start  mt-6 gap-2'>
                    <span className='text-[#003014] font-semibold text-sm'>See Details</span>
                    <Image
                        src="/images/others/arrow-r.png"
                        alt='a1'
                        width={16}
                        height={10}
                        className='w-[15px] h-[10px]'
                    />
                </Link>
             </div>
            </div>
        </div>
    )
}
