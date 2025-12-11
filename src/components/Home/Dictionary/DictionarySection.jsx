"use client";

import { useState } from "react";
import { Search, MoreVertical, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import CustomSelectDictionary from "@/components/UI/CustomSelectDictionary";
import { useFatwaFilters } from "@/context/FatwaFilterContext";
import { getImageUrl } from "@/helper/getImageUrl";

const languageRegex = {
  English: /^[A-Za-z\s]*$/,
  Japanese: /^[\u3040-\u30FF\u4E00-\u9FFF\s]*$/,
  Arabic: /^[\u0600-\u06FF\s]*$/,
};

export default function DictionarySection({ data_for_filter, homePage }) {
  const [warning, setWarning] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const {
    selectedBooks,
    setSelectedBooks,
    selectedChapter,
    setSelectedChapter,
    selectedSection,
    setSelectedSection,
    selectedSearchTerm,
    setSelectedSearchTerm,
  } = useFatwaFilters();

  const { books, chapter, section } = data_for_filter;

  const languages = [
    { title: "English", icon: "/images/others/English.png" },
    { title: "Japanese", icon: "/images/others/Japan.png" },
    { title: "Arabic", icon: "/images/others/Arabic.png" },
  ];

  const sections = homePage?.sections_on_api;
  const dictionaryExtraData = sections.find(
    (s) => s.title_slug === "dictionary"
  );

  const image_arabic = getImageUrl(dictionaryExtraData?.image_media);
  const icon = getImageUrl(dictionaryExtraData?.background_media);

  return (
    <motion.div
      id="dictionary"
      className="max-w-7xl mx-auto px-4 pt-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-white rounded-[20px] gradient-border px-4 py-16 sm:p-14 relative shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Decorative top image */}
        <div className="absolute top-[1px] right-[0px]">
          <Image
            src="/images/dictionary/topImage.png"
            alt="Decorative floral pattern"
            width={60}
            height={60}
            className="opacity-80"
          />
        </div>

        {/* Heading */}
        <motion.div
          className="flex justify-between mb-2 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex justify-between gap-2 gradient-border_b mb-4 sm:mb-0 pb-3">
            <Image src={icon} alt="Book Icon" width={60} height={50} />

            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
              <p>{dictionaryExtraData?.title}</p>
              <p>{dictionaryExtraData?.sub_title}</p>
            </div>
          </div>

          <div>
            <Image
              src={image_arabic}
              alt="Arabic text"
              width={500}
              height={70}
              className="hidden sm:flex"
            />
            <Image
              src={image_arabic}
              alt="Arabic text"
              width={200}
              height={40}
              className="flex sm:hidden"
            />
          </div>
        </motion.div>

        {/* Language Buttons */}
        <motion.div
          className="flex gap-2 mb-6"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {languages?.map((language) => (
            <button
              key={language.title}
              onClick={() => setSelectedLanguage(language.title)}
              className={`px-4 flex gap-1 py-2 rounded-full text-base font-bold transition-colors ${
                selectedLanguage === language.title
                  ? "bg-[#00401A] text-white"
                  : "bg-white text-[#00401A] hover:bg-gray-300 border border-[#00401a51]"
              }`}
            >
              <Image src={language.icon} alt="lang" width={20} height={10} />
              {language.title}
            </button>
          ))}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="relative mb-6 flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-[#00401A] rounded-full p-1 flex items-center w-[100%] sm:w-[95%]">
            <input
              type="text"
              placeholder="Search Word..."
              value={selectedSearchTerm}
              onChange={(e) => {
                const value = e.target.value;
                const allowed = languageRegex[selectedLanguage];

                if (allowed?.test(value)) {
                  setSelectedSearchTerm(value);
                  setWarning("");
                } else {
                  setWarning(
                    `Your selected language is ${selectedLanguage}. Only ${selectedLanguage} characters are allowed.`
                  );
                  setTimeout(() => setWarning(""), 3500);
                }
              }}
              className="flex-1 bg-transparent text-white text-sm placeholder-[#B0C4B8] px-4 py-2 outline-none"
            />

            {warning && (
              <p className="text-[#F7BA2A] text-sm mt-1 mr-10">{warning}</p>
            )}

            <div className="flex items-center gap-2 mr-2">
              <span className="text-[#B0C4B8] text-sm">{selectedLanguage}</span>
              <button className="text-teal-200 hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="my-auto w-[100%] sm:w-[5%]">
            <Link href="/dictionary">
              <button className="hidden sm:flex bg-[#00401A] cursor-pointer rounded-full p-4">
                <Search className="w-5 h-5 text-[#F7BA2A]" />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Dropdowns */}
        <motion.div
          className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full xs:w-[50%]"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex-1 min-w-[150px]">
            <CustomSelectDictionary
              lvl="Books"
              parrent_lvl="Books"
              selectedParrent="Books"
              options={books?.data}
              selected={selectedBooks}
              setSelected={setSelectedBooks}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <CustomSelectDictionary
              lvl="Chapter"
              parrent_lvl="Books"
              selectedParrent={selectedBooks}
              options={selectedBooks?.chapters}
              selected={selectedChapter}
              setSelected={setSelectedChapter}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <CustomSelectDictionary
              lvl="Sections"
              parrent_lvl="Chapters"
              selectedParrent={selectedChapter}
              options={selectedChapter?.sections}
              selected={selectedSection}
              setSelected={setSelectedSection}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
