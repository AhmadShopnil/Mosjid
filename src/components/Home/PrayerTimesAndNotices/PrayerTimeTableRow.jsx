import { getMetaValueFromExtraFields } from '@/helper/metaHelpers'
import Image from 'next/image'
import React from 'react'

export default function PrayerTimeTableRow({ prayer }) {


    const prayerTime = getMetaValueFromExtraFields(prayer, "time")
    const waktStartTime = getMetaValueFromExtraFields(prayer, "start_time")
    const waktStartTime_2 = getMetaValueFromExtraFields(prayer, "start_time_2")
    const waktEndTime = getMetaValueFromExtraFields(prayer, "end_time")
    // console?.log("localRaw",localRaw)

    return (
        <tr
            className="bg-[#F6FFF1] text-gray-800 border-y border-gray-200  "
        >
            <td className="p-3 flex items-center gap-2  ">
                {/* {prayer.icon} */}
                <Image
                    src="/images/prayertimes/eid.png"
                    // src={prayer?.icon}
                    alt="gallery-icon"
                    width={40}
                    height={40}
                />
                <span className="font-bold text-base text-[#00401A]">{prayer?.name}</span>
            </td>
            <td className="p-3 text-[#56410F] text-base">{prayerTime}</td>



            <td className="px-3 text-[#3E8B18] text-base ">
                <span>{waktStartTime}</span> <br></br>
                <span> {waktStartTime_2}</span>
            </td>
            {/* <td className="p-3 text-[#FF0000] text-base">{waktEndTime}</td> */}
            <td className="p-3 text-[#FF0000] text-base">{waktEndTime}</td>
        </tr>
    )
}
