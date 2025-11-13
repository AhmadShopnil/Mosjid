"use client"

import React, { useState } from 'react'
import { getMetaValueByMetaName } from '@/helper/metaHelpers'

import BlogCard from './BlogCard'
import Pagination from '../Shared/Pagination';
import { getImageUrl } from '@/helper/getImageUrl';
import BlogCardSkeletonList from '../Shared/Skeleton/BlogCardSkeletonList';
import { useSelected } from '@/context/SelectedContext';

export default function Blogs({ blogs, settings, homePage, loading, currentPage, setCurrentPage, totalPages }) {

  const sections = homePage?.sections_on_api;
  const blog_events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");
  const image = getImageUrl(blog_events_ExtraData?.image_media)
  const blogsSectionTitle = blog_events_ExtraData?.custom_information.find((item) => item.label === "top_blogs")
 
  const view_more_button_text = getMetaValueByMetaName(settings, "view_more") || "";

  return (
    <div className='border border-[#C9E9BA] rounded-[20px] p-5 bg-[#c9e9ba20]'>
      {/* heading */}
      <div className=' flex justify-between'>
        <h4 className='text-[#00401A] font-bold text-xl sm:text-2xl lg:text-3xl  gradient-border_b  pb-2 ' >
          {blogsSectionTitle?.value}
          {/* Latest Blogs */}
        </h4>

      </div>
      {/* Blogs */}

      {loading ?
        <BlogCardSkeletonList />
        :
        <div className='mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5'>

          {blogs?.map((blog, i) => (
            <BlogCard key={i} blog={blog} settings={settings} />
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
