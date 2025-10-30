"use client"

import React, { useState } from 'react'
import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import EventCard from './EventCard';
import Pagination from '../Shared/Pagination';

import EventCardSkeletonList from '../Shared/Skeleton/EventCardSkeletonList';



export default function Events({ events, settings, homePage, loading, currentPage, setCurrentPage, totalPages }) {


  // extra data extract using utils function
  const sections = homePage?.sections_on_api;
  const blog_events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");
  const blogsSectionTitle = blog_events_ExtraData?.custom_information.find((item) => item.label === "top_blogs")
  const eventsSectionTitle = blog_events_ExtraData?.custom_information.find((item) => item.label === "upcoming_events")
  const blog_events_title_2 = blog_events_ExtraData?.custom_information.find((item) => item.label === "blog_events_title_2")
  const view_more_button_text = getMetaValueByMetaName(settings, "view_more") || "";


  // console.log("event ness",eventsSectionTitle)

  return (
    <div className='gradient-border rounded-3xl p-6 bg-white h-full'>
      {/* heading */}
      <div className=' flex justify-between'>
        <h4 className='text-[#00401A] font-bold text-xl sm:text-2xl md:text-3xl gradient-border_b pb-3 ' >
          {eventsSectionTitle?.value}
        </h4>

      </div>
      {/* Events */}

      {loading ?
        <EventCardSkeletonList />

        :
        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-5">
          {events?.map((event, i) => (
            <EventCard key={i} event={event} index={i} settings={settings} />

          ))}

        </div>
      }



      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

    </div>
  )
}
