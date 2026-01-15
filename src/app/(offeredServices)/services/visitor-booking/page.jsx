

import VisitorBookingTopSection from '@/components/Services/VisitorBooking/VisitorBookingTopSection'
import VisitorForm from '@/components/Services/VisitorBooking/VisitorForm'
import VisitorTable from '@/components/Services/VisitorBooking/VisitorTable'
import React from 'react'


const bookingListtableTitle = {
    en: "Visitor Booking List List",
    jp: "訪問者予約リスト"
}
const recordListTitle = {
    en: "Visitor Record",
    jp: "訪問者予約リスト"
}



export default function page() {
    return (
        <div className='space-y-8'>
            {/* top sections */}
            <VisitorBookingTopSection />

            <VisitorForm />

            <div className='rounded-2xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909]'>
                <div className='p-8 bg-white rounded-[15px]'>
                    <VisitorTable tableTitle={bookingListtableTitle} />
                </div>
            </div>
            <div className='rounded-2xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909]'>
                <div className='p-8 bg-white rounded-[15px]'>
                    <VisitorTable tableTitle={recordListTitle} />
                </div>
            </div>



        </div>
    )
}
