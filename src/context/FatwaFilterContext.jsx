"use client";

import { createContext, useContext, useState } from "react";

const FatwaFilterContext = createContext(null);

export function FatwaFilterProvider({ children }) {
  const [selectedMajhabs, setSelectedMajhabs] = useState("Hanafi");
  const [selectedBooks, setSelectedBooks] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSearchTerm, setSelectedSearchTerm] = useState("");

  return (
    <FatwaFilterContext.Provider
      value={{
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
      }}
    >
      {children}
    </FatwaFilterContext.Provider>
  );
}

export function useFatwaFilters() {
  const ctx = useContext(FatwaFilterContext);
  if (!ctx) throw new Error("useFatwaFilters must be used inside Provider");
  return ctx;
}
