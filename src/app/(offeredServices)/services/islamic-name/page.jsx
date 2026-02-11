import IslamicNameSection from '@/components/Services/IslamicName/IslamicNameSection'
import IslamicNameTopSection from '@/components/Services/IslamicName/IslamicNameTopSection'
import { getCategories } from '@/helper/actions';
import React from 'react'

export default async function page() {


 const categories = await getCategories("blessed-name");



    return (
        <div className='space-y-8'>
            {/* top sections */}
            <div>
                <IslamicNameTopSection />
            </div>
           

            {/* list section */}
            <div>
                <IslamicNameSection categories={categories} />
            </div>

        </div>
    )
}
