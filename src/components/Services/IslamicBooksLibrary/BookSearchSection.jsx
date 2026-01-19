

"use client";

import { useState } from "react";
import { Search, MoreVertical, X } from "lucide-react";
import CustomSelector from "./CustomSelector";

const SL_NO = [
  { id: 1, name_en: "001" },
  { id: 2, name_en: "002" },
  { id: 3, name_en: "003" },
];

const BOOKS = [
  { id: 1, name_en: "Minna no Nihongo" },
  { id: 2, name_en: "Genki I" },
];

const WRITERS = [
  { id: 1, name_en: "Hitoshi Okamoto" },
  { id: 2, name_en: "Eri Banno" },
];

const TOPICS = [
  { id: 1, name_en: "Grammar" },
  { id: 2, name_en: "Vocabulary" },
  { id: 3, name_en: "Conversation" },
];

const PUBLISHERS = [
  { id: 1, name_en: "3A Corporation" },
  { id: 2, name_en: "Japan Times" },
];



export default function BookSearchSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const [slNo, setSlNo] = useState(null);
  const [book, setBook] = useState(null);
  const [writer, setWriter] = useState(null);
  const [topic, setTopic] = useState(null);
  const [publisher, setPublisher] = useState(null);

  return (
    <div id="dictionary">
      <div className="bg-white rounded-[20px] gradient-border px-4 py-16 sm:p-10 relative shadow-md">

        {/* 🔹 SEARCH BAR (UNCHANGED) */}
        <div className="relative mb-6 flex flex-col sm:flex-row gap-3">
          <div className="bg-[#00401A] rounded-full p-1 flex items-center w-full sm:w-[95%]">
            <input
              type="text"
              placeholder="Search Word..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-white text-sm placeholder-[#B0C4B8] px-4 py-2 outline-none"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-teal-200 hover:text-white p-1 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-2 mr-2">
              <span className="text-[#B0C4B8] text-sm">EN</span>
              <MoreVertical className="w-4 h-4 text-teal-200" />
            </div>
          </div>

          <div className="my-auto w-full sm:w-[5%]">
            <button className="hidden sm:flex bg-[#00401A] rounded-full p-4">
              <Search className="w-5 h-5 text-[#F7BA2A]" />
            </button>

            <button className="sm:hidden bg-[#00401A] rounded-xl p-3 text-white font-bold">
              Search
            </button>
          </div>
        </div>

        {/* 🔹 SELECTORS (ADDED ONLY) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          <CustomSelector label="SL No" options={SL_NO} selected={slNo} onSelect={setSlNo} />
          <CustomSelector label="Book Name" options={BOOKS} selected={book} onSelect={setBook} />
          <CustomSelector label="Writer Name" options={WRITERS} selected={writer} onSelect={setWriter} />
          <CustomSelector label="Topic" options={TOPICS} selected={topic} onSelect={setTopic} />
          <CustomSelector label="Publisher" options={PUBLISHERS} selected={publisher} onSelect={setPublisher} />
        </div>
      </div>
    </div>
  );
}
