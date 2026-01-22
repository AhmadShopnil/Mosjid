import React from "react";
import Image from "next/image"; // Import Next.js Image component

const MasjidHistory = () => {
  const timelineData = [
    {
      year: "2009",
      title: "Purchased In",
      subtitle: "年に購入されました",
      titleColor: "text-[#333333]",
      bgColor: "bg-[#FFF3F3]",
      accentColor: "text-[#FF3030]",
      height: "lg:min-h-[300px]",
      icon: "/images/offerServices/masjidView/purchase.svg", // Removed /public
    },
    {
      year: "2010",
      title: "Operations Began in",
      subtitle: "年に活動を開始しました",
      titleColor: "text-[#333333]",
      bgColor: "bg-[#FDF2FF]",
      accentColor: "text-[#D800FF]",
      height: "lg:min-h-[360px]",
      icon: "/images/offerServices/masjidView/operation.svg", // Removed /public
    },
    {
      year: "2013",
      title: "Applied For Religious Corporation Status In",
      subtitle: "年に宗教法人の申請を行いました",
      bgColor: "bg-[#EEFFEB]",
      titleColor: "text-[#333333]",
      accentColor: "text-[#1CBA00]",
      height: "lg:min-h-[420px]",
      icon: "/images/offerServices/masjidView/religious.svg", // Removed /public
    },
    {
      year: "2021",
      title: "Officially Approved In",
      subtitle: "年に正式に認可されました",
      titleColor: "text-[#333333]",
      bgColor: "bg-[#EFF2FF]",
      accentColor: "text-[#0030FF]",
      height: "lg:min-h-[480px]",
      icon: "/images/offerServices/masjidView/apporved.svg", // Removed /public
    },
  ];

  return (
    <section className="mb-6">
      <div>
        {/* The Growth Line: Only show on Large screens (4 columns) */}
        <div className="hidden  lg:block -mb-12.5 relative z-10 pointer-events-none">
          <Image
            src="/images/offerServices/masjidView/historyLine.svg"
            alt="Timeline Decoration"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} // Keeps the SVG aspect ratio responsive
            priority // Optimization for above-the-fold content
          />
        </div>

        {/* Grid Layout: 1 col (mobile), 2 cols (md), 4 cols (lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end gap-6 max-w-7xl mx-auto">
          {timelineData?.map((item, index) => (
            <div
              key={index}
              className={`
                flex flex-col items-center justify-between
                p-6 md:p-8 rounded-[32px] md:rounded-[40px] 
                text-center transition-all duration-300 hover:scale-[1.02]
                ${item.bgColor} 
                min-h-[280px] ${item.height}
              `}
            >
              {/* Icon Section */}
              <div className="flex-1 flex items-end mb-6 md:mb-8">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={96} // Matches md:w-24 (24 * 4px = 96px)
                  height={96}
                  className="w-16 h-16 md:w-24 md:h-24 lg:w-auto lg:h-auto object-contain"
                />
              </div>

              {/* Text Content Section */}
              <div className="flex flex-col gap-1 md:gap-2">
                <h3
                  className={`${item.titleColor} font-medium text-base md:text-lg leading-tight min-h-[2.5rem] md:min-h-[3rem] flex items-center justify-center`}
                >
                  {item.title}
                </h3>

                <span
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter ${item.accentColor}`}
                >
                  {item.year}
                </span>

                <p
                  className={`text-xs md:text-sm lg:text-lg font-semibold ${item.accentColor} opacity-90`}
                >
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasjidHistory;