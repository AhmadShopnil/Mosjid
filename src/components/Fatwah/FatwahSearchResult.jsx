"use client";

import React, { useEffect, useState } from "react";
import FatwaListInner from "./FatwaListInner";
import { useFatwaFilters } from "@/context/FatwaFilterContext";
import axiosInstance from "@/helper/axiosInstance";
import FatwaListSkeleton from "../Shared/Skeleton/FatwaListSkeleton";

export default function FatwahSearchResult({ settings, homePage }) {
    const {
        selectedMajhabs,
        selectedBooks,
        selectedChapter,
        selectedSection,
        selectedSearchTerm,
    } = useFatwaFilters();

    const [fatwahs, setFatwahs] = useState([]);
    const [loading, setLoading] = useState(false);



//  console.log( {
//         selectedMajhabs,
//         selectedBooks,
//         selectedChapter,
//         selectedSection,
//         selectedSearchTerm,
//       })



    useEffect(() => {
        const timeout = setTimeout(() => {
            async function fetchFilteredFatwa() {
                setLoading(true);

                try {
                    const params = new URLSearchParams();

                    if (selectedMajhabs) params.append("majhab", selectedMajhabs);
                    if (selectedBooks?.name) params.append("book", selectedBooks.name);
                    if (selectedChapter?.name) params.append("chapter", selectedChapter.name);
                    if (selectedSection?.name) params.append("section", selectedSection.name);
                    if (selectedSearchTerm) params.append("s", selectedSearchTerm);



                    // const apiUrl = `https://admin.osakamasjid.org/api/v1/fatwa?${params.toString()}`;
                    const apiUrl = `/fatwa?${params.toString()}`;

                    console.log("apiUrl", apiUrl)
                    const response = await axiosInstance.get(apiUrl)
                    const data = response?.data?.data || []
                    const meta = response?.data?.meta || {}
                    // const res = await fetch(apiUrl);
                    // const data = await res.json();
                    console.log("res data", data)

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
                    title="Fatwa Finder Results"
                    titleWidth="w-[420px]"
                    fatwahs={fatwahs}
                    settings={settings}
                    homePage={homePage}
                />
            )}
        </div>
    );
}
