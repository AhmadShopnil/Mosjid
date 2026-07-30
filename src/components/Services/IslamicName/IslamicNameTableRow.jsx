"use client";

import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import React from "react";

export default function IslamicNameTableRow({
  islamicName,
  i,
  setSelectedName,
}) {
  const islamic_name_meaning = getMetaValueFromExtraFields(
    islamicName,
    "islamic-name-menaing"
  );

  const islamic_name_arabic = getMetaValueFromExtraFields(
    islamicName,
    "islamic-name-arabic"
  );

  const islamic_name_jpc = getMetaValueFromExtraFields(
    islamicName,
    "islamic-name-jp"
  );

  const nameGenderDetails = islamicName?.categories?.find(
    (item) => item?.taxonomy_type === "islamic-name-by-gender"
  );

  const islamic_name_gender = nameGenderDetails?.name;

  return (
    <tr className={i % 2 === 0 ? "bg-white" : "bg-[#E5F5DE]"}>
  {/* Serial */}
  <td className="border border-gray-300 p-3 w-16">
    <div className="w-16 overflow-x-auto whitespace-nowrap text-center">
      {i}
    </div>
  </td>

  {/* Arabic */}
  <td className="border border-gray-300 p-3 w-36">
    <div className="w-36 overflow-x-auto whitespace-nowrap text-center">
      {islamic_name_arabic}
    </div>
  </td>

  {/* Japanese */}
  <td className="border border-gray-300 p-3 w-36">
    <div className="w-36 overflow-x-auto whitespace-nowrap text-center">
      {islamic_name_jpc}
    </div>
  </td>

  {/* Name */}
  <td className="border border-gray-300 p-3 w-40">
    <div className="w-40 overflow-x-auto whitespace-nowrap text-center">
      {islamicName?.name}
    </div>
  </td>

  {/* Gender (NOT scrollable) */}
  <td className="border border-gray-300 p-3 w-24 text-center">
    {islamic_name_gender}
  </td>

  {/* Meaning (bigger & scrollable) */}
  <td className="border border-gray-300 p-3 w-[450px]">
    <div className="w-[450px] overflow-x-auto whitespace-nowrap text-center">
      {islamic_name_meaning} 
      
    </div>
  </td>
</tr>
  );
}