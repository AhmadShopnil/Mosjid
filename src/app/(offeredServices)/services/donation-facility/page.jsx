

import DonationFacilityTopSection from '@/components/Services/DonationFacility/DonationFacilityTopSection'
import DonationForm from '@/components/Services/DonationFacility/DonationForm'
import HalalCertificateForm from '@/components/Services/HalalCertification/HalalCertificateForm'
import VisitorBookingTopSection from '@/components/Services/VisitorBooking/VisitorBookingTopSection'

import React from 'react'



export default function page() {
    return (
        <div className='space-y-8'>
            {/* top sections */}
            <DonationFacilityTopSection />
            <DonationForm />

        </div>
    )
}
