import AcademicDocumentsTopSection from '@/components/Services/AcademicDocuments/AcademicDocumentsTopSection'
import AdmissionForm from '@/components/Services/AcademicDocuments/AdmisionForm'
import React from 'react'

export default function page() {
    return (
        <div className='space-y-8'>
            <AcademicDocumentsTopSection />
            <AdmissionForm/>
        </div>
    )
}
