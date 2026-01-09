import Container from '@/components/Shared/Container'
import Image from 'next/image'
import React from 'react'
import Blogs from './Blogs'
import Events from './Events'
import { getBlogs, getEvents, getPage, getSettings } from '@/helper/actions'
import { getImageUrl } from '@/helper/getImageUrl'
import { splitBySlash } from '@/helper/splitBySpace'
import { getMetaValueByMetaName } from '@/helper/metaHelpers'

export default async function IslamicBlogEvents() {
  const settings = await getSettings();
  const blogs = await getBlogs();
  const events = await getEvents();
  const homePage = await getPage("home-sections-heading-management")


  const view_more_button_text =
    getMetaValueByMetaName(settings, "view_more");

  const sections = homePage?.sections_on_api;
  const blog_events_ExtraData = sections.find((s) => s.title_slug === "islamic-blog-and-events");


  const heading_part_1 = splitBySlash(blog_events_ExtraData?.title)[0]
  const heading_part_2 = splitBySlash(blog_events_ExtraData?.title)[1]

  const image_arabic = getImageUrl(blog_events_ExtraData?.image_media);
  const icon = getImageUrl(blog_events_ExtraData?.background_media);



  const blogsSectionTitle = blog_events_ExtraData?.custom_information.find((item) => item.label === "top_blogs")
  const eventsSectionTitle = blog_events_ExtraData?.custom_information.find((item) => item.label === "upcoming_events")
  // const blog_events_title_2 = blog_events_ExtraData?.custom_information.find((item) => item.label === "blog_events_title_2")

  const blogsAllData = { view_more_button_text, blogsSectionTitle: blogsSectionTitle?.value, settings, blogs }


  return (
    <div
      id='blogs-events'
      className="  w-full"
      style={{
        backgroundImage: "url('/images/blogEvents/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <Container className="h-full   ">
        <div className='w-full lg:w-[80%] xl:w-[65%] py-10  md:py-20 h-full  '  >
          {/* heading */}
          <div className='flex flex-col sm:flex-row gap-4 items-center  sm:justify-between mb-2 '>
            <div className='flex gap-2 items-center justify-center sm:justify-start    w-full  sm:w-[60%]    '>

              <div className="flex justify-between items-center gap-2.5 gradient-border_b mb-4 sm:mb-0 pb-3  ">
                <Image
                  src={icon}
                  alt='blogEvents'
                  width={60}
                  height={60}
                  className=""
                />


                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
                  <p><span className="text-[#F7BA2A]">{heading_part_1}</span>  {heading_part_2} </p>
                  {/* <p>{blog_events_ExtraData?.sub_title} </p> */}
                  <p>{blog_events_ExtraData?.sub_title}</p>

                </div>
              </div>
            </div>
            {/* arabic text */}
            <div>
              <Image
                src={image_arabic}
                alt='a1'
                width={211}
                height={50}
              />
            </div>
          </div>
          {/* Blogs and Events */}
          <div className='flex flex-col md:flex-row gap-4 mt-6'>

            <div className='w-full md:w-[60%] '>
              <Blogs blogs={blogs} blogsSectionTitle={blogsSectionTitle?.value} settings={settings} blogsAllData={blogsAllData} />
            </div>
            <div className='w-full md:w-[40%] '>
              <Events events={events} eventsSectionTitle={eventsSectionTitle?.value} settings={settings} />
            </div>

          </div>

        </div>
        {/* Your content goes here */}
      </Container>
    </div>
  )
}
