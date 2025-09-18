import React from 'react'
import Image from "next/image";
import { Download } from "lucide-react";

  const fatwahs = [
    { id: 1, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur...", link: "#" },
    { id: 2, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur...", link: "#" },
    { id: 3, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur...", link: "#" },
    { id: 4, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur...", link: "#" },
    { id: 5, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur...", link: "#" },
    { id: 6, title: "Lorem ipsum dolor sit amet  dolor sit amet, consectetur...", link: "#" },
  ];

export default function FatwahBox() {
  return (
      
      <div className="  px-4 py-10 relative">
        
        {/* Top Section - Logo & Arabic Title */}
        <div className="max-w-6xl   mx-auto flex
         justify-between items-center mb-8">
          {/* Logo */}
          <div>
            <Image
              src="/images/fatwah/fatwahHeader.png" 
              alt="Logo"
              width={160}
              height={100}
            />
          </div>

          {/* Arabic Heading */}
          <div className=" flex flex-col justify-end items-end gap-3 ">
             <Image
              src="/images/fatwah/fatwahArabicheader.png" 
              alt="Logo"
              width={400}
              height={50}
            />
             <Image
              src="/images/fatwah/arabic3.png" 
              alt="Logo"
              width={150}
              height={36}
            />
          </div>

         
        </div>

        {/* Fatwah Content Box */}
        <div className="max-w-6xl  mx-auto relative bg-white rounded-2xl shadow-lg overflow-hidden p-6 md:p-12">
          
          {/* Mosque Image Positioned at Bottom Right */}
          <div className="absolute bottom-0 right-0 w-[180px] md:w-[250px] lg:w-[400px]">
            <Image
              src="/images/fatwah/fatwahbg.png"
              alt="Mosque"
              width={400}
              height={400}
              className="object-contain pointer-events-none select-none"
            />
          </div>

          {/* Content Area */}
          <div className="relative  w-[70%] z-10">
           {/* heading */}
             <div className='flex justify-between mb-6 '>
                 <div className='flex gap-2 items-center   gradient-border_b  pb-2  '>
                     <Image
                     src="/images/fatwah/pen.png"
                     alt='a1'
                     width={40}
                     height={40}
                     />
                     <h3 className='text-3xl font-bold text-[#00401A]'>
                         Fatwah
                     </h3>
                 </div>
                 {/* arabic text */}
                 <div className="flex gap-3">
               <Image
               src="/images/fatwah/fatwahArabic.png"
               alt='a1'
               width={180}
               height={50}
               />
               <button className="px-6 py-2 text-base font-bold text-[#00401A] border border-[#00401A] rounded-full hover:bg-gray-100 transition-colors">
               View More
              </button>
                 </div>

             </div>
            {/* List */}
            <ul className="space-y-4">
              {fatwahs.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border bg-white
                   border-[#D9E2DD] p-2 rounded-full relative z-10"
                >
                  {/* Left Content */}
                  <div className="flex items-center gap-4">
                    <div
                    className=" border border-[#E6ECE8] rounded-full p-2 "
                    >
                      <Image
                        src="/images/fatwah/pen.png"
                        alt="icon"
                        width={50}
                        height={50}
                        />
                    </div>
                    <div>
                      <p className="text-[#00401A] truncate w-[180px] md:w-[420px] 
                      text-lg font-bold">
                        {item.title}
                      </p>
                      <a
                        href={item.link}
                        className="text-[#00401A] font-bold text-sm hover:text-[#F7BA2A]"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button className="flex items-center gap-2 px-5 py-2.5 cursor-pointer gradient-border3 
                  rounded-[100px] text-[#00401A] font-bold text-base">
                    Download Now
                    <Download className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  )
}
