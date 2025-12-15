function FocusCard({ variant }) {
  const styles = {
    white: {
      bg: "bg-white",
      border: "border-2 border-[#8B9D4A]",
      bullet: "bg-[#8B9D4A]",
    },
    yellow: {
      bg: "bg-[#E8D78A]",
      border: "border-2 border-[#C5A844]",
      bullet: "bg-[#B8963C]",
    },
    green: {
      bg: "bg-[#8B9D4A]",
      border: "border-2 border-[#6B7D3A]",
      bullet: "bg-white",
    },
  }

  const s = styles[variant]
  const textColor = variant === "green" ? "text-white" : "text-gray-700"

  return (
    <div className={`flex-1 ${s.bg} ${s.border} rounded-xl p-3`}>
      <div className="bg-[#8B9D4A] text-white text-xs font-semibold px-3 py-1.5 rounded-md mb-3 text-center">
        Focus Areas
      </div>
      <ul className="space-y-2 mb-3">
        {[1, 2, 3, 4].map((i) => (
          <li key={i} className={`flex items-center gap-2 text-xs ${textColor}`}>
            <span className={`w-2 h-2 rounded-full ${s.bullet} flex-shrink-0`}></span>
            <span>Nazirah of the Quran (reci...</span>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-3">
        <button className="flex-1 bg-[#8B9D4A] text-white text-[10px] py-1.5 rounded-md font-medium">View More</button>
        <button className="flex-1 bg-[#C5A844] text-white text-[10px] py-1.5 rounded-md font-medium">
          See in Japanese
        </button>
      </div>
    </div>
  )
}

function LevelBox({ num, title, isRight }) {
  return (
    <div className="flex items-stretch bg-[#EEE9D1] border-2 border-[#8B9D4A] rounded-xl overflow-hidden">
      {!isRight && (
        <div className="flex-1 px-3 py-3 text-xs text-[#5A6B2A] font-medium text-right leading-tight flex items-center justify-end">
          {title}
        </div>
      )}
      <div className="bg-[#8B9D4A] text-white px-4 py-3 text-lg font-bold min-w-[50px] flex items-center justify-center">
        {num}
      </div>
      {isRight && (
        <div className="flex-1 px-3 py-3 text-xs text-[#5A6B2A] font-medium leading-tight flex items-center">
          {title}
        </div>
      )}
    </div>
  )
}

export default function IslamicSchoolCurriculum() {
  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      {/* Header */}
      <div className="bg-[#8B9D4A] text-white px-6 py-3 flex justify-between items-center rounded-t-xl">
        <span className="text-lg font-medium tracking-wide">Islamic School</span>
        <span className="text-lg font-medium tracking-wide">School Curriculum</span>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#F9F7F0] border-2 border-t-0 border-[#8B9D4A] rounded-b-xl p-5">
        {/* Curriculum Grid */}
        <div className="flex gap-3 items-center">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-3">
            <LevelBox num="01" title="Maktab Foundation" isRight={false} />
            <LevelBox num="02" title="Primary School + Hifz Continuation" isRight={false} />
            <LevelBox num="03" title="Elementary + Full Time Hifz" isRight={false} />
            <LevelBox num="04" title="Middle School + Junior Aalim" isRight={false} />
          </div>

          {/* Center Logo */}
          <div className="flex items-center justify-center px-2">
            <div className="relative w-28 h-28">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-[6px] border-[#8B9D4A]"></div>
              {/* Inner content */}
              <div className="absolute inset-2 rounded-full border-2 border-[#8B9D4A] bg-white flex flex-col items-center justify-center p-1">
                <div className="text-[5px] text-[#8B9D4A] text-center leading-tight font-medium">
                  Islamic School Educational Roadmap
                </div>
                {/* Mosque icon placeholder */}
                <div className="w-8 h-8 my-1 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#8B9D4A]" fill="currentColor">
                    <path d="M12 3c-1.5 2-3 4-3 6s1.5 3 3 3 3-1 3-3-1.5-4-3-6zm-5 8v8h2v-4h6v4h2v-8c0-1-1-2-2-2h-6c-1 0-2 1-2 2z" />
                  </svg>
                </div>
                <div className="text-[7px] font-bold text-[#8B9D4A] text-center">ISLAMIC SCHOOL</div>
                <div className="text-[6px] text-[#C5A844] font-bold">OSAKA JAPAN</div>
                <div className="text-[4px] text-[#8B9D4A]">Japanese Text</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-3">
            <LevelBox num="05" title="High School + Thanawiya Aama" isRight={true} />
            <LevelBox num="06" title="Senior High/ Pre University + Thanawiya Khasa" isRight={true} />
            <LevelBox num="07" title="University + Aaliya (Advanced Level)" isRight={true} />
            <LevelBox num="08" title="Postgraduate + Aalimiyyah & Takhasus" isRight={true} />
          </div>
        </div>

        {/* Bottom Detail Section */}
        <div className="mt-5 bg-[#EEE9D1] border-2 border-[#8B9D4A] rounded-xl overflow-hidden">
          {/* Section Header */}
          <div className="px-4 py-3 flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#8B9D4A]">01</span>
              <div className="relative">
                <div className="absolute -top-2 -left-1 bg-[#8B9D4A] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold z-10">
                  Z
                </div>
                <div className="pl-4">
                  <div className="text-sm font-semibold text-[#5A6B2A]">Zab & Nazirah Foundation</div>
                  <div className="text-xs text-[#5A6B2A]">Age 3-6:</div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#8B9D4A] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold z-10">
                Z
              </div>
              <div className="text-right pt-2">
                <div className="text-sm font-semibold text-[#5A6B2A]">Maktab Nazirah Foundation</div>
                <div className="text-xs text-[#5A6B2A]">Age 3-6:</div>
              </div>
            </div>
          </div>

          {/* Focus Areas Cards */}
          <div className="px-4 pb-4 flex gap-3">
            <FocusCard variant="white" />
            <FocusCard variant="yellow" />
            <FocusCard variant="green" />
          </div>
        </div>
      </div>
    </div>
  )
}
