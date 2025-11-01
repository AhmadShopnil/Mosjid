import React from 'react'


import RelatedItemCard from '../Shared/RelatedItemCard'
import Container from '../Shared/Container'

export default function RelatedItemsSection({ datas, title }) {

    return (
        <div className='my-20 py-8 lg:py-10 bg-[#F9FFF6]'>

            <Container>
                <div className=' mb-30 flex justify-center border-b-2 border-b-[#53b92089] pb-6'>
                    <h4 className='text-xl md:text-2xl lg:text-3xl text-[#000000] font-bold '>
                        Related <span className='text-[#F7BA2A]'>Events</span>/ 関連イベント
                    </h4>

                </div>

                <div className='flex flex-wrap   justify-center gap-24 xl:gap-8 py-0 lg:py-10  '>
                    {
                        datas?.map((data, i) => (
                            <RelatedItemCard key={i} data={data} link={`/events/${data?.slug}`} />
                        ))
                    }

         
                </div>
            </Container>

        </div>
    )
}
