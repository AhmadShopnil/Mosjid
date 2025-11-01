import { getDay_Month_Year } from '@/helper/formateDate'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RelatedItemCard({ data, link }) {


    const day = getDay_Month_Year(data?.created_at, "day")
    const month = getDay_Month_Year(data?.created_at, "month")
    const year = getDay_Month_Year(data?.created_at, "year")


    return (
        <div className='border border-[#F7BA2A] w-[370px] h-[400px] flex flex-col  rounded-[20px]
             bg-white hover:shadow-xl/30 cursor-pointer' >

            <div className='flex justify-center '>
                <div className=' -mt-20 mx-auto rounded-full  w-[254px] h-[254px]'>
                    <Image
                        src={data?.featured_image}
                        alt='a1'
                        width={254}
                        height={254}
                        className='rounded-full w-[254px] h-[254px] border-5 border-[#FFDA82]'
                    />
                </div>

            </div>
            <div className='p-6 flex flex-col justify-between  min-h-[210px]  '>
                <p className="text-[#00401A] text-xs sm:text-sm  md:text-base p-2 bg-gray-50 rounded-[10px] ">{month} {day}th, {year}</p>
                <p className="text-[#F7BA2A] mb-1 text-xs sm:text-sm  md:text-base font-bold ">{data?.name}</p>
                <div
                    className="text-[#181A2A] text-xs sm:text-sm md:text-base overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: data?.description?.slice(0,100) }}
                />
                <Link
                    href={link}
                    className='flex items-center justify-start  mt-6 gap-2'>
                    <span className='text-[#001609] font-semibold text-sm'>Read More </span>
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
    )
}
