"use client";

import React, { useState } from 'react';
import AcademicDocumentsTopSection from '@/components/Services/AcademicDocuments/AcademicDocumentsTopSection';
import AdmissionForm from '@/components/Services/AcademicDocuments/AdmisionForm';
import PolicyModal from '@/components/Shared/PolicyModal';
import { useAuth } from '@/context/AuthContext';

export default function AdmissionFormPage() {
    const { isAuthenticated, openAuthModal } = useAuth();
    const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: "", title: "" });

    const handleActionClick = (action) => {
        if (action === "Adimission Rules Regulation") {
            setModalConfig({
                isOpen: true,
                slug: "admission-rules-regulation",
                title: "Admission Rules & Regulation"
            });
        }
    };

    return (
        <div className='space-y-8'>
            <AcademicDocumentsTopSection onActionClick={handleActionClick} />
            
            {isAuthenticated ? (
                <AdmissionForm />
            ) : (
                <div className="flex flex-col items-center justify-center space-y-6 text-center bg-white/60 p-8 rounded-2xl h-full shadow-inner border border-orange-100 w-full min-h-[400px]">
                    <div className="text-4xl p-4 rounded-full bg-white text-[#B98C20] shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#B98C20]">Authentication Required</h3>
                    <p className="text-gray-700 text-base max-w-md">
                        Please log in or register an account to continue with the Madrasha Admission Form.
                    </p>
                    <button
                        type="button"
                        onClick={() => openAuthModal("login")}
                        className="bg-[#58b847] hover:bg-[#4a9f3b] text-white px-10 py-3 rounded-xl font-bold transition-all shadow-md mt-4 cursor-pointer"
                    >
                        Quick Login / Register
                    </button>
                </div>
            )}

            <PolicyModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                slug={modalConfig.slug}
                title={modalConfig.title}
            />
        </div>
    );
}
