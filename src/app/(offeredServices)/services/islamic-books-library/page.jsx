
import BookListServicePage from '@/components/Services/IslamicBooksLibrary/BookListServicePage'
import BookSearchSection from '@/components/Services/IslamicBooksLibrary/BookSearchSection'
import IslamicBooksLibraryTopSection from '@/components/Services/IslamicBooksLibrary/IslamicBooksLibraryTopSection'
import React from 'react'

export default function page() {
    return (
        <div className='space-y-8'>
            {/* top sections */}
            <IslamicBooksLibraryTopSection />
            <BookSearchSection />
            <div>
                <BookListServicePage />
            </div>

        </div>
    )
}
