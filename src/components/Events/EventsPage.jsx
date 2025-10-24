"use client"

import React, { useState } from 'react'
import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import EventCard from './EventCard';
import Pagination from '../Shared/Pagination';



export default  function EventsPage({ events,eventsSectionTitle ,settings}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  const view_more_button_text = getMetaValueByMetaName(settings, "view_more") || "";

  // console.log("event ness",eventsSectionTitle)

  return (
    <div className='gradient-border rounded-3xl p-6 bg-white h-full'>
      {/* heading */}
      <div className=' flex justify-between'>
        <h4 className='text-[#00401A] font-bold text-xl sm:text-2xl md:text-3xl gradient-border_b pb-3 ' >
          {eventsSectionTitle}
        </h4>
       
      </div>
      {/* Events */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-5">
        {events?.map((event, i) => (
          <EventCard key={i} event={event} index={i} settings={settings}/>
    
        ))}

      </div>

           <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

    </div>
  )
}
