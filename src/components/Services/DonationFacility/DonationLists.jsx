"use client";

import React, { useState, useEffect, useCallback } from "react";
import GradientBorder from "@/components/GradientBorder/GradientBorder";
import Pagination from "@/components/Shared/Pagination";
import axiosInstance from "@/helper/axiosInstance";

export default function DonationLists({ bookingListRef, historyListRef }) {
  const [data, setData] = useState({
    donation_register: { data: [], current_page: 1, last_page: 1 },
    donation_history: { data: [], current_page: 1, last_page: 1 },
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async (currentPage) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/donations?page=${currentPage}`);
      if (res?.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error("Error fetching donations:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [fetchData, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    if (status === "1" || status === 1) {
      return (
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          Approved
        </span>
      );
    } else if (status === "2" || status === 2) {
      return (
        <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
          Rejected
        </span>
      );
    }
    return (
      <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
        Pending
      </span>
    );
  };

  const registerData = data?.donation_register?.data || [];
  const historyData = data?.donation_history?.data || [];
  
  // Note: the backend uses the same `page` param for both objects, so we just take last_page from register (or max of both).
  const totalPages = Math.max(
    data?.donation_register?.last_page || 1,
    data?.donation_history?.last_page || 1
  );

  return (
    <div className="space-y-12">
      {/* Donation Booking List */}
      <div className="mt-6 scroll-mt-32" ref={bookingListRef}>
        <GradientBorder>
          <div className="w-full p-4">
            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Donation Booking List</h2>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-500">Loading bookings...</span>
              </div>
            ) : registerData.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">No donation bookings found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                  <thead>
                    <tr>
                      {["Sl. No.", "Unique ID", "Organization Name", "Name", "Intended Date", "Contact No", "Status"].map((head) => (
                        <th key={head}>
                          <div className="bg-[#52B920] text-white border border-[#B0C4B8] font-bold rounded-t-full py-1.5 px-4 text-center whitespace-nowrap">
                            {head}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {registerData.map((booking, index) => {
                      const sl = (data.donation_register.current_page - 1) * 20 + index + 1;
                      return (
                        <tr
                          key={booking.id}
                          className={index % 2 === 0 ? "bg-white" : "bg-[#52B920]/40"}
                        >
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {String(sl).padStart(2, "0")}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {booking.unique_id || "—"}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {booking.organization_name || "—"}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {booking.name || "—"}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {formatDate(booking.intended_date)}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {booking.contact_no || "—"}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {getStatusBadge(booking.status)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </GradientBorder>
      </div>

      {/* Donation History List */}
      <div className="mt-6 scroll-mt-32" ref={historyListRef}>
        <GradientBorder>
          <div className="w-full p-4">
            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Donation History List</h2>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-500">Loading history...</span>
              </div>
            ) : historyData.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg">No donation history found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                  <thead>
                    <tr>
                      {["Sl. No.", "Unique ID", "Organization Name", "Name", "Intended Date", "Contact No", "Status"].map((head) => (
                        <th key={head}>
                          <div className="bg-[#52B920] text-white border border-[#B0C4B8] font-bold rounded-t-full py-1.5 px-4 text-center whitespace-nowrap">
                            {head}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((booking, index) => {
                      const sl = (data.donation_history.current_page - 1) * 20 + index + 1;
                      return (
                        <tr
                          key={booking.id}
                          className={index % 2 === 0 ? "bg-white" : "bg-[#52B920]/40"}
                        >
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {String(sl).padStart(2, "0")}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {booking.unique_id || "—"}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {booking.organization_name || "—"}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {booking.name || "—"}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {formatDate(booking.intended_date)}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {booking.contact_no || "—"}
                          </td>
                          <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                            {getStatusBadge(booking.status)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </GradientBorder>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
