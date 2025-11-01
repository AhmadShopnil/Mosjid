import Image from 'next/image'
import React from 'react'

export default function SocialShare() {
    return (

        <div className="  flex items-center gap-4 text-[#D9E2DD]">
            <div className="border-r-2 border-gray-300 pr-3">
                <Image
                    src="/images/others/twiter.png"
                    alt='a1'
                    width={23}
                    height={23}
                />
            </div>
            <div className="border-r-2 border-gray-300 pr-3">
                <Image
                    src="/images/others/fb.png"
                    alt='a1'
                    width={15}
                    height={15}
                />
            </div>
            <div className="border-r-2 border-gray-300 pr-3">
                <Image
                    src="/images/others/whatsapp.png"
                    alt='a1'
                    width={20}
                    height={20}
                />
            </div>
            <div className="border-r-2 border-gray-300 pr-3">
                <Image
                    src="/images/others/printer2.png"
                    alt='a1'
                    width={22}
                    height={22}
                />
            </div>
            <div>
                <Image
                    src="/images/others/download2.png"
                    alt='a1'
                    width={22}
                    height={22}
                />
            </div>


        </div>

    )
}
