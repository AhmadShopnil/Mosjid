"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/helper/axiosInstance";
import { X, Clock, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import WasiyahDataDisplay from "./WasiyahDataDisplay";

export default function WasiyahHistoryModal({ wasiyatId, isOpen, onClose, onRestoreSuccess }) {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedVersionId, setExpandedVersionId] = useState(null);

  useEffect(() => {
    if (isOpen && wasiyatId) {
      fetchHistory();
    }
  }, [isOpen, wasiyatId]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/wasiyat/${wasiyatId}/history`);
      if (res?.data?.versions) {
        setVersions(res.data.versions);
      }
    } catch (error) {
      console.error("Failed to fetch history", error);
      toast.error("Could not load version history.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (versionId) => {
    if (!window.confirm("Are you sure you want to restore this previous version? This will become your current Wasiyah.")) return;

    try {
      const toastId = toast.loading("Restoring version...");
      await axiosInstance.post(`/wasiyat/${wasiyatId}/restore/${versionId}`);
      toast.dismiss(toastId);
      toast.success("Wasiyah restored successfully!");
      if (onRestoreSuccess) onRestoreSuccess();
    } catch (error) {
      toast.error("Failed to restore version.");
      console.error(error);
    }
  };

  const formatKey = (key) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const toggleExpand = (id) => {
    setExpandedVersionId(prev => prev === id ? null : id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 mt-8 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-lg font-bold text-[#00401A] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#3198A0]" />
            Amendment History
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-2 md:p-4 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3198A0]"></div>
            </div>
          ) : versions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No previous versions found for this Wasiyah.
            </div>
          ) : (
            <div className="space-y-4">
              {versions?.map((version, index) => {
                const isExpanded = expandedVersionId === version.id;

                return (
                  <div key={version.id} className="border border-gray-100 rounded-xl hover:border-[#3198A0]/30 transition-all bg-white overflow-hidden">
                    <div className="p-4 flex justify-between items-start gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-900">Version {version.version_number}</span>
                          {index === 0 && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{version.change_summary || "Wasiyah updated"}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(version.created_at).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleExpand(version?.id)}
                          className="cursor-pointer px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          {isExpanded ? "Hide Details" : "View Data"}
                        </button>

                        {index !== 0 && (
                          <button
                            onClick={() => handleRestore(version?.id)}
                            className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#3198A0]
                             bg-[#3198A0]/10 hover:bg-[#3198A0] hover:text-white rounded-lg transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Restore
                          </button>
                        )}
                      </div>
                    </div>
                    {isExpanded && version?.data && (
                      <WasiyahDataDisplay version={version} />
                    )}

                    {/* {isExpanded && version.data && (
                      <div className="px-4 pb-4 pt-2 border-t border-gray-50 bg-gray-50/30">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Version Data Snapshot</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                          {Object.entries(version.data).map(([key, val]) => {
                            if (val === null || val === undefined || key === 'signature') return null; // Skip empty or huge file strings
                            return (
                              <div key={key} className="text-sm">
                                <span className="font-medium text-gray-700">{formatKey(key)}: </span>
                                <span className="text-gray-600">
                                  {val === "1" ? "Yes" : val === "0" ? "No" : String(val)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )} */}
                    {/* {isExpanded && version?.data && (
                      <div className="px-4 pb-4 pt-2 border-t border-gray-50 bg-gray-50/30">
                        <h4 className="text-xl font-bold text-gray-500 uppercase tracking-wider mb-3">Wasiyah Informations</h4>
                        <div className=" text-sm font-medium text-gray-700">
                          <h2 className="mb-3 text-xl">Applicant Info</h2>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Full Name  :</span>
                            <span>{version.data?.fullName}</span>

                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Japanese Name :</span>
                            <span>{version.data?.japaneseName}</span>

                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Father’s name :</span>
                            <span>{version.data?.fatherName}</span>

                          </div>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Passport No :</span>
                            <span>{version.data?.passportNo}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>I.D card No  :</span>
                            <span>{version.data?.idCardNo}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Date of Birth  :</span>
                            <span>{version.data?.dateOfBirth}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>I.D card No  :</span>
                            <span>{version.data?.idCardNo}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Gender  :</span>
                            <span>{version.data?.gender}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Nationality  :</span>
                            <span>{version.data?.nationality}</span>
                          </div>
                           <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Phone Number  :</span>
                            <span>{version.data?.phone}</span>
                          </div>
                           <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Email Address  :</span>
                            <span>{version.data?.email}</span>
                          </div>
                           <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Current City   :</span>
                            <span>{version.data?.currentCity}</span>
                          </div>


                        </div>
                        <div className=" text-sm font-medium text-gray-700">
                          <h2 className="mb-3 text-xl">Islamic Information</h2>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Muslim Name  :</span>
                            <span>{version.data?.muslimName}</span>

                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Date of Shahadah :</span>
                            <span>{version.data?.shahadahDate}</span>

                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Location of Shahadah :</span>
                            <span>{version.data?.shahadahLocation}</span>

                          </div>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Masjid / Community Affiliation :</span>
                            <span>{version.data?.community}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>I.D card No  :</span>
                            <span>{version.data?.preferredBurialArrangement}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 ">
                            <span>Preferred Islamic Burial Arrangement  :</span>
                            <span>{version.data?.dateOfBirth}</span>
                          </div>
                          


                        </div>
                      </div>
                    )} */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
