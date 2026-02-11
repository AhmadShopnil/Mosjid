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
      <td className={slCell}>01</td>

      {/* Other columns */}
      <td className={cell}>Arabic Shopnil</td>
      <td className={cell}>Mobile Contact Method</td>
      <td className={cell}>+8801729147191 ext 999999</td>
      <td className={cell}>Japan</td>
      <td className={cell}>05</td>
      <td className={cell}>Male</td>
      <td className={cell}>10 July 2025</td>
      <td className={cell}>2:30 PM</td>
      <td className={cell}>Madrasha Name Very Very Long</td>
      <td className={cell}>Mahfil Program Request Very Long Text</td>
    </tr>
  );
}
