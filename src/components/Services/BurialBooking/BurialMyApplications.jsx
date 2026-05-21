'use client';

import React from "react";
import Link from "next/link";

const BurialMyApplications = ({ applications = [], loading = false, onFillForm }) => {

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
    };

    const formatTime = (time) => {
        if (!time) return "—";
        const [h, m] = time.split(":");
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${m} ${ampm}`;
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

    const isFormFilled = (application) => {
        if (application?.form_status == 1) return true;
        if (!application?.others_infomartions) return false;
        const info = application?.others_infomartions?.informations;
        return !!(info?.gender || info?.date_of_birth || info?.nationality);
    };

    const renderAction = (application) => {
        // Form Status 1 means details are completed
        if (application?.form_status == 1 || isFormFilled(application)) {
            if (application?.download_status == 1) {
                return (
                    <Link
                        href={`/services/burial-booking/certificate-download/${application?.id}`}
                        className="bg-[#52B920] hover:bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer inline-flex items-center gap-1 mx-auto"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Certificate
                    </Link>
                );
            } else {
                return (
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Certificate Pending
                    </span>
                );
            }
        } else {
            // Only allow details form fill up for approved bookings
            if (application?.status === "1" || application?.status === 1) {
                return (
                    <button
                        onClick={() => onFillForm && onFillForm(application)}
                        className="bg-[#52B920] hover:bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                        Fill Form
                    </button>
                );
            } else if (application?.status === "2" || application?.status === 2) {
                return <span className="text-red-500 text-xs font-semibold italic">Rejected</span>;
            } else {
                return <span className="text-gray-400 text-xs font-semibold italic">Awaiting Approval</span>;
            }
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <div className="px-4 bg-[#52B920] h-[50px] text-white flex items-center justify-between rounded-t-[10px] ">
                    <h2 className="text-lg sm:text-xl font-bold">My Applications</h2>
                    <h2 className="text-lg sm:text-xl font-bold">私の申請一覧</h2>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center items-center py-12 bg-white border border-t-0 rounded-b-[10px]">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                            <span className="ml-3 text-gray-500">Loading applications...</span>
                        </div>
                    ) : applications?.length > 0 ? (
                        <table className="w-full border-collapse table-fixed min-w-[800px] border border-t-0 border-[#B0C4B8] rounded-b-[10px]">
                            <thead>
                                <tr className="bg-[#FEF8EA] h-[42px]">
                                    {["SL.No", "Event Date", "Estimated Time", "Applicant Name", "Deceased Name", "Status", "Action"].map((title, i) => (
                                        <th
                                            key={i}
                                            className="border border-[#B0C4B8] py-2 text-[#3E8B18] text-center text-sm sm:text-base font-semibold"
                                        >
                                            {title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app, index) => (
                                    <tr
                                        key={app.id}
                                        className={index % 2 === 0 ? "bg-white" : "bg-[#52B920]/5"}
                                    >
                                        <td className="py-3 px-2 border border-[#B0C4B8] text-center text-gray-700 text-sm whitespace-nowrap">
                                            {String(index + 1).padStart(2, "0")}
                                        </td>
                                        <td className="py-3 px-2 border border-[#B0C4B8] text-center text-gray-700 text-sm whitespace-nowrap">
                                            {formatDate(app.burial_date)}

                                        </td>
                                        <td className="py-3 px-2 border border-[#B0C4B8] text-center text-gray-700 text-sm whitespace-nowrap">
                                            {formatTime(app.start_time || app.estimated_burial_time)}
                                        </td>
                                        <td className="py-3 px-2 border border-[#B0C4B8] text-center text-gray-700 text-sm whitespace-nowrap">
                                            {app.name || "—"}
                                        </td>
                                        <td className="py-3 px-2 border border-[#B0C4B8] text-center text-gray-700 text-sm whitespace-nowrap font-medium">
                                            {app.deceased_name || "—"}
                                        </td>
                                        <td className="py-3 px-2 border border-[#B0C4B8] text-center text-sm whitespace-nowrap">
                                            {getStatusBadge(app.status)}
                                        </td>
                                        <td className="py-3 px-2 border border-[#B0C4B8] text-center text-sm whitespace-nowrap">
                                            {renderAction(app)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-10 bg-white border border-t-0 rounded-b-[10px] text-gray-500">
                            No applications found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BurialMyApplications;
