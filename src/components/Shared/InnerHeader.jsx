import Image from 'next/image'
import React from 'react'

export default function InnerHeader({title,image}) {
    return (
       
            <div className="bg-[#52B920] h-[85px] text-white px-6 py-4 rounded-lg  flex justify-between items-center shadow-md">
                <h1 className="text-4xl ">{title}</h1>
                <Image
                src={image}
                    // src="/images/fatwah/fatwaharbic_white.png"
                    alt="Logo"
                    width={200}
                    height={50}
                    className='hidden sm:flex w-[215px] h-[50px]'
                />
            </div>
       
    )
}
