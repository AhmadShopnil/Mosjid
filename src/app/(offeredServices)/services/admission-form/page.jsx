import AdmissionForm from '@/components/Services/Madrasha/AdmissionForm'
import React from 'react'

export const metadata = {
    title: "Madrasha Admission Form - Osaka Masjid",
    description: "Apply for Madrasha admission at Osaka Masjid.",
};

export default function AdmissionFormPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <AdmissionForm />
        </div>
    )
}
