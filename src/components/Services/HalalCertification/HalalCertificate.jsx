import React from 'react';

const FieldRow = ({ labelEn, labelJp, value }) => (
  <div className="flex items-end mb-3">
    <div className="w-48 flex-shrink-0">
      <p className="text-[10px] leading-tight uppercase font-semibold" style={{ color: '#6b7280' }}>{labelJp}</p>
      <p className="text-[14px] font-bold leading-tight font-serif" style={{ color: '#00401A' }}>{labelEn}</p>
    </div>
    <div className="mx-2 font-bold" style={{ color: '#00401A' }}>:</div>
    <div className="border-b border-dashed flex-1 text-[15px] pb-0.5 text-left font-serif min-h-[20px] px-3 font-semibold" style={{ borderColor: '#86efac', color: '#B98C20' }}>
      {value || "—"}
    </div>
  </div>
);

const HalalCertificate = ({ data = {} }) => {
  const { details = {}, business = {}, entity = {}, product = {} } = data;

  return (
    <div 
      className="w-[1000px] max-w-full mx-auto p-8 font-sans relative text-left overflow-hidden"
      style={{
        backgroundColor: '#ffffff',
        border: '12px double #00401A',
        background: 'linear-gradient(to bottom right, #ffffff, #fafaf9)'
      }}
    >
      {/* Decorative Gold Inner Border */}
      <div className="absolute inset-2 pointer-events-none" style={{ border: '1px solid #B98C20' }}></div>

      {/* Arabesque Background Pattern Overlays (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="currentColor" style={{ color: '#00401A' }}>
          <path d="M50 0 C60 20, 80 20, 100 50 C80 80, 60 80, 50 100 C40 80, 20 80, 0 50 C20 20, 40 20, 50 0 Z" />
        </svg>
      </div>

      {/* Header section */}
      <div className="relative flex justify-between items-start pb-6 mb-8 z-10" style={{ borderBottom: '2px solid #B98C20' }}>
        <div>
          <div className="flex items-center gap-3">
            <div 
              className="w-14 h-14 relative rounded-full flex items-center justify-center text-white shadow-md border"
              style={{ backgroundColor: '#00401A', borderColor: '#B98C20' }}
            >
              {/* Halal Arabic Logo Icon */}
              <span className="text-xl font-bold font-serif">حلال</span>
            </div>
            <div>
              <h2 className="text-[20px] font-extrabold tracking-wide font-serif" style={{ color: '#00401A' }}>OSAKA MASJID</h2>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#6b7280' }}>Halal Certification Board</p>
            </div>
          </div>
        </div>

        <div className="text-center absolute w-full left-0 top-0 pointer-events-none mt-1">
          <p className="font-bold text-xs tracking-widest" style={{ color: '#B98C20' }}>ハラール証明書</p>
          <h1 className="text-[34px] font-extrabold tracking-wider font-serif" style={{ color: '#00401A', textShadow: '1px 1px 0px rgba(0,0,0,0.05)' }}>
            HALAL CERTIFICATE
          </h1>
          <p className="text-[14px] text-arabic font-bold mt-1" style={{ color: '#00401A' }}>شهادة الحلال</p>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-bold" style={{ color: '#9ca3af' }}>CERTIFICATE NO.</p>
          <p className="text-[16px] font-bold font-mono tracking-wider" style={{ color: '#B98C20' }}>{details.certificateNo || "—"}</p>
        </div>
      </div>

      {/* Solemn Certificate Text */}
      <div className="text-center max-w-2xl mx-auto mb-8 z-10 relative space-y-2">
        <p className="text-[14px] font-medium italic" style={{ color: '#374151' }}>
          "This is to certify that the business enterprise, certified entity and products listed below have been inspected, audited and verified to be compliant with Halal dietary regulations in accordance with Islamic Law."
        </p>
        <p className="text-[11px] font-medium" style={{ color: '#6b7280' }}>
          ここに、下記の事業者、対象品目、およびサービスがイスラム法に基づくハラール基準に適合していることを審査・監査の上、証明します。
        </p>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative mb-8">
        
        {/* Left Column: Business & Entity Info */}
        <div 
          className="space-y-4 p-5 rounded-2xl border shadow-sm"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: '#f0fdf4' }}
        >
          <h3 
            className="text-[15px] font-bold pb-2 flex items-center gap-2"
            style={{ color: '#00401A', borderBottom: '1px solid #dcfce7' }}
          >
            <span className="w-1.5 h-4 rounded-full" style={{ backgroundColor: '#B98C20' }}></span>
            Certified Enterprise & Representative
          </h3>
          
          <FieldRow labelEn="Company Name" labelJp="企業名" value={business.companyName} />
          <FieldRow labelEn="Business Address" labelJp="会社住所" value={business.companyAddress} />
          <FieldRow labelEn="Representative" labelJp="代表者名" value={business.representative} />
          <FieldRow labelEn="Certified Entity" labelJp="認証対象組織" value={entity.certificateName || business.companyName} />
          <FieldRow labelEn="Entity Address" labelJp="対象組織住所" value={entity.certificateAddress || business.companyAddress} />
        </div>

        {/* Right Column: Product & Scope Info */}
        <div 
          className="space-y-4 p-5 rounded-2xl border shadow-sm"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderColor: '#f0fdf4' }}
        >
          <h3 
            className="text-[15px] font-bold pb-2 flex items-center gap-2"
            style={{ color: '#00401A', borderBottom: '1px solid #dcfce7' }}
          >
            <span className="w-1.5 h-4 rounded-full" style={{ backgroundColor: '#B98C20' }}></span>
            Certification & Standard Details
          </h3>
          
          <FieldRow labelEn="Product / Service" labelJp="対象製品・サービス" value={product.productName} />
          <FieldRow labelEn="Category" labelJp="製品カテゴリー" value={product.category} />
          <FieldRow labelEn="Scope of Certification" labelJp="認証範囲" value={product.scope} />
          <FieldRow labelEn="Halal Standard" labelJp="適用ハラール基準" value={product.halalUse || "Osaka Masjid Halal Standard"} />
          <FieldRow labelEn="Status" labelJp="認証ステータス" value="Certified (ハラール認証済み)" />
        </div>
      </div>

      {/* Dates Section */}
      <div 
        className="grid grid-cols-2 gap-4 py-4 my-6 rounded-xl px-4 z-10 relative"
        style={{ borderTop: '1px solid #dcfce7', borderBottom: '1px solid #dcfce7', backgroundColor: 'rgba(240, 253, 244, 0.3)' }}
      >
        <div className="text-center border-r" style={{ borderColor: '#dcfce7' }}>
          <p className="text-[10px] font-bold uppercase" style={{ color: '#9ca3af' }}>Issue Date / 交付日</p>
          <p className="text-[18px] font-bold font-serif mt-1" style={{ color: '#00401A' }}>{details.issueDate || "—"}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase" style={{ color: '#9ca3af' }}>Expiry Date / 有効期限</p>
          <p className="text-[18px] font-bold font-serif mt-1" style={{ color: '#b91c1c' }}>{details.expiryDate || "—"}</p>
        </div>
      </div>

      {/* Footer Signatures and Seals */}
      <div className="flex justify-between items-end mt-10 z-10 relative">
        {/* Left Side: QR Code and Official Stamp */}
        <div className="flex items-center gap-6">
          {details.qrCodeLink && (
            <div className="border p-2 bg-white rounded-lg shadow-sm" style={{ borderColor: '#e5e7eb' }}>
              {/* We can construct a QR Code rendering or standard placeholder stamp */}
              <div className="w-20 h-20 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 relative">
                <span className="text-[8px] font-bold text-gray-400 text-center px-1">Masjid Verified QR</span>
              </div>
            </div>
          )}
          
          <div 
            className="w-24 h-24 rounded-full border-2 border-double flex flex-col items-center justify-center font-bold text-[9px] uppercase tracking-wider relative rotate-12 opacity-80 select-none"
            style={{ color: '#ef4444', borderColor: '#ef4444' }}
          >
            <div className="absolute inset-1.5 border rounded-full" style={{ borderColor: '#fca5a5' }}></div>
            <span>Osaka Masjid</span>
            <span className="text-[7px] my-0.5 border-t border-b py-0.5 px-1" style={{ borderColor: '#f87171' }}>Official Seal</span>
            <span>Halal Board</span>
          </div>
        </div>

        {/* Right Side: Authorized Signature */}
        <div className="w-64 text-center">
          <div className="border-b border-dotted h-10 relative flex items-end justify-center pb-1" style={{ borderColor: '#9ca3af' }}>
            {/* Elegant placeholder signature */}
            <span className="font-serif italic text-lg tracking-wider" style={{ color: '#166534' }}>Osaka Masjid Halal Board</span>
          </div>
          <p className="text-[9px] mt-1 uppercase font-bold" style={{ color: '#9ca3af' }}>Authorized Signature</p>
          <p className="text-[11px] font-bold" style={{ color: '#00401A' }}>Director of Halal Certification</p>
        </div>
      </div>
    </div>
  );
};

export default HalalCertificate;
