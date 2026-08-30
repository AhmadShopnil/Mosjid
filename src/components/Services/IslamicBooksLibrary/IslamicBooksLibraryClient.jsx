"use client";

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/helper/axiosInstance";
import BookSearchSection from "./BookSearchSection";
import BookListServicePage from "./BookListServicePage";
import BookCategoriesSidebar from "./BookCategoriesSidebar";
import Pagination from "@/components/Shared/Pagination";

const TERM_TYPE = "islamic-library";
const PER_PAGE = 10;

export default function IslamicBooksLibraryClient({
  categories = [],
  writers = [],
  topics = [],
  publishers = [],
}) {
  // Books data
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [selectedWriter, setSelectedWriter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Build category_id list from all active filters
  const buildCategoryIds = useCallback(() => {
    const ids = [];
    if (selectedCategoryId) ids.push(selectedCategoryId);
    if (selectedWriter?.id) ids.push(selectedWriter.id);
    if (selectedTopic?.id) ids.push(selectedTopic.id);
    if (selectedPublisher?.id) ids.push(selectedPublisher.id);
    return ids;
  }, [selectedCategoryId, selectedWriter, selectedTopic, selectedPublisher]);

  const fetchBooks = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      let url = `/posts?term_type=${TERM_TYPE}&page=${page}&per_page=${PER_PAGE}& strict=true`;

      const categoryIds = buildCategoryIds();
      if (categoryIds.length > 0) {
        url += `&category_id=${categoryIds.join(",")}`;
      }

      if (appliedSearch) {
        url += `&s=${encodeURIComponent(appliedSearch)}`;
      }

      const res = await axiosInstance.get(url);
      setBooks(res?.data?.data || []);
      setTotalPages(res?.data?.meta?.last_page || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [buildCategoryIds, appliedSearch]);

  // Fetch on mount and whenever filters/page change
  useEffect(() => {
    fetchBooks(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedSearch, selectedWriter, selectedTopic, selectedPublisher, selectedCategoryId]);

  const handleSearch = () => {
    setAppliedSearch(searchTerm);
    setCurrentPage(1);
  };

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleCategorySelect = (id) => {
    setSelectedCategoryId(id);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setAppliedSearch("");
    setSelectedWriter(null);
    setSelectedTopic(null);
    setSelectedPublisher(null);
    setSelectedCategoryId(null);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    fetchBooks(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Map category data to name_en format expected by CustomSelector
  const writerOptions = writers.map((w) => ({ ...w, name_en: w.name }));
  const topicOptions = topics.map((t) => ({ ...t, name_en: t.name }));
  const publisherOptions = publishers.map((p) => ({ ...p, name_en: p.name }));
  console.log("books",books)

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div id="search-books" className="scroll-mt-8">
        <BookSearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          onClear={handleClearFilters}
          writers={writerOptions}
          selectedWriter={selectedWriter}
          setSelectedWriter={handleFilterChange(setSelectedWriter)}
          topics={topicOptions}
          selectedTopic={selectedTopic}
          setSelectedTopic={handleFilterChange(setSelectedTopic)}
          publishers={publisherOptions}
          selectedPublisher={selectedPublisher}
          setSelectedPublisher={handleFilterChange(setSelectedPublisher)}
        />
      </div>

      {/* Main Content: Books list + Sidebar */}
      <div className="flex flex-col-reverse lg:flex-row gap-6 items-start">
        {/* Books Grid + Pagination */}
        <div id="books-list" className="flex-1 min-w-0 scroll-mt-8">
          <BookListServicePage books={books} loading={loading} />

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

        {/* Category Sidebar */}
        <div id="books-categories" className="w-full lg:w-[260px] shrink-0 scroll-mt-8">
          <BookCategoriesSidebar
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </div>
    </div>
  );
}
