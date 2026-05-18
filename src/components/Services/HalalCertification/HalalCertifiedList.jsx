"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/helper/axiosInstance";
import Pagination from "@/components/Shared/Pagination";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HalalCertifiedList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/halal?page=${page}`);

      // Mapped to all_applications as requested
      const responseData = res?.data?.all_applications;
      if (responseData) {
        setData(responseData.data || []);
        setCurrentPage(responseData.current_page || 1);
        setTotalPages(responseData.last_page || 1);
      }
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.4 }}
    >
      <div>
        <div className="bg-[#52B920] h-[50px] text-white flex justify-between items-center px-4 rounded-t-[10px]">
          <h2 className="font-bold">Halal Certified List</h2>
          <h2 className="font-bold">ハラール認証リスト</h2>
        </div>

        <div className="overflow-x-auto border-x border-b border-gray-200 rounded-b-[10px]">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="bg-[#D9E2DD]">
                <th className="w-[60px] py-3 border border-gray-300">SL</th>
                <th className="py-3 border border-gray-300">Unique ID</th>
                <th className="py-3 border border-gray-300">Company Name</th>
                <th className="py-3 border border-gray-300">Product Name</th>
                <th className="py-3 border border-gray-300">Certificate No</th>
                <th className="py-3 border border-gray-300">Issue Date</th>
                <th className="py-3 border border-gray-300">Expiry Date</th>
                <th className="py-3 border border-gray-300">Status</th>
              </tr>
            </thead>

            <AnimatePresence mode="wait">
              <motion.tbody
                key={loading ? "loading" : data.length ? "data" : "empty"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {loading ? (
                  <TableSkeleton />
                ) : data.length ? (
                  data.map((item, index) => {
                    const sl = (currentPage - 1) * 20 + index + 1;
                    return (
                      <tr
                        key={item.id}
                        className={`${index % 2 === 0 ? "bg-white" : "bg-[#E5F5DE]"} h-[28px] transition hover:bg-green-50`}
                      >
                        <td className="border border-gray-300 p-3 text-center">{sl}</td>
                        <td className="border border-gray-300 p-3 text-center">{item.unique_id || "-"}</td>
                        <td className="border border-gray-300 p-3 text-center">{item.company_name || "-"}</td>
                        <td className="border border-gray-300 p-3 text-center">{item.product_name || "-"}</td>
                        <td className="border border-gray-300 p-3 text-center">{item.certificate_number || "-"}</td>
                        <td className="border border-gray-300 p-3 text-center">{item.issue_date || "-"}</td>
                        <td className="border border-gray-300 p-3 text-center">{item.expiry_date || "-"}</td>
                        <td className="border border-gray-300 p-3 text-center">
                          {item.status === 1 ? (
                            <span className="text-green-600 font-semibold">
                              Approved
                            </span>
                          ) : item.status === 2 ? (
                            <span className="text-red-600 font-semibold">
                              Rejected
                            </span>
                          ) : (
                            <span className="text-yellow-600 font-semibold">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-500">
                      No Halal Certified items found.
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>

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
    </motion.div>
  );
}

const TableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          {Array.from({ length: 8 }).map((_, j) => (
            <td key={j} className="py-3 px-3 border border-gray-300">
              <div className="h-4 bg-gray-200 rounded" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
