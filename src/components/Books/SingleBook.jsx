
"use client"


import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import { getImageUrl } from '@/helper/getImageUrl'
import axiosInstance from '@/helper/axiosInstance'
import SocialShare from '../Shared/SocialShare'
import { useSelected } from '@/context/SelectedContext'
import BreadcrumbForNested from '../Shared/BreadcrumbForNested'
import { useSelectedParrent } from '@/context/SelectedContextParrent'
import SingleBookDetails from './SingleBookDetails'
import BookSuggetionsList from './BookSuggetionsList'





export default function SingleBook({ homePage, settings, blog, formattedCategories }) {
    const { selected, } = useSelected();
    const { selectedParrent,  } = useSelectedParrent();
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [selectedCat, setSelectedCat] = useState(null)
    const sections = homePage?.sections_on_api;
 



    const islamic_books_ExtraData = sections.find((s) => s.title_slug === "islamic-books");
    const image_arabic = getImageUrl(islamic_books_ExtraData?.image_media);
    const icon = getImageUrl(islamic_books_ExtraData?.background_media);



    // fetching data
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true)
            let url = `/posts?term_type=islamic_books&per_page=3`
            if (blog?.categories[0]?.id) {
                url = `/posts?term_type=islamic_books&category_id=${blog?.categories[0]?.id}&per_page=4`
            }

            try {
                const response = await axiosInstance.get(url)
                const data = response?.data?.data || []
                const meta = response?.data?.meta || {}

                setBlogs(data)
                // setTotalPages(meta.last_page || 1)
            } catch (err) {
                console.error("Error fetching blogs:", err)
                setError(err.message || "Failed to fetch blogs")
            } finally {
                setLoading(false)
            }
        }

        fetchBlogs()
    }, [])



    // const requesData={blog?.name} blog 
    const requestData = blog?.name ? `blog of ${blog?.name} ` : "Book"

    return (
        <div>

            <div>
                {/* <BannerInnerPage /> */}
                <BreadcrumbForNested
                    items={[
                        { label: "Home", link: "/" },
                        { label: "Books", link: "/books" },
                        { label: selectedParrent?.name, link: "/books" },
                        { label: selected?.name, link: null },

                    ]}
                />
              

            </div>


            <Container className=''>
                <div className='flex gap-6 my-6'>
                    {/* sidebar */}
                    <SidebarMainDrawer categories={formattedCategories} isNavigate={"books"} setSelectedCat={setSelectedCat} dataForContact={requestData} />
                

                    {/* main content */}
                    <div className=' w-full space-y-6'>
                        <InnerHeader title={islamic_books_ExtraData?.sub_title} image={image_arabic} />

                        <SingleBookDetails book={blog} settings={settings} />
                        <div className='flex justify-end'>
                            <SocialShare />
                        </div>

                    </div>
                </div>

            </Container>

             <BookSuggetionsList datas={blogs} />

        </div>
    )
}
