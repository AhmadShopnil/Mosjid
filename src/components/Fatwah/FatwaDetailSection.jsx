"use client";
import React from "react";
import { FaWhatsapp, FaFacebookMessenger, FaRegThumbsUp, FaDownload } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { Download } from "lucide-react";

export default function FatwaDetailSection() {
  return (
    <section className=" ">
      {/* Header Section */}
      <div className="flex justify-between items-center flex-wrap gap-2 bg-[#D9E2DD] h-[80px]  rounded-[10px] pl-4 md:pl-6
      pr-2 
      ">
        <div className="flex items-center gap-4  h-[80px] ">
          <p className="h-full flex items-center text-base text-[#000000] font-medium border-r border-[#B0C4B8] pr-4">
            <span className="">Fatwa No : 01</span>
          </p>

          <p className="h-full flex items-center text-base text-[#000000] font-medium border-r border-[#B0C4B8] pr-4">
            <span className="">Date : 28-09-2025</span>
          </p>

        </div>

        {/* Font Size Controls */}
        <div className="flex items-center gap-2 bg-[#E6ECE8] px-3 py-1 rounded-md text-[#000000] font-medium text-4xl
        h-[65px]
        ">
          <button className="px-2 hover:text-green-700 transition cursor-pointer">+</button>
          <span className="px-3">Aa</span>
          <button className="px-2 hover:text-green-700 transition cursor-pointer">-</button>
        </div>
      </div>


      {/* main content */}
      <div className="bg-white border border-[#DDEEDC] rounded-[20px] p-4 md:p-6 shadow-sm mt-7">

        {/* Title */}
        <h2 className="text-[#00401A] text-lg md:text-2xl  mt-4 mb-6 ">
          男性が最初の妻の要求を満たすために二番目の妻と三度離婚した場合...
        </h2>

        {/* Fatwa Body */}
        <div className=" text-sm md:text-base leading-relaxed text-[#595959]">
          尊敬するムフティ・サヒブ様！教会前に二度目の結婚をしました。二度目の妻には二人の子供がいます。最近、最初の妻がこのことを知り、
          「私に言って！もし私の他に妻がいたら、この妻は離婚するわ」と言いました。そこで私は、「もし私の他に妻がいたら、私はあなたを離婚する。
          離婚、離婚、離婚」と答えました。
          <br />
          こうして「離婚」という言葉を3回繰り返しました。
          <br />
          注：ここで言いたいのは、私は他に伴侶を持っているという具体的な意図を持っていなかったわけではありません。さて、ムフティ・サヒブから知っておいていただきたいのは、次の点です：
          <br />
          1. この件で三度の離婚は宣言されたか？
          <br />
          2. もしそうでなければ、またはどうするべきか？
          <br />
          قال الله تعالى: {`"فَإِن طَلَّقَهَا فَلَا تَحِلُّ لَهُ مِن بَعْدُ حَتَّىٰ تَنكِحَ زَوْجًا غَيْرَهُ"`} (سورة البقرة، الآية: 230)
          <br />
          وفي سنن ابن ماجة: قال ابن عباس رضي الله عنهما: قال رسول الله ﷺ: "أيما امرأة نكحت بغير إذن وليها فنكاحها باطل" (كتاب النكاح).
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center flex-wrap mt-4">
          {/* Social & Reactions */}
          <div className="flex items-center gap-4 text-green-600 text-lg">
            <FaWhatsapp className="cursor-pointer hover:text-green-800 transition" />
            <FaFacebookMessenger className="cursor-pointer hover:text-green-800 transition" />
            <BsChatDots className="cursor-pointer hover:text-green-800 transition" />
            <div className="flex items-center gap-1 text-[#00401A] text-sm">
              <FaRegThumbsUp className="text-green-600" /> 10
            </div>
            <div className="flex items-center gap-1 text-[#00401A] text-sm">
              <FaRegThumbsUp className="text-green-600" /> 10
            </div>
          </div>

          {/* Download Button */}
          <button className="flex items-center gap-2 px-4 md:px-5 py-3 cursor-pointer gradient-border3 
                  rounded-[100px] text-[#00401A] font-bold text-xs sm:text-sm md:text-lg ">
            Download Now
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
