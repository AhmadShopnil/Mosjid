
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import EventCard from './EventCard';
import { getSettings } from '@/helper/actions';
import { getMetaValueByMetaName } from '@/helper/metaHelpers';



export default async function Events({ events,eventsSectionTitle }) {
  const settings = await getSettings();

  const view_more_button_text = getMetaValueByMetaName(settings, "view_more") || "";

  // console.log("event ness",eventsSectionTitle)

  return (
    <div className='gradient-border rounded-3xl p-5 bg-white h-full shadow-lg'>
      {/* heading */}
      <div className='gradient-border_b pb-2 flex justify-between'>
        <h4 className='text-[#00401A] font-bold text-base  ' >
          {eventsSectionTitle}
        </h4>
        <Link
          href='/events'
          className='text-[#00401A] font-bold text-sm flex gap-2 items-center '
        >
          {view_more_button_text}
          <Image
            src="/images/others/arrowR.png"
            alt='a1'
            width={18}
            height={18}
          />
        </Link>
      </div>
      {/* Events */}
      <div className="mt-6 flex flex-col gap-3">
        {events?.slice(0, 3).map((event, i) => (
          <EventCard key={i} event={event} index={i} />
    
        ))}

      </div>

    </div>
  )
}
