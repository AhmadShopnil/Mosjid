"use client";

import React from "react";
import Container from "../Shared/Container";
import Link from "next/link";

export default function BreadcrumbForNested({ items = [] }) {
  // Filter out empty or null breadcrumb entries
  const filteredItems = items.filter((i) => i?.label);

  // If nothing selected, return empty (no shapes)
  // if (filteredItems.length === 0) {
  //   return (
  //     <div className="w-full h-[40px] flex items-center gradient-bredcumb">
  //       <Container>
  //         <p className="text-xs md:text-sm text-gray-700">No selection</p>
  //       </Container>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full h-[40px] md:h-[60px] flex items-center gradient-bredcumb text-xs md:text-lg">
      <Container className="w-full h-full">
        <div className="flex h-full overflow-x-auto no-scrollbar gap-1.5">
          {filteredItems.map((item, index) => {
            const isLast = index === filteredItems.length - 1;
            const isFast = index === 0;

            const bg = isLast ? "#ffffff" : "#3198A0";
            const textColor = isLast ? "#52B920" : "#00401A";


            const clipPath =
              index === 0
                ? "polygon(92% 50%, 75% 100%, 0% 100%, 0% 0%, 75% 0%)"
                : "polygon(92% 50%, 75% 100%, 0% 100%, 15% 50%, 0% 0%, 75% 0%)";
            // const clipPath =
            //   index === 0
            //     ? "polygon(85% 50%, 60% 100%, 0% 100%, 0% 0%, 60% 0%)"
            //     : "polygon(92% 50%, 75% 100%, 0% 100%, 15% 50%, 0% 0%, 75% 0%)";


            const marginLeft = index === 0 ? "" : "-ml-6 md:-ml-10";

            const baseClasses =
              `flex items-center justify-center h-full overflow-hidden whitespace-nowrap ` +
              `text-[10px] sm:text-xs md:text-base px-3 sm:px-4 md:px-6 ` +
              `truncate ${marginLeft}`;

            // Last item or no link → plain white box
            if (isLast || !item.link) {
              return (
                <div
                  key={index}
                  className={baseClasses}
                  style={{
                    backgroundColor: bg,
                    color: textColor,
                    clipPath,
                    width: "230px",
                  }}
                >
                  <span className="truncate px-3">{item.label}</span>
                </div>
              );
            }
             if (isFast ) {
              return (
                 <Link
                key={index}
                href={item.link}
                className={`${baseClasses} gradient-bredcumb-a font-medium mr-1`}
                style={{
                  backgroundColor: bg,
                  color: textColor,
                  clipPath,
                  width: "160px",
                }}
              >
                <span className="truncate px-3">{item.label}</span>
              </Link>
              );
            }

            return (
              <Link
                key={index}
                href={item.link}
                className={`${baseClasses} gradient-bredcumb-a font-medium`}
                style={{
                  backgroundColor: bg,
                  color: textColor,
                  clipPath,
                  width: "190px",
                }}
              >
                <span className="truncate px-3">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
