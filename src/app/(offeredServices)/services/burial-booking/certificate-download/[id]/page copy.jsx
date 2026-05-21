'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/helper/axiosInstance';
import BurialCertificate from '@/components/Services/BurialBooking/BurialCertificate';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';

const Page = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const certificateRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [certData, setCertData] = useState(null);
    const [countries, setCountries] = useState([]);
    const [relationships, setRelationships] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchBurialCertificateData = async () => {
                setIsLoading(true);
                try {
                    const res = await axiosInstance.get(`/burial/${id}/certificate` );
                    if (res.data) {
                        // setCountries(res.data.countries || []);
                        // setRelationships(res.data.relationships || []);

                        // const bookingList = res.data.booking_list || [];
                        // const registerList = res.data.register_list || [];
                        // const myApplications = res.data.my_applications || [];
                        const combined = [...bookingList, ...registerList, ...myApplications];
                        
                        const found = combined.find(item => String(item.id) === String(id));
                        if (found) {
                            setCertData(found);
                        }
                    }
                } catch (err) {
                    console.error("Failed to load burial certificate data:", err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchBurialCertificateData();
        }
    }, [id]);

    const handleDownload = async () => {
        const element = certificateRef.current;
        if (!element) return;

        const removedRules = [];

        try {
            setIsDownloading(true);

            // Temporarily strip oklch rules from stylesheets to bypass html2canvas parser crash
            for (let i = 0; i < document.styleSheets.length; i++) {
                const sheet = document.styleSheets[i];
                try {
                    const rules = sheet.cssRules || sheet.rules;
                    if (!rules) continue;

                    for (let j = rules.length - 1; j >= 0; j--) {
                        const rule = rules[j];
                        if (rule && rule.cssText && rule.cssText.includes("oklch")) {
                            removedRules.push({
                                sheet,
                                cssText: rule.cssText,
                                index: j
                            });
                            sheet.deleteRule(j);
                        }
                    }
                } catch (sheetErr) {
                    console.debug("Skipping cross-origin sheet:", sheetErr);
                }
            }

            const html2pdf = (await import('html2pdf.js')).default;

            const opt = {
                margin: 0,
                filename: `Burial_Certificate_${id}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, allowTaint: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
            };

            await html2pdf().from(element).set(opt).save();
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            alert(`Failed to download PDF: ${error?.message || error}`);
        } finally {
            // Restore oklch rules instantly
            for (let k = removedRules.length - 1; k >= 0; k--) {
                const { sheet, cssText, index } = removedRules[k];
                try {
                    sheet.insertRule(cssText, index);
                } catch (restoreErr) {
                    console.error("Failed to restore CSS rule:", restoreErr);
                }
            }
            setIsDownloading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#52B920] border-t-transparent"></div>
            </div>
        );
    }

    if (!certData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Certificate Not Found</h2>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2 bg-[#52B920] text-white rounded-full font-medium"
                >
                    Go Back
                </button>
            </div>
        );
    }

    // Resolve detailed information
    const info = certData?.others_infomartions?.informations || {};

    const genderText = info.gender === "0" ? "Male (男性)" : info.gender === "1" ? "Female (女性)" : info.gender === "2" ? "Other (その他)" : "—";
    
    const countryName = countries.find(
        (c) => String(c.id) === String(info.nationality)
    )?.name || info.nationality || "—";

    const relationshipName = relationships.find(
        (r) => String(r.id) === String(info.relationship || certData.relationship)
    )?.name || info.relationship || certData.relationship || "—";

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        } catch {
            return dateStr;
        }
    };

    const mappedData = {
        details: {
            certificateNo: certData.unique_id || String(certData.id).padStart(6, '0'),
            issueDate: formatDate(certData.created_at || new Date())
        },
        deceased: {
            name: info.deceased_person_name || certData.deceased_name || "—",
            gender: genderText,
            dateOfBirth: formatDate(info.date_of_birth),
            dateOfDeath: formatDate(info.date_of_death),
            placeOfDeath: info.place_of_death || "—",
            nationality: countryName,
            passportNo: info.passport_no || "—",
            idCard: info.id_card || "—",
            burialDate: formatDate(info.burial_date || certData.burial_date),
            janazahLocation: info.janazah_prayer_location || "—",
            janazahDate: formatDate(info.janazah_date),
            graveNumber: info.grave_number || "—"
        },
        applicant: {
            name: info.applicant_name || certData.name || "—",
            relationship: relationshipName,
            contact: info.contact_number || certData.contact_no || "—"
        }
    };

    return (
        <div className="min-h-screen py-6 bg-gray-50">
            <div className="max-w-[1100px] mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#52B920] transition-colors font-semibold px-4 py-2"
                    >
                        <FiArrowLeft className="text-xl" />
                        Back to Applications
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className={`px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 text-white shadow-md ${isDownloading ? 'bg-green-400 cursor-not-allowed' : 'bg-[#52B920] hover:bg-green-600 hover:shadow-lg'}`}
                    >
                        {isDownloading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
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

                <div className="bg-white p-8 rounded-2xl shadow-xl flex justify-center overflow-x-auto border border-gray-200">
                    <div ref={certificateRef} className="shrink-0" style={{ backgroundColor: '#ffffff' }}>
                        <BurialCertificate data={mappedData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
