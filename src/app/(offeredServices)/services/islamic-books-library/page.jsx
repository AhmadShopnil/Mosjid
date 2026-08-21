
import IslamicBooksLibraryTopSection from '@/components/Services/IslamicBooksLibrary/IslamicBooksLibraryTopSection'
import IslamicBooksLibraryClient from '@/components/Services/IslamicBooksLibrary/IslamicBooksLibraryClient'
import { getCategories } from '@/helper/actions'
import React from 'react'

export default async function page() {

    const library_books_categories = await getCategories("library_books_categoires")
    const islamic_library_publisher = await getCategories("islamic-library-publisher")
    const islamic_library_topic = await getCategories("islamic_library_topic")
    const islamic_library_writer_name = await getCategories("islamic-library-writer-name")

    return (
        <div className='space-y-8'>
            {/* Top section */}
            <IslamicBooksLibraryTopSection />

            {/* Client: Search + Filters + Book Grid + Sidebar */}
            <IslamicBooksLibraryClient
                categories={library_books_categories || []}
                writers={islamic_library_writer_name || []}
                topics={islamic_library_topic || []}
                publishers={islamic_library_publisher || []}
            />
        </div>
    )
}
