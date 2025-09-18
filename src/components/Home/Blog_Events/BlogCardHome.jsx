import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowUpRightCircle } from "react-icons/bs";


export default function BlogCardHome() {
  return (
    <div className="bg-[#EEF8E9] rounded-2xl flex gap-5 p-3">
      {/* Image Container */}
      <div className="rounded-xl w-[140px] h-[130px] relative flex-shrink-0">
        <Image
          src="/images/blogEvents/1.png"
          alt="a1"
          fill
          className="object-cover rounded-xl" // Ensures image fits perfectly
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between py-1">
       <div>
         <p className="text-[#333333] text-sm mb-1">August 14th, 2025</p>
        <p className="text-[#333333] font-bold text-lg">
          Lorem ipsum dolor sit amet, consectet ur Pellentesque
        </p>
       </div>
        <Link href="/" className="mt-2 text-[#001609] text-sm font-bold 
        flex gap-2 items-center">
          Read More
           <BsArrowUpRightCircle className="text-[16px] text-[#00401A] font-bold"  />
        </Link>
       
      </div>
    </div>
  );
}
