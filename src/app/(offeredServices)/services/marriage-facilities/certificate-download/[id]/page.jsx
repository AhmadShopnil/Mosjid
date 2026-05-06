'use client'

import React, { useRef, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/helper/axiosInstance';
import MarriageCertificate from '@/components/Services/marriageFacilities/MarriageCertificate';
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
                    const res = await axiosInstance.get(`/marriage/${id}/certificate`);
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
                filename: `Marriage_Certificate_${id}.pdf`,
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

    const dataToMap = certData;
    const infoObj = dataToMap?.others_infomartions || {};
    const info = infoObj.informations || infoObj;

    const groom = info?.groom || {};
    const bride = info?.bride || {};
    const other = info?.other || {};
    const attached = info?.attached || {};

    const getImageUrl = (path) => {
        if (!path) return null;
        const fullUrl = path.startsWith('http') ? path : `https://admin.osakamasjid.org/public/${path}`;
        return `/api/proxy-image?url=${encodeURIComponent(fullUrl)}`;
    };

    const mappedData = {
        details: {
            certificateNo: dataToMap.unique_id || dataToMap.id || "",
            date: other.date_of_marriage ? new Date(other.date_of_marriage).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : (dataToMap.booked_date ? new Date(dataToMap.booked_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : ""),
            place: other.place_of_marriage || "Osaka Masjid",
            mahar: other.mahar_details || ""
        },
        groom: {
            name: groom.name || "",
            muslimName: groom.muslim_name || "",
            fatherName: groom.father_name || "",
            age: groom.age || "",
            religion: groom.religion || "",
            nationality: groom.nationality || "",
            passportNo: groom.passport_no || groom.passport_number || "",
            addressLine1: groom.address || "",
            addressLine2: "",
            photoUrl: getImageUrl(attached.groom_photo || groom.image),
            signUrl: getImageUrl(attached.groom_sign)
        },
        bride: {
            name: bride.name || "",
            muslimName: bride.muslim_name || "",
            fatherName: bride.father_name || "",
            age: bride.age || "",
            maritalStatus: bride.marital_status || "",
            religion: bride.religion || "",
            nationality: bride.nationality || "",
            passportNo: bride.passport_no || bride.passport_number || "",
            addressLine1: bride.address || "",
            addressLine2: "",
            photoUrl: getImageUrl(attached.bride_photo || bride.image),
            signUrl: getImageUrl(attached.bride_sign)
        },
        witnesses: [
            { name: groom.witness_name || info?.witness_1?.name || "", address: groom.witness_address || info?.witness_1?.address || "", signUrl: getImageUrl(attached.groom_witness_sign) },
            { name: bride.witness_name || info?.witness_2?.name || "", address: bride.witness_address || info?.witness_2?.address || "", signUrl: getImageUrl(attached.bride_witness_sign) }
        ],
        solemnizedBy: {
            name: other.solemnized_by_name || info?.solemnized_by?.name || "",
            address: other.address || info?.solemnized_by?.address || "",
            signUrl: getImageUrl(attached.sign)
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className=" mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#52B920] transition-colors font-medium px-4 py-2"
                    >
                        <FiArrowLeft className="text-xl" />
                        Back to Applications
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className={`px-6 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 text-white shadow-md ${isDownloading ? 'bg-green-400 cursor-not-allowed' : 'bg-[#52B920] hover:bg-green-600 hover:shadow-lg'}`}
                    >
                        {isDownloading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
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

                <div className="bg-white p-8 rounded-xl shadow-xl flex justify-center overflow-x-auto border border-gray-200">
                    <div ref={certificateRef} className="shrink-0 bg-white">
                        <MarriageCertificate data={mappedData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;