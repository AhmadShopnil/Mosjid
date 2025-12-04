import { useFatwaFilters } from '@/context/FatwaFilterContext';
import React from 'react'

export default function MajhabSelection({ data_for_filter }) {


    const {
        selectedMajhabs,
        setSelectedMajhabs,

        selectedBooks,
        setSelectedBooks,

        selectedChapter,
        setSelectedChapter,

        selectedSection,
        setSelectedSection,

        selectedSearchTerm,
        setSelectedSearchTerm,
    } = useFatwaFilters();

    const { majhabs, books, chapter, section } = data_for_filter;



    return (

        <div className="w-full flex flex-col gap-3">
            {majhabs?.data?.map((m, i) => (
                <button
                    key={i}
                    onClick={() => setSelectedMajhabs(m.name_en)}
                    className={`h-[56px] flex flex-col justify-center items-center py-3 rounded-md text-sm font-semibold transition-all duration-300
                ${selectedMajhabs === m.name_en
                            ? "gradient-bg-fatwah-finder text-white shadow"
                            : "bg-[#D7EFD8] hover:bg-[#C9E8CA]"
                        }`}
                >
                    <span>{m.name_en}</span>
                    <span>{m.name_jp}</span>
                </button>
            ))}
        </div>

    )
}
