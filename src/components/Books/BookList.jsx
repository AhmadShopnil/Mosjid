"use client"

import React, { useState } from 'react'
import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import Pagination from '../Shared/Pagination';
import EventCardSkeletonList from '../Shared/Skeleton/EventCardSkeletonList';

import BookCardInnerPage from './BookCardInnerPage';
import SkeletonBookCardInnerPage from './SkeletonBookCardInnerPage';



export default function BookList({ books, settings, homePage, loading, currentPage, setCurrentPage, totalPages }) {


  // extra data extract using utils function
  const sections = homePage?.sections_on_api;
  const blog_events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");
  const blogsSectionTitle = blog_events_ExtraData?.custom_information.find((item) => item.label === "top_blogs")
  const eventsSectionTitle = blog_events_ExtraData?.custom_information.find((item) => item.label === "upcoming_events")
  const blog_events_title_2 = blog_events_ExtraData?.custom_information.find((item) => item.label === "blog_events_title_2")
  const view_more_button_text = getMetaValueByMetaName(settings, "view_more") || "";


  // console.log("event ness",eventsSectionTitle)

  return (
    <div className='  bg-white h-full'>

      <div className=' flex justify-between'>
      </div>


      {loading ?
        <SkeletonBookCardInnerPage />
        :
        <>
          {
            books?.length > 0 ?
              <div className="mt-6 grid grid-cols-1  gap-5">
                {books?.map((book, i) => (
                  <BookCardInnerPage key={i} book={book} index={i} settings={settings} />
                ))}
              </div>
              :
              <div className='flex justify-center items-center'>
                <p className='Text-base font-bold'>No Bookd Found</p>
              </div>

          }



        </>

      }


      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

    </div>
  )
}
