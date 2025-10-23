import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AskQuestionSidebar() {
    return (
        <div className='bg-white rounded-[10px] border border-[#C9E9BA] overflow-hidden shadow-sm p-4'>
            {/* header */}
            <div className='flex justify-between'>
                <div className='gradient-border_b pb-2'>
                    <h4 className='text-[#00401A] text-2xl font-bold'>Ask A Question</h4>
                    <h4 className='text-[#00401A] text-2xl font-bold'>質問する</h4>
                </div>

                <Image
                    src="/images/fatwah/q.png"
                    alt="Logo"
                    width={60}
                    height={60}
                    className='hidden sm:flex w-[60px] h-[60px]'
                />

            </div>

            <div className='min-h-[150px] mt-5 flex flex-col justify-between '>
                <p className='text-sm text-[#00401A]'>If you dont have the question you want, Click below to ask your question</p>
                <Link
                    href="/fatwah/ask-question"
                     className="gradient-bg-fatwah-finder text-sm font-bold text-white  h-[36px] px-6 py-2 rounded-[10px] 
                     shadow-md transition-all duration-300 hover:opacity-90
                       flex items-center justify-center gap-2"
                    // className="text-sm font-bold text-white  h-[36px] px-6 py-2 rounded-[10px] 
                    //  shadow-md transition-all duration-300 hover:opacity-90
                    //   bg-gradient-to-r from-[#3198A0] to-[#51F909] flex items-center justify-center gap-2"
                >
                  <span>  Ask a Question</span>
                      <span className="text-xl">›</span>
                </Link>
              


            </div>
        </div>
    )
}
