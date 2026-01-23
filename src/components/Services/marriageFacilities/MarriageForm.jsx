import Image from 'next/image';
import React from 'react';

const MarriageForm = () => {

  const InputField = ({ labelJp, labelEn, placeholder = "Type Now", type = "text" }) => (
    <div className="flex flex-col mb-3">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="w-full md:w-1/3 mb-1 md:mb-0">
          <p className="text-[14px] text-[#333333]">{labelJp}</p>
          <p className="font-bold text-[18px] text-[#333333]">{labelEn} <span>:</span></p>
        </div>
        <input 
          type={type} 
          placeholder={placeholder}
          className="w-full md:w-2/3 border border-gray-300 rounded-md p-2.5 h-[46px] text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
        />
      </div>
    </div>
  );

  const WitnessSection = ({ side }) => (
    <div className="space-y-3">
      <InputField labelJp="証人１の氏名" labelEn="Witness Name" />
      <InputField labelJp="目撃者との連絡" labelEn="Witness Contact" />
      <InputField labelJp="住所" labelEn="Address" />
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="w-full md:w-1/3">
          <p className="text-[14px] text-[#333333]">サイン</p>
          <p className="font-bold text-[18px] text-[#333333]">Sign <span>:</span></p>
        </div>
        <div className="w-full md:w-2/3 border border-gray-300 rounded-md p-3 bg-gray-50 text-center text-xs text-gray-400 italic">
          Attached Signature
        </div>
      </div>
    </div>
  );

  return (
    <div className=" bg-white border-green-600 rounded-xl  my-10">
      
      {/* Header / Top Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Groom Column */}
        <section>
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-4xl font-bold text-[#00401A] ">
              Particulars of<br />Groom
            </h2>
            <div>
                <Image src="/images/offerServices/marriageFacilities/maleIcon.svg" alt="Groom" width={100} height={100} />
            </div>
          </div>
          <InputField labelJp="ムスリムの名前" labelEn="Muslim Name" />
          <InputField labelJp="名前" labelEn="Name" />
          <InputField labelJp="父親の名前" labelEn="Father Name" />
          <InputField labelJp="年齢" labelEn="Age" />
          <InputField labelJp="国籍" labelEn="Nationality" />
          <InputField labelJp="宗教" labelEn="Religion" />
          <InputField labelJp="パスポートナンバー" labelEn="Passport No." />
          <InputField labelJp="住所" labelEn="Address" />
        </section>

        {/* Bride Column */}
        <section>
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-4xl font-bold text-[#00401A]">
              Particulars of<br />Bride
            </h2>
            <div>
                <Image src="/images/offerServices/marriageFacilities/femaleIcon.svg" alt="bride" width={100} height={100} />
            </div>
          </div>
          <InputField labelJp="ムスリムの名前" labelEn="Muslim Name" />
          <InputField labelJp="名前" labelEn="Muslim Name" /> {/* Matches screenshot duplicate label */}
          <InputField labelJp="父親の名前" labelEn="Father Name" />
          <InputField labelJp="年齢" labelEn="Age" />
          <InputField labelJp="国籍" labelEn="Nationality" />
          <InputField labelJp="宗教" labelEn="Religion" />
          <InputField labelJp="パスポートナンバー" labelEn="Passport No." />
          <InputField labelJp="住所" labelEn="Address" />
        </section>
      </div>

      <hr className="my-8 border-gray-200" />

      {/* Middle Marriage Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-8">
        <div>
          <p className="text-[14px] text-[#333333]">結婚の日</p>
          <p className="font-bold text-[18px] text-[#333333] mb-1">Date of Marriage</p>
          <select className="w-full border border-gray-300 rounded-md p-2.5 h-[46px] text-sm appearance-none bg-white">
            <option>Select</option>
          </select>
        </div>
        <div>
          <p className="text-[14px] text-[#333333]">母親の名前</p>
          <p className="font-bold text-[18px] text-[#333333] mb-1">Place of Marriage</p>
          <select className="w-full border border-gray-300 rounded-md p-2.5 h-[46px] text-sm appearance-none bg-white">
            <option>Select</option>
          </select>
        </div>
        <div>
          <p className="text-[14px] text-[#333333]">結納金の量と内容</p>
          <p className="font-bold text-[18px] text-[#333333] mb-1">Amount of Dower (Mahar) With Detail</p>
          <input className="w-full border border-gray-300 rounded-md p-2.5 h-[46px] text-sm" placeholder="Type Now" />
        </div>
      </div>

      {/* Signatures & Witnesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
           <div className="flex flex-col md:flex-row md:items-center">
              <div className="w-1/3"><p className="text-[14px] text-[#333333]">新部のサイン</p><p className="font-bold text-[18px] text-[#333333]">Sign of Groom :</p></div>
              <div className="w-2/3 border border-gray-300 rounded-md p-2.5 h-[46px] bg-gray-50 text-center text-xs text-gray-400">Attached Signature</div>
           </div>
           <WitnessSection />
        </div>
        <div className="space-y-4">
           <div className="flex flex-col md:flex-row md:items-center">
              <div className="w-1/3"><p className="text-[14px] text-[#333333]">花嫁のサイン</p><p className="font-bold text-[18px] text-[#333333]">Sign of Bride :</p></div>
              <div className="w-2/3 border border-gray-300 rounded-md p-2.5 h-[46px] bg-gray-50 text-center text-xs text-gray-400">Attached Signature</div>
           </div>
           <WitnessSection />
        </div>
      </div>

      {/* Certification Footer */}
      <div className="mt-10 text-[#333333] border-gray-300 space-y-2 border-t pt-6">
        <p className="  italic">住所私は、花嫁花婿がイスラム法に従って結納金の受け入れ（イジャブとクブル）</p>
        <p className="font-bold text-[18px] ">I certify that Bride & Groom have exchange the offering and acceptance (Ijab and Qubul)</p>
        <p className=" italic text-[14px]">の承認を証明する。従って、夫婦になることを宣言する。</p>
        <p className="font-bold text-[18px]">according to Islamic Law and are declared Husband and Wife</p>
      </div>

      {/* Solemnizer Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mt-8">
        <div>
          <p className="text-[14px]text-[#333333]">名前で厳粛に結婚</p>
          <p className="font-bold text-[#333333] text-[18px] mb-1">Marriage Solemnized By Name</p>
          <input className="w-full border border-gray-300 rounded-md px-2.5 h-[56px] text-sm" />
        </div>
        <div>
          <p className="text-[14px] text-[#333333]">住所</p>
          <p className="font-bold text-[#333333] text-[18px] mb-1">Address</p>
          <input className="w-full border border-gray-300 rounded-md h-[56px] px-3 text-sm" />
        </div>
        <div>
          <p className=" text-[#333333] text-[14px]">サイン</p>
          <p className="font-bold text-[#333333] text-[18px] mb-1">Sign</p>
          <div className="border border-gray-300 rounded-md px-2.5 h-[56px] bg-gray-50 text-center text-xs flex items-center justify-center text-gray-400">Attached Signature</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-10">
        <button className="bg-[#58b847] text-white px-8 py-2 rounded-md font-bold hover:bg-green-700 transition">Submit</button>
        <button className="bg-[#fde2e2] text-red-600 border border-red-300 px-8 py-2 rounded-md font-bold hover:bg-red-100 transition">Cancel</button>
        <button className="bg-white text-gray-700 border border-green-400 px-8 py-2 rounded-md font-bold hover:bg-green-50 transition">View Certificate</button>
      </div>
    </div>
  );
};

export default MarriageForm;