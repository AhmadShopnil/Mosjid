import { getSettings } from '@/helper/actions';
import { getMetaValueByMetaName, getMetaValueFromExtraFields } from '@/helper/metaHelpers';
import Link from 'next/link';
import React from 'react'

export default async function EventCard({ event }) {
  const settings = await getSettings();

  const read_more_button_text = getMetaValueByMetaName(settings, "read_more") || "";




    const day = getMetaValueFromExtraFields(event, "day");
    const month = getMetaValueFromExtraFields(event, "month");
    const time = getMetaValueFromExtraFields(event, "time");
    const year = getMetaValueFromExtraFields(event, "year");
    const location = getMetaValueFromExtraFields(event, "location");



    return (
        <div
            className="flex space-x-3 bg-white/90 backdrop-blur-sm border border-gray-300 p-2 rounded-md shadow-sm"
        >
            {/* Date Section */}
            <div className="w-22 text-center bg-gray-100 rounded-md px-3 py-2 leading-5 space-y-0.5">
                <p className="text-2xl font-bold text-green-900 leading-5">
                    {day}
                </p>
                <p className="text-xs text-green-900">{month}</p>
                <p className="text-xs text-green-900">{year}</p>
            </div>

            {/* Notice Text */}
            <div className=''>
                <p className="text-[#00401A] text-sm">{event?.name}</p>
                <Link
                    href={`/notice`}
                    className="mt-2 text-xs font-semibold text-[#001609]
                 cursor-pointer hover:text-[#F7BA2A]"
                >
                    {read_more_button_text} --
                </Link>
            </div>
        </div>
    )
}
