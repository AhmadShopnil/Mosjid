import Image from "next/image";
import React from "react";

export default function page() {
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

  const benefits = [
  {
    "id": 1,
    "content": "Learning Qur’an, Hadith, Fiqh, and Islamic history with academic career"
  },
  {
    "id": 2,
    "content": "Character development is rooted in prophetic teachings and Islamic values"
  },
  {
    "id": 3,
    "content": "Feel safe expressing their faith through dress, prayer, and beliefs"
  },
  {
    "id": 4,
    "content": "Builds confidence and pride in Islamic heritage"
  },
  {
    "id": 5,
    "content": "Emphasis on honesty, respect, humility, and responsibility"
  },
  {
    "id": 6,
    "content": "Learning to navigate modern society with Islamic principles"
  },
  {
    "id": 7,
    "content": "Teachers often serve as spiritual mentors as well as academic guides"
  },
  {
    "id": 8,
    "content": "National or international academic standards with Islamic studies and values"
  }
]


  return (
    <div>
      <div className=" relative">
        <div className="rounded-[30px] ">
          {/* Left top background image */}

          <div className="bg-[#EEF8E9] rounded-[30px] transition-all duration-500">
            <div className="relative rounded-[30px]  overflow-hidden">
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
                  Islamic School Development
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
            </div>

            {/* Buttons */}
            <div className="py-[30px] px-4 lg:px-24">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
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
      </div>

      {/*  */}

      <div className="pt-5">
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
            Time Line of Islamic School
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
            スラーム学校の タイムライン
          </h3>
        </div>
        <div className="w-[90%] lg:block hidden mx-auto h-[20px] mt-5">
          <Image
            src="/images/islamicSchool/frame.svg"
            width={1000}
            height={20}
            alt="frame"
            className="w-full object-contain"
          />
        </div>
        <div className="grid lg:grid-cols-6  xl:grid-cols-8 grid-cols-3 items-center justify-center sm:grid-cols-4 md:grid-cols-4 gap-[20px]">
          {timeLine?.map((item, index) => (
            <div key={index} className="relative w-34 text-center mt-20">
              <div>
                <div className=" ">
                  <img
                    src="/images/islamicSchool/r2.svg"
                    alt="islamic school"
                    className="absolute z-[-1] left-[4.5px] -top-12.5"
                  />
                  <span className="absolute text-center -top-6.25 left-0 right-0 font-medium text-[#B98C20]">
                    {item?.year}
                  </span>
                  <img
                    src="/images/islamicSchool/r3.svg"
                    alt="islamic school"
                    className=" -top-7.5 left-2 absolute z-[-1]"
                  />
                </div>
              </div>
              <span className=" text-center absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center px-2 font-bold text-[#B98C20]">
                {item?.event}
              </span>
              <img
                src="/images/islamicSchool/r.svg"
                alt="islamic school"
                className="z-50 w-34"
              />
            </div>
          ))}
        </div>
        {/* Islamic School facilities */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] mt-8 lg:grid-cols-3">
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
                    src="/images/islamicSchool/circle_frame1.svg"
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
        left-8
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
        ml-14
        sm:ml-16
        md:ml-24
        z-10
        flex
        h-[80px]
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

        {/* Islamic School facilities */}
        {/* Islamic school benefit */}
        <div className="mt-5">
          <div className="bg-[#F9FFF6]">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[40px]">
              {
                benefits?.map(benefit => 

              <div className="border-2 rounded-[20px] border-[#FFCE4D] p-2 ">
                <div key={benefit?.id} className="border-2 rounded-[20px] h-[180px] border-[#005312] flex flex-col items-center">
                  <Image
                    src={"/images/islamicSchool/frame2.svg"}
                    width={60}
                    height={60}
                    className=""
                    alt="islamic school"
                  />
                  <p className="text-center mt-2 text-[#005312]">
                    {" "}
                    {benefit?.content}
                  </p>
                </div>
              </div>

                )
              }

            </div>
          </div>
        </div>
        {/* Contact form */}
        <div>
          <div className="lg:p-5 p-3 rounded-[10px] mt-5 border-5 border-[#FFCE4D] bg-[#F9FFF6]">
            <h3 className="text-[#B98C20] text-2xl lg:text-4xl text-center font-normal">
              Suggestion Box / 提案箱{" "}
            </h3>
          </div>
          <div>
            <div className="p-[30px] border-[5px] mt-5 border-[rgba(255,206,77,1)] rounded-[10px] bg-[rgba(249,255,246,1)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[30px]">
              <div>
                {/* form */}
                <form>
                  <div className="flex flex-col gap-[20px]">
                    <div className="p-[1px] rounded-[10px] bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                      <input
                        type="text"
                        className="w-full rounded-[9px] p-[19px] outline-none bg-white"
                        placeholder="Name"
                      />
                    </div>
                    <div className="p-[1px] rounded-[10px] bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                      <input
                        type="number"
                        className="w-full rounded-[9px] p-[19px] outline-none bg-white"
                        placeholder="Phone"
                      />
                    </div>
                    <div className="p-[1px] rounded-[10px] bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                      <input
                        type="email"
                        className="w-full rounded-[9px] p-[19px] outline-none bg-white"
                        placeholder="Email"
                      />
                    </div>
                    <div className="p-[1px] rounded-[10px] bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                      <input
                        type="text"
                        className="w-full rounded-[9px] p-[19px] outline-none bg-white"
                        placeholder="Ask your subject"
                      />
                    </div>
                    <div className="p-[1px] rounded-[10px] bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                      <textarea className="w-full p-[19px] rounded-[9px] outline-none bg-white" />
                    </div>

                    <div>
                      <button className="pt-[10px] pr-[20px] pb-[10px] pl-[20px] w-full rounded-[10px] bg-[#3E8B18] text-white font-[700] transition-all duration-300 ease-in-out hover:opacity-90 hover:scale-[1.03]">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                {/* image */}
                <div className="">
                  {" "}
                  {/* full viewport height */}
                  <Image
                    src="/images/islamicSchool/contactImage.svg"
                    alt="Contact"
                    width={1000}
                    height={495}
                    className="object-cover " // ensures the image covers full width & height
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
