import React from "react";

export default function IslamicNameTableRow({
  islamicName,
  i,
  setSelectedName,
}) {
  return (
    <tr
      key={i}
      className={`${i % 2 === 0 ? "bg-white" : "bg-[#E5F5DE]"} h-[28px]`}
    >
      <td className="border border-gray-300 p-3 text-center">01</td>
      <td className="border border-gray-300 p-3 text-center">Arabic Shopnil</td>
      <td className="border border-gray-300 p-3 text-center">
        Shopnil Japanese
      </td>
      <td className="border border-gray-300 p-3 text-center">
        Shopnil English
      </td>

      <td className="border border-gray-300 p-3 text-center">Meaning</td>

      <td className="border border-gray-300 p-3 text-center">
        <button
          className="cursor-pointer"
          onClick={() => setSelectedDirectory(directory)}
        >
          View
        </button>
      </td>
    </tr>
  );
}
