"use client";


import { TableSkeleton } from "../Skeletons/TableSkeleton";

import VisiTorTableRow from "./TableRow";

export default function VisitorTable({ loading = false, tableTitle, data = [], showStatus, onCancelClick }) {


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
            <TableHeader showStatus={showStatus} />

            {loading ? (
              <TableSkeleton />
            ) : data?.length > 0 ? (
              <TableBody data={data} showStatus={showStatus} onCancelClick={onCancelClick} />
            ) : (
              <EmptyState />
            )}
          </table>
        </div>

      </div>


    </div>
  );
}






const TableHeader = ({ showStatus }) => {
  const headers = [
    // "SL.No",
    "Name",
    "Date",
    "Time",
    "Duration Of Visit",
    "Purpose Of Visit",
    "Program Request",
  ];

  if (showStatus) {
    headers.push("Status", "Action");
  }

  return (
    <thead className="hidden md:table-header-group">
      <tr className="bg-[#FEF8EA] h-[42px]">
        {headers.map((title, i) => (
          <th
            key={i}
            className={`
              border border-[#B0C4B8] py-2 text-center text-sm sm:text-base font-normal
              ${( i==2) ? "w-[90px] min-w-[90px] max-w-[90px]" : ""}
            `}
            // className={`
            //   border border-[#B0C4B8] py-2 text-center text-sm sm:text-base font-normal
            //   ${i === 0 ? "w-[60px] min-w-[60px] max-w-[60px]" : ""}
            // `}
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};


const TableBody = ({ data, showStatus, onCancelClick }) => (
  <tbody>
    {data?.map((item, i) => (
      <VisiTorTableRow
        key={item.id}
        item={item}
        i={i}
        showStatus={showStatus}
        onCancelClick={onCancelClick}
      />
    ))}
  </tbody>
);


const EmptyState = () => (
  <tbody>
    <tr>
      <td colSpan={6} className="text-center py-10 text-gray-500">
        No records found.
      </td>
    </tr>
  </tbody>
);




