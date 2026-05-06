// import React from 'react';

// const FieldRow = ({ labelEn, labelJp, value }) => (
//   <div className="flex items-end mb-2">
//     <div className="w-36 flex-shrink-0">
//       <p className="text-[10px] text-[#828282] leading-tight">{labelJp}</p>
//       <p className="text-[14px] font-bold text-[#085F2C] leading-tight">{labelEn}</p>
//     </div>
//     <div className="mx-2 text-[#085F2C] font-bold">:</div>
//     <div className="border-b border-dotted border-[#9ca3af] flex-1 text-[15px] pb-0.5 text-center font-serif text-[#B58B2E] min-h-[20px] px-2 whitespace-nowrap overflow-hidden">
//       {value || ""}
//     </div>
//   </div>
// );

// const EmptyRow = ({ value }) => (
//   <div className="flex items-end mb-2">
//     <div className="w-36 flex-shrink-0"></div>
//     <div className="mx-2 opacity-0">:</div>
//     <div className="border-b border-dotted border-[#9ca3af] flex-1 text-[15px] pb-0.5 text-center font-serif text-[#B58B2E] min-h-[20px] px-2 whitespace-nowrap overflow-hidden">
//       {value || ""}
//     </div>
//   </div>
// );

// const ConversionCertificate = ({ data = {} }) => {
//   // Use dummy data if properties are missing
//   const {
//     applicant = {
//       photoUrl: "https://via.placeholder.com/150",
//       name: "John Doe",
//       muslimName: "Abdullah",
//       dob: "01 January 1990",
//       nationality: "Japanese",
//       addressLine1: "1-2-3 Osaka, Japan",
//       addressLine2: "",
//       passportNo: "AB1234567",
//       previousReligion: "Christianity",
//       mobile: "+81 90-1234-5678",
//     },
//     details = {
//       certificateNo: "CC-2026-001",
//       declaredDate: "06 May 2026",
//       place: "Osaka Masjid",
//     },
//     witnesses = [
//       { name: "Ahmed Ali", address: "Osaka, Japan", signUrl: "" },
//       { name: "Omar Farooq", address: "Kobe, Japan", signUrl: "" },
//       { name: "Sayeed Anwar", address: "Kyoto, Japan", signUrl: "" },
//     ],
//     solemnizedBy = {
//       name: "Imam Youssef",
//       address: "Osaka Masjid",
//       signUrl: "",
//     }
//   } = data;

//   return (
//     <div className="w-[1000px] max-w-full mx-auto bg-[#ffffff] border-[1.5px] border-[#3E8B18] pt-4 px-8 pb-10 font-sans relative text-left overflow-hidden">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-8 relative">
//         <div className="z-10 relative">
//           <p className="text-[#9ca3af] text-xs mb-1">証明書番号</p>
//           <h2 className="text-[17px] font-bold flex items-end text-[#000000]">
//             Certificate No:
//             <span className="w-32 ml-2 inline-block text-[#B58B2E] font-serif text-[17px] border-b border-dotted border-[#9ca3af] text-center pb-0.5">
//               {applicant?.unique_id || ""}
//             </span>
//           </h2>
//         </div>

//         <div className="text-center absolute w-full left-0 top-0 mt-4 pointer-events-none">
//           <p className="text-[#00401A] font-bold mb-0.5 tracking-widest text-sm ml-8">イスラム改宗証明書</p>
//           <h1 className="text-[32px] font-bold text-[#00401A] tracking-wide" style={{ fontFamily: '"Times New Roman", Times, serif', textShadow: '0.5px 0.5px 0px rgba(0,0,0,0.1)' }}>
//             CERTIFICATE OF CONVERSION TO ISLAM
//           </h1>
//         </div>
//       </div>

//       <div className="mt-16 mb-4 flex gap-6">
//         <div className="w-[80px] h-[80px] border-[1.5px] border-[#8CC63F] rounded-[4px] flex flex-shrink-0 items-center justify-center overflow-hidden bg-[#ffffff]">
//           {/* {applicant?.photoUrl ? <img src={applicant?.photoUrl} alt="Applicant" className="w-full h-full object-cover" /> : null} */}
//         </div>
//         <div className="flex-1 bg-gradient-to-r from-[#F0C041] via-[#FAD463] to-[#F0C041] p-3 rounded-sm flex items-center justify-center flex-col shadow-sm">
//           <p className="text-[10px] text-[#828282] opacity-90 mb-0.5 font-bold tracking-wide">イスラム教徒の名前</p>
//           <h4 className="text-[26px] text-[#333] font-bold tracking-wider" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
//             {applicant.muslimName || "Muslim Name"}
//           </h4>
//         </div>
//       </div>

//       {/* Particulars Section */}
//       <div className="bg-[#F0FDF4] border border-[#E0F2E3] p-6 rounded-md mb-6">
//         <h3 className="text-[#085F2C] font-bold text-[18px] mb-4 border-b border-[#A5D071] pb-2 uppercase tracking-wide">Applicant Particulars</h3>

//         <div className="grid grid-cols-2 gap-x-12 gap-y-1">
//           <div className="pr-2">
//             <FieldRow labelEn="Previous Name" labelJp="以前の名前" value={applicant.name} />
//             <FieldRow labelEn="Date of Birth" labelJp="生年月日" value={applicant.dob} />
//             <FieldRow labelEn="Nationality" labelJp="国籍" value={applicant.nationality} />
//             <FieldRow labelEn="Passport No." labelJp="パスポート番号" value={applicant.passportNo} />
//             <FieldRow labelEn="Mobile No" labelJp="携帯電話番号" value={applicant.mobile} />
//           </div>
//           <div className="pl-2">
//             <FieldRow labelEn="Previous Religion" labelJp="以前の宗教" value={applicant.previousReligion} />
//             <FieldRow labelEn="Address" labelJp="住所" value={applicant.addressLine1} />
//             <EmptyRow value={applicant.addressLine2} />
//           </div>
//         </div>
//       </div>

//       {/* Conversion Details Section */}
//       <div className="grid grid-cols-2 gap-0 border-y-[1px] border-[#A5D071] py-4 mt-6">
//         <div className="text-center border-r-[1px] border-[#A5D071]">
//           <p className="text-[11px] text-[#9ca3af] mb-1">申告日</p>
//           <p className="font-bold text-[#085F2C] text-[14px] mb-2">Declared Date</p>
//           <p className="text-[22px] font-bold text-[#B58B2E]" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{details.declaredDate}</p>
//         </div>
//         <div className="text-center">
//           <p className="text-[11px] text-[#9ca3af] mb-1">場所</p>
//           <p className="font-bold text-[#085F2C] text-[14px] mb-2">Place</p>
//           <p className="text-[22px] font-bold text-[#B58B2E]" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{details.place}</p>
//         </div>
//       </div>

//       {/* Certification Text */}
//       <div className="mt-8 mb-6 text-center">
//         <p className="text-[12px] text-[#828282] mb-1">
//           上記の者は、イスラム教を自らの自由意志で受け入れ、アッラー（神）が唯一であり、ムハンマドがその使徒であることを宣言しました。
//         </p>
//         <p className="font-bold text-[#222] text-[15px] tracking-wide leading-relaxed">
//           I certify that the above-mentioned person has embraced Islam of their own free will and <br /> declared that there is no god but Allah, and Muhammad is His Messenger.
//         </p>
//       </div>

//       {/* Witnesses */}
//       <div className="mt-6">
//         <h3 className="text-[#085F2C] font-bold text-[16px] mb-3 border-b border-dotted border-[#A5D071] inline-block pb-1">Witnesses</h3>
//         <div className="grid grid-cols-3 gap-6">
//           {[0, 1, 2].map((idx) => {
//             const w = witnesses[idx] || {};
//             return (
//               <div key={idx} className="bg-[#f9fafb] p-4 rounded-sm border border-[#f3f4f6]">
//                 <div className="flex items-end mb-2">
//                   <div className="w-full">
//                     <p className="text-[10px] text-[#808080] leading-tight">証人 {idx + 1}</p>
//                     <p className="font-bold text-[#085F2C] text-[13px] leading-tight">Witness {idx + 1}</p>
//                   </div>
//                 </div>
//                 <div className="border-b border-dotted border-[#9ca3af] w-full text-left font-serif text-[#B58B2E] text-[15px] pb-1 min-h-[22px] whitespace-nowrap overflow-hidden">
//                   {w.name || `Witness ${idx + 1} Name`}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Solemnized By */}
//       <div className="mt-10 flex justify-end">
//         <div className="w-[45%]">
//           <div className="flex items-end mb-2">
//             <div className="w-40 flex-shrink-0">
//               <p className="text-[10px] text-[#808080] leading-tight">イマーム（指導者）</p>
//               <p className="font-bold text-[#222] text-[14px] leading-tight">Solemnized By</p>
//             </div>
//             <div className="mx-2 text-[#222] font-bold">:</div>
//             <div className="border-b border-dotted border-[#9ca3af] flex-1 text-center font-serif text-[#B58B2E] text-[15px] pb-0.5 min-h-[20px] px-2 whitespace-nowrap overflow-hidden">
//               {solemnizedBy.name || ""}
//             </div>
//           </div>

//           <div className="bg-[#F0FDF4] p-3 rounded-sm border border-[#E0F2E3] mt-4">
//             <p className="text-[10px] text-[#6b7280] mb-1">サイン</p>
//             <div className="flex items-end h-[40px]">
//               <span className="font-bold text-[#085F2C] text-[14px] w-14 pb-1">Sign :</span>
//               <div className="border-b border-dotted border-[#9ca3af] flex-1 ml-2 relative h-full flex items-end justify-center">
//                 {solemnizedBy?.signUrl && <img src={solemnizedBy.signUrl} alt="sign" className="absolute bottom-1 max-h-[40px] max-w-[150px] object-contain mix-blend-multiply" />}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversionCertificate;
