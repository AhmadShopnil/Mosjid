import Container from '@/components/Shared/Container'
import Image from 'next/image'
import React from 'react'
import Blogs from './Blogs'
import Events from './Events'

export default function IslamicBlogEvents() {
  return (
    <div
      className="h-[637px]  w-full"
      style={{
        backgroundImage: "url('/images/blogEvents/bg.png')",
        backgroundSize: "cover",          
        backgroundPosition: "center",     
        backgroundRepeat: "no-repeat",  
      }}
    >
     
      <Container className="h-full   ">
           <div className='w-[65%] py-20 h-full  '  >
            {/* heading */}
                <div className='flex justify-between mb-2 '>
                    <div className='flex gap-2 items-center   gradient-border_b w-[60%] pb-2  '>
                        <Image
                        src="/images/blogEvents/icon.png"
                        alt='a1'
                        width={40}
                        height={40}
                        />
                        <h3 className='text-3xl font-bold text-[#00401A]'>
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
        <div className='flex gap-4 mt-6'>
  
          <div className='w-[60%] '>
            <Blogs/>
          </div>
            <div className='w-[40%] '>
            <Events/>
          </div>

      </div>

           </div>
        {/* Your content goes here */}
      </Container>
    </div>
  )
}
