"use client";

export default function BankInfo() {
  return (
    <section className="w-full  py-6">
      {/* Wrapper with two columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
        {/* Left Column */}
        <div className="space-y-3 w-full ">
          <div className="flex ">
            <span className="w-32 text-[#333333] text-sm ">From </span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">Japan Post Bank to Japan Post Bank</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Bank name</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">Japan Post Bank</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Account name</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">Shuu Osaka Masjid</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Symbol</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">14050</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Account number</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] text-sm  font-bold">37576231</span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden xl:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-300"></div>

        {/* Right Column */}
        <div className="space-y-3">
          <div className="flex ">
            <span className="w-32 text-[#333333] text-sm ">From </span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">Japan Post Bank to Japan Post Bank</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Bank name</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">Japan Post Bank</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Account name</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">Shuu Osaka Masjid</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Symbol</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] font-bold text-sm">14050</span>
          </div>

          <div className="flex">
            <span className="w-32 text-[#333333] text-sm ">Account number</span>
            <span className="mx-2">:</span>
            <span className="w-38 text-[#333333] text-sm  font-bold">37576231</span>
          </div>
        </div>
      </div>

      {/* Note Section */}
      <p className="mt-6 text-red-600 text-sm">
        <span className="font-semibold">Note :</span> Please refrain from paying Zakat ( obligatory charity ) 
        or Wajib Sadaqat ( obligatory charity ). 
        <span className="ml-2 font-normal">(جزاكم الله تعالى خيرا)</span>
      </p>
    </section>
  );
}
