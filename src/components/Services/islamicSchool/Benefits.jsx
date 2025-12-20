import React from "react";
import Image from "next/image";
const Benefits = () => {
  const benefits = [
    {
      id: 1,
      content:
        "Learning Qur’an, Hadith, Fiqh, and Islamic history with academic career",
    },
    {
      id: 2,
      content:
        "Character development is rooted in prophetic teachings and Islamic values",
    },
    {
      id: 3,
      content:
        "Feel safe expressing their faith through dress, prayer, and beliefs",
    },
    {
      id: 4,
      content: "Builds confidence and pride in Islamic heritage",
    },
    {
      id: 5,
      content: "Emphasis on honesty, respect, humility, and responsibility",
    },
    {
      id: 6,
      content: "Learning to navigate modern society with Islamic principles",
    },
    {
      id: 7,
      content:
        "Teachers often serve as spiritual mentors as well as academic guides",
    },
    {
      id: 8,
      content:
        "National or international academic standards with Islamic studies and values",
    },
  ];

  return (
    <div>
      <div className="">
        <div className="bg-[#F9FFF6] mt-10">
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
            Islamic School Benefit 
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
           イスラーム学校の利点
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[40px] pt-5">
            {benefits?.map((benefit) => (
              <div
                key={benefit?.id}
                className="border-2 rounded-[20px] border-[#FFCE4D] p-2 "
              >
                <div className="border-2 rounded-[20px] h-[180px] border-[#005312] flex flex-col items-center">
                  <Image
                    src={"/images/offerServices/islamicSchool/frame2.svg"}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
