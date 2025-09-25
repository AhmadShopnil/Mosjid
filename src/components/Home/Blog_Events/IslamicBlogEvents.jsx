import Container from '@/components/Shared/Container'
import Image from 'next/image'
import React from 'react'
import Blogs from './Blogs'
import Events from './Events'
import { getBlogs, getEvents } from '@/helper/actions'

export default async function IslamicBlogEvents() {

const blogs=await getBlogs();
const events= await getEvents();


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
                            Islamic Blog And Events
                        </h3>
                    </div>
                    {/* arabic text */}
                    <div>
                  <Image
                  src="/images/directory/a1.png"
                  alt='a1'
                  width={300}
                  height={60}
                  />
                    </div>
                </div>
          {/* Blogs and Events */}
              <div className='flex flex-col md:flex-row gap-4 mt-6'>
        
                <div className='w-full md:w-[60%] '>
                  <Blogs blogs={blogs}/>
                </div>
                  <div className='w-full md:w-[40%] '>
                  <Events events={events}/>
                </div>

            </div>

           </div>
        {/* Your content goes here */}
      </Container>
    </div>
  )
}
