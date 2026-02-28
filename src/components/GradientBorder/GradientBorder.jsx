import React from "react";

const GradientBorder = ({
  children,
  radius = 12,
  borderWidth = 1,
  className = "",
  innerClassName = "",
}) => {
  return (
    <div
      className={`${className} ${innerClassName}`}
      style={{
        /* 1. Define a transparent border with the desired width */
        border: `${borderWidth}px solid transparent`,
        borderRadius: `${radius}px`,

        /* 2. Layer 1: Inner background (White) | Layer 2: Border Gradient */
        backgroundImage: `linear-gradient(white, white), linear-gradient(249.17deg, #00FF1E 1.39%, #00F4AF 98.65%)`,

        /* 3. Clip the first background to content and second to the border area */
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",


        
      }}
    >
      {children}
    </div>
  );
};

export default GradientBorder;