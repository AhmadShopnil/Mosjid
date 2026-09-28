"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axiosInstance from "@/helper/axiosInstance";
import { Edit, Send, Clock, Download, Eye, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import WasiyahHistoryModal from "./WasiyahHistoryModal";
import { fetchCertificateData } from "./certificate/certificateData";
import toast from "react-hot-toast";

export default function WasiyahLists({ onEdit, refreshTrigger }) {
  const [wasiyats, setWasiyats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedWasiyatId, setSelectedWasiyatId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const fetchWasiyats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/wasiyat");
      if (res?.data?.wasiyats?.data) {
        setWasiyats(res.data.wasiyats.data);

      }
    } catch (error) {
      console.error("Failed to fetch wasiyats", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWasiyats();
  }, [fetchWasiyats, refreshTrigger]);

  const handleSubmitReview = async (id) => {
    try {
      await axiosInstance.post(`/wasiyat/${id}/submit`);
      toast.success("Wasiyah submitted for admin review successfully!");
      fetchWasiyats();
    } catch (error) {
      toast.error("Failed to submit wasiyah.");
      console.error(error);
    }
  };

  const handleDownloadCertificate = async (wasiyat) => {
    setDownloadingId(wasiyat.id);
    const toastId = toast.loading("Preparing certificate...");
    try {
      const { data } = await fetchCertificateData(wasiyat.id, wasiyat);
      // Loaded on demand: react-pdf is large and only needed when a certificate is generated.
      const { createCertificatePdf, certificateFileName, downloadBlob } = await import("./certificate/generatePdf");
      const blob = await createCertificatePdf(data);
      downloadBlob(blob, certificateFileName(data, wasiyat.id));
      toast.success("Certificate downloaded!", { id: toastId });
    } catch (error) {
      console.error("Failed to download certificate", error);
      toast.error("Failed to download certificate.", { id: toastId });
    } finally {
      setDownloadingId(null);
    }
  };

  const getStatusBadge = (status, downloadStatus) => {
      if (status == 2 && downloadStatus==1 ) {
      return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit">
        <CheckCircle className="w-3 h-3" />
         Certficate Generated
      </span>;
    }
    if (status == 2) {
      return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit">
        <CheckCircle className="w-3 h-3" />
        Approved
      </span>;
    }

    if (status == 1 || status == "1") {
      return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit">
        <Clock className="w-3 h-3" /> Pending
      </span>;
    }
    return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full
     flex items-center gap-1 w-fit">
      <AlertCircle className="w-3 h-3" />
      Pending
    </span>;
  };
  // console.log("wasiyats", wasiyats)
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
      <h2 className="text-xl font-bold text-[#00401A] mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-[#3198A0]" />
        My Wasiyah & History
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3198A0]"></div>
        </div>
      ) : wasiyats.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No Wasiyah records found.</p>
          <p className="text-sm text-gray-400 mt-1">Fill out the form above to register your Wasiyah.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 rounded-t-lg">
              <tr>
                <th className="px-4 py-4 font-semibold rounded-tl-lg">ID</th>
                <th className="px-4 py-4 font-semibold">Applicant Name</th>
                <th className="px-4 py-4 font-semibold">Created Date</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 font-semibold text-right rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {wasiyats.map((wasiyat) => (
                <tr key={wasiyat.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 font-medium text-[#3198A0]">{wasiyat.unique_id || `#${wasiyat.id}`}</td>
                  <td className="px-4 py-4 font-medium text-gray-900">{wasiyat.data?.fullName || "N/A"}</td>
                  <td className="px-4 py-4 text-gray-500">
                    {new Date(wasiyat.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(wasiyat.status, wasiyat.download_status)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {wasiyat.download_status === 1 && (
                        <Link
                          href={`/services/wasiyath/certificate/${wasiyat.id}`}
                          className="cursor-pointer p-2 text-gray-500 hover:text-[#3198A0] hover:bg-[#3198A0]/10 rounded-lg transition-colors"
                          title="Preview Certificate"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                          {wasiyat.download_status === 1 && (
                        <button
                          onClick={() => handleDownloadCertificate(wasiyat)}
                          disabled={downloadingId === wasiyat.id}
                          className="cursor-pointer p-2 text-[#3198A0] hover:text-white hover:bg-[#3198A0] bg-[#3198A0]/10 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                          title="Download Certificate"
                        >
                          {downloadingId === wasiyat.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => onEdit({ ...wasiyat.data, id: wasiyat.id })}
                        className="p-2 text-gray-500 hover:text-[#3198A0] hover:bg-[#3198A0]/10 rounded-lg
                        transition-colors tooltip-trigger cursor-pointer"
                        title="Edit / Update"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      {/* {wasiyat.status !== 1 && wasiyat.status !== "1" && wasiyat.download_status !== 1 && (
                        <button
                          onClick={() => handleSubmitReview(wasiyat.id)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Submit for Review"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )} */}

                      <button
                        onClick={() => {
                          setSelectedWasiyatId(wasiyat.id);
                          setHistoryModalOpen(true);
                        }}
                        className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                        title="Version History"
                      >
                        <Clock className="w-4 h-4" />
                      </button>


                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {historyModalOpen && (
        <WasiyahHistoryModal
          wasiyatId={selectedWasiyatId}
          isOpen={historyModalOpen}
          onClose={() => setHistoryModalOpen(false)}
          onRestoreSuccess={() => {
            setHistoryModalOpen(false);
            fetchWasiyats();
          }}
        />
      )}
    </div>
  );
}
