"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react'
import axiosInstance from '@/helper/axiosInstance'
import DonationFacilityTopSection from '@/components/Services/DonationFacility/DonationFacilityTopSection'
import DonationForm from '@/components/Services/DonationFacility/DonationForm'
import DonationLists from '@/components/Services/DonationFacility/DonationLists'
import PolicyModal from '@/components/Shared/PolicyModal'
import Pagination from '@/components/Shared/Pagination'

export default function Page() {
    const bookingListRef = useRef(null);
    const historyListRef = useRef(null);

    // Modal state
    const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: "", title: "" });

    // Pagination and Data state
    const [data, setData] = useState({
        donation_register: { data: [], current_page: 1, last_page: 1 },
        donation_history: { data: [], current_page: 1, last_page: 1 },
    });
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = useCallback(async (page = 1) => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/donations?page=${page}`);
            if (res?.data) {
                setData(res.data);
                
                // Calculate max pages based on either my_donations, donation_register or donation_history
                const maxPages = Math.max(
                    res.data?.my_donations?.last_page || res.data?.donation_register?.last_page || 1,
                    res.data?.dontions?.last_page || 1
                );
                setTotalPages(maxPages);
                setCurrentPage(page);
            }
        } catch (err) {
            console.error("Error fetching donations:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(currentPage);
    }, [fetchData, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
                <DonationLists 
                    data={data}
                    loading={loading}
                    bookingListRef={bookingListRef} 
                    historyListRef={historyListRef} 
                    onCancelSuccess={() => fetchData(currentPage)}
                />
            </div>

            {/* Single Pagination controlling all tables */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center mt-4 pb-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

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
