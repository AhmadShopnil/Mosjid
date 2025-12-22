export default function CurriculumCard() {
  const academicFocus = ["Basic literacy", "Numeracy", "General knowledge", "Early social skills"]
  const religiousFocus = ["Qaida Nooraniyah", "Nazirah al-Qur'an", "Akhlaq (manners)", "Seerah stories"]
  const outcomes = ["Islamic Etiquette", "Child ready for schooling", "Qur'an recitation fluency", "Spiritual Maturity"]

  return (
    <div className="w-full h-[520px]  py-12 bg-red-100 ">
      <div className="relative w-full">
        {/* L-SHAPED FRAME using SVG for smooth continuous border */}
        <svg
          className="absolute top-0 left-0"
         
          viewBox="0 0 950 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 4
               L 910 4
               Q 946 4 946 40
               L 946 70
               Q 946 106 910 106
               L 200 106
               Q 160 106 160 146
               L 160 200
               Q 160 240 120 240
               L 50 240
               Q 4 240 4 200
               L 4 50
               Q 4 4 50 4
               Z"
            fill="#fefcf3"
            stroke="#D4A843"
            strokeWidth="4"
          />
        </svg>

        {/* Content Container */}
        <div className="relative " style={{ height: "160px" }}>
          {/* 01 Number with green badge - positioned in left part */}
          <div className="absolute " style={{ top: "60px", left: "30px" }}>
            <div className="relative">
              <span
                className="text-[80px] font-light leading-none"
                style={{
                  color: "#c9b896",
                  fontFamily: "Georgia, serif",
                }}
              >
                01
              </span>
              {/* Green circle badge */}
              <div
                className="absolute w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold"
                style={{
                  backgroundColor: "#5CB85C",
                  top: "-5px",
                  left: "-5px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                }}
              >
                z
              </div>
            </div>
          </div>

          {/* Title content - in top horizontal part */}
          <div
            className="absolute flex items-center justify-between"
            style={{
              top: "20px",
              left: "160px",
              right: "20px",
              height: "65px",
            }}
          >
            {/* Left side - English title */}
            <div>
              <h2 className="text-[28px] font-semibold" style={{ color: "#5CB85C" }}>
                Maktab Foundation
              </h2>
              <p className="text-[18px]" style={{ color: "#5CB85C" }}>
                Ages: 3-6
              </p>
            </div>

            {/* Right side - Japanese text */}
            <div className="text-right pr-4">
              <p className="text-[20px] font-medium" style={{ color: "#5CB85C" }}>
                マクタブ基礎課程
              </p>
              <div className="flex items-center justify-end gap-2 mt-1">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: "#3498db" }}
                >
                  z
                </span>
                <span className="text-[16px]" style={{ color: "#E67E22" }}>
                  3～6:歳
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* THREE CARDS SECTION */}
        <div className="absolute gap-4  left-60 bg-red-400 w-full">
         <div className="grid grid-cols-3 ">
           <FocusCard title="Academic Focus" items={academicFocus} />
          <FocusCard title="Religious Focus" items={religiousFocus} />
          <FocusCard title="Outcomes" items={outcomes} />
         </div>
        </div>

      </div>
    </div>
  )
}

function FocusCard({ title, items }) {
  return (
    <div
      className="w-full bg-white relative pt-5 "
      style={{
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid #e5e5e5",
      }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 px-5 py-1.5 text-white text-[13px] font-medium whitespace-nowrap"
        style={{
          backgroundColor: "#8BC34A",
          borderRadius: "20px",
          top: "-14px",
        }}
      >
        {title}
      </div>

      {/* List Items */}
      <div className="px-4 pt-3 pb-4">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#5CB85C" }} />
              <span className="text-gray-700 text-[13px]">{item}</span>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          {/* View in Details button */}
          <div className="relative flex-1">
            <button
              className="w-full px-2 py-1.5 text-[11px] font-medium rounded"
              style={{
                color: "#5CB85C",
                border: "2px solid #5CB85C",
                backgroundColor: "white",
              }}
            >
              View in Details
            </button>
            <span
              className="absolute w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
              style={{
                backgroundColor: "#3498db",
                top: "-6px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              z
            </span>
          </div>

          {/* View in Japanese button */}
          <div className="relative flex-1">
            <button
              className="w-full px-2 py-1.5 text-[11px] font-medium text-white rounded"
              style={{ backgroundColor: "#5CB85C" }}
            >
              View in Japanese
            </button>
            <span
              className="absolute w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
              style={{
                backgroundColor: "#3498db",
                top: "-6px",
                right: "-4px",
              }}
            >
              z
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
