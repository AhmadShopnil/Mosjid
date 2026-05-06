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
    const allApplicationsRef = useRef(null);
    const formRef = useRef(null);

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
        // else if (action === " Guides Line") {
        //     setModalConfig({ isOpen: true, slug: "halal-certificate-guidelines", title: action });
        // }
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

            <div className="my-10 scroll-mt-32" ref={listRef}>
                <HalalCertifiedList />
            </div>

            {/* <div className="my-10 scroll-mt-32" ref={allApplicationsRef}>
                <HalalAllApplications />
            </div> */}

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
