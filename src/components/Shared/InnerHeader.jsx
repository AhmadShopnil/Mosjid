import Image from 'next/image'
import React from 'react'

export default function InnerHeader({ title, image }) {
  return (
    <div className="bg-[#52B920] h-[85px] text-white px-4 py-4 rounded-lg flex justify-between items-center shadow-md">
      <h1 className="text-4xl">{title}</h1>

      <div className="hidden sm:flex justify-end items-center">
        <Image
          src={image}
          alt="Logo"
          className="object-contain h-auto w-auto max-h-[70px] max-w-full brightness-0 invert"
          quality={100}
          width={0}
          height={0}
          sizes="auto"
        />
      </div>
    </div>
  )
}
