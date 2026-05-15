
import AcademicDocumentsTopSection from '@/components/Services/AcademicDocuments/AcademicDocumentsTopSection';
import AdmissionForm from '@/components/Services/AcademicDocuments/AdmisionForm';
import React from 'react'

export const metadata = {
    title: "Madrasha Admission Form - Osaka Masjid",
    description: "Apply for Madrasha admission at Osaka Masjid.",
};

export default function AdmissionFormPage() {
    return (
        <div className='space-y-8'>
            <AcademicDocumentsTopSection />
            <AdmissionForm />
        </div>
    )
}
