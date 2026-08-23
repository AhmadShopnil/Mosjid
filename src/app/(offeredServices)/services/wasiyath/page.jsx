"use client";

import React, { useRef, useState } from 'react';
import WasiyahApplication from '@/components/Services/Wasiyah/WasiyahApplication';
import WasiyahTopSection from '@/components/Services/Wasiyah/WasiyahTopSection';
import PolicyModal from '@/components/Shared/PolicyModal';

export default function WasiyahPage() {
    const formRef = useRef(null);
    const historyRef = useRef(null);

    // Modal state for policies
    const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: "", title: "" });

    const handleActionClick = (action) => {
        if (action === "Register Wasiyah") {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === "My Wasiyah & History") {
            historyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === "Wasiyah Policies") {
            setModalConfig({ isOpen: true, slug: "wasiyah-guidelines", title: action });
        }
    };

    return (
        <div className='space-y-8'>
            {/* Top section */}
            <WasiyahTopSection onActionClick={handleActionClick} />

            {/* Wasiyah Application Form */}
            <div ref={formRef} className="scroll-mt-8">
                <WasiyahApplication />
            </div>

            {/* In the future: Wasiyah History List */}
            <div ref={historyRef} className="scroll-mt-8">
                {/* WasiyahLists component can go here */}
            </div>

            {/* Reusable Guidelines/Policies Modal */}
            <PolicyModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                slug={modalConfig.slug}
                title={modalConfig.title}
            />
        </div>
    );
}
