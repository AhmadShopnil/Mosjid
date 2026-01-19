

import HalalCertificateForm from '@/components/Services/HalalCertification/HalalCertificateForm'
import HalalCertificateTopSection from '@/components/Services/HalalCertification/HalalCertificateTopSection'
import VisitorBookingTopSection from '@/components/Services/VisitorBooking/VisitorBookingTopSection'

import React from 'react'



export default function page() {
    return (
        <div className='space-y-8'>
            {/* top sections */}
            <HalalCertificateTopSection />

            <HalalCertificateForm />

         



        </div>
    )
}
