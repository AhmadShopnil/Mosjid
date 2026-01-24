import ConversionForm from '@/components/Services/MuslimConversion/ConversionForm'
import MuslimConvertionTopSection from '@/components/Services/MuslimConversion/MuslimConvertionTopSection'
import React from 'react'

export default function page() {
    return (
        <div className='space-y-8'>
            <MuslimConvertionTopSection />

            <ConversionForm />
        </div>
    )
}
