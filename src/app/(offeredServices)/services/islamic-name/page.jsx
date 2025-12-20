import IslamicNameSection from '@/components/Services/IslamicName/IslamicNameSection'
import IslamicNameTopSection from '@/components/Services/IslamicName/IslamicNameTopSection'
import React from 'react'

export default function page() {
    return (
        <div className='space-y-8'>
            {/* top sections */}
            <div>
                <IslamicNameTopSection />
            </div>
           

            {/* list section */}
            <div>
                <IslamicNameSection />
            </div>

        </div>
    )
}
