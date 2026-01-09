import { getMetaValueFromExtraFields } from '@/helper/metaHelpers'
import React from 'react'

export default function DirectoryRow({ directory, i, setSelectedDirectory }) {

    const directory_sl_no = getMetaValueFromExtraFields(directory, "directory_sl_no");
    const directory_name = getMetaValueFromExtraFields(directory, "directory_name")
    const directory_phone = getMetaValueFromExtraFields(directory, "directory_phone")
    const diretory_juma_time = getMetaValueFromExtraFields(directory, "diretory_juma_time")
    const directory_address = getMetaValueFromExtraFields(directory, "directory_address")
    const directory_short_address = getMetaValueFromExtraFields(directory, "short_address")
    const directory_email = getMetaValueFromExtraFields(directory, "directory_email")
    const directory_website = getMetaValueFromExtraFields(directory, "directory_website")
    const directory_established = getMetaValueFromExtraFields(directory, "directory_established")
    const directory_status = getMetaValueFromExtraFields(directory, "directory_status")
    const directory_facilities = getMetaValueFromExtraFields(directory, "directory_facilities")
    const directory_others = getMetaValueFromExtraFields(directory, "directory_others")



    return (
        <tr
            key={i}
            className={`${i % 2 === 0 ? "bg-white" : "bg-[#E5F5DE]"} h-[28px]`}
        >

            <td className="border border-gray-300 p-3 text-center"
            >
                {directory_sl_no}

            </td>
            <td
                className="border border-gray-300 p-3 text-center"
            >
                {directory_name}
            </td>
            <td

                className="border border-gray-300 p-3 text-center"
            >
                {directory_phone}
            </td>
            <td
                className="border border-gray-300 p-3 text-center"
            >
                {diretory_juma_time}
            </td>

            <td
                className="border border-gray-300 p-3 text-center"
            >
                {directory_short_address}

            </td>


            <td

                className="border border-gray-300 p-3 text-center"
            >

                <button
                    className='cursor-pointer'
                    onClick={() => setSelectedDirectory(directory)}
                >
                    View
                </button>
            </td>

        </tr>
    )
}
