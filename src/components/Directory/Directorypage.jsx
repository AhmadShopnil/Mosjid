"use client";

import Image from "next/image";
import DirectoryRow from "./DirectoryRow";
import { useState } from "react";
import DirectoryDetailsSection from "./DirectoryDetailsSection";
import SocialShare from "../Shared/SocialShare";

export default function DirectoryPage({ directories }) {
  const [selectedDirectory, setSelectedDirectory] = useState(null);

  return (
    <div className="space-y-4">
      {/* First Section - Table */}
      <div className="gradient-border rounded-2xl p-4 sm:p-8 bg-white">
        {/* Table Header */}
        <div className="bg-[#52B920] h-[50px] text-white flex items-center justify-center rounded-t-[10px]">
          <h2 className="text-center text-lg sm:text-xl font-bold">
            Table for selected category
          </h2>
        </div>

        {/* Responsive Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-fixed font-normal min-w-[800px]">
            <thead>
              <tr className="bg-[#D9E2DD] h-[40px] font-normal">
                <th className="border border-[#B0C4B8] py-2 text-sm sm:text-base text-center text-[#000000] font-normal w-[14.28%]">
                  SL.No
                </th>
                <th className="border border-[#B0C4B8] py-2 text-sm sm:text-base text-center text-[#000000] font-normal w-[14.28%]">
                  Name
                </th>
                <th className="border border-[#B0C4B8] py-2 text-sm sm:text-base text-center text-[#000000] font-normal w-[14.28%]">
                  Phone
                </th>
                <th className="border border-[#B0C4B8] py-2 text-sm sm:text-base text-center text-[#000000] font-normal w-[14.28%]">
                  Juma Time
                </th>
                <th className="border border-[#B0C4B8] py-2 text-sm sm:text-base text-center text-[#000000] font-normal w-[14.28%]">
                  Address
                </th>
                <th className="border border-[#B0C4B8] py-2 text-sm sm:text-base text-center text-[#000000] font-normal w-[14.28%]">
                  View in Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {directories?.map((directory, i) => (
                <DirectoryRow
                  key={i}
                  directory={directory}
                  i={i}
                  setSelectedDirectory={setSelectedDirectory}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Website URL */}
        <div className="text-center mt-2 sm:mt-4 md:mt-6 text-[#000000] text-lg sm:text-2xl">
          www.osakamasjid.com
        </div>
      </div>

      {/* Social Icons */}
      <div className="py-4 flex justify-center sm:justify-end items-center">
      <SocialShare/>
      </div>

      {selectedDirectory && (
        <DirectoryDetailsSection directory={selectedDirectory} />
      )}
    </div>
  );
}
