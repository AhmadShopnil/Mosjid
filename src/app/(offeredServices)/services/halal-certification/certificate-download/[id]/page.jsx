'use client'

import React, { useRef, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/helper/axiosInstance';
import HalalCertificate from '@/components/Services/HalalCertification/HalalCertificate';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';

const Page = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.id;

    const certificateRef = useRef(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [certData, setCertData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchCertAndCategories = async () => {
                setIsLoading(true);
                try {
                    // Fetch categories
                    try {
                        const catRes = await axiosInstance.get("/halal_categories");
                        if (catRes.data) setCategories(catRes.data);
                    } catch (catErr) {
                        console.error("Failed to fetch halal categories", catErr);
                    }

                    // Try to fetch individual certificate
                    try {
                        const res = await axiosInstance.get(`/halal/${id}/certificate`);
                        if (res.data) {
                            setCertData(res.data);
                            setIsLoading(false);
                            return;
                        }
                    } catch (err) {
                        console.warn("Direct certificate endpoint failed, attempting fallback list search...", err);
                    }

                    // Fallback: Fetch all halal applications and locate the matching ID
                    const listRes = await axiosInstance.get('/halal');
                    if (listRes.data) {
                        const allApps = listRes.data.all_applications?.data || [];
                        const myApps = listRes.data.my_applications?.data || [];
                        const combined = [...allApps, ...myApps];
                        const found = combined.find(item => String(item.id) === String(id));
                        if (found) {
                            setCertData(found);
                        }
                    }
                } catch (err) {
                    console.error("Failed to load certificate data", err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCertAndCategories();
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
                filename: `Halal_Certificate_${id}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, allowTaint: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
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

    // Resolve product category name
    const categoryName = categories.find(
        (cat) => String(cat.id) === String(certData.product_category)
    )?.name || certData.product_category || "—";

    // Helper to format dates
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
            certificateNo: certData.certificate_number || certData.unique_id || String(certData.id),
            issueDate: formatDate(certData.issue_date),
            expiryDate: formatDate(certData.expiry_date),
            qrCodeLink: certData.qr_code_link
        },
        business: {
            companyName: certData.company_name,
            companyAddress: certData.company_address,
            representative: certData.company_representive
        },
        entity: {
            certificateName: certData.certificate_name,
            certificateAddress: certData.certificate_address,
            representative: certData.certificate_representive
        },
        product: {
            productName: certData.product_name,
            category: categoryName,
            scope: certData.product_scope,
            halalUse: certData.product_halal_use
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
                        <HalalCertificate data={mappedData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
