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
              className='w-full h-[270px]'
            />

        </div>
    )
}
