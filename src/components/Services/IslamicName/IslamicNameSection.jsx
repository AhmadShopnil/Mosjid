"use client";

import { useState } from "react";
import IslamicNameTableRow from "./IslamicNameTableRow";
import IslamicNameSearch from "./IslamicNameSearch";
import SocialShare from "@/components/Shared/SocialShare";
import { TableSkeleton } from "../Skeletons/TableSkeleton";

const islamicNames = [
  { sl: 1, arabic: "محمد", japanese: "ムハンマド", english: "Muhammad", meaning: "The praised one" },
  { sl: 2, arabic: "أحمد", japanese: "アフマド", english: "Ahmad", meaning: "Most commendable" },
  { sl: 3, arabic: "علي", japanese: "アリ", english: "Ali", meaning: "High, exalted" },
  { sl: 4, arabic: "عبدالله", japanese: "アブドゥッラー", english: "Abdullah", meaning: "Servant of Allah" },
  { sl: 5, arabic: "يوسف", japanese: "ユースフ", english: "Yusuf", meaning: "Allah increases" },
];




export default function IslamicNameSection({ loading = false }) {
  const [selectedName, setSelectedName] = useState(null);

  return (
    <div className="space-y-4">
      {/* Search */}
      <IslamicNameSearch button_text="Search" />

      {/* Table Section */}
      <div>
        <div className="bg-[#52B920] h-[50px] text-white flex items-center justify-center rounded-t-[10px]">
          <h2 className="text-lg sm:text-xl font-bold">Table for Names</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-fixed min-w-[800px]">
            <TableHeader />

            {loading ? (
              <TableSkeleton />
            ) : islamicNames?.length > 0 ? (
              <TableBody
                data={islamicNames}
                setSelectedName={setSelectedName}
              />
            ) : (
              <EmptyState />
            )}
          </table>
        </div>
      </div>

      {/* Social Share */}
      <div className="py-4 flex justify-center sm:justify-end">
        <SocialShare />
      </div>
    </div>
  );
}






const TableHeader = () => (
  <thead>
    <tr className="bg-[#D9E2DD] h-[40px]">
      {[
        "SL.No",
        "Arabic Name",
        "Japanese",
        "English",
        "Meaning",
        "View in Detail",
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

const TableBody = ({ data, setSelectedName }) => (
  <tbody>
    {data?.map((item, i) => (
      <IslamicNameTableRow
        key={item.sl}
        islamicName={item}
        i={i}
        setSelectedName={setSelectedName}
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




