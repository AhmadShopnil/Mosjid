import React from 'react'


import RelatedItemCard from '../Shared/RelatedItemCard'
import Container from '../Shared/Container'
import { splitBySlash } from '@/helper/splitBySpace'
import RelatedEventCard from './RelatedEventCard'

export default function RelatedItemsSection({ datas, events_ExtraData }) {


    const related_events_title = events_ExtraData?.custom_information?.find((item) => item.label === "related_events_title")

    const heading_part_1 = splitBySlash(related_events_title?.value)[0]
    const heading_part_2 = splitBySlash(related_events_title?.value)[1]

    return (
        <div className='my-20 py-8 lg:py-10 bg-[#F9FFF6]'>

            <Container>
                <div className=' mb-10 flex justify-center border-b-2 border-b-[#53b92089] pb-6'>
                    <h4 className='text-xl md:text-2xl lg:text-3xl text-[#000000] font-bold '>
                        {heading_part_1} <span className='text-[#F7BA2A]'>{heading_part_2}</span>
                    </h4>

                </div>

                <div className='flex flex-wrap   justify-center gap-4 xl:gap-8   '>

                    {
                        datas?.map((data, i) => (
                            <RelatedEventCard key={i} data={data} link={`/events/${data?.slug}`} />
                        ))
                    }


                </div>
            </Container>

        </div>
    )
}
