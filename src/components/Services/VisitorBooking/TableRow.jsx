export default function VisiTorTableRow({ item, i }) {
  const cell =
    "border border-gray-300 px-3 py-2 text-center text-sm " +
    "overflow-x-auto whitespace-nowrap";

  const slCell =
    "border border-gray-300 px-2 py-2 text-center text-sm " +
    "w-[60px] min-w-[60px] max-w-[60px]";

  return (
    <tr className={`${i % 2 === 0 ? "bg-white" : "bg-[#E5F5DE]"} h-[42px]`}>
      {/* SL column */}
      <td className={slCell}>{String(i + 1).padStart(2, "0")}</td>

      {/* Other columns */}
      {/* <td className={cell}>{item.full_name || "—"}</td> */}
      {/* <td className={cell}>{item.organization_name || "—"}</td> */}
      {/* <td className={cell}>{item.contact_number || "—"}</td> */}
      {/* <td className={cell}>{item.country_name || "—"}</td> */}
      {/* <td className={cell}>{item.number_of_visitors || "—"}</td> */}
      <td className={cell}>{item.visit_date || "—"}</td>
      <td className={cell}>{item.start_time || "—"}</td>
      <td className={cell}>{item.end_time ? `${item.end_time} ${item.hours ? `(${item.hours}h)` : ''}` : (item.hours ? `${item.hours}h` : "—")}</td>
      <td className={cell}>{item.purpose_visit || "—"}</td>
      <td className={cell}>{item.program_request || "—"}</td>
    </tr>
  );
}
