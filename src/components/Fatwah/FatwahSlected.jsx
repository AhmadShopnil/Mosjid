"use client";

import React, { useEffect, useState } from "react";

import { useFatwaFilters } from "@/context/FatwaFilterContext";
import axiosInstance from "@/helper/axiosInstance";
import FatwaListSkeleton from "../Shared/Skeleton/FatwaListSkeleton";
import FatwaListInner from "./FatwaListInner";

export default function FatwahSlected({ settings, homePage }) {
    const {
        selectedMajhabs,
        selectedBooks,
        selectedChapter,
        selectedSection,
        selectedSearchTerm,
    } = useFatwaFilters();

    const [fatwahs, setFatwahs] = useState([]);
    const [loading, setLoading] = useState(false);

//   console.log("Test 2")


    useEffect(() => {
        const timeout = setTimeout(() => {
            async function fetchFilteredFatwa() {
                setLoading(true);

                try {
                    const params = new URLSearchParams();

                    if (selectedMajhabs) params.append("majhab", selectedMajhabs);
                    if (selectedBooks?.name_en) params.append("book", selectedBooks.name_en);
                    if (selectedChapter?.name_en) params.append("chapter", selectedChapter.name_en);
                    if (selectedSection?.name_en) params.append("section", selectedSection.name_en);
                    if (selectedSearchTerm) params.append("s", selectedSearchTerm);



                    // const apiUrl = `https://admin.osakamasjid.org/api/v1/fatwa?${params.toString()}`;
                    const apiUrl = `/fatwa?${params.toString()}`;

                    // console.log("apiUrl", apiUrl)
                    const response = await axiosInstance.get(apiUrl)
                    const data = response?.data?.data || []
                    const meta = response?.data?.meta || {}
                    // const res = await fetch(apiUrl);
                    // const data = await res.json();
                    // console.log("res data", data)

                    setFatwahs(data?.data || []);
                } catch (error) {
                    console.error("Error fetching filtered fatwa:", error);
                } finally {
                    setLoading(false);
                }
            }

            fetchFilteredFatwa();
        }, 500); //  debounce 

        return () => clearTimeout(timeout); // cleanup for every key press
    }, [
        selectedMajhabs,
        selectedBooks,
        selectedChapter,
        selectedSection,
        selectedSearchTerm,
    ]);



    return (
        <div>
            {loading ? (
                <FatwaListSkeleton />
            ) : (
                <FatwaListInner
                    title="Selected Fatwa "
                    titleWidth="w-[220px]"
                    fatwahs={fatwahs}
                    settings={settings}
                    homePage={homePage}
                />
            )}
        </div>
    );
}
