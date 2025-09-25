import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BlogCardHome from './BlogCardHome'

export default function Blogs({ blogs }) {


  return (
    <div className='gradient-border rounded-3xl p-5 bg-white'>
      {/* heading */}
      <div className='gradient-border_b pb-2 flex justify-between'>
        <h4 className='text-[#00401A] font-bold text-base  ' >
          Top Blogs
        </h4>
        <Link
          href=''
          className='text-[#00401A] font-bold text-sm flex gap-2 items-center '
        >
          View More
          <Image
            src="/images/others/arrowR.png"
            alt='a1'
            width={18}
            height={18}
          />
        </Link>
      </div>
      {/* Blogs */}

      <div className='mt-6 flex flex-col gap-3'>

        {blogs?.slice(0, 3).map((blog, i) => (
          <BlogCardHome key={i} blog={blog} />
        ))}




      </div>

    </div>
  )
}
