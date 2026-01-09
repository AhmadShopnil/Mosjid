"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const perPage = 2; 
  const debounceRef = useRef(null);


//  Reset page when filters change

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedMajhabs,
    selectedBooks,
    selectedChapter,
    selectedSection,
    selectedSearchTerm,
  ]);


//    Fetch fatwa with debounce

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setLoading(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams();

        // Majhab (supports array or string)
        if (Array.isArray(selectedMajhabs) && selectedMajhabs.length) {
          params.append("majhab", selectedMajhabs.join(","));
        } else if (typeof selectedMajhabs === "string") {
          params.append("majhab", selectedMajhabs);
        }

        if (selectedBooks?.name_en) {
          params.append("book", selectedBooks.name_en);
        }

        if (selectedChapter?.name_en) {
          params.append("chapter", selectedChapter.name_en);
        }

        if (selectedSection?.name_en) {
          params.append("section", selectedSection.name_en);
        }

        if (selectedSearchTerm) {
          params.append("s", selectedSearchTerm);
        }

        params.append("page", currentPage.toString());
        params.append("per_page", perPage.toString());

        const response = await axiosInstance.get(`/fatwa?${params.toString()}`);

        const apiData = response?.data?.data || {};
        const list = apiData?.data || [];
        const meta = response?.data?.meta || {};

        setFatwahs(list);
        setTotalPages(meta?.last_page || 1);
      } catch (error) {
        console.error("Error fetching filtered fatwa:", error);
        setFatwahs([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }, 500); 

    return () => clearTimeout(debounceRef.current);
  }, [
    selectedMajhabs,
    selectedBooks,
    selectedChapter,
    selectedSection,
    selectedSearchTerm,
    currentPage,
  ]);

  return (
    <div>
      {loading ? (
        <FatwaListSkeleton />
      ) : (
        <FatwaListInner
          title="Selected Fatwa"
          titleWidth="w-[220px]"
          fatwahs={fatwahs}
          settings={settings}
          homePage={homePage}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
