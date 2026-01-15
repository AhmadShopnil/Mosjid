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
        <div className="px-4 bg-[#52B920] h-[50px] text-white flex items-center justify-between rounded-t-[10px] ">
          <h2 className="text-lg sm:text-xl ">{tableTitle?.en}</h2>
          <h2 className="text-lg sm:text-xl ">{tableTitle?.jp}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-fixed min-w-[800px]">
            <TableHeader />

            {loading ? (
              <TableSkeleton />
            ) : data?.length > 0 ? (
              <TableBody
                data={data}
              
              />
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
  <thead>
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
        "Program Request"
      ].map((title, i) => (
        <th
          key={i}
          className="border border-[#B0C4B8] py-2 text-center text-sm sm:text-base font-normal w-[14.28%]"
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




