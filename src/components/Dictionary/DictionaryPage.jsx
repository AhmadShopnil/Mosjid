"use client";

import Image from "next/image";
import SocialShare from "../Shared/SocialShare";
import { useFatwaFilters } from "@/context/FatwaFilterContext";
import axiosInstance from "@/helper/axiosInstance";
import { useEffect, useState } from "react";
import SelectedWordDetails from "./SelectedWordDetails";


export default function DictionaryPage() {
    const { selectedBooks, selectedChapter, selectedSection, selectedSearchTerm } = useFatwaFilters();

    const [dictionaries, setDictionaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    /* Fetch Filtered Dictionaries  */
    useEffect(() => {
        const timeout = setTimeout(() => {
            async function fetchFilteredDictionaries() {
                setLoading(true);

                try {
                    const params = new URLSearchParams();

                    if (selectedBooks?.name_en) params.append("book", selectedBooks?.name_en);
                    if (selectedChapter?.name_en) params.append("chapter", selectedChapter?.name_en);
                    if (selectedSection?.name_en) params.append("section", selectedSection?.name_en);
                    if (selectedSearchTerm) params.append("s", selectedSearchTerm);

                    const apiUrl = `/dictionary?${params.toString()}`;

                    const response = await axiosInstance.get(apiUrl);
                    const data = response?.data?.data?.data || [];

                    setDictionaries(data);
                } catch (error) {
                    console.error("Error fetching filtered dictionary:", error);
                } finally {
                    setLoading(false);
                }
            }

            fetchFilteredDictionaries();
        }, 400);

        return () => clearTimeout(timeout);
    }, [selectedBooks, selectedChapter, selectedSection,selectedSearchTerm]);

    return (
        <div className="bg-gray-50 space-y-4 ">
            {/* Table Section */}
            <div className="gradient-border rounded-2xl p-8 bg-white shadow-md">

                {/* Table Header */}
                <div className="bg-[#52B920] h-[50px] text-white flex items-center justify-center rounded-t-[10px]">
                    <h2 className="text-center text-xl font-bold">
                        Table for Selected Category
                    </h2>
                </div>

                {/* Scrollable Table */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse table-fixed font-normal">
                        <thead>
                            <tr className="bg-[#D9E2DD] h-[28px]">
                                {[
                                    "SL.No",
                                    "Arabic",
                                    "English",
                                    "Japanese",
                                    "Japanese Pron",
                                    "Arabic Pron",
                                    "View"
                                ].map((th, i) => (
                                    <th
                                        key={i}
                                        className="border border-[#B0C4B8] py-2 text-sm text-center"
                                    >
                                        {th}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Skeleton */}
                        {loading && <TableSkeleton />}

                        {/* Show Data */}
                        {!loading && dictionaries?.length > 0 && (
                            <tbody>
                                {dictionaries.map((item, i) => (
                                    <tr
                                        key={item.id}
                                        className={`${i % 2 === 0 ? "bg-white" : "bg-[#E5F5DE]"} h-[32px`}
                                    >
                                        <td className="border border-gray-300 p-2 text-center">{i + 1}</td>
                                        <td className="border border-gray-300 p-2 text-center">{item.word_ar}</td>
                                        <td className="border border-gray-300 p-2 text-center">{item.word_en}</td>
                                        <td className="border border-gray-300 p-2 text-center">{item.word_ja}</td>
                                        <td className="border border-gray-300 p-2 text-center">{item.description_ja}</td>
                                        <td className="border border-gray-300 p-2 text-center">{item.description_ar}</td>

                                        <td className="border border-gray-300 p-2 text-center">
                                            <button
                                                onClick={() => setSelectedItem(item)}
                                                className="text-green-600 cursor-pointer hover:text-green-800 transition"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}

                        {/* No Data Found */}
                        {!loading && dictionaries?.length === 0 && (
                            <tbody>
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="py-6 text-center font-medium text-gray-500"
                                    >
                                        ❌ No Data Found
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>

                <div className="text-center mt-6 text-black text-xl md:text-2xl">
                    www.osakamasjid.com
                </div>
            </div>

            {/* Social Icons */}
            <div className="py-4 flex justify-end items-center">
                <SocialShare />
            </div>

            {/* Selected Card Modal */}
            {selectedItem && <SelectedWordDetails selectedItem={selectedItem} />}
        </div>
    );
}

/* Skeleton Loader  */
function TableSkeleton() {
    const rows = Array.from({ length: 3 });
    return (
        <tbody>
            {rows.map((_, i) => (
                <tr key={i} className="animate-pulse">
                    {Array.from({ length: 7 }).map((__, j) => (
                        <td
                            key={j}
                            className="border border-gray-300 h-[32px]"
                        >
                            <div className="bg-gray-300 h-4 mx-auto rounded w-3/4"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}
