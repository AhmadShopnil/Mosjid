"use client";

import React, { useState, useRef } from 'react'
import HalalCertificateForm from '@/components/Services/HalalCertification/HalalCertificateForm'
import HalalCertificateTopSection from '@/components/Services/HalalCertification/HalalCertificateTopSection'
import HalalCertifiedList from '@/components/Services/HalalCertification/HalalCertifiedList'
import HalalAllApplications from '@/components/Services/HalalCertification/HalalAllApplications'
import PolicyModal from '@/components/Shared/PolicyModal'
import ServiceInnerHeader from '@/components/Services/Shared/ServiceInnerHeader';

export default function Page() {
    const [showForm, setShowForm] = useState(false);
    const listRef = useRef(null);
    const formRef = useRef(null);
    const [activeTab, setActiveTab] = useState("all"); // "all" (All Certified), "my" (My Applications)

    // Modal state
    const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: "", title: "" });

    const handleActionClick = (action) => {
        if (action === "Halal Certificate Form") {
            setShowForm(true);
            // Allow state to update and DOM to render before scrolling
            setTimeout(() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else if (action === "Halal Certified List") {
            listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === "Issuing Rules of Halal Certification") {
            setModalConfig({ isOpen: true, slug: "halal-certificate-guidelines", title: action });
        }
    };

    return (
        <div className='space-y-8'>
            <ServiceInnerHeader
                title="ハラール認証"
                title2="شهادة الحلال"
            />
            {/* top sections */}
            <HalalCertificateTopSection onActionClick={handleActionClick} />

            <div className="scroll-mt-32" ref={formRef}>
                {showForm && <HalalCertificateForm onCancel={() => setShowForm(false)} />}
            </div>

            {/* Premium Tabbed Applications Interface */}
            <div className="my-12 scroll-mt-32 bg-white rounded-3xl border border-gray-150 p-6 shadow-sm" ref={listRef}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-150 pb-4 mb-6 gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-[#00401A] flex items-center gap-2">

                            Halal Certification
                        </h3>

                    </div>

                    {/* Premium tab switcher */}
                    <div className="flex bg-gray-50 border border-gray-200 rounded-xl p-1 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={() => setActiveTab("all")}
                            className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === "all"
                                ? "bg-[#00401A] text-white shadow"
                                : "text-gray-500 hover:text-green-700 hover:bg-green-50/50"
                                }`}
                        >
                            All Certified Items
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("my")}
                            className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === "my"
                                ? "bg-[#00401A] text-white shadow"
                                : "text-gray-500 hover:text-green-700 hover:bg-green-50/50"
                                }`}
                        >
                            My Applications
                        </button>
                    </div>
                </div>

                <div className="mt-4 transition-all duration-300">
                    {activeTab === "all" ? (
                        <HalalCertifiedList />
                    ) : (
                        <HalalAllApplications />
                    )}
                </div>
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
