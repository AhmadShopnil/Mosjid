import React from "react";
import Image from "next/image";
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
    <div className="pt-6">
      <div className="flex flex-wrap justify-between items-center">
        <h3
          className=" text-3xl md:text-3xl
          lg:text-4xl  font-bold text-[#B98C20] pb-5
          bg-[linear-gradient(to_right,#00401A,white)]
          bg-no-repeat
          bg-left-bottom
          bg-[length:100%_2px]
        "
        >
          Islamic School Facilities
        </h3>

        <h3
          className=" text-3xl md:text-3xl
          lg:text-4xl font-bold text-[#B98C20] pt-5 md:pt-0  pb-5
          bg-[linear-gradient(to_left,#00401A,white)]
          bg-no-repeat
          bg-right-bottom
          bg-[length:100%_2px]
        "
        >
          イスラーム学校の施設
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] pt-6 lg:grid-cols-3">
        {facilities?.map((facility, index) => (
          <div key={index}>
            <div className="relative flex items-center w-full max-h-[100px] sm:max-h-[114px]">
              {/* Circle icon */}
              <div
                className="
                absolute
                left-0
                flex
                h-14 w-14
                sm:h-16 sm:w-16
                md:h-20 md:w-20
                items-center
                justify-center
                rounded-full
                border-4
                border-[#005312]
                bg-[#E5F5DE]
              "
              >
                <Image
                  src="/images/offerServices/islamicSchool/circle_frame1.svg"
                  alt="Icon"
                  width={40}
                  height={40}
                  className="
                  object-contain
                  w-6 h-6
                  sm:w-8 sm:h-8
                  md:w-12 md:h-12
                "
                />
              </div>

              {/* Background box */}
              <div
                className="
                absolute
                -left-2
                md:left-8
                sm:left-10
                h-[90px]
                sm:h-[100px]
                md:h-[114px]
                w-full
                rounded-[20px]
                border-[3px]
                border-[#005312]
                bg-[#E5F5DE]
                z-[-1]
                sm:max-w-[308.54px]
              "
              />

              {/* Text box */}
              <div
                className="
                ml-17
                mr-4
                md:mr-auto
                sm:ml-16
                md:ml-24
                z-10
                flex
                h-[60px]
                sm:h-[90px]
                md:h-[94px]
                w-full
                items-center
                justify-center
                rounded-[20px]
                border-[3px]
                border-[#FFCE4D]
                bg-white
                text-center
                text-[#FFCE4D]
                sm:max-w-[303px]
                px-3
                sm:px-4
                text-sm
                sm:text-base
              "
              >
                {facility}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
