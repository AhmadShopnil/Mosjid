import Image from 'next/image'
import React from 'react'
import BankInfo from './BankInfo'

function MakeDonation() {
  return (
    <div className='gradient-border bg-white  p-4 rounded-2xl'>

  {/* heading */}
        <div className='flex justify-between mb-2 '>
            <div className='flex gap-2 items-center   gradient-border_b w-[60%] pb-2  '>
                <Image
                src="/images/directory/icon.png"
                alt='a1'
                width={40}
                height={40}
                />
                <h3 className='text-2xl text-[#00401A]'>
                    Directory
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
         <p className='text-sm '>Support The Mosque, Madrasah, And Cemetery With Your Contribution</p>

      {/* Tabs */}
      <div className='my-4 flex gap-2 '>
        <button
        className='hover:bg-[#F7BA2A] hover:text-white text-[#00401A] border-[1.5px]
         border-[#F7BA2A] py-1.5 px-4 rounded-[10px] font-bold text-base cursor-pointer'
        >
          Mosque
        </button>
         <button
        className='hover:bg-[#F7BA2A] hover:text-white text-[#00401A] border-[1.5px]
         border-[#F7BA2A] py-1.5 px-4 rounded-[10px] font-bold text-base cursor-pointer'
        >
          Mosque
        </button>
         <button
        className='hover:bg-[#F7BA2A] hover:text-white text-[#00401A] border-[1.5px]
         border-[#F7BA2A] py-1.5 px-4 rounded-[10px] font-bold text-base cursor-pointer'
        >
          Mosque
        </button>
      </div>

      <div>
      <h3 className='text-base text-[#333333] '>Bank information (BANK DETAIL) </h3>
      <h2 className='text-xl font-bold text-[#00401A] gradient-border_b pb-1'>Religious Corporation Osaka Masjid</h2>
      <BankInfo/>
      </div>

    </div>
  )
}

export default MakeDonation