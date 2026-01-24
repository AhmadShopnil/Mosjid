import BurialBookingTopSection from '@/components/Services/BurialBooking/BurialBookingTopSection'
import BurialTable from '@/components/Services/BurialBooking/BurialTable'
import React from 'react'

export default function page() {

    const bookingTableTitle = {
        en: "Booking List",
        jp: "予約リスト"
    }
    const registerTableTitle = {
        en: "Booking List",
        jp: "予約リスト"
    }
    return (
        <div className='space-y-4 md:space-y-8'>
            <BurialBookingTopSection />



            <div
                className=''
            >
                <div className='8 bg-white rounded-[15px]'>
                    <BurialTable tableTitle={bookingTableTitle} />
                </div>
            </div>
            <div className='rounded-2xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909]'>
                <div className='p-8 bg-white rounded-[15px]'>
                    <BurialTable tableTitle={registerTableTitle} />
                </div>
            </div>


        </div>
    )
}
