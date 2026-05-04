import GradientBorder from "@/components/GradientBorder/GradientBorder";
import React from "react";
import TableTitle from "../Shared/TableTitle";

const MyApplications = ({ applications = [], loading = false }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
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
      return (<span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Approved</span>);
    } else if (status === "2" || status === 2) {
      return (<span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Rejected</span>);
    }
    return (<span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">Pending</span>);
  };

  return (
    <GradientBorder>
      <div className="w-full p-4">
        <div className="mb-6">
          <TableTitle title1="My Applications" title2="予約リスト" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
            <span className="ml-3 text-gray-500">Loading applications...</span>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-12 text-gray-400"><p className="text-lg">No applications found</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr>
                  {["Sl. No.", "Event Date", "Start Time", "End Time", "Status"].map((head) => (
                    <th key={head}>
                      <div className="bg-[#52B920] text-white border border-[#B0C4B8] font-bold rounded-t-full py-1.5 text-center whitespace-nowrap">{head}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={app.id} className={index % 2 === 0 ? "bg-white" : "bg-[#52B920]/40"}>
                    <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">{String(index + 1).padStart(2, "0")}</td>
                    <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">{formatDate(app.booked_date)}</td>
                    <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">{formatTime(app.start_time)}</td>
                    <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">{formatTime(app.end_time)}</td>
                    <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">{getStatusBadge(app.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </GradientBorder>
  );
};

export default MyApplications;
