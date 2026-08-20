
"use client";

import VisitorBookingTopSection from '@/components/Services/VisitorBooking/VisitorBookingTopSection';
import VisitorForm from '@/components/Services/VisitorBooking/VisitorForm';
import VisitorTable from '@/components/Services/VisitorBooking/VisitorTable';
import GradientBorderWrapper1 from '@/components/Shared/GradientBorderWrapper1';
import PolicyModal from '@/components/Shared/PolicyModal';
import Pagination from '@/components/Shared/Pagination';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '@/helper/axiosInstance';
import CancelBookingModal from '@/components/Shared/CancelBookingModal';
import useBookingCancel from '@/hooks/useBookingCancel';

const myBookingsTitle = {
    en: "My Bookings",
    jp: "私の予約"
};
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
    const [visitedBookings, setvisitedBookings] = useState([]);
    const [myBookingList, setMyBookingList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state for guidelines
    const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: '', title: '' });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Scroll refs
    const formRef = useRef(null);
    const bookingListRef = useRef(null);
    const recordListRef = useRef(null);

    const { cancelState, openCancel, closeCancel, confirmCancel } = useBookingCancel({
        getEndpoint: (id) => `/visitors/${id}/status`,
        onSuccess: () => fetchVisitors(currentPage),
    });

    const fetchVisitors = useCallback(async (page = 1) => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/visitors?page=${page}`);

            // console.log("res of visitor", res?.data)
            setMyBookingList(res.data?.my_books?.data || []);
            setFutureBookings(res.data?.future_book?.data || []);
            setPastBookings(res.data?.past_book?.data || []);
            setvisitedBookings(res.data?.visited_lists?.data || []);

            // Pick total pages from whichever paginated key is available
            const maxPages = Math.max(
                res.data?.my_books?.last_page || 1,
                res.data?.future_book?.last_page || 1,
                res.data?.past_book?.last_page || 1
            );
            setTotalPages(maxPages);
            setCurrentPage(page);
        } catch (error) {
            console.error("Failed to fetch visitors data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVisitors(currentPage);
    }, [fetchVisitors, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleActionClick = (label) => {
        if (label.includes('Guide')) {
            setModalConfig({ isOpen: true, slug: 'visitor-guidelines', title: 'Visitor Guidelines' });
        } else if (label.includes('Book')) {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (label.includes('Booking List')) {
            bookingListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (label.includes('Record')) {
            recordListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className='space-y-8'>
            {/* top sections */}
            <VisitorBookingTopSection onActionClick={handleActionClick} />

            <div ref={formRef} className='scroll-mt-32'>
                <GradientBorderWrapper1

                    rounded="rounded-[20px]"
                    innerRounded="rounded-[19px]"
                    className="shadow-md hover:shadow-lg transition-all duration-300 "
                    innerClassName=""

                >
                    <VisitorForm onSuccess={() => fetchVisitors(currentPage)} />
                </GradientBorderWrapper1>
            </div>
            <div className='scroll-mt-32 rounded-2xl p-[1px]
             bg-gradient-to-b from-[#3198A0] to-[#51F909] shadow-md'>
                <div className='p-4 md:p-8 bg-white rounded-[15px]'>
                    <VisitorTable 
                        tableTitle={myBookingsTitle} 
                        data={myBookingList} 
                        loading={loading} 
                        showStatus={true}
                        onCancelClick={openCancel}
                    />
                </div>
            </div>
            <div ref={bookingListRef} className='scroll-mt-32 rounded-2xl p-[1px]
             bg-gradient-to-b from-[#3198A0] to-[#51F909] shadow-md'>
                <div className='p-4 md:p-8 bg-white rounded-[15px]'>
                    <VisitorTable tableTitle={bookingListtableTitle} data={futureBookings} loading={loading} />
                </div>
            </div>

            <div ref={recordListRef} className='scroll-mt-32 rounded-2xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909]'>
                <div className='p-4 md:p-8 bg-white rounded-[15px] shadow-md'>
                    <VisitorTable tableTitle={recordListTitle} data={visitedBookings} loading={loading} />
                </div>
            </div>

            {/* Single Pagination for all tables */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center mt-4 pb-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            <PolicyModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                slug={modalConfig.slug}
                title={modalConfig.title}
            />

            <CancelBookingModal
                isOpen={cancelState.isOpen}
                isLoading={cancelState.isLoading}
                onClose={closeCancel}
                onConfirm={confirmCancel}
            />
        </div>
    );
}
