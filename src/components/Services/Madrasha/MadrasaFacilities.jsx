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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-amber-700">
            Madrasa Facilities
          </h2>
          <span className="text-amber-600 font-medium">
            マドラサ施設
          </span>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-12">
          {facilities.map((item, index) => (
            <FacilityCard key={index} title={item} />
          ))}
        </div>

    </div>
  )
}


function FacilityCard({ title }) {
  return (
    <div className="flex items-center gap-3 border-2 border-green-800 rounded-xl px-3 py-3 bg-white">
      
      {/* Icon Box */}
      <div className="flex-shrink-0 w-12 h-12 rounded-lg border-2 border-amber-400 flex items-center justify-center bg-[#fffdf7]">
        <img
          src="/icons/book.png"
          alt="icon"
          className="w-7 h-7 object-contain"
        />
      </div>

      {/* Text */}
      <p className="text-sm md:text-[15px] font-medium text-green-900 leading-snug">
        {title}
      </p>
    </div>
  );
}

