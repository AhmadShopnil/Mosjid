import React from "react";

export default function BurialTableRow({
  item,
  i,
  isBookingTable,
  onOpenModal
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

      {isBookingTable && (
        <td className="border border-gray-300 p-3 text-center text-sm">
          <button
            onClick={onOpenModal}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md transition font-medium text-xs md:text-sm shadow-sm"
          >
            Fill form
          </button>
        </td>
      )}
    </tr>
  );
}
