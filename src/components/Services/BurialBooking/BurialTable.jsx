"use client";


import { TableSkeleton } from "../Skeletons/TableSkeleton";
import BurialTableRow from "./BurialTableRow";
import React, { useState } from "react";
import BurialRegistrationModal from "./BurialRegistrationModal";


export default function BurialTable({ loading = false, tableTitle, data = [], isBookingTable = false, onRegistrationSuccess }) {
  const [activeModalId, setActiveModalId] = useState(null);


  return (
    <>
      <div className="space-y-4">
        {/* Table Section */}
        <div>
          <div className="px-4 bg-[#52B920] h-[50px] text-white flex items-center justify-between rounded-t-[10px] ">
            <h2 className="text-lg sm:text-xl font-bold ">{tableTitle?.en}</h2>
            <h2 className="text-lg sm:text-xl font-bold ">{tableTitle?.jp}</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-fixed min-w-[800px]">
              <TableHeader isBookingTable={isBookingTable} />

              {loading ? (
                <TableSkeleton />
              ) : data?.length > 0 ? (
                <TableBody
                  data={data}
                  isBookingTable={isBookingTable}
                  onOpenModal={setActiveModalId}
                />
              ) : (
                <EmptyState isBookingTable={isBookingTable} />
              )}
            </table>
          </div>
        </div>


      </div>

      {activeModalId && (
        <BurialRegistrationModal
          bookingId={activeModalId}
          onClose={() => setActiveModalId(null)}
          onSuccess={() => {
            setActiveModalId(null);
            if (onRegistrationSuccess) onRegistrationSuccess();
          }}
        />
      )}
    </>
  );
}






const TableHeader = ({ isBookingTable }) => {
  const headers = [
    "SL.No",
    "Applicant Name",
    "Deceased Name",
    "Burial Date",
    "Burial Time",
    "Contact",
  ];

  if (isBookingTable) headers.push("Action");

  return (
    <thead>
      <tr className="bg-[#FEF8EA] h-[42px]">
        {headers.map((title, i) => (
          <th
            key={i}
            className="border border-[#B0C4B8] py-2 text-[#3E8B18] text-center text-sm sm:text-base font-semibold"
            style={{ width: `${100 / headers.length}%` }}
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = ({ data, isBookingTable, onOpenModal }) => (
  <tbody>
    {data?.map((item, i) => (
      <BurialTableRow
        key={item.id}
        item={item}
        i={i}
        isBookingTable={isBookingTable}
        onOpenModal={() => onOpenModal(item.id)}
      />
    ))}
  </tbody>
);


const EmptyState = ({ isBookingTable }) => (
  <tbody>
    <tr>
      <td colSpan={isBookingTable ? 7 : 6} className="text-center py-10 text-gray-500">
        No records found.
      </td>
    </tr>
  </tbody>
);




