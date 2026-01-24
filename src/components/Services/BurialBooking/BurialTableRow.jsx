import React from "react";

export default function BurialTableRow({
  item,
  i,

}) {
  return (
    <tr
      key={i}
      className={`${i % 2 === 0 ? "bg-white" : "bg-[#E5F5DE]"} h-[28px]`}
    >
      <td className="border border-gray-300 p-3 text-center">01</td>
      <td className="border border-gray-300 p-3 text-center">Arabic Shopnil</td>
      <td className="border border-gray-300 p-3 text-center">
        Mijibunagor, Tangail
      </td>
      <td className="border border-gray-300 p-3 text-center">
        10 July 2025
      </td>
      <td className="border border-gray-300 p-3 text-center">2:30</td>
      <td className="border border-gray-300 p-3 text-center overflow-y-auto">
        +8801729147191
      </td>




    </tr>
  );
}
