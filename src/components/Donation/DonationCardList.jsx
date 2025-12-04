"use client"

import React, { useState } from 'react'
import DonationCard from './DonationCard'
import Container from '../Shared/Container'
import DonationModal from './DonationModal';
import { getMetaValueFromExtraFields } from '@/helper/metaHelpers';


export default function DonationCardList({ allDonationsList }) {
    const [selectedDonation, setSelectedDonation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //  const related_blogs_title = blog_events_ExtraData?.custom_information?.find((item) => item.label === "related_blogs_title")
    //  const heading_part_1 = splitBySlash(related_blogs_title?.value)[0]
    //  const heading_part_2 = splitBySlash(related_blogs_title?.value)[1]
    

    const handleOpenModal = (donation) => {
        setSelectedDonation(donation);
        setIsModalOpen(true);
        // console.log("from donation  modal", donation)
    };



    return (
        <div className='my-20 py-8 lg:py-10 bg-[#F9FFF6]'>

            <Container>
                <div className=' flex justify-center border-b-2 border-b-[#53b92089] pb-6'>
                    <h4 className='text-xl md:text-2xl lg:text-3xl text-[#000000] font-bold '>
                        Select Your <span className='text-[#F7BA2A]'>Donation</span>
                    </h4>
                    {/* <h4 className='text-xl md:text-2xl lg:text-3xl text-[#000000] font-bold '>
                        {heading_part_1} <span className='text-[#F7BA2A]'>{heading_part_2}</span>
                    </h4> */}
                    {/* <h4 className='text-xl md:text-2xl lg:text-3xl text-[#000000] font-bold '>{title}</h4> */}


                </div>

                <div className='flex flex-wrap   justify-center gap-24 xl:gap-8 py-0 lg:py-10 '>
                    {
                        allDonationsList?.map((data, i) => (
                            <DonationCard key={i} data={data} handleOpenModal={handleOpenModal} />
                        ))
                    }


                </div>
            </Container>
            <DonationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                donation={selectedDonation}
            />
        </div>
    )
}
