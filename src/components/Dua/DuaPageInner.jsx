"use client"

import React, { useEffect, useState } from "react"
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import axiosInstance from "@/helper/axiosInstance"
import DuaList from "./DuaList"
import { getImageUrl } from "@/helper/getImageUrl"
import { useSelected } from "@/context/SelectedContext"
import { useSelectedParrent } from "@/context/SelectedContextParrent"
import BreadcrumbForNested from "../Shared/BreadcrumbForNested"
import FindBySearch from "../Shared/FindBySearch"

export default function DuaPageInner({ homePage, settings, formattedCategories }) {
    const [searchValue, setSearchValue] = useState("");

    const { selected, setSelected, clearSelected } = useSelected();
    const { selectedParrent, setSelectedParrent, clearSelectedParrent } = useSelectedParrent();
    const [duas, setDuas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [selectedCat, setSelectedCat] = useState(null)
    // pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(10)
    const perPage = 6


    const handleSearch = ({ name, number }) => {
        const q = name || number || "";
        setSearchValue(q);
        setCurrentPage(1); 
    };


   useEffect(() => {
    const fetchDuas = async () => {
        setLoading(true);

        let url = `/posts?term_type=dua&page=${currentPage}&per_page=${perPage}`;

        if (selectedCat) {
            url = `/posts?term_type=dua&category_id=${selectedCat}&page=${currentPage}&per_page=${perPage}`;
        }

        // ⬅️ NEW: add search query
        if (searchValue) {
            url += `&s=${searchValue}`;
        }

        try {
            const response = await axiosInstance.get(url);
            const data = response?.data?.data || [];
            const meta = response?.data?.meta || {};

            setDuas(data);
            setTotalPages(meta.last_page || 1);
        } catch (err) {
            console.error("Error fetching Duas:", err);
            setError(err.message || "Failed to fetch duas");
        } finally {
            setLoading(false);
        }
    };

    fetchDuas();
}, [selectedCat, currentPage, searchValue]);   // ⬅️ searchValue dependency যোগ হলো





    const sections = homePage?.sections_on_api;
    const dua_extraData = sections.find((s) => s.title_slug === "notice-board");
    const image_arabic = getImageUrl(dua_extraData?.image_media);
    // const notice_board_title_2 = dua_extraData?.custom_information.find((item) => item.label === "notice_board_title_2")


    const requestData = selected?.name ? ` ${selected?.name} ` : "Duas"
    return (
        <div>
            <div>
                <BannerInnerPage />
                {/* <BreadcrumbForNested homeLabel="Home" homeLink="/" middle="Duas" middleLink="/dua" currentPage={selected?.name} /> */}
                <BreadcrumbForNested
                    items={[
                        { label: "Home", link: "/" },
                        { label: "Duas", link: "/dua" },
                        { label: selectedParrent?.name, link: null },
                        { label: selected?.name, link: null },

                    ]}
                />
            </div>

            <Container className="flex gap-6 my-6">
                {/* sidebar */}
                <SidebarMainDrawer categories={formattedCategories} setSelectedCat={setSelectedCat} dataForContact={requestData} />

                {/* main content */}
                <div className="w-full space-y-6">
                    <InnerHeader title={dua_extraData?.sub_title} image={image_arabic} />
                    <FindBySearch onSearch={(values) => handleSearch(values)} button_text="Find Dua" />


                    {/* Notice board */}
                    <DuaList
                        homePage={homePage}
                        duas={duas}
                        settings={settings}
                        loading={loading}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}

                    />


                </div>
            </Container>
        </div>
    )
}
