import Image from 'next/image'
import React from 'react'

export default function BannerInnerPage() {
    return (
        <div className='w-full'>
            <Image
                src="/images/bannerInner.png"
                alt={"Hero Banner"}
                width={2000}
              height={300}
              className='w-full h-[90px] xs:[100px] sm:h-[120px]  md:h-[170px] lg:h-[200px] xl:h-[270px]'
            />

        </div>
    )
}
