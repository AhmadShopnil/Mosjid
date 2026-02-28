import React from "react";

const academicFocus = ["Basic literacy", "Numeracy", "General knowledge", "Early social skills"];
const religiousFocus = ["Qaida Nooraniyah", "Nazirah al-Qur'an", "Akhlaq (manners)", "Seerah stories"];
const outcomes = ["Islamic Etiquette", "Child ready for schooling", "Qur'an recitation fluency", "Spiritual Maturity"];

export default function CardCurriculum({ curriculum }) {
  return (
    <div className="w-full">

      {/* ================= DESKTOP / LARGE SCREEN ================= */}
      <div className="hidden lg:block h-[500px]">
        <div className="relative bg-[#EEF8E9] w-full h-[350px] border-8 border-[#FFCE4D] rounded-[110px]">

          {/* Header */}
          <div className="absolute left-20 right-20 top-6 flex justify-between">
            <div className="flex gap-8">
              <span className="text-[60px] font-bold text-[#B98C20]">
                {curriculum?.no}
              </span>

              <div className="space-y-1 pt-4">
                <p className="text-[20px] font-semibold text-[#B98C20]">
                  {curriculum?.title}
                </p>
                <p className="text-[20px] font-semibold text-[#B98C20]">
                  {curriculum?.ageGroup}
                </p>
              </div>
            </div>

            <div className="space-y-1 pt-4 text-right">
              <p className="text-[20px] font-semibold text-[#B98C20]">
                {curriculum?.titleJapanese}
              </p>
              <p className="text-[20px] font-semibold text-[#B98C20]">
                {curriculum?.ageGroupJapanese}
              </p>
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="absolute bg-white rounded-tl-[60px] w-[90%] h-[220px] -right-2 -bottom-2">
            <div className="w-full h-[221px] flex justify-end relative border-8 border-l-[#FFCE4D] border-t-[#FFCE4D] border-b-white border-r-white rounded-tl-[60px]">
              <div className="absolute w-[98%] top-8">
                <div className="grid grid-cols-3 gap-2">
                  <Card title="Academic Focus" items={academicFocus} />
                  <Card title="Religious Focus" items={religiousFocus} />
                  <Card title="Outcomes" items={outcomes} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================= MOBILE / SMALL SCREEN ================= */}
      <div className="lg:hidden bg-[#EEF8E9] border-4 border-[#FFCE4D] rounded-[30px] p-4 space-y-4">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <span className="text-[36px] font-bold text-[#B98C20]">
              {curriculum?.no}
            </span>

            <div>
              <p className="text-[16px] font-semibold text-[#B98C20]">
                {curriculum?.title}
              </p>
              <p className="text-[14px] text-[#B98C20]">
                {curriculum?.ageGroup}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[15px] font-semibold text-[#B98C20]">
              {curriculum?.titleJapanese}
            </p>
            <p className="text-[13px] text-[#B98C20]">
              {curriculum?.ageGroupJapanese}
            </p>
          </div>
        </div>

        {/* Cards stacked */}
        <div className="space-y-5 ">
          <Card title="Academic Focus" items={academicFocus} />
          <Card title="Religious Focus" items={religiousFocus} />
          <Card title="Outcomes" items={outcomes} />
        </div>
      </div>
    </div>
  );
}


function Card({ title, items }) {
    return (
        <div>

            <div
                className="w-full  bg-white relative pt-5 border-x-2 border-t-2 border-[#005312] rounded-tl-[20px] rounded-tr-[20px] "
            >
                <div
                    className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 text-white text-[13px] font-medium whitespace-nowrap
                 bg-[#52B920] rounded-[10px]"
                    style={{
                        top: "-18px",
                    }}
                >
                    <span className='text-[15px] lg:text-[18px]'> {title}</span>
                </div>

                {/* List Items */}
                <div className="px-4 pt-5 pb-4">
                    <ul className="space-y-2">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 border-b border-b-[#E0E0E0] pb-3 ">
                                <span className="w-4 h-4  rounded-full flex-shrink-0 bg-[#52B920]" />
                                <span className="text-[#333333] text-[15px] lg:text-[18px]">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>


            {/* Buttons */}
            <div className="flex gap-2 bg-white p-3 border-t-2 border-[#C9E9BA] shadow-xl rounded-bl-[20px] rounded-br-[20px]">
                {/* View in Details button */}
                <div className="relative flex-1">
                    <button
                        type="button"
                        aria-label="view"
                        className="w-full px-2 py-2 text-[12px] lg:text-[16px] text-[#3E8B18] font-bold rounded-[10px] bg-[#C9E9BA]"

                    >
                        View in Details
                    </button>

                </div>

                {/* View in Japanese button */}
                <div className="relative flex-1">
                    <button
                        type="button"
                        aria-label="view"
                        className="w-full px-2 py-2 text-[12px] lg:text-[16px] font-bold text-white rounded-[10px] bg-[#52B920]"

                    >
                        View in Japanese
                    </button>

                </div>
            </div>
        </div>
    )
}