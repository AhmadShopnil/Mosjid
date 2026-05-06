import React, { useRef, useState, useEffect } from 'react';
import MarriageCertificate from './MarriageCertificate';
import axiosInstance from '@/helper/axiosInstance';

const CertificateModal = ({ isOpen, onClose, application }) => {
  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [certData, setCertData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && application?.id) {
      const fetchCert = async () => {
        setIsLoading(true);
        try {
          const res = await axiosInstance.get(`/marriage/${application.id}/certificate`);
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
    } else {
      setCertData(null);
    }
  }, [isOpen, application]);

  if (!isOpen || !application) return null;

  const handleDownload = async () => {
    const element = certificateRef.current;
    if (!element) return;

    try {
      setIsDownloading(true);
      // Dynamically import html2pdf.js to avoid Next.js SSR issues (window is not defined)
      const html2pdf = (await import('html2pdf.js')).default;
      
      const opt = {
        margin: [5, 5, 5, 5],
        filename: `Marriage_Certificate_${application.id || 'download'}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Map application data to the format MarriageCertificate expects
  const dataToMap = certData || application;
  const infoObj = dataToMap?.others_infomartions || {};
  const info = infoObj.informations || infoObj;
  
  const groom = info?.groom || {};
  const bride = info?.bride || {};
  const other = info?.other || {};
  const attached = info?.attached || {};

  const getImageUrl = (path) => path ? (path.startsWith('http') ? path : `https://admin.osakamasjid.org/storage/${path}`) : null;

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 pt-40">
      <div className="bg-[#f8f9fa] rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-800">Marriage Certificate</h2>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading || isLoading}
              className={`px-5 py-2 ${(isDownloading || isLoading) ? 'bg-green-400 cursor-not-allowed' : 'bg-[#52B920] hover:bg-green-600'} text-white rounded-md font-semibold transition-colors flex items-center gap-2`}
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download PDF
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 flex justify-center">
          <div className="bg-white shadow-md">
            {isLoading ? (
               <div className="flex justify-center items-center h-[500px] w-[800px] bg-white border-[1.5px] border-[#8CC63F]">
                 <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent"></div>
               </div>
            ) : (
               <div ref={certificateRef}>
                 <MarriageCertificate data={mappedData} />
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
