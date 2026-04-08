

"use client";

import VisitorBookingTopSection from '@/components/Services/VisitorBooking/VisitorBookingTopSection';
import VisitorForm from '@/components/Services/VisitorBooking/VisitorForm';
import VisitorTable from '@/components/Services/VisitorBooking/VisitorTable';
import GradientBorderWrapper1 from '@/components/Shared/GradientBorderWrapper1';
import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/helper/axiosInstance';

const bookingListtableTitle = {
    en: "Visitor Booking List",
    jp: "訪問者予約リスト"
};

const recordListTitle = {
    en: "Visitor Record",
    jp: "訪問者の記録"
};

export default function Page() {
    const [futureBookings, setFutureBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVisitors = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/visitors');
            setFutureBookings(res.data?.future_book?.data || []);
            setPastBookings(res.data?.past_book?.data || []);
        } catch (error) {
            console.error("Failed to fetch visitors data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVisitors();
    }, [fetchVisitors]);

    return (
        <div className='space-y-8'>
            {/* top sections */}
            <VisitorBookingTopSection />

            <GradientBorderWrapper1 rounded="rounded-[20px]" innerRounded="rounded-[19px]">
                <VisitorForm onSuccess={fetchVisitors} />
            </GradientBorderWrapper1>

            <div className='rounded-2xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909]'>
                <div className='p-4 md:p-8 bg-white rounded-[15px]'>
                    <VisitorTable tableTitle={bookingListtableTitle} data={futureBookings} loading={loading} />
                </div>
            </div>

            <div className='rounded-2xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909]'>
                <div className='p-4 md:p-8 bg-white rounded-[15px]'>
                    <VisitorTable tableTitle={recordListTitle} data={pastBookings} loading={loading} />
                </div>
            </div>
        </div>
    );
}
