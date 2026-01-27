import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import React from "react";

export default function IslamicNameTableRow({
  islamicName,
  i,
  setSelectedName,
}) {



    const islamic_name_meaning = getMetaValueFromExtraFields(islamicName, "islamic-name-menaing");
    const islamic_name_arabic = getMetaValueFromExtraFields(islamicName, "islamic-name-arabic");
    //  const islamic_name_arabic = getMetaValueFromExtraFields(islamicName, "islamic-name-arabic")
      const islamic_name_jpc = getMetaValueFromExtraFields(islamicName, "islamic-name-jp")




  return (
    <tr
      key={i}
      className={`${i % 2 === 0 ? "bg-white" : "bg-[#E5F5DE]"} h-[28px]`}
    >
      <td className="border border-gray-300 p-3 text-center">{i}</td>
    
      <td className="border border-gray-300 p-3 text-center">
       {islamic_name_arabic}
      </td>
      <td className="border border-gray-300 p-3 text-center">
       {islamic_name_jpc}
      </td>
  <td className="border border-gray-300 p-3 text-center">{islamicName?.name}</td>
      <td className="border border-gray-300 p-3 text-center">{islamic_name_meaning}</td>

      {/* <td className="border border-gray-300 p-3 text-center">
        <button
          className="cursor-pointer"
          onClick={() => setSelectedDirectory(directory)}
        >
          View
        </button>
      </td> */}
    </tr>
  );
}
