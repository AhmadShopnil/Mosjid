"use client";

import BurialBookingTopSection from '@/components/Services/BurialBooking/BurialBookingTopSection';
import BurialTable from '@/components/Services/BurialBooking/BurialTable';
import BurialMyApplications from '@/components/Services/BurialBooking/BurialMyApplications';
import BurialForm from '@/components/Services/BurialBooking/BurialForm';
import PolicyModal from '@/components/Shared/PolicyModal';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '@/helper/axiosInstance';
import { useAuth } from '@/context/AuthContext';

export default function Page() {
    const { isAuthenticated } = useAuth();
    const [bookingList, setBookingList] = useState([]);
    const [registerList, setRegisterList] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [countries, setCountries] = useState([]);
    const [relationships, setRelationships] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedApplication, setSelectedApplication] = useState(null);

    const bookingListRef = useRef(null);
    const registerListRef = useRef(null);
    const myApplicationsRef = useRef(null);
    const formRef = useRef(null);
    const detailsFormRef = useRef(null);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: "", title: "" });

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
            console.log("Burial res",res)
            setBookingList(res.data?.booking_list?.data || []);
            setRegisterList(res.data?.register_list?.data || []);
            setMyApplications(res.data?.my_applications?.data || []);
            setCountries(res.data?.countries || []);
            setRelationships(res.data?.relationships || []);
        } catch (error) {
            console.error("Failed to fetch burial records:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBurialData();
    }, [fetchBurialData]);

    const handleActionClick = (action) => {
        if (action === "Booking List") {
            bookingListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === "Burial Register") {
            registerListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === "Burial Form") {
            detailsFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === "Burial Policies") {
            setModalConfig({
                isOpen: true,
                slug: "burial-policies",
                title: "Burial Policies & Guidelines"
            });
        }
    };

    const handleFillForm = (application) => {
        setSelectedApplication(application);
        // Scroll to the detailed Burial form
        setTimeout(() => {
            detailsFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleFormCancel = () => {
        setSelectedApplication(null);
    };

    const handleFormSubmitSuccess = () => {
        setSelectedApplication(null);
        fetchBurialData();
    };

    return (
        <div className='space-y-6 md:space-y-10 pb-12'>
            <BurialBookingTopSection
                onSuccess={fetchBurialData}
                onActionClick={handleActionClick}
                formRef={formRef}
            />

            {/* Render My Applications if user is authenticated */}
            {isAuthenticated && (
                <div ref={myApplicationsRef} className='rounded-2xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909] scroll-mt-32'>
                    <div className='p-6 sm:p-8 bg-white rounded-[15px]'>
                        <BurialMyApplications
                            applications={myApplications}
                            loading={loading}
                            onFillForm={handleFillForm}
                        />
                    </div>
                </div>
            )}

            {/* Detailed Burial Form Section */}
            {isAuthenticated && selectedApplication && (
                <div ref={detailsFormRef} className="scroll-mt-32">
                    <BurialForm
                        application={selectedApplication}
                        countries={countries}
                        relationships={relationships}
                        onCancel={handleFormCancel}
                        onSubmitSuccess={handleFormSubmitSuccess}
                    />
                </div>
            )}

            <div ref={bookingListRef} className='rounded-2xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909] scroll-mt-32'>
                <div className='p-6 sm:p-8 bg-white rounded-[15px]'>
                    <BurialTable
                        tableTitle={bookingTableTitle}
                        data={bookingList}
                        loading={loading}
                        isBookingTable={false}
                    />
                </div>
            </div>

            <div ref={registerListRef} className='rounded-2xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909] scroll-mt-32'>
                <div className='p-6 sm:p-8 bg-white rounded-[15px]'>
                    <BurialTable
                        tableTitle={registerTableTitle}
                        data={registerList}
                        loading={loading}
                    />
                </div>
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
