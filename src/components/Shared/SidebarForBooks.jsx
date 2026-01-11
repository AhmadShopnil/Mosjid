"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFatwaFilters } from "@/context/FatwaFilterContext";

export default function SidebarForBooks({ setIsDrawerOpen, books, isNavigate, icon }) {
  const {
    selectedBooks,
    setSelectedBooks,

    selectedChapter,
    setSelectedChapter,

    selectedSection,
    setSelectedSection,
  } = useFatwaFilters();

  const router = useRouter();
  const [hovered, setHovered] = useState("");

  const [expandedBook, setExpandedBook] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);

  const toggleBook = (bookId) => {
    setExpandedBook((prev) => (prev === bookId ? null : bookId));
    setExpandedChapter(null); // reset chapter when switching book
  };


  const toggleChapter = (chapterId) => {
    setExpandedChapter((prev) => (prev === chapterId ? null : chapterId));
  };


  const handleOnClickItem = (book) => {
    setSelectedBooks(book);
    setSelectedChapter(null);
    setSelectedSection(null);

    toggleBook(book.id);

    if (book?.chapters?.length == 0) {
      if (setIsDrawerOpen) setIsDrawerOpen(false);
    }


    if (isNavigate) {
      if (book?.chapters?.length == 0) {
        router.push(
          `/fatwah/fatwah-filtered`
        );
      }
    }
  };


  const handleOnClickChapter = (chapter, book) => {
    setSelectedBooks(book);
    setSelectedChapter(chapter);
    setSelectedSection(null); // reset section
    toggleChapter(chapter.id);

    if (chapter?.sections?.length == 0) {
      if (setIsDrawerOpen) setIsDrawerOpen(false);
    }

    if (isNavigate) {
      if (chapter?.sections?.length == 0) {
        router.push(
          `/fatwah/fatwah-filtered`
        );
      }
    }

  };

  const handleOnClickSection = (section, chapter, book) => {
    setSelectedBooks(book);
    setSelectedChapter(chapter);
    setSelectedSection(section);

    if (setIsDrawerOpen) setIsDrawerOpen(false);

    if (isNavigate) {
      router.push(
        `/fatwah/fatwah-filtered`
      );
    }

  };

  return (
    <div className="bg-white rounded-[20px] border border-[#C9E9BA] overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-white p-5">
        <h3 className="text-2xl font-bold text-[#00401A] gradient-border_b pb-2">
          Menu / メニュー
        </h3>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 px-4 pb-4">
        {books?.map((book) => {
          const isBookExpanded = expandedBook === book.id;

          return (
            <div key={book.id}>

              <button
                onMouseEnter={() => setHovered(book.id)}
                onMouseLeave={() => setHovered("")}
                onClick={() => handleOnClickItem(book)}
                className={`group w-full max-h-[70px] px-4 py-3 flex items-center gap-3 transition-all cursor-pointer ${isBookExpanded ||
                  hovered === book.id ||
                  selectedBooks?.id === book.id
                  ? "gradient-bg-sidebar-item text-white rounded-t-[10px]"
                  : "bg-[#EEF8E9] rounded-[10px]"
                  }`}
              >
                {/* Icon */}
                <img
                  src={icon || "/images/QuickLinks/fatwa.png"}
                  alt={book?.name_en}
                  className={`w-[42px] h-[42px] object-contain transition ${isBookExpanded ||
                    hovered === book.id ||
                    selectedBooks?.id === book.id
                    ? "brightness-0 invert"
                    : "group-hover:brightness-0 group-hover:invert"
                    }`}
                />

                {/* Text */}
                <div className="flex-1 text-left">
                  <p
                    className={`font-bold text-sm transition ${isBookExpanded ||
                      hovered === book.id ||
                      selectedBooks?.id === book.id
                      ? "text-white"
                      : "text-[#B98C20] group-hover:text-white"
                      }`}
                  >
                    {book?.name_en}
                  </p>
                  <p
                    className={`text-sm font-bold transition ${isBookExpanded ||
                      hovered === book.id ||
                      selectedBooks?.id === book.id
                      ? "text-white"
                      : "text-[#00401A] group-hover:text-white"
                      }`}
                  >
                    {book?.name_jp}
                  </p>
                </div>

                {/* Chevron */}
                {book?.chapters?.length ? (
                  <ChevronDown
                    size={24}
                    className={`transition ${isBookExpanded
                      ? "rotate-180 text-white"
                      : "text-[#141B34] group-hover:text-white"
                      }`}
                  />
                ) : (
                  <ChevronRight
                    size={24}
                    className={`transition ${isBookExpanded ||
                      hovered === book.id ||
                      selectedBooks?.id === book.id
                      ? "text-white"
                      : "text-[#141B34]"
                      }`}
                  />
                )}
              </button>

              {/*chapters  */}
              {isBookExpanded && book?.chapters?.length > 0 && (
                <div className="bg-[#EEF8E9] border-t border-gray-200 p-2 space-y-2">
                  {book.chapters.map((chapter) => {
                    const isChapterExpanded =
                      expandedChapter === chapter.id;

                    return (
                      <div key={chapter.id}>

                        <button
                          onClick={() =>
                            handleOnClickChapter(chapter, book)
                          }
                          className="cursor-pointer w-full px-3 py-2 h-[54px] flex items-center justify-between text-left text-sm text-[#00401A] bg-white hover:bg-[#C9E9BA] rounded-[10px]"
                        >
                          <div className="flex flex-col font-semibold leading-tight">
                            <span>{chapter?.name_en}</span>
                            <span className="text-gray-600 text-sm">
                              {chapter?.name_jp}
                            </span>
                          </div>

                          {chapter?.sections?.length ? (
                            <ChevronDown
                              size={24}
                              className={`transition ${isChapterExpanded
                                ? "rotate-180 text-[#00401A]"
                                : "text-[#00401A]"
                                }`}
                            />
                          ) : (
                            <ChevronRight
                              size={24}
                              className="text-[#00401A]"
                            />
                          )}
                        </button>                
                        {isChapterExpanded &&
                          chapter?.sections?.length > 0 && (
                            <div className="pl-6 pt-2 space-y-2">
                              {chapter.sections.map((section) => (
                                <button
                                  key={section.id}
                                  onClick={() =>
                                    handleOnClickSection(
                                      section,
                                      chapter,
                                      book
                                    )
                                  }
                                  className="cursor-pointer w-full px-3 py-2 flex justify-between items-center bg-white hover:bg-[#C9E9BA] rounded-[10px] text-sm text-[#00401A]"
                                >
                                  <div className="flex flex-col font-semibold leading-tight items-start">
                                    <span>{section?.name_en}</span>
                                    <span className="text-gray-600 text-sm">
                                      {section?.name_jp}
                                    </span>
                                  </div>
                                  <ChevronRight size={18} />
                                </button>
                              ))}
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
