"use client";

import { getMetaValueFromExtraFields } from '@/helper/metaHelpers'
import Image from 'next/image'
import { motion } from "framer-motion"
import React from 'react'

export default function ProhibitedTimeTableRow({ prayer, index }) {

    const prohibited_time_start = getMetaValueFromExtraFields(prayer, "prohibited-time-start")
    const prohibited_time_end = getMetaValueFromExtraFields(prayer, "prohibited-time-end")

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
                    alt="img"
                    width={50}
                    height={50}
                />

                <span className="font-bold text-base text-[#00401A]">
                    {prayer?.name}
                    <br />
                    <span className="text-[#00401a5d]">{prayer?.sub_title}</span>
                </span>
            </td>

            <td className="px-3 text-[#3E8B18] text-base text-center">
                {prohibited_time_start}
            </td>

            <td className="p-3 text-[#FF0000] text-base text-center">
                {prohibited_time_end}
            </td>
        </motion.tr>
    )
}
