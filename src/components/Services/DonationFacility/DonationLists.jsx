"use client";

import React from "react";
import SectionTitleSmall from "@/components/SectionTitleRow/SectionTitleSmall";
import GradientBorderWrapper1 from "@/components/Shared/GradientBorderWrapper1";
import CancelBookingModal from "@/components/Shared/CancelBookingModal";
import useBookingCancel from "@/hooks/useBookingCancel";
import GetStatusBadge, { isBookingExpired } from "@/components/Shared/GetStatusBadge";
import ActionTake from "@/components/Shared/ActionTake";

export default function DonationLists({ bookingListRef, historyListRef, data, loading, onCancelSuccess }) {

  const { cancelState, openCancel, closeCancel, confirmCancel } = useBookingCancel({
    getEndpoint: (id) => `/donations/${id}/status`,
    onSuccess: () => onCancelSuccess && onCancelSuccess(),
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const getStatusBadge = (booking) => {

    const status = booking?.status

    const expired = isBookingExpired(
      booking?.intended_date || booking?.booked_date,
      booking?.start_time,
      booking?.end_time
    );


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
    else if (status === "3" || status === 3) {
      return (
        <span className="bg-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          Completed
        </span>
      );
    }
    if (expired && !booking?.form_status == 1) {
      return (
        <span className="bg-yellow-100 text-red-500 text-xs font-semibold px-3 py-1 rounded-full">
          Expired
        </span>
      );
    }



    return (
      <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
        Pending
      </span>
    );
  };

  const myDonationBooking = data?.my_donations?.data || [];
  const registerData = data?.donation_register?.data || [];
  const historyData = data?.dontions?.data || [];
  // const historyData = data?.donation_history?.data || [];

  const actionTake = (booking) => {

    const expired = isBookingExpired(
      booking?.booked_date || booking?.intended_date,
      booking?.start_time,
      booking?.end_time
    );



    if (booking?.status == "0" && !expired) {
      return (
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
          onClick={() => openCancel(booking)}
        >
          Cancel
        </button>
      );
    }
    return <span className="text-gray-400">—</span>;
  };

  return (
    <>
      <div className="space-y-12">

        {/* My Donation Bookings */}
        <div className="mt-6 scroll-mt-32"
        // ref={bookingListRef}
        >
          <GradientBorderWrapper1
            rounded="rounded-[20px]"
            innerRounded="rounded-[19px]"
            className="shadow-md hover:shadow-lg transition-all duration-300 "
            innerClassName="p-3"
          >
            <div className="w-full p-4">

              <SectionTitleSmall
                leftTitle={"My Donation Bookings"}
                rightTitle={"寄付の予約"}
              />

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  <span className="ml-3 text-gray-500">Loading bookings...</span>
                </div>
              ) : myDonationBooking?.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-lg">No donation bookings found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                      <tr>
                        {["Sl. No.", "Unique ID", "Organization Name", "Name", "Intended Date", "Contact No", "Status", "Action"].map((head) => (
                          <th key={head}>
                            <div className="bg-[#52B920] text-white border border-[#B0C4B8] font-bold rounded-t-full py-1.5 px-4 text-center whitespace-nowrap">
                              {head}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {myDonationBooking?.map((booking, index) => {
                        // Note: using local index since we removed the manual sl calculation
                        const currentPage = data?.my_donations?.current_page || data?.donation_register?.current_page || 1;
                        const sl = (currentPage - 1) * 20 + index + 1;
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
                              {/* {getStatusBadge(booking.status)} */}

                              <GetStatusBadge app={booking} />
                            </td>
                            <td className="py-2 px-4 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
                              {actionTake(booking)}

                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </GradientBorderWrapper1>
        </div>


        {/* Donation Booking List */}
        <div className="mt-6 scroll-mt-32" ref={bookingListRef}>
          <GradientBorderWrapper1
            rounded="rounded-[20px]"
            innerRounded="rounded-[19px]"
            className="shadow-md hover:shadow-lg transition-all duration-300 "
            innerClassName="p-3"
          >
            <div className="w-full p-4">

              <SectionTitleSmall
                leftTitle={"Donation Booking List"}
                rightTitle={"寄付予約一覧"}
              />

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
                        // Note: using local index since we removed the manual sl calculation
                        const currentPage = data?.my_donations?.current_page || data?.donation_register?.current_page || 1;
                        const sl = (currentPage - 1) * 20 + index + 1;
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
                              {getStatusBadge(booking)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </GradientBorderWrapper1>
        </div>

        {/* Donation History List */}
        <div className="mt-6 scroll-mt-32" ref={historyListRef}>
          <GradientBorderWrapper1
            rounded="rounded-[20px]"
            innerRounded="rounded-[19px]"
            className="shadow-md hover:shadow-lg transition-all duration-300 "
            innerClassName="p-3"
          >
            <div className="w-full p-4">

              <SectionTitleSmall
                leftTitle={"Donation History List"}
                rightTitle={"寄付履歴一覧"}
              />

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
                        const currentPage = data?.donation_history?.current_page || 1;
                        const sl = (currentPage - 1) * 20 + index + 1;
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
                              {getStatusBadge(booking)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </GradientBorderWrapper1>
        </div>
      </div>

      <CancelBookingModal
        isOpen={cancelState.isOpen}
        isLoading={cancelState.isLoading}
        onClose={closeCancel}
        onConfirm={confirmCancel}
      />
    </>
  );
}
