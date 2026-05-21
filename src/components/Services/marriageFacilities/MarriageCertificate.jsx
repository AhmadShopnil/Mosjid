import React from 'react';

const FieldRow = ({ labelEn, labelJp, value }) => (
  <div className="flex items-end mb-1.5">
    <div className="w-28 flex-shrink-0">
      <p className="text-[9px] text-[#828282] leading-tight">{labelJp}</p>
      <p className="text-[13px] font-bold text-[#085F2C] leading-tight">{labelEn}</p>
    </div>
    <div className="mx-1.5 text-[#085F2C] font-bold">:</div>
    <div className="border-b border-dotted border-[#9ca3af] flex-1 text-[14px] pb-0 text-center font-serif text-[#B58B2E] min-h-[16px] px-2 whitespace-nowrap overflow-hidden">
      {value || ""}
    </div>
  </div>
);

const EmptyRow = ({ value }) => (
  <div className="flex items-end mb-1.5">
    <div className="w-28 flex-shrink-0"></div>
    <div className="mx-1.5 opacity-0">:</div>
    <div className="border-b border-dotted border-[#9ca3af] flex-1 text-[14px] pb-0 text-center font-serif text-[#B58B2E] min-h-[16px] px-2 whitespace-nowrap overflow-hidden">
      {value || ""}
    </div>
  </div>
);

const MarriageCertificate = ({ data = {} }) => {
  const { groom = {}, bride = {}, details = {}, witnesses = [], solemnizedBy = {} } = data;


  // console.log("data", data)

  return (
    <div className="w-[1200px] max-w-full mx-auto bg-white border-[1.5px] border-[#3E8B18] pt-1.5 px-6 pb-8 font-sans relative text-left
     overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative">
        <div className=" z-10 relative">
          <p className="text-[#9ca3af] text-xs mb-1">証明書番号</p>
          <h2 className="text-[17px] font-bold flex items-end text-[#000000]">
            Certificate No:
            <span className=" w-32 ml-2 inline-block  text-[#B58B2E]  text-[17px]">
              {details.certificateNo || ""}
            </span>
          </h2>
        </div>

        <div className="text-center absolute w-full left-0 top-0 mt-4   pointer-events-none">
          <p className="text-[#00401A] font-bold mb-0.5 tracking-widest text-sm ml-8">結婚証明書</p>
          <h1 className="text-[36px] font-bold text-[#00401A] " style={{ fontFamily: '"Times New Roman", Times, serif', textShadow: '0.5px 0.5px 0px rgba(0,0,0,0.1)' }}>
            MARRIAGE CERTIFICATE
          </h1>
        </div>
      </div>
      <div className=''>
        <div className='grid grid-cols-2 gap-10 mb-4 mt-16'>
          {/* groom photo */}
          <div className="flex items-center gap-4 ">
            <div className="w-[60px] h-[60px] border-[1.5px] border-[#8CC63F] rounded-[4px] flex items-center justify-center overflow-hidden bg-[#ffffff]">
              {groom?.photoUrl ? <img src={groom?.photoUrl} alt="Groom" className="w-full h-full object-cover" /> : null}
            </div>
            <div>
              <h3 className="text-[#085F2C] font-bold text-[17px] leading-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Particulars of<br />Groom</h3>
            </div>
          </div>
          {/* bride photo */}
          <div className="flex items-center gap-4 ">
            <div className="w-[60px] h-[60px] border-[1.5px] border-[#8CC63F] rounded-[4px] flex items-center justify-center overflow-hidden bg-[#ffffff]">
              {bride?.photoUrl ? <img src={bride?.photoUrl} alt="Bride" className="w-full h-full object-cover" /> : null}
            </div>
            <div>
              <h3 className="text-[#085F2C] font-bold text-[17px] leading-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Particulars of<br />Bride</h3>
            </div>
          </div>
        </div>

        {/* yellow part */}
        <div className="grid grid-cols-2 gap-10 bg-gradient-to-r from-[#F0C041] via-[#FAD463] to-[#F0C041] p-3   ">
          <div>
            <p className="text-[9px] text-[#828282] opacity-80 mb-0.5 font-bold">イスラム教徒の名前</p>
            <h4 className="text-[22px] text-[#333] tracking-wide" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{groom.muslimName || "Muslim Name"}</h4>
          </div>

          <div>
            <p className="text-[9px] text-[#828282] opacity-80 mb-0.5 font-bold">イスラム教徒の名前</p>
            <h4 className="text-[22px] text-[#333] tracking-wide" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{bride.muslimName || "Muslim Name"}</h4>
          </div>
        </div>
      </div>

      {/* Particulars Section */}
      <div className="grid grid-cols-2 gap-10 mt-4">
        {/* Groom */}
        <div>
          {/* <div className="flex items-center gap-4 mb-3">
            <div className="w-[60px] h-[60px] border-[1.5px] border-[#8CC63F] rounded-[4px] flex items-center justify-center overflow-hidden bg-[#ffffff]">
              {groom?.photoUrl ? <img src={groom?.photoUrl} alt="Groom" className="w-full h-full object-cover" /> : null}
            </div>
            <div>
              <h3 className="text-[#085F2C] font-bold text-[17px] leading-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Particulars of<br />Groom</h3>
            </div>
          </div> */}
          {/* <div className="bg-gradient-to-r from-[#F0C041] to-[#FAD463] p-2 mb-3 rounded-sm">
            <p className="text-[9px] text-[#085F2C] opacity-80 mb-0.5 font-bold">イスラム教徒の名前</p>
            <h4 className="text-[22px] text-[#333] tracking-wide" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{groom.muslimName || "Muslim Name"}</h4>
          </div> */}
          <div className="pr-2">
            <FieldRow labelEn="Name" labelJp="名前" value={groom.name} />
            <FieldRow labelEn="Father Name" labelJp="父親の名前" value={groom.fatherName} />
            <FieldRow labelEn="Age" labelJp="年齢" value={groom.age} />
            <FieldRow labelEn="Religion" labelJp="宗教" value={groom.religion} />
            <FieldRow labelEn="Nationality" labelJp="国籍" value={groom.nationality} />
            <FieldRow labelEn="Passport No." labelJp="パスポートナンバー" value={groom.passportNo} />
            <FieldRow labelEn="Address" labelJp="住所" value={groom.addressLine1} />
            <EmptyRow value={groom.addressLine2} />
          </div>
          <div className="bg-[#EEF8E9] p-2 mt-1.5 rounded-sm border border-[#E0F2E3]">
            <p className="text-[9px] text-[#6b7280] mb-0.5">サイン</p>
            <div className="flex items-end h-[20px]">
              <span className="font-bold text-[#085F2C] text-[13px] w-12 pb-1">Sign :</span>
              <div className="border-b border-dotted border-[#9ca3af] flex-1 ml-2 relative h-full flex items-end justify-center">
                {groom?.signUrl && <img src={groom?.signUrl} alt="sign" className="absolute bottom-1 max-h-[30px] max-w-[150px]
                 object-contain mix-blend-multiply"  />}
              </div>
            </div>
          </div>
        </div>

        {/* Bride */}
        <div>
          {/* <div className="flex items-center gap-4 mb-3">
            <div className="w-[60px] h-[60px] border-[1.5px] border-[#8CC63F] rounded-[4px] flex items-center justify-center overflow-hidden bg-[#ffffff]">
              {bride?.photoUrl ? <img src={bride?.photoUrl} alt="Bride" className="w-full h-full object-cover" /> : null}
            </div>
            <div>
              <h3 className="text-[#085F2C] font-bold text-[17px] leading-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>Particulars of<br />Bride</h3>
            </div>
          </div> */}
          {/* <div className="bg-gradient-to-r from-[#F0C041] to-[#FAD463] p-2 mb-3 rounded-sm">
            <p className="text-[9px] text-[#085F2C] opacity-80 mb-0.5 font-bold">イスラム教徒の名前</p>
            <h4 className="text-[22px] text-[#333] tracking-wide" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{bride.muslimName || "Muslim Name"}</h4>
          </div> */}
          <div className="pr-2">
            <FieldRow labelEn="Name" labelJp="名前" value={bride.name} />
            <FieldRow labelEn="Father Name" labelJp="父親の名前" value={bride.fatherName} />
            <FieldRow labelEn="Age" labelJp="年齢" value={bride.age} />
            {/* <FieldRow labelEn="Marital Status" labelJp="未婚/既婚" value={bride.maritalStatus} /> */}
            <FieldRow labelEn="Religion" labelJp="宗教" value={bride.religion} />
            <FieldRow labelEn="Nationality" labelJp="国籍" value={bride.nationality} />
            <FieldRow labelEn="Passport No." labelJp="パスポートナンバー" value={bride.passportNo} />
            <FieldRow labelEn="Address" labelJp="住所" value={bride.addressLine1} />
            <EmptyRow value={bride.addressLine2} />
          </div>
          <div className="bg-[#EEF8E9] p-2 mt-1.5 rounded-sm border border-[#E0F2E3]">
            <p className="text-[9px] text-[#6b7280] mb-0.5">サイン</p>
            <div className="flex items-end h-[20px]">
              <span className="font-bold text-[#085F2C] text-[13px] w-12 pb-1">Sign :</span>
              <div className="border-b border-dotted border-[#9ca3af] flex-1 ml-2 relative h-full flex items-end justify-center">
                {bride?.signUrl && <img src={bride.signUrl} alt="sign" className="absolute bottom-1 max-h-[30px] max-w-[150px] 
                object-contain mix-blend-multiply"  />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marriage Details Section */}
      <div className="grid grid-cols-3 gap-0 border-y-[1px] border-[#A5D071] py-3 mt-4">
        <div className="text-center border-r-[1px] border-[#A5D071]">
          <p className="text-[10px] text-[#9ca3af] mb-0.5">結婚の日</p>
          <p className="font-semibold text-[#085F2C] text-[13px]">Date Of Marriage</p>
          <p className="text-[22px] font-bold text-[#B58B2E]" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{details.date || "30 January 2006"}</p>
        </div>
        <div className="text-center border-r-[1px] border-[#A5D071]">
          <p className="text-[10px] text-[#9ca3af] mb-0.5">結婚の場</p>
          <p className="font-semibold text-[#085F2C] text-[13px] ">Place of Marriage</p>
          <p className="text-[22px] font-bold text-[#B58B2E]" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{details.place || "Osaka Masjid"}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-[#9ca3af] mb-0.5">結納金の量と内容</p>
          <p className="font-semibold text-[#085F2C] text-[13px] ">Amount of Dower (Mahar)</p>
          <p className="text-[22px] font-bold text-[#B58B2E]" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{details.mahar || "10,0000"}</p>
        </div>
      </div>

      {/* Witnesses */}
      <div className="grid grid-cols-2 gap-10 mt-4">
        {[0, 1].map((idx) => {
          const w = witnesses[idx] || {};
          return (
            <div key={idx} className="pr-2">
              <div className="flex items-end mb-1.5">
                <div className="w-32 flex-shrink-0">
                  <p className="text-[9px] text-[#808080] leading-tight">証人{idx + 1}の氏名</p>
                  <p className="font-bold text-[#085F2C] text-[13px] leading-tight">{idx + 1}. Witness Name</p>
                </div>
                <div className="mx-1.5 text-[#085F2C] font-bold">:</div>
                <div className="border-b border-dotted border-[#9ca3af] flex-1 text-center font-serif text-[#B58B2E] text-[14px] pb-0 min-h-[16px] px-2 whitespace-nowrap overflow-hidden">
                  {w.name || ""}
                </div>
              </div>
              <div className="flex items-end mb-1.5">
                <div className="w-32 flex-shrink-0">
                  <p className="text-[9px] text-[#808080] leading-tight">住所</p>
                  <p className="font-bold text-[#085F2C] text-[13px] leading-tight">Address</p>
                </div>
                <div className="mx-1.5 text-[#085F2C] font-bold">:</div>
                <div className="border-b border-dotted border-[#9ca3af] flex-1 text-center font-serif text-[#B58B2E] text-[14px] pb-0 min-h-[16px] px-2 whitespace-nowrap overflow-hidden">
                  {w.address || ""}
                </div>
              </div>
              <div className="bg-[#EEF8E9] p-2 rounded-sm border border-[#E0F2E3] mt-1.5">
                <p className="text-[9px] text-[#6b7280] mb-0.5">サイン</p>
                <div className="flex items-end h-[20px]">
                  <span className="font-bold text-[#085F2C] text-[13px] w-12 pb-1">Sign :</span>
                  <div className="border-b border-dotted border-[#9ca3af] flex-1 ml-2 relative h-full flex items-end justify-center">
                    {w?.signUrl && <img src={w.signUrl} alt="sign" className="absolute bottom-1 max-h-[30px] max-w-[150px] 
                    object-contain mix-blend-multiply" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certification Text */}
      <div className="mt-4">
        <p className="text-[9px] text-[#9ca3af] mb-0.5">信仰告白、売春花嫁がイスラム法に従って結婚金の受け入れ（イジャブとクブル）</p>
        <p className="font-bold text-[#222] text-[13px] tracking-wide">I certify that Bride & Groom have exchange the offering and acceptance (Ijab and Qubul)</p>
        <p className="text-[9px] text-[#9ca3af] mt-1.5 mb-0.5">の承認を証明する。従って、夫婦になることを宣言する。</p>
        <p className="font-bold text-[#222] text-[13px] tracking-wide">according to Islamic Law and are declared Husband and Wife</p>
      </div>

      {/* Solemnized By */}
      <div className="mt-3 w-[50%]">
        <div className="flex items-end mb-1.5">
          <div className="w-52 flex-shrink-0">
            <p className="text-[9px] text-[#808080] leading-tight">名前で厳粛に結婚</p>
            <p className="font-bold text-[#222] text-[13px] leading-tight">Marriage Solemnized By Name</p>
          </div>
          <div className="mx-1.5 text-[#222] font-bold">:</div>
          <div className="border-b border-dotted border-[#9ca3af] flex-1 text-center font-serif text-[#B58B2E] text-[14px] pb-0 min-h-[16px] px-2 whitespace-nowrap overflow-hidden">
            {solemnizedBy.name || ""}
          </div>
        </div>
        <div className="flex items-end mb-1.5">
          <div className="w-52 flex-shrink-0">
            <p className="text-[9px] text-[#808080] leading-tight">住所</p>
            <p className="font-bold text-[#222] text-[13px] leading-tight">Address</p>
          </div>
          <div className="mx-1.5 text-[#222] font-bold">:</div>
          <div className="border-b border-dotted border-[#9ca3af] flex-1 text-center font-serif text-[#B58B2E] text-[14px] pb-0 min-h-[16px] px-2 whitespace-nowrap overflow-hidden">
            {solemnizedBy.address || ""}
          </div>
        </div>
      </div>

      <div className="bg-[#EEF8E9] p-2 rounded-sm border border-[#E0F2E3] mt-2">
        <p className="text-[9px] text-[#6b7280] mb-0.5">サイン</p>
        <div className="flex items-end h-[20px]">
          <span className="font-bold text-[#085F2C] text-[13px] w-12 pb-1">Sign :</span>
          <div className="border-b border-dotted border-[#9ca3af] flex-1 ml-2 relative h-full flex items-end justify-center">
            {solemnizedBy?.signUrl && <img src={solemnizedBy.signUrl} alt="sign" className="absolute bottom-1 max-h-[30px] max-w-[150px]
             object-contain mix-blend-multiply"  />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarriageCertificate;
