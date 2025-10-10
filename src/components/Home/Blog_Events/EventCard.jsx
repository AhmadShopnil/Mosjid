import { getSettings } from '@/helper/actions';
import { getMetaValueByMetaName, getMetaValueFromExtraFields } from '@/helper/metaHelpers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const colorClasses = [
    'bg-red-50 ',
    'bg-green-50 ',
    'bg-blue-100 ',
    'bg-yellow-100 ',
    'bg-teal-100 ',
    'bg-orange-100 ',
    'bg-purple-100 ',
    'bg-pink-100 ',
    'bg-indigo-100 ',
    'bg-amber-100 ',
];

export default async function EventCard({ event, index = 0 }) {
    const settings = await getSettings();

    const read_more_button_text = getMetaValueByMetaName(settings, "read_more") || "";

    // 🎨 Pick color based on index (for variety)
    const colorClass = colorClasses[index % colorClasses.length];


    const day = getMetaValueFromExtraFields(event, "day");
    const month = getMetaValueFromExtraFields(event, "month");
    const time = getMetaValueFromExtraFields(event, "time");
    const year = getMetaValueFromExtraFields(event, "year");
    const location = getMetaValueFromExtraFields(event, "location");



    return (
        <div
            className="flex space-x-3 bg-white/90 backdrop-blur-sm border border-gray-300 p-2 rounded-md shadow-sm"
        >



            <div className={`w-20 h-20 text-center bg-gray-100 rounded-md  leading-6 flex flex-col items-center justify-center  ${colorClass}`}>
                <p className="text-3xl font-bold text-green-900 leading-7">
                    {day}
                </p>
                <p className="text-xs text-green-900">{month}</p>
                <p className="text-xs text-green-900">{year}</p>
            </div>


            {/* Notice Text */}
            <div className='flex flex-col justify-between my-1'>
                <p className="text-[#00401A] text-sm">{event?.name.slice(0,50)}</p>
                <Link
                    href={`/notice`}
                    className="mt-2 text-xs font-semibold text-[#001609]
                 cursor-pointer hover:text-[#F7BA2A] flex gap-2 items-center "
                >
                    <span
                        className='mt-0.5'
                    >{read_more_button_text} </span>
                    <Image
                        src="/images/blogEvents/arrow.png"
                        alt='a1'
                        width={18}
                        height={18}
                    />
                </Link>
            </div>
        </div>
    )
}
