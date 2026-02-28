import React from "react";
import Image from "next/image";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";

const Facilities = () => {
  const facilities = [
    "Dedicated Qur’an Classrooms",
    "Prayer Hall",
    "Science And Computer Labs",
    "Modest Dress Code",
    "Enforcement",
    "Certified Halal Meals",
    "Playgrounds Fields",
    "Health Clinic Station",
    "Islamic Library",
  ];

  return (
    <div className="pt-6 px-4 sm:px-0">
      <SectionTitleRow 
        leftTitle={"Islamic School Facilities"} 
        rightTitle={" イスラーム学校の施設"} 
      />
      
      {/* Grid Configuration: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-8 pt-5">
        {facilities?.map((facility, index) => (
          <div key={index} className="flex items-center justify-center">
            {/* Card Container */}
            <div className="relative flex items-center w-full max-w-[400px] h-[100px] sm:h-[114px]">
              
              {/* 1. The Green Decorative Background Box (shifted left) */}
              <div
                className="
                  absolute 
                  left-4 sm:left-6 
                  inset-y-0 
                  w-[90%] 
                  rounded-[20px] 
                  border-[3px] 
                  border-[#005312] 
                  bg-[#E5F5DE] 
                  z-0
                "
              />

              {/* 2. The Main White Text Box */}
              <div
                className="
                  relative
                  ml-12 sm:ml-20
                  flex-grow
                  h-[80%] sm:h-[90px]
                  flex
                  items-center
                  justify-center
                  rounded-[20px]
                  border-[3px]
                  border-[#FFCE4D]
                  bg-white
                  z-10
                  px-6
                  text-center
                  text-[#B98C20] 
                  font-medium
                  text-sm sm:text-base
                  shadow-sm
                "
              >
                {facility}
              </div>

              {/* 3. The Circle Icon (Floats on the far left) */}
              <div
                className="
                  absolute
                  -left-4
                  flex
                  h-14 w-14
                  sm:h-18 sm:w-18
                  md:h-20 md:w-20
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-[#005312]
                  bg-[#E5F5DE]
                  z-20
                "
              >
                <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                  <Image
                    src="/images/offerServices/islamicSchool/circle_frame1.svg"
                    alt="Icon"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;