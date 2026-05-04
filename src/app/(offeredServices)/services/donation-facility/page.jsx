"use client";

import React, { useRef, useState } from 'react'
import DonationFacilityTopSection from '@/components/Services/DonationFacility/DonationFacilityTopSection'
import DonationForm from '@/components/Services/DonationFacility/DonationForm'
import DonationLists from '@/components/Services/DonationFacility/DonationLists'
import PolicyModal from '@/components/Shared/PolicyModal'

export default function Page() {
    const bookingListRef = useRef(null);
    const historyListRef = useRef(null);

    // Modal state
    const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: "", title: "" });

    const handleActionClick = (action) => {
        if (action === "Donation Booking List") {
            bookingListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === "Donation History Record") {
            historyListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === "Donation Policies") {
            setModalConfig({ isOpen: true, slug: "donation-guidelines", title: action });
        }
    };

    return (
        <div className='space-y-8'>
            {/* top sections */}
            <DonationFacilityTopSection onActionClick={handleActionClick} />
            <DonationForm />

            <div className="my-10">
                <DonationLists bookingListRef={bookingListRef} historyListRef={historyListRef} />
            </div>

            {/* Reusable Guidelines/Policies Modal */}
            <PolicyModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                slug={modalConfig.slug}
                title={modalConfig.title}
            />
        </div>
    )
}
