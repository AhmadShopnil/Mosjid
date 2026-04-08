

import React from "react";

export default function LossTableRow({
  item,
  i,

}) {
  return (
    <tr
      key={i}
      className={`${i % 2 === 0 ? "bg-white" : "bg-[#E5F5DE]"} h-[42px]`}
    >
      <td className="border border-gray-300 p-3 text-center text-sm">{String(i + 1).padStart(2, "0")}</td>
      <td className="border border-gray-300 p-3 text-center text-sm">{item.name || "—"}</td>
      <td className="border border-gray-300 p-3 text-center text-sm">{item.item_name || "—"}</td>
      <td className="border border-gray-300 p-3 text-center text-sm">{item.spot_area || "—"}</td>
      <td className="border border-gray-300 p-3 text-center text-sm">{item.lost_found_date || "—"}</td>
      <td className="border border-gray-300 p-3 text-center text-sm relative group">
        {item.item_image ? (
          <a
            href={`https://admin.osakamasjid.org/public/${item.item_image}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            View
          </a>
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
      <td className="border border-gray-300 p-3 text-center text-sm">{item.contact_no || "—"}</td>
    </tr>
  );
}
