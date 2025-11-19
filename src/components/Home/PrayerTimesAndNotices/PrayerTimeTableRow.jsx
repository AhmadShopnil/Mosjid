"use client";

import { getMetaValueFromExtraFields } from '@/helper/metaHelpers'
import Image from 'next/image'
import { motion } from "framer-motion"
import React from 'react'

export default function PrayerTimeTableRow({ prayer, index }) {

    const prayerTime = getMetaValueFromExtraFields(prayer, "time")
    const waktStartTime = getMetaValueFromExtraFields(prayer, "start_time")
    const waktStartTime_2 = getMetaValueFromExtraFields(prayer, "start_time_2")
    const waktEndTime = getMetaValueFromExtraFields(prayer, "end_time")
    const waktEndTime2 = getMetaValueFromExtraFields(prayer, "end_time_mislewal")

    return (
        <motion.tr
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.4,
                delay: index * 0.15,
                ease: "easeOut"
            }}
            className="bg-[#F6FFF1] text-gray-800 border-b border-gray-200 last:border-b-0"
        >
            <td className="p-1 flex items-center gap-2">
                <Image
                    src={prayer?.featured_image}
                    alt="icon"
                    width={50}
                    height={50}
                />

                <span className="font-bold text-base text-[#00401A]">
                    {prayer?.name}
                    <br />
                    <span className="text-[#00401a5d]">
                        {prayer?.sub_title}
                    </span>
                </span>
            </td>

            <td className="p-3 text-[#56410F] text-base text-center">{prayerTime}</td>

            <td className="px-3 text-[#3E8B18] text-base text-center">
                <span>{waktStartTime}</span>
                <br />
                <span>{waktStartTime_2}</span>
            </td>

            <td className="px-3 text-[#FF0000] text-base text-center">
                {waktEndTime2 ? (
                    <>
                        <span className="text-[#EB5757]">{waktEndTime}</span>
                        <br />
                        <span className="text-[#EB5757]">{waktEndTime2}</span>
                    </>
                ) : (
                    <span>{waktEndTime}</span>
                )}
            </td>
        </motion.tr>
    )
}
