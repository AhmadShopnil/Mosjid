"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/Shared/Container";
import CardCurriculum from "@/components/Services/IslamicSchool Curriculum/CardCurriculum";


const curriculums = [

  {
    no: "01",
    title: "Maktab Foundation",
    ageGroup: "Ages:3–6",
   titleJapanese: "マクタブ基礎課程",
    ageGroupJapanese: "Ages:3–6",
    academicFocus: ["Basic literacy", "Numeracy", "General knowledge", "Early social skills"],
    religiousFocus: ["Qaida Nooraniyah", "Nazirah al-Qur'an", "Akhlaq (manners)", "Seerah stories"],
    outcomes: ["Islamic Etiquette", "Child ready for schooling", "Qur'an recitation fluency", "Spiritual Maturity"]

  },
  {
    no: "02",
    title: "Maktab Foundation",
    ageGroup: "Ages:3–6",
   titleJapanese: "マクタブ基礎課程",
    ageGroupJapanese: "Ages:3–6",
    academicFocus: ["Basic literacy", "Numeracy", "General knowledge", "Early social skills"],
    religiousFocus: ["Qaida Nooraniyah", "Nazirah al-Qur'an", "Akhlaq (manners)", "Seerah stories"],
    outcomes: ["Islamic Etiquette", "Child ready for schooling", "Qur'an recitation fluency", "Spiritual Maturity"]

  },
  {
    no: "03",
    title: "Maktab Foundation",
    ageGroup: "Ages:3–6",
   titleJapanese: "マクタブ基礎課程",
    ageGroupJapanese: "Ages:3–6",
    academicFocus: ["Basic literacy", "Numeracy", "General knowledge", "Early social skills"],
    religiousFocus: ["Qaida Nooraniyah", "Nazirah al-Qur'an", "Akhlaq (manners)", "Seerah stories"],
    outcomes: ["Islamic Etiquette", "Child ready for schooling", "Qur'an recitation fluency", "Spiritual Maturity"]

  },
  {
    no: "04",
    title: "Maktab Foundation",
    ageGroup: "Ages:3–6",
   titleJapanese: "マクタブ基礎課程",
    ageGroupJapanese: "Ages:3–6",
    academicFocus: ["Basic literacy", "Numeracy", "General knowledge", "Early social skills"],
    religiousFocus: ["Qaida Nooraniyah", "Nazirah al-Qur'an", "Akhlaq (manners)", "Seerah stories"],
    outcomes: ["Islamic Etiquette", "Child ready for schooling", "Qur'an recitation fluency", "Spiritual Maturity"]

  },

]




export default function IslamicCurriculum() {
  return (

    <div className=" px-1 h-auto ">
      {/* Main Grid */}
      <div className=" border-2 border-[#FFCE4D] rounded-[40px] p-4 bg-[#F9FFF2]">

        {/* big screen */}
        <div className=" hidden xl:flex">
          {/* Left Column */}
          <div className="space-y-4 w-[40%] ">
            {leftLevels.map((item) => (
              <LevelCard key={item.no} {...item} align="left" />
            ))}
          </div>

          {/* Center Logo */}
          <div className="w-[25%] px-3  inset-0 flex items-center justify-center pointer-events-none ">
            <div className=" rounded-full ">
              <Image
                src="/images/offerServices/islamicSchoolIcon.svg"
                alt="Islamic School"
                width={240}
                height={240}
                className=" w-[220px] h-[220px] 2xl:w-[240px] 2xl:h-[240px] "
              />
            </div>
          </div>


          {/* Right Column */}
          <div className="space-y-4 w-[40%] ">
            {rightLevels.map((item) => (
              <LevelCardReverse key={item.no} {...item} align="right" />
            ))}
          </div>
        </div>

        {/* small screen */}
        <div className="xl:hidden flex flex-col items-center justify-center">
          <div className="space-y-4 w-full ">
            {leftLevels.map((item) => (
              <LevelCardMobile key={item.no} {...item} align="left" />
            ))}
          </div>
          <div className=" rounded-full ">
            <Image
              src="/images/offerServices/islamicSchoolIcon.svg"
              alt="Islamic School"
              width={240}
              height={240}
              className=" w-[240px] h-[240px] "
            />
          </div>
          <div className="space-y-4 w-full ">
            {rightLevels.map((item) => (
              <LevelCardMobile key={item.no} {...item} align="left" />
            ))}
          </div>


        </div>


      </div>


      {/* Bottom Section */}
      <div
        className="mt-10 flex flex-col gap-10  "
      >
        {
          curriculums?.map((curriculum, i) => <CardCurriculum key={i} curriculum={curriculum} />)
        }

  
      </div>

    </div>

  );
}

function LevelCard({ no, title, align }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex   items-center w-full"
    >

      <div className="flex items-center justify-end border-y border-l border-[#FFCE4D] rounded-l-[100px] p-3 w-full
     h-[100px] 2xl:h-[120px] bg-white">
        <p className="text-[18px] 2xl:text-[20px] w-[90%]  text-right font-bold text-[#B98C20]">{title}</p>
      </div>

      <div>
        <div className="bg-white w-[120px] h-[120px] 2xl:w-[140px] 2xl:h-[140px] flex items-center justify-center rounded-[10px] border
       border-[#FFCE4D] text-[#B98C20] font-bold text-[36px] ">
          <span>{no}</span>
        </div>
      </div>

    </motion.div>
  );
}

function LevelCardReverse({ no, title, align }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex   items-center w-full"
    >

      <div>
        <div className="bg-white w-[120px] h-[120px] 2xl:w-[140px] 2xl:h-[140px] flex items-center justify-center rounded-[10px] border
       border-[#FFCE4D] text-[#B98C20] font-bold text-[36px] ">
          <span>{no}</span>
        </div>
      </div>
      <div className="flex items-center justify-start border-y border-r border-[#FFCE4D] rounded-r-[100px] p-3 w-full
       h-[100px] 2xl:h-[120px] bg-white">
        <p className="text-[18px] 2xl:text-[20px] w-[90%]  text-left font-bold text-[#B98C20]">{title}</p>
      </div>


    </motion.div>
  );
}

function LevelCardMobile({ no, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white border border-[#FFCE4D] rounded-xl p-4 flex gap-4 items-center"
    >
      <div className="w-[60px] h-[60px] rounded-lg border border-[#FFCE4D] flex items-center justify-center text-[#B98C20] text-xl font-bold">
        {no}
      </div>
      <p className="font-semibold text-[#B98C20] text-sm leading-snug">
        {title}
      </p>
    </motion.div>
  );
}





const leftLevels = [
  { no: "01", title: "Maktab Foundation" },
  { no: "02", title: "Primary School + Hifz Continuation" },
  { no: "03", title: "Elementary + Full Time Hifz" },
  { no: "04", title: "Middle School + Junior Aalim" },
];

const rightLevels = [
  { no: "05", title: "High School + Thanaviya Aamma" },
  { no: "06", title: "Senior High / Pre-University + Thanaviya Khassa" },
  { no: "07", title: "University + Aaliya (Advanced Level)" },
  { no: "08", title: "Postgraduate + Aalimiyyah & Takhassus" },
];