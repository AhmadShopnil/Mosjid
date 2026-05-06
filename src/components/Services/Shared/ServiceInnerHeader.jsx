"use client"

import Image from 'next/image'
import React from 'react'

export default function ServiceInnerHeader({ title, title2 }) {
    return (
        <div className="bg-[#52B920] h-auto sm:h-[65px] md:h-[85px] text-white px-4 py-4 rounded-lg flex justify-between items-center shadow-md">
            <h1 className="text-2xl sm:text-3xl  md:text-3xl">{title}</h1>
            <h1 className="text-2xl sm:text-3xl  md:text-3xl">{title2}</h1>
            {/* <div className="hidden sm:flex justify-end items-center">
     
      </div> */}
        </div>
    )
}
