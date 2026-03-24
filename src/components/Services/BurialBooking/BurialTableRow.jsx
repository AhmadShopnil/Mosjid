import React from "react";

export default function BurialTableRow({
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
      <td className="border border-gray-300 p-3 text-center text-sm">{item.deceased_name || "—"}</td>
      <td className="border border-gray-300 p-3 text-center text-sm">{item.burial_date || "—"}</td>
      <td className="border border-gray-300 p-3 text-center text-sm">{item.estimated_burial_time || "—"}</td>
      <td className="border border-gray-300 p-3 text-center text-sm">{item.contact_no || "—"}</td>




    </tr>
  );
}
