"use client";


import { TableSkeleton } from "../Skeletons/TableSkeleton";

import VisiTorTableRow from "./TableRow";

const data = [
  { sl: 1, arabic: "محمد", japanese: "ムハンマド", english: "Muhammad", meaning: "The praised one" },
  { sl: 2, arabic: "أحمد", japanese: "アフマド", english: "Ahmad", meaning: "Most commendable" },
  { sl: 3, arabic: "علي", japanese: "アリ", english: "Ali", meaning: "High, exalted" },
  { sl: 4, arabic: "عبدالله", japanese: "アブドゥッラー", english: "Abdullah", meaning: "Servant of Allah" },
  { sl: 5, arabic: "يوسف", japanese: "ユースフ", english: "Yusuf", meaning: "Allah increases" },
];




export default function VisitorTable({ loading = false,tableTitle }) {


  return (
    <div className="space-y-4">
      {/* Table Section */}
      <div>
        <div className="px-4 py-2 md:py-2 bg-[#52B920]  text-white flex items-center justify-between rounded-t-[10px] ">
          <h2 className="text-lg sm:text-xl ">{tableTitle?.en}</h2>
          <h2 className="text-lg sm:text-xl ">{tableTitle?.jp}</h2>
        </div>

       <div className="relative overflow-x-auto">
  <table className="w-full min-w-[1200px] border-collapse table-fixed">
    <TableHeader />

    {loading ? (
      <TableSkeleton />
    ) : data?.length > 0 ? (
      <TableBody data={data} />
    ) : (
      <EmptyState />
    )}
  </table>
</div>

      </div>

    
    </div>
  );
}






const TableHeader = () => (
  <thead className="hidden md:table-header-group">
    <tr className="bg-[#FEF8EA] h-[42px]">
      {[
        "SL.No",
        "Applicant Name",
        "Organization Name",
        "Contact",
        "City/Country",
        "Number Of Visitors",
        "Date",
        "Time",
        "Duration Of Visit",
        "Purpose Of Visit",
        "Program Request",
      ].map((title, i) => (
        <th
          key={i}
          className={`
            border border-[#B0C4B8] py-2 text-center text-sm sm:text-base font-normal
            ${i === 0 ? "w-[60px] min-w-[60px] max-w-[60px]" : ""}
          `}
        >
          {title}
        </th>
      ))}
    </tr>
  </thead>
);


const TableBody = ({ data }) => (
  <tbody>
    {data?.map((item, i) => (
      <VisiTorTableRow
        key={item.sl}
        item={item}
        i={i}
        
      />
    ))}
  </tbody>
);


const EmptyState = () => (
  <tbody>
    <tr>
      <td colSpan={6} className="text-center py-10 text-gray-500">
        No Names found.
      </td>
    </tr>
  </tbody>
);




