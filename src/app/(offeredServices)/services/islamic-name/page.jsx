import IslamicNameClientWrapper from '@/components/Services/IslamicName/IslamicNameClientWrapper'
import ServiceInnerHeader from '@/components/Services/Shared/ServiceInnerHeader';
import { getCategories } from '@/helper/actions';
import React from 'react'

export default async function page() {


    const categories = await getCategories("blessed-name");



    return (
        <div className='space-y-8'>
            <ServiceInnerHeader
                title="イスラム教の名前"
                title2="أسماء إسلامية"
            />

            <IslamicNameClientWrapper categories={categories} />
        </div>
    )
}
