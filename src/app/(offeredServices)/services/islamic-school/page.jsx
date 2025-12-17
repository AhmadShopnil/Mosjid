import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="max-h-[480px] h-full">
        <div className="relative">
   <div className="relative w-[148px] h-[148px] z-10">
  <Image
    src="/images/islamicSchool/eclips.svg"
    alt="Eclips Background"
    fill
    className="object-contain"
  />
</div>


          <div className="bg-[#EEF8E9] rounded-[30px] transition-all duration-500">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
              {/* Text */}
              <h1
                className="
        text-3xl 
        sm:text-4xl 
        md:text-5xl 
        lg:text-6xl 
        xl:text-7xl 
        font-bold 
        md:pl-[30.63px]
        bg-gradient-to-b 
        from-[#3198A0] 
        to-[#51F909] 
        bg-clip-text 
        text-transparent
        text-center md:text-left
        transition-all duration-500 ease-in-out
        hover:scale-[1.02]
      "
              >
                Islamic School Development Overview
              </h1>

              {/* Image */}
              <div
                className="
        relative 
        w-[260px] h-[180px]
        sm:w-[320px] sm:h-[220px]
        md:w-[399px] md:h-[263px]
        shrink-0
        transition-all duration-500 ease-in-out
        hover:scale-[1.02]
      "
              >
                <Image
                  src="/images/islamicSchool/islamicSchool.svg"
                  alt="Islamic School"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex py-[30px] flex-wrap justify-center gap-4">
              {/* First Button */}
              <button className="py-[14px] px-4 rounded-[16px] bg-[#52B920] text-[#333333] font-[700] transition-all duration-300 ease-in-out hover:opacity-90 hover:scale-[1.03]">
                Timeline of Islamic School
              </button>

              {/* Second Button */}
              <button className="group relative inline-block rounded-[16px] p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909] transition-all duration-300 ease-in-out hover:scale-[1.03]">
                <span
                  className="
          block
          rounded-[15px]
          bg-white
          px-4
          py-[14px]
          font-bold
          text-[#333333]
          transition-all
          duration-300
          ease-in-out
          group-hover:bg-gradient-to-b
          group-hover:from-[#3198A0]
          group-hover:to-[#51F909]
          group-hover:text-white
          group-hover:scale-[1.03]
        "
                >
                  Facilities of Islamic School
                </span>
              </button>

              {/* Third Button */}
              <button className="group relative inline-block rounded-[16px] p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909] transition-all duration-300 ease-in-out hover:scale-[1.03]">
                <span
                  className="
          block
          rounded-[15px]
          bg-white
          px-4
          py-[14px]
          font-bold
          text-[#333333]
          transition-all
          duration-300
          ease-in-out
          group-hover:bg-gradient-to-b
          group-hover:from-[#3198A0]
          group-hover:to-[#51F909]
          group-hover:text-white
          group-hover:scale-[1.03]
        "
                >
                  Benefits of Islamic School
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
