import React from 'react'
import LostItemList from './LostItemList'
import FoundItemList from './FoundItemList'

export default function LossAndFoundSection() {
    return (
        <div className='borderDonationHome rounded-[20px] px-3 sm:px-4 md:px-8 py-8'>
            <div className='border-b border-b-[#B0C4B8] mb-6 pb-3'>
                <h3 className='text-[#000000] text-center text-xl sm:text-2xl md:text-4xl font-bold '>Lost & Found - Osaka Masjid</h3>
                <p className='text-[#000000] text-center text-sm sm:text-base '>If you lost or found something, please report it below. We’ll help you reconnect with your belongings.</p>
            </div>

            <div className='space-y-6 md:space-y-14'>
                <LostItemList />
                <FoundItemList />
            </div>


        </div>
    )
}
