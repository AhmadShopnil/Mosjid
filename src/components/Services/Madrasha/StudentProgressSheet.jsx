"use client";

import { useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    CircleUserRound,
    GraduationCap,
    Loader2,
    UserRound,
    Users,
    TrendingUp,
    AlertCircle,
    ClipboardCheck,
} from "lucide-react";
import axiosInstance from "@/helper/axiosInstance";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const getAttendance = (present = 0, absent = 0) => {
    const p = Number(present || 0);
    const a = Number(absent || 0);
    const total = p + a;

    return {
        present: p,
        absent: a,
        total,
        percentage: total > 0 ? Math.round((p / total) * 100) : 0,
    };
};

const formatValue = (value) => {
    if (value === null || value === undefined || value === "") {
        return "Not provided";
    }

    return value;
};

const getProgramColor = (index) => {
    const colors = [
        {
            badge: "bg-[#EAF6ED] text-[#267341]",
            icon: "bg-[#EAF6ED] text-[#267341]",
            border: "border-[#CFE5D3]",
        },
        {
            badge: "bg-[#EEF5F8] text-[#28708A]",
            icon: "bg-[#EEF5F8] text-[#28708A]",
            border: "border-[#D5E6EC]",
        },
        {
            badge: "bg-[#F5F1E8] text-[#8A6A2F]",
            icon: "bg-[#F5F1E8] text-[#8A6A2F]",
            border: "border-[#E8DEC8]",
        },
        {
            badge: "bg-[#F3EEF8] text-[#73508C]",
            icon: "bg-[#F3EEF8] text-[#73508C]",
            border: "border-[#E2D7EB]",
        },
    ];

    return colors[index % colors.length];
};
const getPhotoUrl = (photo) => {

    if (!photo) return null;

    if (photo.startsWith("http")) {
        return photo;
    }

    return `https://admin.osakamasjid.org/public/${photo}`;
};

function LoadingState() {
    return (
        <section className="w-full bg-[#F7F9F7] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">
                <div className="animate-pulse rounded-2xl border border-[#E1E8E2] bg-white">
                    <div className="border-b border-[#E9EEEA] p-5 sm:p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-full bg-[#E7EEE8]" />

                            <div className="space-y-2">
                                <div className="h-5 w-44 rounded bg-[#E7EEE8]" />
                                <div className="h-3 w-28 rounded bg-[#EEF2EF]" />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-24 rounded-xl bg-[#F0F4F0]"
                            />
                        ))}
                    </div>

                    <div className="p-5 sm:p-6">
                        <div className="h-10 w-64 rounded-lg bg-[#EEF2EF]" />

                        <div className="mt-5 space-y-3">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-20 rounded-xl bg-[#F0F4F0]"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ErrorState({ error, onRetry }) {
    return (
        <section className="w-full bg-[#F7F9F7] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[700px]">
                <div className="rounded-2xl border border-[#F0D4C7] bg-white p-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF1EB] text-[#A85B2A]">
                        <AlertCircle size={22} />
                    </div>

                    <h2 className="mt-4 text-base font-bold text-[#294233]">
                        Unable to load progress sheet
                    </h2>

                    <p className="mt-2 text-sm text-[#7B8780]">
                        {error ||
                            "Something went wrong while loading the student's progress."}
                    </p>

                    <button
                        type="button"
                        onClick={onRetry}
                        className="mt-5 rounded-lg bg-[#277343] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#205F36]"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </section>
    );
}
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

function StudentHeader({ student, year }) {
    return (
        <div className="border-b border-[#E6ECE7] bg-white px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                    {/* `https://admin.osakamasjid.org/public/${photo}` */}


                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#D8E7DB] bg-[#EEF6EF] text-[#287345]">
                        {/* <StudentAvatar
                            student={
                                student
                            }
                            size="sm"
                        /> */}
                        <CircleUserRound size={29} />
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="truncate text-xl font-bold tracking-tight text-[#1F3929] sm:text-2xl">
                                {student?.name || "Student"}
                            </h1>

                            <span className="rounded-md bg-[#EEF6EF] px-2 py-1 text-[10px] font-bold text-[#347348]">
                                {year}
                            </span>
                        </div>

                        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#7B8780]">
                            <span>
                                Student ID:{" "}
                                <strong className="font-semibold text-[#477052]">
                                    {student?.student_id || "—"}
                                </strong>
                            </span>

                            <span className="hidden h-1 w-1 rounded-full bg-[#B6C2B8] sm:block" />

                            <span className="flex items-center gap-1.5">
                                <CalendarDays size={13} />
                                Progress Sheet · {year}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-xl border border-[#E0E8E1] bg-[#FAFCFA] px-3 py-2.5">
                        <ClipboardCheck
                            size={17}
                            className="text-[#34764A]"
                        />

                        <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#8A958D]">
                                Academic Year
                            </p>
                            <p className="text-sm font-bold text-[#31513C]">
                                {year}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({
    icon,
    label,
    value,
    description,
}) {
    return (
        <div className="rounded-xl border border-[#E1E8E2] bg-white p-4 transition hover:border-[#D5E2D7]">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#8A958D]">
                        {label}
                    </p>

                    <p className="mt-1.5 text-2xl font-bold tracking-tight text-[#284633]">
                        {value}
                    </p>

                    {description && (
                        <p className="mt-1 text-[11px] text-[#89938C]">
                            {description}
                        </p>
                    )}
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF6EF] text-[#36764B]">
                    {icon}
                </div>
            </div>
        </div>
    );
}

function AttendanceBar({ present, absent }) {
    const attendance = getAttendance(present, absent);

    if (!attendance.total) {
        return (
            <div className="text-xs text-[#8A958D]">
                No attendance data
            </div>
        );
    }

    return (
        <div className="min-w-[150px]">
            <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[10px] font-medium text-[#7F8982]">
                    Attendance
                </span>

                <span className="text-[11px] font-bold text-[#347348]">
                    {attendance.percentage}%
                </span>
            </div>

            <div className="flex h-1.5 overflow-hidden rounded-full bg-[#E9EEEA]">
                <div
                    className="h-full bg-[#3A9E75]"
                    style={{
                        width: `${attendance.percentage}%`,
                    }}
                />
            </div>

            <div className="mt-1.5 flex gap-3 text-[10px]">
                <span className="text-[#477052]">
                    Present:{" "}
                    <strong>{attendance.present}</strong>
                </span>

                <span className="text-[#9A6A55]">
                    Absent:{" "}
                    <strong>{attendance.absent}</strong>
                </span>
            </div>
        </div>
    );
}

function DetailValue({ label, value }) {
    return (
        <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.05em] text-[#8A958D]">
                {label}
            </p>

            <p className="mt-1 text-xs font-medium leading-5 text-[#405348]">
                {formatValue(value)}
            </p>
        </div>
    );
}

function MonthProgressRow({ month, item }) {
    const attendance = getAttendance(
        item?.present,
        item?.absent
    );

    return (
        <div className="group rounded-xl border border-[#E4EAE5] bg-white p-4 transition hover:border-[#D3E1D5] hover:bg-[#FCFDFC]">
            {/* Desktop / tablet */}
            <div className="hidden lg:grid lg:grid-cols-[115px_1.1fr_1fr_1.3fr_150px] lg:items-center lg:gap-5">
                <div>
                    <p className="text-sm font-bold text-[#304A38]">
                        {month}
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#909991]">
                        Monthly record
                    </p>
                </div>

                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[#8A958D]">
                        Program
                    </p>

                    <p className="mt-1 text-xs font-semibold text-[#405348]">
                        {formatValue(item?.program_type)}
                    </p>
                </div>

                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[#8A958D]">
                        Learning Status
                    </p>

                    <span className="mt-1 inline-flex rounded-md bg-[#EEF6EF] px-2 py-1 text-[10px] font-semibold text-[#36764B]">
                        {formatValue(item?.learning_status)}
                    </span>
                </div>

                <div>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-[#8A958D]">
                        Learning Details
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <span className="text-[11px] text-[#68766D]">
                            Teacher:{" "}
                            <strong className="font-semibold text-[#405348]">
                                {formatValue(item?.teacher)}
                            </strong>
                        </span>

                        <span className="text-[11px] text-[#68766D]">
                            Mode:{" "}
                            <strong className="font-semibold text-[#405348]">
                                {formatValue(item?.learning_mode)}
                            </strong>
                        </span>
                    </div>
                </div>

                <AttendanceBar
                    present={item?.present}
                    absent={item?.absent}
                />
            </div>

            {/* Mobile */}
            <div className="lg:hidden">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF6EF] text-[#36764B]">
                            <CalendarDays size={16} />
                        </div>

                        <div>
                            <p className="text-sm font-bold text-[#304A38]">
                                {month}
                            </p>

                            <p className="mt-0.5 text-[10px] text-[#89938C]">
                                {formatValue(item?.program_type)}
                            </p>
                        </div>
                    </div>

                    <span className="rounded-md bg-[#EEF6EF] px-2 py-1 text-[10px] font-semibold text-[#36764B]">
                        {formatValue(item?.learning_status)}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <DetailValue
                        label="Present"
                        value={item?.present}
                    />

                    <DetailValue
                        label="Absent"
                        value={item?.absent}
                    />

                    <DetailValue
                        label="Teacher"
                        value={item?.teacher}
                    />

                    <DetailValue
                        label="Learning Mode"
                        value={item?.learning_mode}
                    />
                </div>

                <div className="mt-4 border-t border-[#EEF1EF] pt-3">
                    <AttendanceBar
                        present={item?.present}
                        absent={item?.absent}
                    />
                </div>
            </div>

            {/* Additional learning information */}
            {(item?.progress || item?.next_progress) && (
                <div className="mt-4 grid gap-3 border-t border-[#EEF1EF] pt-4 sm:grid-cols-2">
                    {item?.progress && (
                        <div className="rounded-lg bg-[#F7FAF7] p-3">
                            <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#829087]">
                                Current Progress
                            </p>

                            <p className="mt-1.5 text-xs leading-5 text-[#405348]">
                                {item.progress}
                            </p>
                        </div>
                    )}

                    {item?.next_progress && (
                        <div className="rounded-lg bg-[#F7FAF7] p-3">
                            <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#829087]">
                                Next Progress
                            </p>

                            <p className="mt-1.5 text-xs leading-5 text-[#405348]">
                                {item.next_progress}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function ProgramSection({
    program,
    programIndex,
    records,
}) {
    const colors = getProgramColor(programIndex);

    const programAttendance = useMemo(() => {
        return records.reduce(
            (result, item) => {
                result.present += Number(item?.present || 0);
                result.absent += Number(item?.absent || 0);

                return result;
            },
            {
                present: 0,
                absent: 0,
            }
        );
    }, [records]);

    const attendance = getAttendance(
        programAttendance.present,
        programAttendance.absent
    );

    return (
        <div className="overflow-hidden rounded-2xl border border-[#E0E7E1] bg-white">
            {/* Program header */}
            <div className="border-b border-[#E8EDE9] bg-[#FBFCFB] px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.icon}`}
                        >
                            <BookOpen size={19} />
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-base font-bold text-[#294333]">
                                    {program}
                                </h2>

                                <span
                                    className={`rounded-md px-2 py-1 text-[9px] font-bold uppercase tracking-[0.04em] ${colors.badge}`}
                                >
                                    Program
                                </span>
                            </div>

                            <p className="mt-1 text-[11px] text-[#89938C]">
                                {records.length} monthly{" "}
                                {records.length === 1
                                    ? "record"
                                    : "records"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden h-8 w-px bg-[#E3E9E4] sm:block" />

                        <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.05em] text-[#8B958E]">
                                Attendance
                            </p>

                            <p className="mt-0.5 text-sm font-bold text-[#347348]">
                                {attendance.total
                                    ? `${attendance.percentage}%`
                                    : "—"}
                            </p>
                        </div>

                        <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.05em] text-[#8B958E]">
                                Present
                            </p>

                            <p className="mt-0.5 text-sm font-bold text-[#405348]">
                                {programAttendance.present}
                            </p>
                        </div>

                        <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.05em] text-[#8B958E]">
                                Absent
                            </p>

                            <p className="mt-0.5 text-sm font-bold text-[#9A6A55]">
                                {programAttendance.absent}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Records */}
            <div className="space-y-2 p-3 sm:p-4">
                {records.map((item, index) => (
                    <MonthProgressRow
                        key={`${item?.program_type_id}-${item?.month || index}-${index}`}
                        month={item.month}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
}

function ProgramTabs({
    programs,
    activeProgram,
    setActiveProgram,
}) {
    return (
        <div className="overflow-x-auto">
            <div className="flex min-w-max gap-1 rounded-xl border border-[#DFE7E0] bg-[#F5F8F5] p-1">
                <button
                    type="button"
                    onClick={() => setActiveProgram("all")}
                    className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${activeProgram === "all"
                            ? "bg-white text-[#2D6D43] shadow-sm"
                            : "text-[#718078] hover:text-[#3D5947]"
                        }`}
                >
                    All Programs
                </button>

                {programs.map((program) => (
                    <button
                        key={program}
                        type="button"
                        onClick={() => setActiveProgram(program)}
                        className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${activeProgram === program
                                ? "bg-white text-[#2D6D43] shadow-sm"
                                : "text-[#718078] hover:text-[#3D5947]"
                            }`}
                    >
                        {program}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function StudentProgressSheet({
    studentId,
    onBack,
}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeProgram, setActiveProgram] = useState("all");

    const fetchProgressSheet = async () => {
        if (!studentId) {
            setError("Student ID is required.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axiosInstance.get(
                `/student/${studentId}/progress-sheet`
            );

            setData(response?.data || null);
        } catch (err) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to load progress sheet."
            );

            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProgressSheet();
    }, [studentId]);

    const records = useMemo(() => {
        if (!data?.months) return [];

        return MONTHS.flatMap((month) => {
            const monthRecords = Array.isArray(
                data.months[month]
            )
                ? data.months[month]
                : [];

            return monthRecords.map((item) => ({
                ...item,
                month,
            }));
        });
    }, [data]);

    const programs = useMemo(() => {
        const uniquePrograms = new Map();

        records.forEach((item) => {
            const key =
                item?.program_type_id ??
                item?.program_type ??
                "unknown";

            if (!uniquePrograms.has(key)) {
                uniquePrograms.set(
                    key,
                    item?.program_type || "Unknown Program"
                );
            }
        });

        return Array.from(uniquePrograms.values());
    }, [records]);

    const groupedPrograms = useMemo(() => {
        const grouped = {};

        records.forEach((item) => {
            const program =
                item?.program_type || "Unknown Program";

            if (!grouped[program]) {
                grouped[program] = [];
            }

            grouped[program].push(item);
        });

        return grouped;
    }, [records]);

    const visiblePrograms = useMemo(() => {
        if (activeProgram === "all") {
            return programs;
        }

        return programs.includes(activeProgram)
            ? [activeProgram]
            : [];
    }, [activeProgram, programs]);

    const summary = useMemo(() => {
        const present = records.reduce(
            (sum, item) => sum + Number(item?.present || 0),
            0
        );

        const absent = records.reduce(
            (sum, item) => sum + Number(item?.absent || 0),
            0
        );

        const months = new Set(
            records.map((item) => item.month)
        );

        const attendance = getAttendance(present, absent);

        return {
            present,
            absent,
            months: months.size,
            programs: programs.length,
            attendance: attendance.percentage,
        };
    }, [records, programs]);

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return (
            <ErrorState
                error={error}
                onRetry={fetchProgressSheet}
            />
        );
    }

    if (!data?.student) {
        return (
            <ErrorState
                error="No student progress information was found."
                onRetry={fetchProgressSheet}
            />
        );
    }

    return (
        <section className="w-full   ">
            <div className="mx-auto max-w-[1400px]">
                {/* Back */}
                {onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-[#4D7059] transition hover:text-[#245D38]"
                    >
                        <ArrowLeft size={15} />
                        Back to Students
                    </button>
                )}

                {/* Main student header */}
                <div className="overflow-hidden rounded-2xl border border-[#DEE6E0] bg-white shadow-[0_3px_18px_rgba(20,65,30,0.035)]">
                    <StudentHeader
                        student={data.student}
                        year={data.year}
                    />

                    {/* Summary */}
                    <div className="grid gap-3 border-b border-[#E8EDE9] bg-[#FAFCFA] p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
                        <SummaryCard
                            icon={<BookOpen size={18} />}
                            label="Programs"
                            value={summary.programs}
                            description="Active program types in records"
                        />

                        <SummaryCard
                            icon={<CalendarDays size={18} />}
                            label="Months Recorded"
                            value={summary.months}
                            description={`Of 12 months in ${data.year}`}
                        />

                        <SummaryCard
                            icon={<CheckCircle2 size={18} />}
                            label="Attendance"
                            value={`${summary.attendance}%`}
                            description={`${summary.present} present · ${summary.absent} absent`}
                        />

                        <SummaryCard
                            icon={<TrendingUp size={18} />}
                            label="Total Sessions"
                            value={summary.present + summary.absent}
                            description="Recorded attendance sessions"
                        />
                    </div>
                </div>

                {/* Progress section */}
                <div className="mt-5">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF5EC] text-[#347348]">
                                    <GraduationCap size={17} />
                                </div>

                                <h2 className="text-lg font-bold text-[#294333]">
                                    Academic Progress
                                </h2>
                            </div>

                            <p className="mt-1 pl-10 text-xs text-[#7F8A82]">
                                Monthly learning and attendance records
                                grouped by program.
                            </p>
                        </div>
                    </div>

                    {/* Program filter */}
                    {programs.length > 1 && (
                        <div className="mb-4">
                            <ProgramTabs
                                programs={programs}
                                activeProgram={activeProgram}
                                setActiveProgram={setActiveProgram}
                            />
                        </div>
                    )}

                    {visiblePrograms.length > 0 ? (
                        <div className="space-y-4">
                            {visiblePrograms.map(
                                (program, programIndex) => (
                                    <ProgramSection
                                        key={program}
                                        program={program}
                                        programIndex={programIndex}
                                        records={
                                            groupedPrograms[
                                            program
                                            ] || []
                                        }
                                    />
                                )
                            )}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-[#CBD8CE] bg-white px-5 py-14 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF6EF] text-[#39794F]">
                                <BookOpen size={21} />
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-[#304A38]">
                                No progress records
                            </h3>

                            <p className="mt-1 text-xs text-[#7E8982]">
                                There are no monthly progress records
                                available for this student.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}