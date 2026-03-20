import React from 'react'

const benefits = [
  "Qur’an Education",
  "Islamic Knowledge",
  "Arabic Language Skills",
  "Spiritual Development",
  "Moral and Ethical Training",
  "Community Bonding",
  "Safe and Supportive Environment",
  "Structured Routine and Discipline",
];




export default function GraveyardFacilities({ facilities_graveyard }) {

  const benefits = facilities_graveyard?.sub_sections;
  // console.log("madrasa_facilities", benefits)


  return (
    <div>


      {/* Benefits Header */}
      <div className="flex justify-between items-center mb-4 text-[#B98C20]">
        <h2 className="text-2xl md:text-3xl font-semibold ">
          Facilities of Graveyard
        </h2>
        <span className="text-2xl md:text-3xl font-semibold">
          墓地の設備
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-amber-200 mb-6"></div>

      {/* Benefits Row */}
      <div className="shadow-md grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8 gap-18 xl:gap-4  bg-[#fffdf7] border
         border-[#FFCE4D] pt-20 px-6 pb-6 rounded-[20px]">
        {benefits?.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} />
        ))}
      </div>




    </div>
  )
}




function BenefitCard({ benefit }) {
  return (
    <div className="min-w-[170px] md:min-w-0  border-2 border-[#FFCE4D] rounded-xl bg-white px-4 py-5 text-center">

      {/* Circle Icon */}
      <div className="w-24 h-24  -mt-20 mx-auto rounded-full border-3 border-amber-400 flex items-center justify-center bg-white">
        <img
          src="/images/offerServices/madrasha/book.svg"
          alt="icon"
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Text */}
      <p className="text-sm font-medium text-green-900 leading-snug mt-2">
        {benefit?.title}
      </p>
    </div>
  );
}