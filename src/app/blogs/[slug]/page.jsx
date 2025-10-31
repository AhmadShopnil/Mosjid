
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React from 'react'

import { getBlogs, getCategories, getPage, getSettings, getSingleBlog } from '@/helper/actions'

import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import SingleBlogsPage from '@/components/Blogs/SingleBlogPage'




export default async function BlogsPage({ params }) {
  const { slug } = await params;

  const settings = await getSettings();
  const homePage = await getPage("home-sections-heading-management");
  const cat = await getCategories("post_category");
  const formattedCategories = transformNoticeCategories(cat);


  const blogs = await getBlogs();
  const blog = await getSingleBlog(slug);

  // console.log("blog single", blog)


  return (
    <div>

      <SingleBlogsPage
        settings={settings}
        homePage={homePage}
        formattedCategories={formattedCategories}
        blog={blog} />
    </div>
  )
}
