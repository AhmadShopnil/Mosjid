import FatwaFinder from '@/components/Fatwah/FatwahFinder'
import FatwaListInner from '@/components/Fatwah/FatwaListInner'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Container from '@/components/Shared/Container'
import Sidebar from '@/components/Shared/Sidebar'
import React from 'react'

export default function page() {
    return (
        <div>

            <div>
                <BannerInnerPage />
            </div>
            <Container className='mt-10'>
                <FatwaFinder />
            </Container>

            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <div className=''>
                    <Sidebar />
                </div>
                {/* main content */}
                <div className=' w-full'>
                    <FatwaListInner />

                </div>
            </Container>

        </div>
    )
}
