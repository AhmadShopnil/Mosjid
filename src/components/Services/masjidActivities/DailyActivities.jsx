import React from 'react';

// 1. JSON Data
const adhanData = [
  { id: "01", label: "After Fajr", title: "Qur’an Dars & Adult Tajweed, Tafsir, Grammar" },
  { id: "02", label: "After Zuhr", title: ".Dawah, Tajweed, Hifz, and Hadith" },
  { id: "03", label: "After Asr", title: "Salah, Adult Hifz, Fiqh, and Mirāth Studies" },
  { id: "04", label: "After Maghrib", title: "Children’s Qur’an Learning Class" },
  { id: "05", label: "After Isha", title: "Dawah & Children’s Qur’an Class" },
];

const DailyActivities = () => {
  return (
    <div>
      {/* Responsive Container: 
        Items center correctly on all screens. 
        Increased gap-y to prevent overlapping of the "After..." capsules.
      */}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-y-14 gap-5">
        
        {adhanData?.map((item) => (
          /* FIX: Changed bg-linear-to-b to bg-gradient-to-b 
             FIX: Changed h-64 to min-h-[250px] so the card grows if text is long
          */
          <div key={item.id} className="relative w-full  min-h-[250px] flex flex-col p-px rounded-[40px] bg-gradient-to-b from-[#3198A0] to-[#51F909] shadow-lg">
            
            {/* 2. The Inner Container (White Background) */}
            <div className="relative flex-grow w-full bg-white rounded-[40px] flex flex-col items-center justify-center overflow-hidden py-10">
              
              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(49,152,160,0.15),transparent_60%)]" />

              {/* Text Content - Exactly 20px */}
              <div className="z-10 text-center px-6">
                <h2 className="text-[#00401A] text-base font-bold">
                  {item.title}
                </h2>
              </div>
            </div>

            {/* 3. Top Label Capsule */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-16 p-px rounded-full bg-gradient-to-b from-[#3198A0] to-[#51F909]">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <span className="text-[#00401A] font-bold">
                  {item.label}
                </span>
              </div>
            </div>

          </div>
        ))}
        
      </div>
    </div>
  );
};

export default DailyActivities;