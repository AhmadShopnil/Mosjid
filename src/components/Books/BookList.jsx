"use client"

import React, { useState } from 'react'
import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import Pagination from '../Shared/Pagination';
import EventCardSkeletonList from '../Shared/Skeleton/EventCardSkeletonList';

import BookCardInnerPage from './BookCardInnerPage';
import SkeletonBookCardInnerPage from './SkeletonBookCardInnerPage';



export default function BookList({ books, settings, homePage, loading, currentPage, setCurrentPage, totalPages,download_books_button }) {



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
                  <BookCardInnerPage key={i} book={book} index={i} settings={settings} download_books_button={download_books_button} />
                ))}
              </div>
              :
              <div className='flex justify-center items-center'>
                <p className='Text-base font-bold'>No Books Found</p>
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
