"use client";

import { useEffect, useState } from "react";
import DirectorySearchInnerPage from "@/components/Directory/DirectorySearchInnerPage";
import BannerInnerPage from "@/components/Shared/BannerInnerPage";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import Container from "@/components/Shared/Container";
import InnerHeader from "@/components/Shared/InnerHeader";
import SidebarMainDrawer from "@/components/Shared/SidebarMainDrawer";
import { getImageUrl } from "@/helper/getImageUrl";
import { transformNoticeCategories } from "@/helper/transformNoticeCategories";
import DirectoryPage from "./Directorypage";
import axiosInstance from "@/helper/axiosInstance";
import BreadcrumbForNested from "../Shared/BreadcrumbForNested";


export default function DirectoryPageClient({ params, settings, homePage, slug, filterData }) {

    const [selectedDirectoryLocation, setSelectedDirectoryLocation] = useState(null);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [directories, setDirectories] = useState([]);


    const formattedCategories = transformNoticeCategories(filterData?.cat);
    const sections = homePage?.sections_on_api;
    const directory_extradata = sections.find((s) => s.title_slug === "directory");
    const arabic_image = getImageUrl(directory_extradata?.image_media);

    // console.log("intial slug", slug)

    // console.log("selected id ", selected)

    useEffect(() => {

        if (!selectedDirectoryLocation) {
            setSelected(slug);
        }

    }, [])



    // fetching data


    useEffect(() => {
        const fetchData = async () => {

            setLoading(true)

            let url = `/posts?term_type=directory`

            if (slug) {
                url = `/posts?term_type=directory&category_id=${slug}`
            }
            if (selected) {
                url = `/posts?term_type=directory&category_id=${selected}`
            }

            try {
                const response = await axiosInstance.get(url)
                const data = response?.data?.data || []
                const meta = response?.data?.meta || {}

                setDirectories(data)

            } catch (err) {
                console.error("Error fetching donations:", err)
                setError(err.message || "Failed to fetch donations")
            } finally {
                setLoading(false)
            }
        }
        fetchData()

    }, [slug])


    const fetchData = async () => {

        setLoading(true)

        let url = `/posts?term_type=directory`

        if (slug) {
            url = `/posts?term_type=directory&category_id=${slug}`
        }
        if (selected) {
            url = `/posts?term_type=directory&category_id=${selected}`
        }

        try {
            const response = await axiosInstance.get(url)
            const data = response?.data?.data || []
            const meta = response?.data?.meta || {}

            setDirectories(data)

        } catch (err) {
            console.error("Error fetching directory:", err)
            setError(err.message || "Failed to fetch directory")
        } finally {
            setLoading(false)
        }
    }





    const handleSetSelectByLocations = (data) => {
        setSelectedDirectoryLocation(data)
        setSelected(data?.id);
    }


    const getData = () => {
        //  console.log("from get data skug",selected)
        // console.log("from get data selected",selected)
        fetchData();
    }

    return (
        <div>
            <div>
                <BannerInnerPage />
                {/* <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Directory" /> */}
                <BreadcrumbForNested
                    items={[
                        { label: "Home", link: "/" },
                        { label: "Directory", link: "/directory/19" },
                        // { label: selectedParrent?.name, link: null },
                        // { label: selected?.name, link: null },

                    ]}
                />
            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}

                <SidebarMainDrawer categories={formattedCategories} setSelectedCat={null} directoryNavigate={true} dataForContact={`Directories`} />

                {/* main content */}
                <div className=' w-full space-y-6'>
                    {/* Header */}
                    <InnerHeader title={directory_extradata?.sub_title} image={arabic_image} />
                    <div className='w-full'>
                        <div className='w-full lg:w-[80%] py-3'>
                            <DirectorySearchInnerPage
                                filterData={filterData}
                                setSelected={handleSetSelectByLocations}
                                selected={selectedDirectoryLocation}
                                getData={getData}

                            />
                        </div>
                    </div>
                    <DirectoryPage directories={directories} loading={loading} />
                </div>
            </Container>

        </div>
    );
}
