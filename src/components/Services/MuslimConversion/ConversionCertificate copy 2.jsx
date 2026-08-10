// import React from 'react';

// const FieldRow = ({ labelEn, labelJp, value }) => (
//   <div className="flex flex-col "

//     style={{ fontFamily: '"Merriweather", Times, serif' }}
//   >
//     <p className="text-[11px] text-[#BDBDBD] leading-tight mb-0.5">{labelJp}</p>
//     <p className="text-[13px]  text-[#000000] leading-tight">{labelEn}:
//       <span className="font-normal  ml-0.5">
//         {value || ""}</span></p>
//   </div>
// );

// const ConversionCertificate = ({ data = {} }) => {
//   const {
//     applicant = {},
//     details = {},
//     witnesses = [],
//     solemnizedBy = {}
//   } = data;

//   console.log("convertion data", data)

// //  pt-[65px] px-[75px] pb-[65px]
//   return (
//     <div className="w-[1123px] h-[794px] max-w-full mx-auto bg-[#ffffff]  font-sans relative

// px-[83px] pb-[83px] pt-[70px] 
//      text-left overflow-hidden flex flex-col ">
//       {/* SVG Border */}
//       <div className="absolute inset-0 pointer-events-none z-50">
//         <img
//           src="/images/offerServices/muslimConvertion/certificate_border.svg"
//           alt="Border"
//           className="w-full h-full"
//         />
//       </div>

//       {/* Watermark Background */}
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-0 opacity-40">
//         <img
//           src="/images/offerServices/marriageFacilities/bg2.png"
//           alt="Watermark"
//           className="w-[500px] h-[500px] object-contain opacity-20"
//         />
//       </div>

//       <div className="z-10 relative flex-1 flex flex-col">
//         {/* Header Row */}
//         <div className="flex justify-between items-start  w-full">
//           {/* Left Title */}
//           <div className="w-[35%]">
//             <h1 className="text-[25px] font-bold text-[#00401A] leading-tight"
//               style={{ fontFamily: '"Merriweather", Times, serif' }}
//             >
//               CERTIFICATE OF CONVERSION TO ISLAM
//             </h1>
//           </div>

//           {/* Center Arabic */}
//           <div className="w-[25%] text-center flex flex-col items-center justify-center ">
//             <h2 className="text-[26px] font-bold text-[#00401A] mb-1" style={{ fontFamily: '"Amiri", "Traditional Arabic", serif' }}>
//               بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
//             </h2>
//             <p className="text-[11px] text-[#00401A] font-bold tracking-widest">
//               慈悲深く慈愛深き神の御名において
//             </p>
//           </div>

//           {/* Right Mosque Info */}
//           <div className="w-[30%] text-right">
//             <h2 className="text-[24px] font-bold text-[#00401A] mb-1" style={{ fontFamily: '"Merriweather", Times, serif' }}>Osaka Masjid</h2>
//             <p className="text-[11px] text-[#00401A]">
//               4-12-16, Owada, Nishi Yodogawa <br />
//               ku,Osaka, Japan, Tel/Fax: <br />
//               06-4862-6396
//             </p>
//           </div>
//         </div>

//         {/* Sub Header */}
//         <div className="flex justify-between items-end  w-full  ">
//           <p className="text-[14px]  text-[#000000]"
//             style={{ fontFamily: '"Merriweather", Times, serif' }}
//           >
//             The Osaka Masjid hereby certifies that
//           </p>
//           <div className="text-right">
//             <p className="text-[10px] text-[#BDBDBD]  text-left">証明書番号:</p>
//             <p className="text-[14px]  text-[#000000] flex items-center">
//               Certificate No: <span className="ml-2 font-normal text-[15px]">{details?.certificateNo || ""}</span>
//             </p>
//           </div>
//         </div>

//         {/* Yellow Banner */}
//         <div className="relative w-full h-[65px] bg-gradient-to-r from-[#F0C041] via-[#FAD463] to-[#F0C041]
//          flex justify-between 
//         items-center px-5 mb-3 mt-2">
//           {/* Photo */}
//           <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border-[5px] border-white bg-white overflow-hidden shadow-sm z-20">
//             {applicant.photoUrl ? (
//               <img src={applicant.photoUrl} alt="Photo" className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full bg-[#e5e7eb]"></div>
//             )}
//           </div>

//           <div className="w-[40%]">
//             <p className="text-[13px] text-[#828282] font-bold ">名前</p>
//             <h3 className="text-[22px] font-bold text-[#333333]"
//               style={{ fontFamily: '"Merriweather", Times, serif' }}>
//               {applicant?.name || "Name"}
//             </h3>
//           </div>

//           <div className="w-[40%] text-right">
//             <p className="text-[13px] text-[#828282] font-bold ">イスラム教徒の名前</p>
//             <h3 className="text-[22px] font-bold text-[#333333]"
//               style={{ fontFamily: '"Merriweather", Times, serif' }}>
//               {applicant.muslimName || "Muslim Name"}
//             </h3>
//           </div>
//         </div>

//         {/* 3 Columns Section */}
//         <div className="flex w-full gap-8  flex-1">
//           {/* Left Column (40%) */}
//           <div className="w-[40%] flex flex-col justify-between ">
//             <div className='space-y-1 '>
//               <FieldRow labelEn="Nationality" labelJp="国籍" value={applicant?.nationality} />
//               <FieldRow labelEn="Gender" labelJp="性別" value={applicant?.gender || ""} />
//               <FieldRow labelEn="Address" labelJp="住所" value={applicant?.addressLine1} />
//             </div>

//             <div className="text-[11px] leading-relaxed text-[#333333] text-justify flex flex-col 
//              justify-between h-[240px]"
//               style={{ fontFamily: '"Merriweather", Times, serif' }}
//             >
//               <p>  The above named person has presented themselves expressing their desire to embrace the Islamic Faith. We have explained to them the five pillars of Islam and the six pillars of Iman. Accordingly, they have acknowledged their acceptance of the Islamic Faith by affirming:</p>

//               <p className="text-center font-bold" style={{ fontFamily: '"Amiri", "Traditional Arabic", serif', fontSize: '16px' }}>
//                 اشهد ان لا اله الا الله واشهد ان محمدا عبده ورسوله
//               </p>

//               <p>  I bear witness that there is no god but Allah alone and I bear witness that Muhammad (Peace be upon Him) is His Servant and Messenger.
//                 <br />
//                 I also acknowledge that I believe in Allah, His angels, His Holy books, His prophets, the Day of Judgment and His Decree for good or bad. I renounce all religions other than Islam I will hereby and henceforth adhere to Islam as my Faith and Shari'ah.</p>
//             </div>

//             <div className="mt-2 text-center border-t border-[#9ca3af]  w-[180px]"
            
//               style={{ fontFamily: '"Merriweather", Times, serif' }}
//             >
//               {/* <p className="text-[10px] text-[#808080]">組織サイン</p> */}
//               <div className='h-[20px] '>
//                 <img src="/images/osaka_sign.png" alt="sign" className="h-[20px] mx-auto  object-contain" />

//               </div>
//               <p className="text-[13px]  text-[#000000] "
              
//               >Organization Sign</p>
//             </div>
//           </div>

//           {/* Center Column (20%) */}
//           <div className="w-[20%] flex flex-col items-center justify-start pt-3  text-center  
//            divide-y divide-[#3E8B18]">
//             <div
//               className=' py-3'
//               style={{ fontFamily: '"Merriweather", Times, serif' }}
//             >
//               <p className="text-[10px] text-[#808080]">宣言者</p>
//               <p className="text-[14px] text-[#333333] mb-0.5">Declared by:</p>
//               <p className="text-[16px] font-bold text-[#000000]"
//                 style={{ fontFamily: '"Merriweather", Times, serif' }}

//               >
//                 {solemnizedBy?.name || "Amin"}
//               </p>
//               {/* <div className="w-[100px] h-[1px] bg-[#d1d5db] mx-auto mt-1"></div> */}
//             </div>

//             <div
//               className=' py-3'
//               style={{ fontFamily: '"Merriweather", Times, serif' }}
//             >
//               <p className="text-[10px] text-[#808080]">発行日</p>
//               <p className="text-[14px]  text-[#333333] mb-0.5">Issued On</p>
//               <p className="text-[16px] font-bold text-[#000000]"
//                 style={{ fontFamily: '"Merriweather", Times, serif' }}
//               >{details.declaredDate || ""}</p>
//               {/* <div className="w-[100px] h-[1px] bg-[#d1d5db] mx-auto mt-1"></div> */}
//             </div>

//             <div
//               className=' py-3'
//               style={{ fontFamily: '"Merriweather", Times, serif' }}
//             >
//               <p className="text-[10px] text-[#808080]">目撃者</p>
//               <p className="text-[14px]  text-[#333] mb-0.5">Witnessed By</p>
//               <p className="text-[16px] font-bold text-[#000000]" style={{ fontFamily: '"Merriweather", Times, serif' }}
//               >{witnesses[0]?.name || ""}
//               </p>
//               {/* <div className="w-[100px] h-[1px] bg-[#d1d5db] mx-auto mt-1"></div> */}
//             </div>

//             <div
//               className=' py-3'
//               style={{ fontFamily: '"Merriweather", Times, serif' }}
//             >
//               <p className="text-[10px] text-[#808080]">目撃者</p>
//               <p className="text-[14px]  text-[#333333] mb-0.5">Witnessed By</p>
//               <p className="text-[16px] font-bold text-[#000000]" style={{ fontFamily: '"Merriweather", Times, serif' }}>
//                 {witnesses[1]?.name || "amin"}
//               </p>
//               {/* <div className="w-[100px] h-[1px] bg-[#d1d5db] mx-auto mt-1"></div> */}
//             </div>
//           </div>

//           {/* Right Column (40%) */}
//           <div className="w-[40%] flex flex-col justify-between">
//             <div className='space-y-1 '>
//               <FieldRow labelEn="Date of Birth" labelJp="生年月日" value={applicant.dob} />
//               <FieldRow labelEn="Passport No" labelJp="パスポート番号" value={applicant.passportNo} />
//               <FieldRow labelEn="Phone" labelJp="電話" value={applicant.mobile} />
//             </div>

//             <div className="text-[11px] leading-relaxed text-[#333333] mt-2 flex flex-col  justify-between 
//             h-[240px]  text-justify"
//               style={{ fontFamily: '"Merriweather", Times, serif' }}
//             >
//               <p> 申請者が自らの自由意志によりイスラム教を信仰したことを確認しました。この証明書は、申請者がイスラム教を信仰し、その法に従って行動することを決意したことを証明するために発行されます。全能なるアッラーが、申請者を常に正しい道へと導き給いますように。誠にアッラーは最良の導き手です。</p>

//               <p> 申請者が自らの自由意志によりイスラム教を信仰したことを確認しました。この証明書は、申請者がイスラム教を信仰し、その法に従って行動することを決意したことを証明するために発行されます。全能なるアッラーが、申請者を常に正しい道へと導き給いますように。誠にアッラーは最良の導き手です。</p>
//             </div>

//             <div className="mt-2 text-center border-t border-[#9ca3af] pt-1 w-[180px] ml-auto">
//               {/* <p className="text-[10px] text-[#808080]">イマームのサイン</p> */}
//               <div className='h-[20px] '>
//                 {solemnizedBy?.signUrl && (
//                   <img src={solemnizedBy.signUrl} alt="sign" className="h-[20px] mx-auto  object-contain" />
//                 )}
//               </div>
//               <p className="text-[13px] text-[#000000] ">Imam Sign</p>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversionCertificate;
