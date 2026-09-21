"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/helper/axiosInstance";

const MONTH_SHORT = {
  January: "Jan", February: "Feb", March: "Mar", April: "Apr",
  May: "May", June: "Jun", July: "Jul", August: "Aug",
  September: "Sep", October: "Oct", November: "Nov", December: "Dec",
};

function getRateColor(rate) {
  if (rate >= 90) return { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "Excellent", hex: "#10b981" };
  if (rate >= 75) return { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Good", hex: "#f59e0b" };
  return { bg: "bg-red-500", light: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "Needs Attention", hex: "#ef4444" };
}

function DonutRing({ rate, size = 72 }) {
  const r = 26;
  const circumference = 2 * Math.PI * r;
  const fill = (rate / 100) * circumference;
  const col = getRateColor(rate);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="32" cy="32" r={r} fill="none" stroke="#f3f4f6" strokeWidth="6" />
      <circle
        cx="32" cy="32" r={r} fill="none"
        stroke={col.hex} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={`${fill} ${circumference}`}
      />
    </svg>
  );
}

export default function ProgressSheetsModal({ student, onClose }) {
  const [progressData, setProgressData] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!student?.student_id) return;
    const fetchProgress = async () => {
      try {
        setLoadingProgress(true);
        const res = await axiosInstance.get(`/student/${student.student_id}/progress-sheet`);
        if (res?.data) setProgressData(res.data);
      } catch (err) {
        console.error("Error fetching progress sheet:", err);
        setProgressData(null);
      } finally {
        setLoadingProgress(false);
      }
    };
    fetchProgress();
  }, [student?.student_id]);

  const monthEntries = progressData?.months ? Object.entries(progressData.months) : [];
  const allEntries = Object.values(progressData?.months || {}).flat();
  const totalPresent = allEntries.reduce((s, e) => s + (parseInt(e.present) || 0), 0);
  const totalAbsent = allEntries.reduce((s, e) => s + (parseInt(e.absent) || 0), 0);
  const totalDays = totalPresent + totalAbsent;
  const overallRate = totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0;
  const overallCol = getRateColor(overallRate);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
      <div className="relative w-full sm:max-w-4xl bg-white sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-screen sm:max-h-[90vh]">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00401A] flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Progress Report · 進捗状況</p>
              <h2 className="text-base font-extrabold text-gray-900 leading-tight">
                {progressData?.student?.name || student.name}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00401A] inline-block" />
              ID: {student?.student_id || "N/A"}
            </span>
            {progressData?.year && (
              <span className="text-xs font-bold bg-[#00401A]/10 text-[#00401A] px-3 py-1.5 rounded-full">
                {progressData.year}
              </span>
            )}
            <button
              onClick={onClose}
              className="ml-1 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer font-bold text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="overflow-y-auto flex-grow bg-gray-50/60">

          {/* Loading */}
          {loadingProgress && (
            <div className="flex flex-col items-center justify-center min-h-[380px] gap-5">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
                <div className="absolute inset-0 rounded-full border-4 border-t-[#00401A] animate-spin" />
              </div>
              <p className="text-sm font-semibold text-gray-500 animate-pulse">Loading progress data...</p>
            </div>
          )}

          {/* Empty */}
          {!loadingProgress && (!progressData || monthEntries.length === 0) && (
            <div className="flex flex-col items-center justify-center min-h-[380px] gap-4 px-6">
              <div className="w-20 h-20 rounded-2xl bg-amber-50 border-2 border-amber-100 flex items-center justify-center">
                <svg className="w-9 h-9 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-center">
                <h4 className="text-base font-bold text-gray-800">No records yet</h4>
                <p className="text-sm text-gray-400 mt-1 max-w-xs">
                  Progress sheets will appear here once attendance is recorded by the teacher.
                </p>
              </div>
            </div>
          )}

          {/* Data */}
          {!loadingProgress && progressData && monthEntries.length > 0 && (
            <div className="p-4 sm:p-6 space-y-5">

              {/* ── STATS STRIP ── */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Overall donut */}
                <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 shadow-sm">
                  <div className="relative flex-shrink-0">
                    <DonutRing rate={overallRate} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-sm font-extrabold ${overallCol.text}`}>{overallRate}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Attendance</p>
                    <p className={`text-sm font-extrabold mt-0.5 ${overallCol.text}`}>{overallCol.label}</p>
                  </div>
                </div>

                {/* Present */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center mb-2.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900">{totalPresent}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Days Present</p>
                </div>

                {/* Absent */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center mb-2.5">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900">{totalAbsent}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Days Absent</p>
                </div>

                {/* Months tracked */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center mb-2.5">
                    <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900">{monthEntries.length}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Months Tracked</p>
                </div>
              </div>

              {/* ── SECTION DIVIDER ── */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Monthly Breakdown
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* ── MONTH TABLE ── */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                {/* Table head — desktop */}
                <div className="hidden sm:grid grid-cols-12 items-center px-5 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="col-span-2 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Month</p>
                  <p className="col-span-3 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Program</p>
                  <p className="col-span-4 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Attendance</p>
                  <p className="col-span-2 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest text-center">Rate</p>
                  <p className="col-span-1 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest text-right">Level</p>
                </div>

                <div className="divide-y divide-gray-50">
                  {monthEntries.map(([month, entries]) => {
                    const mPresent = entries.reduce((s, e) => s + (parseInt(e.present) || 0), 0);
                    const mAbsent = entries.reduce((s, e) => s + (parseInt(e.absent) || 0), 0);
                    const mTotal = mPresent + mAbsent;
                    const mRate = mTotal > 0 ? Math.round((mPresent / mTotal) * 100) : 0;
                    const col = getRateColor(mRate);
                    const programs = [...new Set(entries.map((e) => e.program_type).filter(Boolean))];
                    const statuses = [...new Set(entries.map((e) => e.learning_status).filter(Boolean))];

                    return (
                      <div key={month} className="hover:bg-gray-50/60 transition-colors">
                        {/* Desktop row */}
                        <div className="hidden sm:grid grid-cols-12 items-center px-5 py-4 gap-2">
                          {/* Month */}
                          <div className="col-span-2 flex items-center gap-2.5">
                            <div className={`w-1.5 h-9 rounded-full flex-shrink-0 ${col.bg}`} />
                            <div>
                              <p className="text-sm font-bold text-gray-800">{MONTH_SHORT[month] || month}</p>
                              <p className="text-[10px] text-gray-400">{progressData.year}</p>
                            </div>
                          </div>

                          {/* Programs */}
                          <div className="col-span-3 flex flex-wrap gap-1">
                            {programs.length > 0 ? programs.map((p, i) => (
                              <span key={i} className="text-[10px] font-bold bg-[#00401A]/8 text-[#00401A] border border-[#00401A]/15 px-2 py-0.5 rounded-md">
                                {p}
                              </span>
                            )) : <span className="text-[10px] text-gray-400">—</span>}
                          </div>

                          {/* Attendance bar */}
                          <div className="col-span-4 pr-4">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                ✓ {mPresent}d
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                                ✗ {mAbsent}d
                              </span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${col.bg}`}
                                style={{ width: `${mRate}%`, transition: "width 0.6s ease" }}
                              />
                            </div>
                          </div>

                          {/* Rate */}
                          <div className="col-span-2 text-center">
                            <span className={`text-xl font-extrabold ${col.text}`}>{mRate}%</span>
                          </div>

                          {/* Level badge */}
                          <div className="col-span-1 flex flex-col items-end gap-1">
                            {statuses.length > 0 ? statuses.map((ls, i) => (
                              <span key={i} className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${ls?.toLowerCase().includes("basic")
                                  ? "bg-blue-50 border-blue-200 text-blue-700"
                                  : `${col.light} ${col.border} ${col.text}`
                                }`}>
                                {ls}
                              </span>
                            )) : <span className="text-[10px] text-gray-400">—</span>}
                          </div>
                        </div>

                        {/* Mobile card */}
                        <div className="sm:hidden p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-1 h-6 rounded-full ${col.bg}`} />
                              <p className="font-bold text-gray-800 text-sm">
                                {month} <span className="text-gray-400 font-normal text-xs">{progressData.year}</span>
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`font-extrabold text-lg ${col.text}`}>{mRate}%</span>
                              {statuses[0] && (
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${statuses[0]?.toLowerCase().includes("basic")
                                    ? "bg-blue-50 border-blue-200 text-blue-700"
                                    : `${col.light} ${col.border} ${col.text}`
                                  }`}>
                                  {statuses[0]}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${col.bg}`} style={{ width: `${mRate}%` }} />
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {programs.map((p, i) => (
                              <span key={i} className="text-[10px] font-bold bg-[#00401A]/8 text-[#00401A] border border-[#00401A]/15 px-2 py-0.5 rounded-md">{p}</span>
                            ))}
                            <div className="ml-auto flex items-center gap-2">
                              <span className="text-[10px] text-emerald-700 font-bold">✓ {mPresent}d</span>
                              <span className="text-[10px] text-red-600 font-bold">✗ {mAbsent}d</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── LEGEND ── */}
              <div className="flex flex-wrap items-center gap-4 px-1">
                {[
                  ["bg-emerald-500", "≥90% Excellent"],
                  ["bg-amber-500", "75–89% Good"],
                  ["bg-red-500", "<75% Needs Attention"],
                ].map(([bg, label]) => (
                  <div key={label} className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400">
                    <span className={`w-2.5 h-2.5 rounded-full inline-block ${bg}`} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100 bg-white flex-shrink-0">
          <p className="text-[10px] text-gray-400 font-medium hidden sm:block">
            Osaka Masjid Madrasha · 大阪マスジドマドラサ
          </p>
          <button
            onClick={onClose}
            className="ml-auto px-6 py-2.5 bg-[#00401A] hover:bg-[#00602A] text-white font-bold rounded-xl shadow-sm transition-colors cursor-pointer text-sm"
          >
            Close / 閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
