import { getMetaValueFromExtraFields } from '@/helper/metaHelpers'
import Image from 'next/image'
import React from 'react'

export default function ProhibitedTimeTableRow({ prayer }) {


    const prayerTime = getMetaValueFromExtraFields(prayer, "time")
    const waktStartTime = getMetaValueFromExtraFields(prayer, "start_time")
    const waktStartTime_2 = getMetaValueFromExtraFields(prayer, "start_time_2")
    const waktEndTime = getMetaValueFromExtraFields(prayer, "end_time")
    // console?.log("localRaw",prayer)

    return (
        <tr
            className="bg-[#F6FFF1] text-gray-800 border-b border-gray-200 last:border-b-0   "
        >
            <td className="p-1 flex items-center gap-2  ">
                {/* {prayer.icon} */}
                <Image
                    // src="/images/prayertimes/eid.png"
                    src={prayer?.featured_image}
                    alt="gallery-icon"
                    width={50}
                    height={50}
                />
                <span className="font-bold text-base text-[#00401A]">{prayer?.name} <br />
                    <span
                        className='text-[#00401a5d]'
                    >ファジル
                    </span></span>
            </td>
            {/* <td className="p-3 text-[#56410F] text-base text-center">{prayerTime}</td> */}


            <td className="px-3 text-[#3E8B18] text-base text-center ">
                <span>{waktStartTime}</span> <br></br>
                <span className='border-t-1 border-gray-300'> {waktStartTime_2}</span>
            </td>
            {/* <td className="p-3 text-[#FF0000] text-base">{waktEndTime}</td> */}
            <td className="p-3 text-[#FF0000] text-base text-center">{waktEndTime}</td>
        </tr>
    )
}
