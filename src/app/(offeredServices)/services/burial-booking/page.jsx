"use client";

import BurialBookingTopSection from '@/components/Services/BurialBooking/BurialBookingTopSection';
import BurialTable from '@/components/Services/BurialBooking/BurialTable';
import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/helper/axiosInstance';

export default function Page() {
    const [bookingList, setBookingList] = useState([]);
    const [registerList, setRegisterList] = useState([]);
    const [loading, setLoading] = useState(true);

    const bookingTableTitle = {
        en: "Booking List",
        jp: "予約リスト"
    };

    const registerTableTitle = {
        en: "Burial Register",
        jp: "埋葬登録"
    };

    const fetchBurialData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/burial');
            setBookingList(res.data?.booking_list || []);
            setRegisterList(res.data?.register_list || []);
        } catch (error) {
            console.error("Failed to fetch burial records:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBurialData();
    }, [fetchBurialData]);

    return (
        <div className='space-y-4 md:space-y-8'>
            <BurialBookingTopSection onSuccess={fetchBurialData} />

            <div className='rounded-2xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909]'>
                <div className='p-8 bg-white rounded-[15px]'>
                    <BurialTable tableTitle={bookingTableTitle} data={bookingList} loading={loading} isBookingTable={true} onRegistrationSuccess={fetchBurialData} />
                </div>
            </div>

            <div className='rounded-2xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909]'>
                <div className='p-8 bg-white rounded-[15px]'>
                    <BurialTable tableTitle={registerTableTitle} data={registerList} loading={loading} />
                </div>
            </div>
        </div>
    );
}
