import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowUpRightCircle } from "react-icons/bs";


export default function BlogCardHome() {
  const description="Lorem ipsum dolor sit amet, consectet ur Pellentesque, Lorem ipsum dolor sit amet, consectet ur Pellentesque"
  return (
    <div className="bg-[#EEF8E9] rounded-2xl flex gap-3 sm:gap-4 md:gap-5 p-3">
      {/* Image Container */}
      <div className="rounded-xl w-[90px] h-[90px] sm:w-[140px] sm:h-[130px] 
      relative flex-shrink-0">
        <Image
          src="/images/blogEvents/1.png"
          alt="a1"
          fill
          className="object-cover rounded-xl" 
        />
        
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between sm:py-1">
       <div>
         <p className="text-[#333333] text-xs sm:text-sm mb-1">August 14th, 2025</p>
        <p className="hidden sm:flex text-[#333333] font-semibold md:font-bold 
        text-sm sm:text-lg ">
         {description.slice(0,55)}
        </p>
        <p className="flex sm:hidden text-[#333333] font-semibold md:font-bold 
        text-sm sm:text-lg ">
         {description.slice(0,30)}
        </p>
       </div>
        <Link href="/" className="sm:mt-2 text-[#001609] font-semibold md:font-bold 
        flex gap-2 items-center text-xs sm:text-sm ">
          Read More
           <BsArrowUpRightCircle className="text-[16px] text-[#00401A] font-bold"  />
        </Link>
       
      </div>
    </div>
  );
}
