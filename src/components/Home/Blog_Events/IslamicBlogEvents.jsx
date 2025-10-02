import Container from '@/components/Shared/Container'
import Image from 'next/image'
import React from 'react'
import Blogs from './Blogs'
import Events from './Events'
import { getBlogs, getEvents, getPage } from '@/helper/actions'
import { getImageUrl } from '@/helper/getImageUrl'

export default async function IslamicBlogEvents() {

  const blogs = await getBlogs();
  const events = await getEvents();
  const homePage = await getPage("home-sections-heading-management")
  const sections = homePage?.sections_on_api;
  const blog_events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");
  const image = getImageUrl(blog_events_ExtraData?.image_media)

  const blogsSectionTitle = blog_events_ExtraData?.custom_information.find((item) => item.label === "top_blogs")
    const eventsSectionTitle = blog_events_ExtraData?.custom_information.find((item) => item.label === "upcoming_events")

// console.log("title", blogsSectionTitle)


  return (
    <div
      className="  w-full"
      style={{
        backgroundImage: "url('/images/blogEvents/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <Container className="h-full   ">
        <div className='w-full lg:w-[80%] xl:w-[65%] py-20 h-full  '  >
          {/* heading */}
          <div className='flex flex-col sm:flex-row gap-4   justify-between mb-2 '>
            <div className='flex gap-2 items-center   gradient-border_b w-full  sm:w-[60%] pb-2  '>
              <Image
                src="/images/blogEvents/icon.png"
                alt='a1'
                width={40}
                height={40}
              />
              <h3 className='text-2xl sm:text-2xl md:text-3xl font-bold text-[#00401A]'>
                {blog_events_ExtraData?.sub_title}
              </h3>
            </div>
            {/* arabic text */}
            <div>
              <Image
                src={image}
                alt='a1'
                width={300}
                height={60}
              />
            </div>
          </div>
          {/* Blogs and Events */}
          <div className='flex flex-col md:flex-row gap-4 mt-6'>

            <div className='w-full md:w-[60%] '>
              <Blogs blogs={blogs} blogsSectionTitle={blogsSectionTitle?.value} />
            </div>
            <div className='w-full md:w-[40%] '>
              <Events events={events} eventsSectionTitle={eventsSectionTitle?.value} />
            </div>

          </div>

        </div>
        {/* Your content goes here */}
      </Container>
    </div>
  )
}
