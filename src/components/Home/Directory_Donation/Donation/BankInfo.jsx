"use client";

import { getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import { splitByComma, splitBySpace } from "@/helper/splitBySpace";

export default function BankInfo({ selectedDonation }) {

const note = getMetaValueFromExtraFields(selectedDonation, "note_donation")

  const from_part_1 = getMetaValueFromExtraFields(selectedDonation, "from") || "  "
    const from_part_2 = getMetaValueFromExtraFields(selectedDonation, "from_2") || "  "


  const bank_name_1 = getMetaValueFromExtraFields(selectedDonation, "bank_name") || "  "
    const bank_name_2 = getMetaValueFromExtraFields(selectedDonation, "bank_name_2") || "  "


  const branch_name_1 = getMetaValueFromExtraFields(selectedDonation, "branch_name") || "  "
  const branch_name_2 = getMetaValueFromExtraFields(selectedDonation, "branch_name_2") || "  "

  const account_name_1 = getMetaValueFromExtraFields(selectedDonation, "account_name") || "  "
   const account_name_2 = getMetaValueFromExtraFields(selectedDonation, "account_name_2") || "  "



  const symbol_1 = getMetaValueFromExtraFields(selectedDonation, "symbol") || "  "
    const symbol_2 = getMetaValueFromExtraFields(selectedDonation, "symbol_2") || "  "
 

  const account_number_1 = getMetaValueFromExtraFields(selectedDonation, "account_number") || "  "
    const account_number_2 = getMetaValueFromExtraFields(selectedDonation, "account_number_2") || "  "

  // const from = getMetaValueFromExtraFields(selectedDonation, "from")|| " , "
  // const from_part_1 = splitByComma(from)[0]
  // const from_part_2 = splitByComma(from)[1]

  // const bank_name = getMetaValueFromExtraFields(selectedDonation, "bank_name") || " , "
  // const bank_name_1 = splitByComma(bank_name)[0]
  // const bank_name_2 = splitByComma(bank_name)[1]

  // const account_name = getMetaValueFromExtraFields(selectedDonation, "account_name") || " , "
  // const account_name_1 = splitByComma(account_name)[0]
  // const account_name_2 = splitByComma(account_name)[1]


  // const symbol = getMetaValueFromExtraFields(selectedDonation, "symbol") || " , "
  // const symbol_1 = splitByComma(symbol)[0]
  // const symbol_2 = splitByComma(symbol)[1]

  // const account_number = getMetaValueFromExtraFields(selectedDonation, "account_number") || " , "
  // const account_number_1 = splitByComma(account_number)[0]
  // const account_number_2 = splitByComma(account_number)[1]


  return (
    <section className="w-full  py-6">
      {/* Wrapper with two columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
        {/* Left Column */}
        <div className="space-y-3 w-full ">
          <div className="flex ">
            <span className="w-32 text-[#333333] text-sm ">From </span>
            <span className="mx-2">: </span>
            <span className="w-38 text-[#333333] font-bold text-sm">{from_part_1}</span>
            {/* <span className="w-38 text-[#333333] font-bold text-sm">Japan Post Bank to Japan Post Bank</span> */}
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Bank name</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">{bank_name_1}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Account name</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">{account_name_1}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Symbol</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">{symbol_1}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Account number</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] text-sm  font-bold">{account_number_1}</span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden xl:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-300"></div>

        {/* Right Column */}
        <div className="space-y-3">
          <div className="flex ">
            <span className="w-32 text-[#333333] text-sm ">From </span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">{from_part_2}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Bank name</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">{bank_name_2}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Account name</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">{account_name_2}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Symbol</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">{symbol_2}</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Account number</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] text-sm  font-bold">{account_number_2}</span>
          </div>
        </div>
      </div>

      {/* Note Section */}
      <p className="mt-6 text-red-600 text-xs">
        {note}
        {/* <span className="font-semibold">Note :</span> Please refrain from paying Zakat ( obligatory charity )
        or Wajib Sadaqat ( obligatory charity ).
        <span className="ml-2 font-normal">(جزاكم الله تعالى خيرا)</span> */}
      </p>
    </section>
  );
}
