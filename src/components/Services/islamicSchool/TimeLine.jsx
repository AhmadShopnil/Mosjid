import React from "react";
import Image from "next/image";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";

const TimeLine = () => {
  const timeLine = [
    { year: "2030", event: "Campaign Started" },
    { year: "2030 Onward", event: "Community Engagement for Madrasa" },
    { year: "2031–2034", event: "Land Assessment" },
    { year: "2035", event: "Land Purchase Finalized" },
    { year: "2035 Onward", event: "Motivating Children to learn Deen" },
    { year: "2036", event: "Construction phase begins" },
    { year: "2036–2044", event: "Meeting all future needs" },
    { year: "2045", event: "Fully Built & Operational" },
  ];

  return (
    <div className="pt-6">
   <div className="mb-8 xl:mb-0">
       <SectionTitleRow leftTitle={"Time Line of Islamic School"} rightTitle={"スラーム学校の タイムライン"} />
   </div>
      <div className="w-[90%] xl:block hidden mx-auto h-[20px] mt-5 mb-8">
        <Image
          src="/images/offerServices/islamicSchool/frame.svg"
          width={1000}
          height={20}
          alt="frame"
          className="w-full object-contain"
        />
      </div>
      <div className="flex flex-wrap gap-8 items-center ">
        {timeLine?.map((item, index) => (
          <div key={index} className="relative w-34 text-center mt-8">
            <div>

              <div className=" ">
                <img
                  src="/images/offerServices/islamicSchool/r2.svg"
                  alt="islamic school"
                  className="absolute z-[-1] left-[4.5px] -top-12.5"
                />
                <span className="absolute text-center -top-6.25 left-0 right-0 font-medium text-[#B98C20]">
                  {item?.year}
                </span>
                <img
                  src="/images/offerServices/islamicSchool/r3.svg"
                  alt="islamic school"
                  className=" -top-7.5 left-2 absolute z-[-1]"
                />
              </div>
            </div>
            <span className=" text-center absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center px-2 font-bold text-[#B98C20]">
              {item?.event}
            </span>
            <img
              src="/images/offerServices/islamicSchool/r.svg"
              alt="islamic school"
              className="z-50 w-34"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
