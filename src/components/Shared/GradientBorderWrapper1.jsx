import React from "react";

export default function GradientBorderWrapper1({
  children,
  rounded = "rounded-[10px]",
  innerRounded = "rounded-[9px]",
}) {
  return (
    <div
      className={`p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909] ${rounded}`}
    >
      <div className={`bg-white ${innerRounded}`}>
        {children}
      </div>
    </div>
  );
}
