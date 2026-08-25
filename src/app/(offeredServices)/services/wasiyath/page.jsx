"use client";

import React, { useRef, useState } from 'react';
import WasiyahApplication from '@/components/Services/Wasiyah/WasiyahApplication';
import WasiyahTopSection from '@/components/Services/Wasiyah/WasiyahTopSection';
import WasiyahLists from '@/components/Services/Wasiyah/WasiyahLists';
import PolicyModal from '@/components/Shared/PolicyModal';

export default function WasiyahPage() {
    const formRef = useRef(null);
    const historyRef = useRef(null);

    // Modal state for policies
    const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: "", title: "" });
    
    // State to pass data to the form for editing
    const [editData, setEditData] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleActionClick = (action) => {
        if (action === "Register Wasiyah") {
            setEditData(null); // Clear form when creating new
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === "My Wasiyah & History") {
            historyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (action === "Wasiyah Policies") {
            setModalConfig({ isOpen: true, slug: "wasiyah-guidelines", title: action });
        }
    };

    const handleEditWasiyah = (data) => {
        setEditData(data);
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className='space-y-8'>
            {/* Top section */}
            <WasiyahTopSection onActionClick={handleActionClick} />

            {/* Wasiyah Application Form */}
            <div ref={formRef} className="scroll-mt-8">
                <WasiyahApplication 
                    editData={editData} 
                    onSuccessfulSubmit={() => {
                        setEditData(null);
                        setRefreshTrigger(prev => prev + 1);
                        historyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                />
            </div>

            {/* Wasiyah History List */}
            <div ref={historyRef} className="scroll-mt-8">
                <WasiyahLists onEdit={handleEditWasiyah} refreshTrigger={refreshTrigger} />
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
