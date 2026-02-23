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




export default function MadrashaBenefits() {
  return (
    <div>


        {/* Benefits Header */}
        <div className="flex justify-between items-center mb-4 text-[#B98C20]">
          <h2 className="text-2xl md:text-3xl font-semibold ">
            Madrasa Benefits
          </h2>
          <span className="text-2xl md:text-3xl font-semibold">
            マドラサのメリット
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-amber-200 mb-6"></div>

        {/* Benefits Row */}
        <div className="flex md:grid md:grid-cols-8 gap-4  bg-[#fffdf7] border border-[#B98C20] pt-20 px-6 pb-6 rounded-[20px]">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} title={benefit} />
          ))}
        </div>




    </div>
  )
}




function BenefitCard({ title }) {
  return (
    <div className="min-w-[170px] md:min-w-0  border border-amber-300 rounded-xl bg-white px-4 py-5 text-center">
      
      {/* Circle Icon */}
      <div className="w-24 h-24  -mt-20 mx-auto rounded-full border-2 border-amber-400 flex items-center justify-center bg-white">
        <img
          src="/images/offerServices/madrasha/book.svg"
          alt="icon"
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Text */}
      <p className="text-sm font-medium text-green-900 leading-snug">
        {title}
      </p>
    </div>
  );
}