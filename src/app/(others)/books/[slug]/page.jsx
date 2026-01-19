
import React from 'react'

import { getBlogs, getCategories, getPage, getSettings, getSingleBlog, getSingleItem } from '@/helper/actions'

import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import SingleBlogsPage from '@/components/Blogs/SingleBlogPage'
import BannerInnerPageServerSide from '@/components/Shared/BannerInnerPageServerSide'
import SingleBook from '@/components/Books/SingleBook'



export async function generateMetadata({ params }) {
  const { slug } = await params;


  try {
    const pageData = await getSingleItem(slug)

    // console.log("blog meta", { pageData })

    return {
      title:
        pageData?.meta_title ||
        pageData?.name ||
        "Book Page",

      description:
        pageData?.meta_description ||
        pageData?.name ||
        pageData?.sub_title ||
        "read more book ",

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
        canonical: `/books/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Book Page",
      description: "Book page",
    };
  }
}







export default async function BookPage({ params }) {
  const { slug } = await params;

  const settings = await getSettings();
  const homePage = await getPage("home-sections-heading-management");
  const cat = await getCategories("books_categories")

  const formattedCategories = transformNoticeCategories(cat);
  const book = await getSingleItem(slug);

  // console.log("blog single", blog)


  return (
    <div>
      <BannerInnerPageServerSide />
      <SingleBook
        settings={settings}
        homePage={homePage}
        formattedCategories={formattedCategories}
        blog={book} />

    </div>
  )
}
