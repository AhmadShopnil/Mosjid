'use client'

import React, { useRef, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/helper/axiosInstance';
import ConversionCertificate from '@/components/Services/MuslimConversion/ConversionCertificate';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';

const Page = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const certificateRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [certData, setCertData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchCert = async () => {
                setIsLoading(true);
                try {
                    const res = await axiosInstance.get(`/conversion/${id}/certificate`);
                    if (res.data) {
                        setCertData(res.data);
                    }
                } catch (err) {
                    console.error("Failed to fetch certificate", err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCert();
        }
    }, [id]);

    const handleDownload = async () => {
        const element = certificateRef.current;
        if (!element) return;

        try {
            setIsDownloading(true);
            const html2pdf = (await import('html2pdf.js')).default;

            const opt = {
                margin: 0,
                filename: `Conversion_Certificate_${id}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, allowTaint: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            await html2pdf().from(element).set(opt).save();
        } catch (error) {
            console.error("Failed to generate PDF:", error);
            alert(`Failed to download PDF: ${error?.message || error}`);
        } finally {
            setIsDownloading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#f9fafb]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#52B920] border-t-transparent"></div>
            </div>
        );
    }

    if (!certData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#f9fafb]">
                <h2 className="text-2xl font-bold text-[#1f2937] mb-4">Certificate Not Found</h2>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2 bg-[#52B920] text-[#ffffff] rounded-full font-medium"
                >
                    Go Back
                </button>
            </div>
        );
    }

    // Map API response to component props
    const info = certData?.others_infomartions?.informations || {};
    const attached = certData?.others_infomartions?.attached || {};

    const getImageUrl = (path) => {
        if (!path) return null;
        const fullUrl = path.startsWith('http') ? path : `https://admin.osakamasjid.org/public/${path}`;
        return `/api/proxy-image?url=${encodeURIComponent(fullUrl)}`;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        } catch {
            return dateStr;
        }
    };

    const mappedData = {
        applicant: {
            photoUrl: getImageUrl(attached?.picture_area || attached?.applicant_photo),
            name: info.name || certData.name || "",
            muslimName: info.muslim_name || "",
            dob: formatDate(info.date_of_birth) || "",
            nationality: info.nationality || "",
            addressLine1: info.address || "",
            addressLine2: "",
            passportNo: info.passport_no || "",
            previousReligion: info.previous_religion || info.prevous_religion || "",
            mobile: info.mobile_no || certData.contact_no || "",
        },
        details: {
            certificateNo: certData.unique_id || certData.id || "",
            declaredDate: formatDate(info.declared_date) || "",
            place: "Osaka Masjid",
        },
        witnesses: [
            { name: info.witness_one || "", address: "", signUrl: "" },
            { name: info.witness_two || "", address: "", signUrl: "" },
            { name: info.witness_three || "", address: "", signUrl: "" },
        ],
        solemnizedBy: {
            name: "",
            address: "Osaka Masjid",
            signUrl: getImageUrl(attached?.imam_sign),
        }
    };

    return (
        <div className="min-h-screen ">
            <div className="mx-auto ">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4 bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#f3f4f6]">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[#4b5563] hover:text-[#52B920] transition-colors font-medium px-4 py-2"
                    >
                        <FiArrowLeft className="text-xl" />
                        Back to Applications
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className={`px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 text-[#ffffff] shadow-md ${isDownloading ? 'bg-[#4ade80] cursor-not-allowed' : 'bg-[#52B920] hover:bg-[#16a34a] hover:shadow-lg'}`}
                    >
                        {isDownloading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#ffffff] border-t-transparent"></div>
                                Generating PDF...
                            </>
                        ) : (
                            <>
                                <FiDownload className="text-lg" />
                                Download PDF
                            </>
                        )}
                    </button>
                </div>

                <div className="bg-[#ffffff] p-8 rounded-xl shadow-md flex justify-center overflow-x-auto border border-[#e5e7eb]">
                    <div ref={certificateRef} className="shrink-0 bg-[#ffffff]">
                        <ConversionCertificate data={mappedData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
