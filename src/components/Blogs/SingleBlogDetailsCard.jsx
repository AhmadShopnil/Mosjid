import { getDay_Month_Year } from '@/helper/formateDate'
import Image from 'next/image'
import React from 'react'

export default function SingleBlogDetailsCard({ blog }) {



    const day = getDay_Month_Year(blog?.created_at, "day")
    const month = getDay_Month_Year(blog?.created_at, "month")
    const year = getDay_Month_Year(blog?.created_at, "year")


    return (
        <div className=" bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4 gradient-border-bottom">
                <h4 className='text-2xl font-semibold text-[#333333]'>{blog?.name}</h4>

                <div className='bg-[#00401A] text-white h-[56px] rounded-[50px] w-[168px] flex justify-center items-center text-[22px]'>
                    <span>Blog No {blog?.id}</span>
                </div>
            </div>


            <div className="bg-white rounded-[20px] flex gap-3 sm:gap-4 md:gap-5 px-3 md:px-6 py-6 md:py-14">
                {/* Image Container */}
                <div className="rounded-[10px] w-[90px] h-[90px] sm:w-[247px] sm:h-[215px] relative flex-shrink-0">
                    <Image
                        src={blog?.featured_image}
                        alt="a1"
                        fill
                        className="object-cover rounded-xl"
                    />

                </div>

                {/* Content */}
                <div className="flex flex-col justify-between sm:py-1">
                    <div>
                        <p className="text-[#333333] text-xs sm:text-sm mb-4 gradient-border_b pb-3">{month} {day}th, {year}</p>
                        <div
                            className="text-[#333333]  text-sm sm:text-base"
                            dangerouslySetInnerHTML={{ __html: blog?.description }}
                        />
                        {/* <p className=" text-[#333333] font-semibold md:font-bold text-sm sm:text-lg ">
                            {blog?.description.slice(0, 55)}
                        </p> */}

                    </div>


                </div>
            </div>


            {/* Footer */}
            <div className="flex justify-between items-center  bg-gradient-to-b from-[#EEF8E9] to-[#BAFF98] px-4 py-4 ">
                <p
                    className="text-[#000000] text-xl sm:text-2xl font-medium hover:underline"
                >
                    Email: durulifta@gmail.com
                </p>
                <a
                    href="https://www.osakamasjid.com"
                    className="text-[#000000] text-xl sm:text-2xl font-medium hover:underline"
                >
                    www.osakamasjid.org
                </a>
            </div>
        </div>
    )
}
