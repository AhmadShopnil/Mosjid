import React from 'react'


const facilities = [
  "Islamic Atmosphere Throughout The Campus",
  "Separate Sections For Boys And Girls",
  "Islamic School For Children",
  "Dormitories / Boarding Facilities",
  "Hostel Accommodation For Children",
  "Dining Hall / Canteen",
  "Department of Fatwa and Research (Dar al–Ifta wa al–Tahqeeq)",
  "Playground And Recreational Area",
  "Health And Wellness Support Services",
  "Rest Area For Younger Students or Break Time",
];

export default function MadrasaFacilities() {
  return (
    <div>

      {/* Facilities Header */}
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#B98C20]">
          Madrasa Facilities
        </h2>
        <span className="text-2xl md:text-3xl font-semibold text-[#B98C20]">
          マドラサ施設
        </span>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-12 ">
        {facilities.map((item, index) => (
          <FacilityCard key={index} title={item} />
        ))}
      </div>

    </div>
  )
}


function FacilityCard({ title }) {
  return (
    <div className="">

      <div className='flex items-center  '>

        {/* Icon Box */}
        <div className="z-10 w-[80px] h-[80px] flex-shrink-0  rounded-lg border-3 border-[#FFCE4D] flex items-center justify-center bg-[#fffdf7]">
          <img
            src="/images/offerServices/madrasha/book.svg"
            alt="icon"
            className="w-[60px] h-[60px] object-contain"
          />
        </div>

        {/* Text */}
        <div className='-ml-2  border-2 border-[#005312] rounded-lg px-4 py-4.5 bg-white w-full h-[94px] flex items-center'>
          <p className="text-sm md:text-[18px] font-semibold text-[#005312] leading-snug">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

