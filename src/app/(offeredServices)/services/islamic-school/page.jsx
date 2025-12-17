import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="max-h-[480px] h-full relative">
        <div className="relative block rounded-[30px] overflow-hidden">
          {/* Left top background image */}
          <div className="absolute left-[-59px] top-[-70px] z-10">
            <Image
              src="/images/islamicSchool/eclips.svg"
              alt="Eclips Background"
              width={148}
              height={148}
              className="object-contain"
            />
          </div>

          {/* Middle left image */}
          <div className="absolute top-[50%] left-[-20px] z-10">
            <Image
              src="/images/islamicSchool/eclipse2.svg"
              alt="Eclips Background"
              width={35}
              height={36}
              className="object-contain"
            />
          </div>

          <div className="bg-[#EEF8E9] rounded-[30px] transition-all duration-500">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
              {/* Text */}
              <h2
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
              </h2>

              {/* Right-side image */}
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

            {/* Buttons */}
            <div className="flex py-[30px] flex-wrap justify-center gap-4">
              <button className="py-[14px] px-4 rounded-[16px] bg-[#52B920] text-[#333333] font-[700] transition-all duration-300 ease-in-out hover:opacity-90 hover:scale-[1.03]">
                Timeline of Islamic School
              </button>

              <button className="group relative inline-block rounded-[16px] p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909] transition-all duration-300 ease-in-out hover:scale-[1.03]">
                <span className="block rounded-[15px] bg-white px-4 py-[14px] font-bold text-[#333333] transition-all duration-300 ease-in-out group-hover:bg-gradient-to-b group-hover:from-[#3198A0] group-hover:to-[#51F909] group-hover:text-white group-hover:scale-[1.03]">
                  Facilities of Islamic School
                </span>
              </button>

              <button className="group relative inline-block rounded-[16px] p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909] transition-all duration-300 ease-in-out hover:scale-[1.03]">
                <span className="block rounded-[15px] bg-white px-4 py-[14px] font-bold text-[#333333] transition-all duration-300 ease-in-out group-hover:bg-gradient-to-b group-hover:from-[#3198A0] group-hover:to-[#51F909] group-hover:text-white group-hover:scale-[1.03]">
                  Benefits of Islamic School
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5">
        <div className="flex flex-wrap justify-between items-center">
          <h3 className="relative text-4xl font-bold text-[#B98C20] pb-5 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#00401A] after:to-white">
  Time Line of Islamic School
</h3>

          <h3 className="relative text-4xl font-bold text-[#B98C20] pb-5 after:absolute after:right-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-white after:to-[#00401A]">
            スラーム学校の タイムライン
          </h3>
        </div>

    <div className="w-full h-[20px] mt-5 relative">
 <Image
  src="/images/islamicSchool/frame.svg"
  width={1000}   // any large number works for responsive scaling
  height={20}
  alt="frame"
  className="w-full object-contain"
/>

</div>

      </div>
    </div>
  );
}
