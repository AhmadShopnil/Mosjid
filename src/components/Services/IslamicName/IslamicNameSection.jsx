"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import IslamicNameTableRow from "./IslamicNameTableRow";
import IslamicNameSearch from "./IslamicNameSearch";
import BlessedNameTabs from "./BlessedNameTabs";
import SocialShare from "@/components/Shared/SocialShare";
import { TableSkeleton } from "../Skeletons/TableSkeleton";
import axiosInstance from "@/helper/axiosInstance";
import GradientBorderWrapper1 from "@/components/Shared/GradientBorderWrapper1";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const GENDER_CATEGORY_MAP = {
  boy: "104",
  girl: "105",
};

export default function IslamicNameSection({ categories }) {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeBlessedCategory, setActiveBlessedCategory] = useState(null);

  const [searchState, setSearchState] = useState({
    gender: "",
    keyword: "",
  });

  const buildCategoryId = ({ gender, blessedCategory }) => {
    const ids = [];
    if (gender && GENDER_CATEGORY_MAP[gender]) ids.push(GENDER_CATEGORY_MAP[gender]);
    if (blessedCategory) ids.push(blessedCategory.toString());
    return ids.join(",");
  };

  const fetchNames = useCallback(async ({ gender = "", blessedCategory = "", keyword = "" } = {}) => {
    try {
      setLoading(true);
      const category_id = buildCategoryId({ gender, blessedCategory });

      const query = new URLSearchParams({
        term_type: "islamic-name",
        ...(category_id && { category_id }),
        ...(keyword && { s: keyword }),
      }).toString();

      const res = await axiosInstance.get(`/posts?${query}&strict=true`);
      setNames(res?.data?.data || []);
    } catch (err) {
      console.error(err);
      setNames([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNames();
  }, [fetchNames]);

  const handleSearch = ({ gender, keyword }) => {
    setSearchState({ gender, keyword });
    fetchNames({ gender, keyword, blessedCategory: activeBlessedCategory });
  };

  const handleCategoryChange = (category) => {
    setActiveBlessedCategory(category.id);
    fetchNames({
      gender: searchState.gender,
      keyword: searchState.keyword,
      blessedCategory: category.id,
    });
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.4 }}
    >
      {/* Search */}
      <GradientBorderWrapper1>
        <IslamicNameSearch button_text="Search" onSearch={handleSearch} />
      </GradientBorderWrapper1>

      {/* Tabs */}
      <GradientBorderWrapper1>
        <BlessedNameTabs
          categories={categories}
          activeCategory={activeBlessedCategory}
          onChange={handleCategoryChange}
        />
      </GradientBorderWrapper1>

      {/* Table */}
      <div>
        <div className="bg-[#52B920] h-[50px] text-white flex justify-between items-center px-4 rounded-t-[10px]">
          <h2 className="font-bold">Name List</h2>
          <h2 className="font-bold">名前リスト</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <TableHeader />

            <AnimatePresence mode="wait">
              <motion.tbody
                key={loading ? "loading" : names.length ? "data" : "empty"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {loading ? (
                  <TableSkeleton />
                ) : names.length ? (
                  names.map((item, i) => (
                    <IslamicNameTableRow key={item.id} islamicName={item} i={i} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">
                      No Names found
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>

      {/* Share */}
      <div className="flex justify-end">
        <SocialShare />
      </div>
    </motion.div>
  );
}

/* ---------------- Table Header ---------------- */

const TableHeader = () => (
  <thead>
    <tr className="bg-[#D9E2DD]">
      <th className="w-[60px] py-2">SL</th>
      <th className="w-[200px] py-2">Arabic</th>
      <th className="w-[200px] py-2">Japanese</th>
      <th className="w-[200px] py-2">English</th>
      <th className="py-2">Meaning</th>
    </tr>
  </thead>
);
