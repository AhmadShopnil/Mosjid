
import React from 'react'

import { getBlogs, getCategories, getPage, getSettings, getSingleBlog } from '@/helper/actions'

import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import SingleBlogsPage from '@/components/Blogs/SingleBlogPage'
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide'



export async function generateMetadata({ params }) {
  const { slug } = await params;


  try {
    const pageData = await getSingleBlog(slug)

    // console.log("blog meta", { pageData })

    return {
      title:
        pageData?.meta_title ||
        pageData?.name ||
        "Blog Page",

      description:
        pageData?.meta_description ||
        pageData?.name ||
        pageData?.sub_title ||
        "Learn more blog us",

      openGraph: {
        title: pageData?.meta_title || pageData?.name,
        description:
          pageData?.meta_description || pageData?.name ||
          pageData?.sub_title,
        images: pageData?.featured_image
          ? [{ url: pageData?.featured_image }]
          : [],
      },

      alternates: {
        canonical: `/blogs/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Blog Page",
      description: "Blog page",
    };
  }
}







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
