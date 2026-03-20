import React from 'react'

export default function SectionTitle({first_title,second_title}) {
    return (
        <div>  {/* Facilities Header */}
            <div className="flex justify-between items-center mb-6 ">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#B98C20]">
                   {first_title}
                </h2>
                <span className="text-2xl md:text-3xl font-semibold text-[#B98C20]">
                   {second_title}
                </span>
            </div></div>
    )
}
