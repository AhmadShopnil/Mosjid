import { getDay_Month_Year } from '@/helper/formateDate'
import { getMetaValueFromExtraFields } from '@/helper/metaHelpers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function DonationCard({ data, handleOpenModal }) {


    const short_description_donation = getMetaValueFromExtraFields(data, "short_description_donation")



    return (
        <div className='  relative w-[370px] flex flex-col  items-center'>


            <div className='absolute flex justify-center'>
                <div className='right-3 top-0 mx-auto rounded-full  w-[374px] h-[364px] bg-white'>
                    <Image
                        src={data?.featured_image}
                        // src={data?.featured_image || "/images/donation/Donation.svg"}
                        alt='a1'
                        width={254}
                        height={254}
                        className='rounded-full w-[374px] h-[364px] border-5 border-[#FFDA82]'
                    />
                </div>

            </div>
            <div className='border border-[#F7BA2A] flex flex-col w-[350px] h-[530px] mt-[150px]  rounded-[20px]
             bg-white hover:shadow-xl/30 cursor-pointer' >


                <div className='p-6 flex flex-col justify-between  h-full mt-[200px]  '>

                   <div>
                     <p className="text-[#181A2A] mb-2 text-xs sm:text-sm  md:text-base font-bold mt-2 ">{data?.sub_title}</p>
                    {/* <div
                        className="text-[#181A2A] text-xs sm:text-sm md:text-base overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: short_description_donation?.slice(0, 300) }}
                    /> */}
                    <p className='text-[#181A2A] text-xs sm:text-sm md:text-base overflow-hidden'>
                        {short_description_donation?.slice(0, 230)}
                        </p>
                   </div>

                    <div className=' '>
                        <button
                            onClick={() => handleOpenModal(data)}
                            className='flex items-center justify-start  gap-2 bg-[#F7BA2A] px-5 py-3 rounded-[20px] cursor-pointer'>
                            <span className='text-[#003014] font-semibold text-sm'>View Details </span>
                            <Image
                                src="/images/others/arrow-r.png"
                                alt='a1'
                                width={16}
                                height={10}
                                className='w-[15px] h-[10px]'
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
