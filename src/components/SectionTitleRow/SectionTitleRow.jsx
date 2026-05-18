import React from "react";

const SectionTitleRow = ({
  leftTitle,
  rightTitle,
  gradientColor = "#00401A",
}) => {
  return (
    <div className="relative flex flex-wrap md:justify-between items-center w-full mb-4">
      {/* Mobile bottom border (Global line for mobile view) */}
      <div
        className="absolute bottom-0 left-0 w-full h-[2px] md:hidden"
        style={{
          background: `linear-gradient(to right, ${gradientColor}, transparent)`,
        }}
      />

      {/* Left Title Container */}
      <div className="w-full md:w-auto relative">
        <h3 className="text-2xl lg:text-4xl font-bold text-[#B98C20] pb-5">
          {leftTitle}
        </h3>
        {/* Consistent Left Underline */}
        <div
          className="hidden md:block absolute bottom-0 left-0 w-full h-[2px]"
          style={{
            background: `linear-gradient(to right, ${gradientColor}, transparent)`,
          }}
        />
      </div>

      {/* Right Title Container */}
      <div className="w-full md:w-auto relative">
        <h3 className="text-2xl lg:text-3xl font-bold text-[#B98C20] pb-5 text-left md:text-right">
          {rightTitle}
        </h3>
        {/* Consistent Right Underline */}
        <div
          className="hidden md:block absolute bottom-0 right-0 w-full h-[2px]"
          style={{
            background: `linear-gradient(to left, ${gradientColor}, transparent)`,
          }}
        />
      </div>
    </div>
  );
};

export default SectionTitleRow;