"use client";

import ConversionForm from '@/components/Services/MuslimConversion/ConversionForm';
import MuslimConvertionTopSection from '@/components/Services/MuslimConversion/MuslimConvertionTopSection';
import BookingList from '@/components/Services/MuslimConversion/BookingList';
import ConvertedList from '@/components/Services/MuslimConversion/ConvertedList';
import MyApplications from '@/components/Services/MuslimConversion/MyApplications';
import PolicyModal from '@/components/Shared/PolicyModal';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '@/helper/axiosInstance';

export default function page() {
    const [slots, setSlots] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [converted, setConverted] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state for guidelines
    const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: '', title: '' });

    const bookingListRef = useRef(null);
    const convertedListRef = useRef(null);
    const myApplicationsRef = useRef(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/conversion');
            const data = res.data;
            setSlots(data.slots || []);
            setBookings(data.booking_list?.data || []);
            setConverted(data.converted_list?.data || []);
            setMyApplications(data.my_applications?.data || []);
        } catch (err) {
            console.error('Error fetching conversion data:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleActionClick = (label) => {
        if (label.includes('Guide')) {
            // Open guidelines modal
            setModalConfig({ isOpen: true, slug: 'conversion-guidelines', title: 'Conversion Guidelines' });
        } else if (label.includes('Booking')) {
            bookingListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (label.includes('Converted')) {
            convertedListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (label.includes('Applications')) {
            myApplicationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className='space-y-8'>
            <MuslimConvertionTopSection onActionClick={handleActionClick} />
            <div ref={myApplicationsRef}>
                <MyApplications applications={myApplications} loading={loading} />
            </div>
            <ConversionForm />
            <div ref={bookingListRef}>
                <BookingList bookings={bookings} loading={loading} />
            </div>
            <div ref={convertedListRef}>
                <ConvertedList converted={converted} loading={loading} />
            </div>

            <PolicyModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                slug={modalConfig.slug}
                title={modalConfig.title}
            />
        </div>
    );
}
