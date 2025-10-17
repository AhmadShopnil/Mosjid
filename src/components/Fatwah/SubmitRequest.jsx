import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SubmitRequest() {
    return (
        <div className='bg-white rounded-[10px] border border-[#C9E9BA] overflow-hidden shadow-sm p-4'>
            {/* header */}
        
                <div className='gradient-border_b pb-2'>
                    <h4 className='text-[#00401A] text-2xl font-bold'>Submit Your Request </h4>
                    <h4 className='text-[#00401A] text-2xl font-bold'>リクエストを送信</h4>
                </div>

             

       

            <div className='min-h-[150px] mt-5 flex flex-col justify-between '>
                <p className='text-sm text-[#00401A]'>If you have any Query, Please Submit Your Request</p>
                <Link
                    href="/fatwah/submit-request"
                    className="text-sm font-bold text-white  h-[36px] px-6 py-2 rounded-[10px] 
                     shadow-md transition-all duration-300 hover:opacity-90
                      bg-gradient-to-r from-[#3198A0] to-[#51F909] flex items-center justify-center gap-2"
                >
                  <span>Submit A Request</span>
                      <span className="text-xl">›</span>
                </Link>
               
                {/* <button className="px-6 py-2 rounded-[10px] text-white font-medium shadow-md transition-all duration-300 hover:opacity-90 bg-[linear-gradient(to_bottom,_#3198A0_20%,_#51F909_60%)] flex items-center gap-2">
                    Ask a Question
                    <span className="text-lg">›</span>
                </button> */}


            </div>
        </div>
    )
}
