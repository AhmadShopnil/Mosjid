import React from 'react';

const FieldRow = ({ labelEn, labelJp, value }) => (
  <div className="flex items-end mb-3">
    <div className="w-56 flex-shrink-0">
      <p className="text-[10px] leading-tight uppercase font-semibold text-gray-500">{labelJp}</p>
      <p className="text-[14px] font-bold leading-tight font-serif text-[#00401A]">{labelEn}</p>
    </div>
    <div className="mx-2 font-bold text-[#00401A]">:</div>
    <div className="border-b border-dashed flex-1 text-[15px] pb-0.5 text-left font-serif min-h-[20px] px-3 font-semibold border-[#86efac] text-[#B98C20]">
      {value || "—"}
    </div>
  </div>
);

export default function BurialCertificate({ data = {} }) {
  const { details = {}, deceased = {}, applicant = {} } = data;

  return (
    <div 
      className="w-[1000px] max-w-full mx-auto p-8 font-sans relative text-left overflow-hidden bg-white"
      style={{
        border: '12px double #00401A',
        background: 'linear-gradient(to bottom right, #ffffff, #fafaf9)'
      }}
    >
      {/* Decorative Gold Inner Border */}
      <div className="absolute inset-2 pointer-events-none border border-[#B98C20]"></div>

      {/* Arabesque Pattern Overlay (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="currentColor" className="text-[#00401A]">
          <path d="M50 0 C60 20, 80 20, 100 50 C80 80, 60 80, 50 100 C40 80, 20 80, 0 50 C20 20, 40 20, 50 0 Z" />
        </svg>
      </div>

      {/* Header Section */}
      <div className="relative flex justify-between items-start pb-6 mb-8 z-10 border-b-2 border-[#B98C20]">
        <div>
          <div className="flex items-center gap-3">
            <div 
              className="w-14 h-14 relative rounded-full flex items-center justify-center text-white shadow-md border bg-[#00401A] border-[#B98C20]"
            >
              {/* Star and Crescent or beautiful islamic seal icon */}
              <span className="text-xl font-bold font-serif">قبر</span>
            </div>
            <div>
              <h2 className="text-[20px] font-extrabold tracking-wide font-serif text-[#00401A]">OSAKA MASJID</h2>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Burial Registry Board</p>
            </div>
          </div>
        </div>

        <div className="text-center absolute w-full left-0 top-0 pointer-events-none mt-1">
          <p className="font-bold text-xs tracking-widest text-[#B98C20]">埋葬証明書</p>
          <h1 className="text-[34px] font-extrabold tracking-wider font-serif text-[#00401A] shadow-sm">
            BURIAL CERTIFICATE
          </h1>
          <p className="text-[14px] font-bold mt-1 text-[#00401A]">شهادة الدفن</p>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400">REGISTRY NO.</p>
          <p className="text-[16px] font-bold font-mono tracking-wider text-[#B98C20]">{details.certificateNo || "—"}</p>
        </div>
      </div>

      {/* Certificate Text */}
      <div className="text-center max-w-2xl mx-auto mb-8 z-10 relative space-y-2">
        <p className="text-[14px] font-medium italic text-gray-700">
          "This document officially certifies that the deceased person described below has been laid to rest in accordance with Islamic tradition and regulations at the designated cemetery of the Osaka Masjid."
        </p>
        <p className="text-[11px] font-medium text-gray-500">
          ここに、上記の故人がイスラムの伝統および規則に従い、大阪マスジド指定の墓地に埋葬されたことを正式に証明します。
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative mb-8">
        
        {/* Left Column: Deceased Person Info */}
        <div 
          className="space-y-4 p-5 rounded-2xl border shadow-sm bg-white/60 border-green-50"
        >
          <h3 
            className="text-[15px] font-bold pb-2 flex items-center gap-2 text-[#00401A] border-b border-green-100"
          >
            <span className="w-1.5 h-4 rounded-full bg-[#B98C20]"></span>
            Deceased Person Details / 故人情報
          </h3>
          
          <FieldRow labelEn="Full Name" labelJp="氏名" value={deceased.name} />
          <FieldRow labelEn="Gender" labelJp="性別" value={deceased.gender} />
          <FieldRow labelEn="Date of Birth" labelJp="生年月日" value={deceased.dateOfBirth} />
          <FieldRow labelEn="Date of Death" labelJp="死亡日" value={deceased.dateOfDeath} />
          <FieldRow labelEn="Place of Death" labelJp="死亡場所" value={deceased.placeOfDeath} />
          <FieldRow labelEn="Nationality" labelJp="国籍" value={deceased.nationality} />
          <FieldRow labelEn="Passport/ID No." labelJp="旅券・身分証番号" value={deceased.passportNo || deceased.idCard} />
        </div>

        {/* Right Column: Burial & Applicant Info */}
        <div 
          className="space-y-4 p-5 rounded-2xl border shadow-sm bg-white/60 border-green-50"
        >
          <h3 
            className="text-[15px] font-bold pb-2 flex items-center gap-2 text-[#00401A] border-b border-green-100"
          >
            <span className="w-1.5 h-4 rounded-full bg-[#B98C20]"></span>
            Burial & Applicant / 埋葬と申請者
          </h3>
          
          <FieldRow labelEn="Burial Date" labelJp="埋葬日" value={deceased.burialDate} />
          <FieldRow labelEn="Janazah Prayer Place" labelJp="葬儀・葬礼場所" value={deceased.janazahLocation} />
          <FieldRow labelEn="Janazah Date" labelJp="葬礼日" value={deceased.janazahDate} />
          <FieldRow labelEn="Grave Number" labelJp="墓番号" value={deceased.graveNumber} />
          <FieldRow labelEn="Applicant Name" labelJp="申請者氏名" value={applicant.name} />
          <FieldRow labelEn="Relationship" labelJp="故人との関係" value={applicant.relationship} />
          <FieldRow labelEn="Contact Number" labelJp="連絡先電話番号" value={applicant.contact} />
        </div>
      </div>

      {/* Dates Section */}
      <div 
        className="grid grid-cols-2 gap-4 py-4 my-6 rounded-xl px-4 z-10 relative border-t border-b border-green-100 bg-[#f0fdf4]/30"
      >
        <div className="text-center border-r border-[#dcfce7]">
          <p className="text-[10px] font-bold uppercase text-gray-400">Issue Date / 交付日</p>
          <p className="text-[18px] font-bold font-serif mt-1 text-[#00401A]">{details.issueDate || "—"}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase text-gray-400">Registry Status / 登録状況</p>
          <p className="text-[18px] font-bold font-serif mt-1 text-green-700">RECORDED (登録済み)</p>
        </div>
      </div>

      {/* Footer Signatures and Seals */}
      <div className="flex justify-between items-end mt-10 z-10 relative">
        {/* Left Side: QR Code and Official Stamp */}
        <div className="flex items-center gap-6">
          <div 
            className="w-24 h-24 rounded-full border-2 border-double flex flex-col items-center justify-center font-bold text-[9px] uppercase tracking-wider relative rotate-12 opacity-80 select-none text-red-500 border-red-500"
          >
            <div className="absolute inset-1.5 border rounded-full border-red-300"></div>
            <span>Osaka Masjid</span>
            <span className="text-[7px] my-0.5 border-t border-b py-0.5 px-1 border-red-400">Official Seal</span>
            <span>Burial Board</span>
          </div>
        </div>

        {/* Right Side: Authorized Signature */}
        <div className="w-64 text-center">
          <div className="border-b border-dotted h-10 relative flex items-end justify-center pb-1 border-gray-400">
            <span className="font-serif italic text-lg tracking-wider text-green-800">Osaka Masjid Registry Board</span>
          </div>
          <p className="text-[9px] mt-1 uppercase font-bold text-gray-400">Authorized Signature</p>
          <p className="text-[11px] font-bold text-[#00401A]">Director of Burial Registry</p>
        </div>
      </div>
    </div>
  );
}
