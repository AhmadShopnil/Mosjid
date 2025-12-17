
import React from 'react'

import { getBlogs, getCategories, getPage, getSettings, getSingleBlog } from '@/helper/actions'

import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import SingleBlogsPage from '@/components/Blogs/SingleBlogPage'
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide'




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
      <BannerInnerPageServerSide />
      <SingleBlogsPage
        settings={settings}
        homePage={homePage}
        formattedCategories={formattedCategories}
        blog={blog} />

    </div>
  )
}
