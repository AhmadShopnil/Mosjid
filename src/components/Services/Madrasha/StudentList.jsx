"use client";

import { useEffect, useMemo, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    Users,
    CalendarDays,
    BookOpen,
    UserRound,
    Search,
    RefreshCw,
    CircleUserRound,
    MoreHorizontal,
    Eye,
    Phone,
    UserRoundCheck,
} from "lucide-react";
import axiosInstance from "@/helper/axiosInstance";
import Link from "next/link";

const FILE_BASE_URL = "https://admin.osakamasjid.org/";

const getPhotoUrl = (photo) => {

    if (!photo) return null;

    if (photo.startsWith("http")) {
        return photo;
    }

    return `https://admin.osakamasjid.org/public/${photo}`;
};

const getGender = (gender) => {
    return gender === "0" || gender === 0 ? "Male" : "Female";
};

const getAge = (birthDate) => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const monthDifference = today.getMonth() - birth.getMonth();

    if (
        monthDifference < 0 ||
        (monthDifference === 0 &&
            today.getDate() < birth.getDate())
    ) {
        age--;
    }

    return age;
};

const getLatestProgress = (progressSheets = []) => {
    if (!progressSheets.length) return null;

    return [...progressSheets].sort((a, b) => {
        const dateA = new Date(
            a.updated_at || a.created_at || 0
        );

        const dateB = new Date(
            b.updated_at || b.created_at || 0
        );

        return dateB - dateA;
    })[0];
};

const getAttendance = (progressSheets = []) => {
    if (!progressSheets.length) {
        return {
            present: 0,
            absent: 0,
            percentage: 0,
        };
    }

    const present = progressSheets.reduce(
        (sum, item) => sum + Number(item.present || 0),
        0
    );

    const absent = progressSheets.reduce(
        (sum, item) => sum + Number(item.absent || 0),
        0
    );

    const total = present + absent;

    const percentage =
        total > 0 ? Math.round((present / total) * 100) : 0;

    return {
        present,
        absent,
        percentage,
    };
};

/* -------------------------------------------------------
   Skeleton
------------------------------------------------------- */

function StudentTableSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-[#E3E9E4] bg-white">
            <div className="hidden min-w-[1000px] md:block">
                <div className="grid grid-cols-[2.2fr_1fr_1.3fr_1.3fr_1.2fr_90px] gap-4 border-b border-[#E8ECE9] bg-[#F8FAF8] px-5 py-3">
                    {Array.from({ length: 6 }).map(
                        (_, index) => (
                            <div
                                key={index}
                                className="h-3 w-20 animate-pulse rounded bg-[#E1E9E2]"
                            />
                        )
                    )}
                </div>

                {Array.from({ length: 7 }).map(
                    (_, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[2.2fr_1fr_1.3fr_1.3fr_1.2fr_90px] items-center gap-4 border-b border-[#EEF1EF] px-5 py-4 last:border-0"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 animate-pulse rounded-full bg-[#E7EEE8]" />

                                <div className="space-y-2">
                                    <div className="h-3.5 w-32 animate-pulse rounded bg-[#E7EEE8]" />
                                    <div className="h-2.5 w-20 animate-pulse rounded bg-[#EEF2EF]" />
                                </div>
                            </div>

                            {Array.from({ length: 5 }).map(
                                (_, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="h-3 w-20 animate-pulse rounded bg-[#EEF2EF]"
                                    />
                                )
                            )}
                        </div>
                    )
                )}
            </div>

            {/* Mobile skeleton */}
            <div className="divide-y divide-[#EEF1EF] md:hidden">
                {Array.from({ length: 5 }).map(
                    (_, index) => (
                        <div
                            key={index}
                            className="p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-11 w-11 animate-pulse rounded-full bg-[#E7EEE8]" />

                                <div className="flex-1 space-y-2">
                                    <div className="h-3.5 w-32 animate-pulse rounded bg-[#E7EEE8]" />

                                    <div className="h-2.5 w-20 animate-pulse rounded bg-[#EEF2EF]" />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="h-10 animate-pulse rounded-lg bg-[#F1F5F1]" />
                                <div className="h-10 animate-pulse rounded-lg bg-[#F1F5F1]" />
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

/* -------------------------------------------------------
   Avatar
------------------------------------------------------- */

function StudentAvatar({
    student,
    size = "md",
}) {
    const photo = getPhotoUrl(student?.attached?.photo);

    const sizeClasses =
        size === "sm"
            ? "h-10 w-10"
            : "h-11 w-11";

    const iconSize =
        size === "sm" ? 19 : 22;

    if (photo) {
        return (
            <img
                src={photo}
                alt={student?.name || "Student"}
                className={`${sizeClasses} shrink-0 rounded-full border border-[#DDE8DF] object-cover`}
            />
        );
    }

    return (
        <div
            className={`${sizeClasses} flex shrink-0 items-center justify-center rounded-full border border-[#DDE8DF] bg-[#EFF7F0] text-[#267544]`}
        >
            <CircleUserRound size={iconSize} />
        </div>
    );
}

/* -------------------------------------------------------
   Status
------------------------------------------------------- */

function StatusBadge({ status }) {
    const active = String(status) === "1";

    return (
        <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-semibold ${active
                    ? "bg-[#EAF6ED] text-[#267341]"
                    : "bg-[#FDF0E9] text-[#A85B2A]"
                }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${active
                        ? "bg-[#2E9550]"
                        : "bg-[#D17A42]"
                    }`}
            />

            {active ? "Active" : "Inactive"}
        </span>
    );
}

/* -------------------------------------------------------
   Attendance
------------------------------------------------------- */

function AttendanceProgress({
    progressSheets,
}) {
    const attendance =
        getAttendance(progressSheets);

    if (!progressSheets?.length) {
        return (
            <span className="text-xs text-[#8A958D]">
                —
            </span>
        );
    }

    return (
        <div className="w-[110px]">
            <div className="mb-1 flex items-center justify-between">
                <span className="text-[11px] text-[#7D8980]">
                    Attendance
                </span>

                <span className="text-[11px] font-semibold text-[#36744A]">
                    {attendance.percentage}%
                </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-[#E8EEE9]">
                <div
                    className="h-full rounded-full bg-[#3A9E75] transition-all"
                    style={{
                        width: `${Math.min(
                            attendance.percentage,
                            100
                        )}%`,
                    }}
                />
            </div>
        </div>
    );
}

/* -------------------------------------------------------
   Mobile Student Item
------------------------------------------------------- */

function MobileStudentItem({
    student,
}) {
    const latestProgress =
        getLatestProgress(
            student?.progress_sheets
        );

    const age = getAge(
        student?.birth_date
    );

    return (
        <div className="p-4">
            <div className="flex items-start gap-3">
                <StudentAvatar
                    student={student}
                />

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-[#20392A]">
                                {student?.name}
                            </h3>

                            <p className="mt-0.5 text-[11px] text-[#7D8981]">
                                ID:{" "}
                                <span className="font-medium text-[#36744A]">
                                    {student?.student_id ||
                                        "—"}
                                </span>
                            </p>
                        </div>

                        <StatusBadge
                            status={student?.status}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
                {/* <div className="rounded-lg border border-[#E9EEEA] bg-[#FAFCFA] px-3 py-2">
                    <p className="text-[10px] text-[#8A958D]">
                        Department
                    </p>

                    <p className="mt-0.5 truncate text-xs font-medium text-[#3D5144]">
                        {latestProgress
                            ?.department
                            ?.name || "—"}
                    </p>
                </div> */}

                <div className="rounded-lg border border-[#E9EEEA] bg-[#FAFCFA] px-3 py-2">
                    <p className="text-[10px] text-[#8A958D]">
                        Learning Level
                    </p>

                    <p className="mt-0.5 truncate text-xs font-medium text-[#3D5144]">
                        {latestProgress
                            ?.learning_status
                            ?.name || "—"}
                    </p>
                </div>

                <div className="rounded-lg border border-[#E9EEEA] bg-[#FAFCFA] px-3 py-2">
                    <p className="text-[10px] text-[#8A958D]">
                        Gender
                    </p>

                    <p className="mt-0.5 text-xs font-medium text-[#3D5144]">
                        {getGender(
                            student?.gender
                        )}
                        {age
                            ? ` · ${age} yrs`
                            : ""}
                    </p>
                </div>

                <div className="rounded-lg border border-[#E9EEEA] bg-[#FAFCFA] px-3 py-2">
                    <p className="text-[10px] text-[#8A958D]">
                        Guardian
                    </p>

                    <p className="mt-0.5 truncate text-xs font-medium text-[#3D5144]">
                        {student?.parent
                            ?.fathers_name ||
                            student?.parent
                                ?.guardians_name ||
                            "—"}
                    </p>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-[#EEF1EF] pt-3">
                <AttendanceProgress
                    progressSheets={
                        student?.progress_sheets
                    }
                />

                <button
                    type="button"
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#DDE7DF] px-2.5 text-xs font-medium text-[#39714B] transition hover:bg-[#F1F7F2]"
                >
                    <Eye size={14} />
                    View
                </button>
            </div>
        </div>
    );
}

/* -------------------------------------------------------
   Main Component
------------------------------------------------------- */

export default function StudentList() {
    const [students, setStudents] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [lastPage, setLastPage] =
        useState(1);

    const [total, setTotal] =
        useState(0);

    const [perPage, setPerPage] =
        useState(20);

    const [search, setSearch] =
        useState("");

    const fetchStudents = async (
        page = 1
    ) => {
        try {
            setLoading(true);
            setError("");

            const response =
                await axiosInstance.get(
                    `/students/list?page=${page}`
                );

            const result =
                response?.data;

            // console.log(
            //     "API Response:",
            //     result
            // );

            setStudents(
                Array.isArray(result?.data)
                    ? result.data
                    : []
            );

            setCurrentPage(
                Number(
                    result?.current_page ||
                    page
                )
            );

            setLastPage(
                Number(
                    result?.last_page || 1
                )
            );

            setTotal(
                Number(
                    result?.total || 0
                )
            );

            setPerPage(
                Number(
                    result?.per_page || 20
                )
            );
        } catch (err) {
            console.error(err);

            setError(
                
                "We couldn’t load the student information. Please check your internet connection and try again. If you’re not logged in, please log in to your account to view the student list."
            );

            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents(1);
    }, []);

    const handlePageChange = (
        page
    ) => {
        if (
            page < 1 ||
            page > lastPage ||
            page === currentPage ||
            loading
        ) {
            return;
        }

        fetchStudents(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    /*
     * Search is currently client-side
     * for the loaded API page.
     */
    const filteredStudents = useMemo(() => {
        const query =
            search.trim().toLowerCase();

        if (!query) {
            return students;
        }

        return students.filter(
            (student) =>
                student?.name
                    ?.toLowerCase()
                    .includes(query) ||
                student?.student_id
                    ?.toLowerCase()
                    .includes(query) ||
                student?.parent?.fathers_name
                    ?.toLowerCase()
                    .includes(query) ||
                student?.parent?.guardians_name
                    ?.toLowerCase()
                    .includes(query)
        );
    }, [students, search]);

    const from =
        total === 0
            ? 0
            : (currentPage - 1) *
            perPage +
            1;

    const to = Math.min(
        currentPage * perPage,
        total
    );

    return (
        <section className="w-full bg-[#F7F9F7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">

                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F3EA] text-[#267342]">
                                <GraduationCap
                                    size={17}
                                />
                            </div>

                            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4B7A59]">
                                Madrasha
                                Management
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-[#183B27] sm:text-3xl">
                            Students
                        </h1>

                        <p className="mt-1 text-sm text-[#748178]">
                            Manage and view
                            enrolled madrasha
                            students.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-[#DFE7E0] bg-white px-3 py-2.5 shadow-sm">
                        <Users
                            size={18}
                            className="text-[#39794F]"
                        />

                        <div>
                            <p className="text-[10px] uppercase tracking-wide text-[#8A958D]">
                                Total Students
                            </p>

                            <p className="text-sm font-bold text-[#264A33]">
                                {total}
                            </p>
                        </div>
                    </div>
                </div>

                {/* =================================================
                    TOOLBAR
                ================================================= */}

                <div className="mb-4 rounded-xl border border-[#E0E7E1] bg-white shadow-[0_2px_10px_rgba(25,70,35,0.035)]">
                    <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">

                        {/* Search */}
                        <div className="relative w-full sm:max-w-[380px]">
                            <Search
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#89948D]"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search students..."
                                className="h-10 w-full rounded-lg border border-[#DDE5DE] bg-[#FAFCFA] pl-9 pr-3 text-sm text-[#24382B] outline-none transition placeholder:text-[#9AA49D] focus:border-[#70A77D] focus:bg-white"
                            />
                        </div>

                        <div className="flex items-center justify-between gap-3 sm:justify-end">

                            {search && (
                                <p className="text-xs text-[#758078]">
                                    {
                                        filteredStudents.length
                                    }{" "}
                                    result
                                    {filteredStudents.length !==
                                        1
                                        ? "s"
                                        : ""}
                                </p>
                            )}

                            <button
                                type="button"
                                onClick={() =>
                                    fetchStudents(
                                        currentPage
                                    )
                                }
                                disabled={loading}
                                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DCE6DE] bg-white px-3 text-xs font-semibold text-[#39714B] transition hover:bg-[#F3F8F4] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <RefreshCw
                                    size={15}
                                    className={
                                        loading
                                            ? "animate-spin"
                                            : ""
                                    }
                                />

                                <span className="hidden sm:inline">
                                    Refresh
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Result information */}
                    {!loading &&
                        !error &&
                        total > 0 && (
                            <div className="border-t border-[#EEF1EF] px-3 py-2.5">
                                <p className="text-[11px] text-[#7C8780]">
                                    Showing{" "}
                                    <span className="font-semibold text-[#3C5545]">
                                        {from}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-semibold text-[#3C5545]">
                                        {to}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-[#3C5545]">
                                        {total}
                                    </span>{" "}
                                    students
                                </p>
                            </div>
                        )}
                </div>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && !loading && (
                    <div className="mb-4 rounded-xl border border-[#F0D4C7] bg-[#FFF8F5] px-4 py-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-[#9B5531]">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    fetchStudents(
                                        currentPage
                                    )
                                }
                                className="w-fit rounded-lg bg-[#9B5531] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#854526]"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (
                    <StudentTableSkeleton />
                )}

                {/* =================================================
                    DESKTOP TABLE
                ================================================= */}

                {!loading &&
                    !error &&
                    filteredStudents.length >
                    0 && (
                        <div className="hidden overflow-hidden rounded-xl border border-[#DEE6E0] bg-white shadow-[0_3px_15px_rgba(20,65,30,0.035)] md:block">

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[1050px] border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#E4EAE5] bg-[#F8FAF8]">
                                            <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.06em] text-[#768279]">
                                                Student
                                            </th>

                                            <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.06em] text-[#768279]">
                                                Personal
                                            </th>

                                            {/* <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.06em] text-[#768279]">
                                                Department
                                            </th> */}

                                            <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.06em] text-[#768279]">
                                                Learning
                                            </th>

                                            <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.06em] text-[#768279]">
                                                Attendance
                                            </th>

                                            <th className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.06em] text-[#768279]">
                                                Guardian
                                            </th>

                                            <th className="px-4 py-3.5 text-center text-[10px] font-bold uppercase tracking-[0.06em] text-[#768279]">
                                                Status
                                            </th>

                                            <th className="px-4 py-3.5 text-right text-[10px] font-bold uppercase tracking-[0.06em] text-[#768279]">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredStudents.map(
                                            (
                                                student
                                            ) => {
                                                const latestProgress =
                                                    getLatestProgress(
                                                        student?.progress_sheets
                                                    );

                                                const age =
                                                    getAge(
                                                        student?.birth_date
                                                    );

                                                return (
                                                    <tr
                                                        key={
                                                            student.id
                                                        }
                                                        className="group border-b border-[#EDF1EE] transition-colors last:border-0 hover:bg-[#FBFDFB]"
                                                    >
                                                        {/* Student */}
                                                        <td className="px-5 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <StudentAvatar
                                                                    student={
                                                                        student
                                                                    }
                                                                    size="sm"
                                                                />

                                                                <div className="min-w-0">
                                                                    <p className="max-w-[190px] truncate text-sm font-semibold text-[#20392A]">
                                                                        {
                                                                            student.name
                                                                        }
                                                                    </p>

                                                                    <p className="mt-0.5 text-[11px] text-[#7C8980]">
                                                                        ID:{" "}
                                                                        <span className="font-medium text-[#3B7950]">
                                                                            {
                                                                                student.student_id
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Personal */}
                                                        <td className="px-4 py-4">
                                                            <div>
                                                                <p className="text-xs font-medium text-[#405348]">
                                                                    {getGender(
                                                                        student.gender
                                                                    )}
                                                                    {age
                                                                        ? ` · ${age} yrs`
                                                                        : ""}
                                                                </p>

                                                                <p className="mt-1 text-[11px] text-[#89938C]">
                                                                    {student?.birth_date
                                                                        ? new Date(
                                                                            student.birth_date
                                                                        ).toLocaleDateString(
                                                                            "en-GB"
                                                                        )
                                                                        : "Date not available"}
                                                                </p>
                                                            </div>
                                                        </td>

                                                        {/* Department */}
                                                        {/* <td className="px-4 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EEF6EF] text-[#3B7950]">
                                                                    <BookOpen
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </div>

                                                                <div className="min-w-0">
                                                                    <p className="max-w-[130px] truncate text-xs font-medium text-[#405348]">
                                                                        {latestProgress
                                                                            ?.department
                                                                            ?.name ||
                                                                            "Not assigned"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td> */}

                                                        {/* Learning */}
                                                        <td className="px-4 py-4">
                                                            {latestProgress ? (
                                                                <div>
                                                                    <p className="text-xs font-medium text-[#405348]">
                                                                        {latestProgress
                                                                            ?.learning_status
                                                                            ?.name ||
                                                                            "—"}
                                                                    </p>

                                                                    <p className="mt-1 max-w-[120px] truncate text-[11px] text-[#89938C]">
                                                                        {latestProgress?.course ||
                                                                            "No course"}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <span className="text-xs text-[#89938C]">
                                                                    No
                                                                    record
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* Attendance */}
                                                        <td className="px-4 py-4">
                                                            <AttendanceProgress
                                                                progressSheets={
                                                                    student?.progress_sheets
                                                                }
                                                            />
                                                        </td>

                                                        {/* Guardian */}
                                                        <td className="px-4 py-4">
                                                            <div className="max-w-[150px]">
                                                                <p className="truncate text-xs font-medium text-[#405348]">
                                                                    {student
                                                                        ?.parent
                                                                        ?.fathers_name ||
                                                                        student
                                                                            ?.parent
                                                                            ?.guardians_name ||
                                                                        "—"}
                                                                </p>

                                                                {student
                                                                    ?.parent
                                                                    ?.phone_no && (
                                                                        <p className="mt-1 flex items-center gap-1 text-[10px] text-[#89938C]">
                                                                            <Phone
                                                                                size={
                                                                                    10
                                                                                }
                                                                            />

                                                                            {
                                                                                student
                                                                                    .parent
                                                                                    .phone_no
                                                                            }
                                                                        </p>
                                                                    )}
                                                            </div>
                                                        </td>

                                                        {/* Status */}
                                                        <td className="px-4 py-4 text-center">
                                                            <StatusBadge
                                                                status={
                                                                    student.status
                                                                }
                                                            />
                                                        </td>

                                                        {/* Action */}
                                                        <td className="px-4 py-4 text-right">
                                                            <Link
                                                                href={`/services/admission-form/progress-sheet/${student.id}`}
                                                                type="button"
                                                                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-transparent px-2.5 text-xs font-medium text-[#477258] transition hover:border-[#DCE7DE] hover:bg-[#F1F7F2]"
                                                            >
                                                                <Eye
                                                                    size={
                                                                        14
                                                                    }
                                                                />

                                                                View
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                {/* =================================================
                    MOBILE LIST
                ================================================= */}

                {!loading &&
                    !error &&
                    filteredStudents.length >
                    0 && (
                        <div className="overflow-hidden rounded-xl border border-[#DEE6E0] bg-white shadow-[0_3px_15px_rgba(20,65,30,0.035)] md:hidden">
                            <div className="border-b border-[#E8EDE9] bg-[#F8FAF8] px-4 py-3">
                                <p className="text-xs font-semibold text-[#405348]">
                                    Student List
                                </p>
                            </div>

                            <div className="divide-y divide-[#EDF1EE]">
                                {filteredStudents.map(
                                    (
                                        student
                                    ) => (
                                        <MobileStudentItem
                                            key={
                                                student.id
                                            }
                                            student={
                                                student
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}

                {/* =================================================
                    EMPTY
                ================================================= */}

                {!loading &&
                    !error &&
                    filteredStudents.length ===
                    0 && (
                        <div className="rounded-xl border border-dashed border-[#CCD9CF] bg-white px-5 py-16 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF6EF] text-[#39794F]">
                                <Users
                                    size={22}
                                />
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-[#284633]">
                                No students found
                            </h3>

                            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#7D8981]">
                                {search
                                    ? "No students match your search. Try a different name, student ID or guardian name."
                                    : "There are no students available to display."}
                            </p>

                            {search && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSearch(
                                            ""
                                        )
                                    }
                                    className="mt-4 rounded-lg bg-[#EAF5EC] px-3 py-2 text-xs font-semibold text-[#347248] transition hover:bg-[#E1F0E4]"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    )}

                {/* =================================================
                    PAGINATION
                ================================================= */}

                {!loading &&
                    !error &&
                    total > 0 &&
                    lastPage > 1 && (
                        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[#DEE6E0] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

                            <p className="text-xs text-[#7C8780]">
                                Showing{" "}
                                <span className="font-semibold text-[#405348]">
                                    {from}–{to}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-[#405348]">
                                    {total}
                                </span>
                            </p>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage -
                                            1
                                        )
                                    }
                                    disabled={
                                        currentPage ===
                                        1 ||
                                        loading
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DCE5DE] text-[#54715E] transition hover:bg-[#F0F6F1] disabled:cursor-not-allowed disabled:opacity-40"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft
                                        size={15}
                                    />
                                </button>

                                {Array.from(
                                    {
                                        length: lastPage,
                                    },
                                    (
                                        _,
                                        index
                                    ) =>
                                        index + 1
                                ).map(
                                    (
                                        page
                                    ) => (
                                        <button
                                            key={
                                                page
                                            }
                                            type="button"
                                            onClick={() =>
                                                handlePageChange(
                                                    page
                                                )
                                            }
                                            disabled={
                                                loading
                                            }
                                            className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${page ===
                                                    currentPage
                                                    ? "bg-[#277343] text-white"
                                                    : "text-[#607369] hover:bg-[#F0F6F1]"
                                                }`}
                                        >
                                            {
                                                page
                                            }
                                        </button>
                                    )
                                )}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage +
                                            1
                                        )
                                    }
                                    disabled={
                                        currentPage ===
                                        lastPage ||
                                        loading
                                    }
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DCE5DE] text-[#54715E] transition hover:bg-[#F0F6F1] disabled:cursor-not-allowed disabled:opacity-40"
                                    aria-label="Next page"
                                >
                                    <ChevronRight
                                        size={15}
                                    />
                                </button>
                            </div>
                        </div>
                    )}
            </div>
        </section>
    );
}