"use client";

import React, { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/helper/axiosInstance";
import BurialCertificate from "@/components/Services/BurialBooking/BurialCertificate";
import { FiArrowLeft, FiDownload } from "react-icons/fi";

const Page = () => {
    const params = useParams();
    const router = useRouter();

    const id = params?.id;

    const certificateRef = useRef(null);

    const [certData, setCertData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchBurialCertificateData = async () => {
            try {
                setIsLoading(true);

                const res = await axiosInstance.get(
                    `/burial/${id}/certificate`
                );

                if (res?.data) {
                    setCertData(res.data);
                }
            } catch (error) {
                console.error(
                    "Failed to load burial certificate:",
                    error
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchBurialCertificateData();
    }, [id]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";

        try {
            const date = new Date(dateStr);

            return date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    const handleDownload = async () => {
        const element = certificateRef.current;

        if (!element) return;

        const removedRules = [];

        try {
            setIsDownloading(true);

            // Remove problematic oklch css rules temporarily
            for (let i = 0; i < document.styleSheets.length; i++) {
                const sheet = document.styleSheets[i];

                try {
                    const rules = sheet.cssRules || sheet.rules;

                    if (!rules) continue;

                    for (let j = rules.length - 1; j >= 0; j--) {
                        const rule = rules[j];

                        if (
                            rule?.cssText &&
                            rule.cssText.includes("oklch")
                        ) {
                            removedRules.push({
                                sheet,
                                cssText: rule.cssText,
                                index: j,
                            });

                            sheet.deleteRule(j);
                        }
                    }
                } catch (err) {
                    console.debug(
                        "Skipping stylesheet:",
                        err
                    );
                }
            }

            const html2pdf = (
                await import("html2pdf.js")
            ).default;

            const options = {
                margin: 0,
                filename: `Burial_Certificate_${id}.pdf`,
                image: {
                    type: "jpeg",
                    quality: 0.98,
                },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "landscape",
                },
            };

            await html2pdf()
                .from(element)
                .set(options)
                .save();
        } catch (error) {
            console.error(
                "Failed to generate PDF:",
                error
            );

            alert(
                `Failed to download PDF: ${
                    error?.message || error
                }`
            );
        } finally {
            // Restore removed css rules
            for (
                let i = removedRules.length - 1;
                i >= 0;
                i--
            ) {
                const { sheet, cssText, index } =
                    removedRules[i];

                try {
                    sheet.insertRule(cssText, index);
                } catch (err) {
                    console.error(
                        "Failed to restore css rule:",
                        err
                    );
                }
            }

            setIsDownloading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#52B920] border-t-transparent"></div>
            </div>
        );
    }

    if (!certData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                    Certificate Not Found
                </h2>

                <button
                    onClick={() => router.back()}
                    className="rounded-full bg-[#52B920] px-6 py-2 font-medium text-white"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const info = certData?.others_infomartions || {};

    const mappedData = {
        details: {
            certificateNo:
                certData.unique_id ||
                String(certData.id).padStart(6, "0"),

            issueDate: formatDate(
                certData.created_at
            ),
        },

        deceased: {
            name: certData.deceased_name || "—",

            gender: info.gender || "—",

            dateOfBirth: formatDate(
                info.date_of_birth
            ),

            dateOfDeath: formatDate(
                info.date_of_death
            ),

            placeOfDeath:
                info.place_of_death || "—",

            nationality:
                info.nationality || "—",

            passportNo:
                info.passport_no || "—",

            idCard: info.id_card || "—",

            burialDate: formatDate(
                certData.burial_date
            ),

            janazahLocation:
                info.janazah_prayer_location ||
                "—",

            janazahDate: formatDate(
                info.janazah_date
            ),

            graveNumber:
                info.grave_number || "—",
        },

        applicant: {
            name: certData.name || "—",

            relationship:
                certData.relationship ||
                info.relationship ||
                "—",

            contact:
                certData.contact_no || "—",
        },
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto px-4 py-6">
                {/* Top Actions */}
                <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-4 py-2 cursor-pointer font-semibold text-gray-600 transition-colors hover:text-[#52B920]"
                    >
                        <FiArrowLeft className="text-xl" />
                        Back to Applications
                    </button>

                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className={`flex items-center gap-2 rounded-full cursor-pointer px-6 py-2.5 font-bold text-white shadow-md transition-all ${
                            isDownloading
                                ? "cursor-not-allowed bg-green-400"
                                : "bg-[#52B920] hover:bg-green-600 hover:shadow-lg"
                        }`}
                    >
                        {isDownloading ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Generating PDF...
                            </>
                        ) : (
                            <>
                                <FiDownload className="text-lg" />
                                Download PDF Certificate
                            </>
                        )}
                    </button>
                </div>

                {/* Certificate */}
                <div className="flex justify-center overflow-x-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
                    <div
                        ref={certificateRef}
                        className="shrink-0 bg-white"
                    >
                        <BurialCertificate
                            data={mappedData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;