// app/components/DictionarySection.jsx
"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

export default function DictionarySection() {
  const [language, setLanguage] = useState("English");
  const [searchWord, setSearchWord] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [section, setSection] = useState("");

  // demo data
  const books = ["Book One", "Book Two", "Book Three"];
  const chapters = ["Chapter 1", "Chapter 2", "Chapter 3"];
  const sections = ["Section A", "Section B", "Section C"];

  const handleSearch = () => {
    alert(
      `Searching for "${searchWord}" in ${language}\nBook: ${book}\nChapter: ${chapter}\nSection: ${section}`
    );
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 border border-green-400 rounded-xl shadow-sm bg-white">
      {/* Top Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <img src="/dictionary-icon.png" alt="icon" className="w-8 h-8" />
          <h2 className="text-2xl font-bold text-green-900">Dictionary</h2>
        </div>

        <div className="flex gap-2">
          {["English", "Japanese", "Arabic"].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-1 rounded-full border ${
                language === lang
                  ? "bg-green-800 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {lang === "English" && "🇬🇧"} {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Arabic Title */}
      <div className="text-center mt-4">
        <p className="text-2xl font-arabic text-green-900">
          المصطلحات الاسلامية باللغة اليابانية
        </p>
      </div>

      {/* Search Bar */}
      <div className="mt-6 flex items-center bg-green-900 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Search Word..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-gray-200 outline-none"
        />
        {searchWord && (
          <button
            onClick={() => setSearchWord("")}
            className="text-white text-xl mr-2"
          >
            <MdOutlineClose />
          </button>
        )}
        <span className="text-white mr-2">{language}</span>
        <button
          onClick={handleSearch}
          className="bg-green-700 hover:bg-green-600 text-white p-2 rounded-full"
        >
          <FaSearch />
        </button>
      </div>

      {/* Dropdowns */}
      <div className="mt-6 flex flex-wrap gap-4">
        <select
          className="border rounded-lg px-4 py-2"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        >
          <option value="">Book</option>
          {books.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        >
          <option value="">Chapter</option>
          {chapters.map((ch) => (
            <option key={ch} value={ch}>
              {ch}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="">Section</option>
          {sections.map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
