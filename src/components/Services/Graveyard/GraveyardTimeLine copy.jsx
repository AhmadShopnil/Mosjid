import React from "react";
import Image from "next/image";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";

const GraveyardTimeLine = ({ timeLines }) => {


  return (
    <div className="pt-6">
      <div className="mb-8 xl:mb-0">
        <SectionTitleRow leftTitle={"Timeline of Graveyard"} rightTitle={"墓地のタイムライン"} />
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
      <div className="flex flex-wrap gap-3 md:gap-4 xl:gap-6 items-center ">
        {timeLines?.map((item, index) => (
          <div key={index} className="relative w-34 text-center mt-8">
            <div>

              <div className=" ">
                <img
                  src="/images/offerServices/islamicSchool/r2.svg"
                  alt="islamic school"
                  className="absolute z-[-1] left-[4.5px] -top-12.5"
                />
                <span className="absolute text-center -top-6.25 left-0 right-0 font-medium text-[#B98C20]">
                  {item?.sub_title}
                </span>
                <img
                  src="/images/offerServices/islamicSchool/r3.svg"
                  alt="islamic school"
                  className=" -top-7.5 left-2 absolute z-[-1]"
                />
              </div>
            </div>
            <span className=" text-center absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center px-2 font-bold text-[#B98C20]">
              {item?.title}
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

export default GraveyardTimeLine;
