import React from 'react'
import Image from "next/image";
import { Download } from "lucide-react";

  const fatwahs = [
    { id: 1, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur", link: "#" },
    { id: 2, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur", link: "#" },
    { id: 3, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur", link: "#" },
    { id: 4, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur", link: "#" },
    { id: 5, title: "Lorem ipsum dolor sit amet dolor sit amet, consectetur", link: "#" },
    { id: 6, title: "Lorem ipsum dolor sit amet  dolor sit amet, consectetur", link: "#" },
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
              className='hidden sm:flex'
            />
               <Image
              src="/images/fatwah/fatwahHeader.png" 
              alt="Logo"
              width={110}
              height={80}
              className='flex sm:hidden'
            />
          </div>

          {/* Arabic Heading */}
         <div>
          {/* for big screen */}
           <div className="hidden sm:flex  flex-col justify-end items-end gap-3 ">
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
          {/* for small screen */}
           <div className=" flex sm:hidden flex-col justify-end items-end gap-3 ">
             <Image
              src="/images/fatwah/fatwahArabicheader.png" 
              alt="Logo"
              width={210}
              height={50}
            />
             <Image
              src="/images/fatwah/arabic3.png" 
              alt="Logo"
              width={120}
              height={30}
            />
          </div>
         </div>

         
        </div>

        {/* Fatwah Content Box */}
        <div className="max-w-6xl  mx-auto relative bg-white 
        rounded-2xl shadow-lg overflow-hidden p-4 md:p-12"
        style={{
          background: `
            linear-gradient(to right, 
              rgba(255,255,255,0) 0%,   /* top-left start */
              rgba(244,231,203,1) 100%  /* top-right */
            ),
            linear-gradient(to top, 
              rgba(208,255,228,1) 0%,   /* bottom-left */
              rgba(255,255,255,1) 100%  /* bottom-right */
            )
          `,
          backgroundBlendMode: "screen",
        }}
    // style={{
    //   background: "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(208,255,228,1) 40%, rgba(244,231,203,1) 70%, rgba(255,255,255,1) 100%)",
    // }}
        >    
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
          <div className="relative  w-full lg:w-[70%] z-10 items-center">
           {/* heading */}
             <div className='flex justify-between mb-6 '>
                 <div className='flex gap-2 items-center   gradient-border_b  pb-2  '>
                     <Image
                     src="/images/fatwah/pen.png"
                     alt='a1'
                     width={40}
                     height={40}
                     />
                     <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]'>
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
               className='hidden sm:flex'
               />
                {/* <Image
               src="/images/fatwah/fatwahArabic.png"
               alt='a1'
               width={100}
               height={30}
               className='flex sm:hidden'
               /> */}
              <div className=' my-auto'>   
              <button className="px-5 sm:px-6 py-2  text-sm sm:text-base
                font-bold text-[#00401A] border border-[#00401A] rounded-full
                 hover:bg-gray-100 transition-colors">
               View More
              </button>
              </div>

                 </div>

             </div>
            {/* List */}
            <ul className="space-y-4">
              {fatwahs.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border bg-white
                   border-[#D9E2DD] p-1.5 md:p-2 rounded-full relative z-10"
                >
                  {/* Left Content */}
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div
                    className=" border border-[#E6ECE8] rounded-full p-1.5 md:p-2 "
                    >
                      <Image
                        src="/images/fatwah/pen.png"
                        alt="icon"
                        width={50}
                        height={50}
                        className='hidden sm:flex'
                        />
                         <Image
                        src="/images/fatwah/pen.png"
                        alt="icon"
                        width={40}
                        height={40}
                        className='flex sm:hidden'
                        />
                    </div>
                    <div>
                      <p className="text-[#00401A] truncate w-[110px] sm:w-[250px] md:w-[420px] 
                     text-sm md:text-lg font-bold">
                        {item.title}
                      </p>
                      <a
                        href={item.link}
                        className="text-[#00401A] font-bold text-xs md:text-sm hover:text-[#F7BA2A]"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button className="flex items-center gap-2 px-4 md:px-5 py-2.5 cursor-pointer gradient-border3 
                  rounded-[100px] text-[#00401A] font-bold text-xs sm:text-sm md:text-lg">
                    Download
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
