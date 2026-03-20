import React from 'react'



export default function GraveyardBenefit({ graveyard_benefits }) {
  const facilities = graveyard_benefits?.sub_sections;
  // console.log("madrasa_facilities", madrasa_facilities)
  return (
    <div>

      {/* Facilities Header */}
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#B98C20]">
          Benefits of Graveyard
        </h2>
        <span className="text-2xl md:text-3xl font-semibold text-[#B98C20]">
          墓地の利点
        </span>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-3 gap-x-4 gap-y-7 mb-12 ">
        {facilities?.map((item, index) => (
          <BenefitsCard key={index} item={item} />
        ))}
      </div>

    </div>
  )
}


function BenefitsCard({ item }) {
  return (
    <div className="border-2 border-[#FFCE4D] rounded-[30px] p-3 shadow-xl ">

      <div className='flex flex-col items-center border-2 border-[#005312] rounded-[20px]  bg-white w-full min-h-[180px] 
      md:min-h-[220px] '>

        {/* Icon Box */}
        <div className="z-10 w-[60px] h-[60px] flex-shrink-0  rounded-b-[10px] border-2 border-[#005312] flex items-center
         justify-center bg-[#fffdf7]">
          <img
            src="/images/offerServices/graveyard/icon.svg"
            alt="icon"
            className="w-[40px] h-[40px] object-contain"
          />
        </div>

        {/* Text */}
        <div className='px-4 mt-2 md:mt-3   flex items-center'>
          <p className="text-sm md:text-[18px] text-[#25530E] text-center leading-snug">
            {item?.title}
          </p>
        </div>
      </div>
    </div>
  );
}

