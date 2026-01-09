
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React from 'react'

import { getBlogs, getCategories, getPage, getSettings, getSingleBlog, getSingleEvent } from '@/helper/actions'

import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import SingleBlogsPage from '@/components/Blogs/SingleBlogPage'
import SingleEventPage from '@/components/Events/SingleEventPage'
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide'




export default async function EventPage({ params }) {
  const { slug } = await params;

  const settings = await getSettings();
  const homePage = await getPage("home-sections-heading-management");
  const cat = await getCategories("events_categories");
  const formattedCategories = transformNoticeCategories(cat);


  const blogs = await getBlogs();
  const event = await getSingleEvent(slug);

  // console.log("event single", event)


  return (
    <div>
      <BannerInnerPageServerSide />
      <SingleEventPage
        settings={settings}
        homePage={homePage}
        formattedCategories={formattedCategories}
        event={event} />
    </div>
  )
}
