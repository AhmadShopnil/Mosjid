// 'use client'
// import GradientBorder from "@/components/GradientBorder/GradientBorder";
// import React, { useState } from "react";
// import CertificateModal from "./CertificateModal";

// const MyApplications = ({ applications = [], loading = false, onFillForm }) => {
//   const [selectedCertificate, setSelectedCertificate] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "—";
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "2-digit",
//     });
//   };

//   const formatTime = (time) => {
//     if (!time) return "—";
//     const [h, m] = time.split(":");
//     const hour = parseInt(h, 10);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const hour12 = hour % 12 || 12;
//     return `${hour12}:${m} ${ampm}`;
//   };

//   const getStatusBadge = (status) => {
//     if (status === "1" || status === 1) {
//       return (
//         <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
//           Approved
//         </span>
//       );
//     } else if (status === "2" || status === 2) {
//       return (
//         <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
//           Rejected
//         </span>
//       );
//     }
//     return (
//       <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
//         Pending
//       </span>
//     );
//   };

//   // Check if marriage form data has been filled
//   const isFormFilled = (application) => {
//     if (!application.others_infomartions) return false;
//     const { groom, bride } = application.others_infomartions;
//     return (groom?.name || bride?.name);
//   };

//   const handleOpenCertificate = (application) => {
//     setSelectedCertificate(application);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="mt-6 relative">
//       <GradientBorder>
//         <div className="w-full p-4">
//           <h2 className="text-2xl font-semibold text-[#333333] mb-4">My Applications</h2>

//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
//               <span className="ml-3 text-gray-500">Loading applications...</span>
//             </div>
//           ) : applications.length === 0 ? (
//             <div className="text-center py-12 text-gray-400">
//               <p className="text-lg">No applications found</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse min-w-[600px]">
//                 <thead>
//                   <tr>
//                     {["Sl. No.", "Event Date", "Start Time", "End Time", "Status", "Action"].map((head) => (
//                       <th key={head}>
//                         <div className="bg-[#52B920] text-white border border-[#B0C4B8] font-bold rounded-t-full py-1.5 text-center whitespace-nowrap">
//                           {head}
//                         </div>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {applications.map((application, index) => (
//                     <tr
//                       key={application.id}
//                       className={index % 2 === 0 ? "bg-white" : "bg-[#52B920]/40"}
//                     >
//                       <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
//                         {String(index + 1).padStart(2, "0")}
//                       </td>
//                       <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
//                         {formatDate(application.booked_date)}
//                       </td>
//                       <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
//                         {formatTime(application.start_time)}
//                       </td>
//                       <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
//                         {formatTime(application.end_time)}
//                       </td>
//                       <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
//                         {getStatusBadge(application.status)}
//                       </td>
//                       <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">
//                         {application.status === "1" || application.status === 1 ? (
//                           application.download_status === "1" || application.download_status === 1 ? (
//                             <button
//                               onClick={() => handleOpenCertificate(application)}
//                               className="bg-[#52B920] hover:bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer inline-flex items-center gap-1 mx-auto"
//                             >
//                               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
//                               Download Certificate
//                             </button>
//                           ) : application.form_status === 0 || application.form_status === "0" || !isFormFilled(application) ? (
//                             <button
//                               onClick={() => onFillForm && onFillForm(application)}
//                               className="bg-[#52B920] hover:bg-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
//                             >
//                               Fill Marriage Form
//                             </button>
//                           ) : (
//                             <button
//                               onClick={() => onFillForm && onFillForm(application)}
//                               className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
//                             >
//                               View
//                             </button>
//                           )
//                         ) : application.status === "2" || application.status === 2 ? (
//                           <span className="text-red-400 text-sm italic">Rejected</span>
//                         ) : (
//                           <span className="text-gray-400 text-sm italic">Pending Approval</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </GradientBorder>

//       {/* Certificate Modal */}
//       <CertificateModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         application={selectedCertificate}
//       />
//     </div>
//   );
// };

// export default MyApplications;
