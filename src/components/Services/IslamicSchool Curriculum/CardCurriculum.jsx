import React from 'react'


const academicFocus = ["Basic literacy", "Numeracy", "General knowledge", "Early social skills"]
const religiousFocus = ["Qaida Nooraniyah", "Nazirah al-Qur'an", "Akhlaq (manners)", "Seerah stories"]
const outcomes = ["Islamic Etiquette", "Child ready for schooling", "Qur'an recitation fluency", "Spiritual Maturity"]






export default function CardCurriculum({ curriculum }) {
    return (
        <div className=' h-[500px]'>

            <div
                className='relative curriculum bg-[#EEF8E9] w-full h-[350px] border-8 border-[#FFCE4D] rounded-[110px]'
            >

                <div className='absolute left-20 right-20 top-6  w-auto h-[150px]  flex justify-between'>

                    <div className=' flex gap-8'>
                        <div>
                            <span className='text-[60px] font-bold text-[#B98C20]  '>{curriculum?.no}</span>
                        </div>
                        <div className='space-y-1 pt-4'>
                            <p className='text-[20px] font-semibold text-[#B98C20]'>{curriculum?.title}</p>
                            <p className='text-[20px] font-semibold text-[#B98C20]'>{curriculum?.ageGroup}</p>

                        </div>
                    </div>
                    <div className='space-y-1 pt-4'>
                        <p className='text-[20px] font-semibold text-[#B98C20]'>{curriculum?.titleJapanese}</p>
                        <p className='text-[20px] font-semibold text-[#B98C20]'>{curriculum?.ageGroupJapanese}</p>
                    </div>
                </div>


                <div className='absolute bg-white rounded-tl-[60px] w-[90%] h-[220px] -right-2 -bottom-2'>

                    <div className='w-full h-[221px]  flex justify-end relative  
                border-8 border-l-[#FFCE4D] border-t-[#FFCE4D] border-b-white border-r-white  rounded-tl-[60px]  '
                    >


                        <div className='absolute  w-[98%] h-[300px]  top-8'>
                            <div className='grid grid-cols-3 gap-2'>
                                <Card title="Academic Focus" items={academicFocus} />
                                <Card title="Religious Focus" items={religiousFocus} />
                                <Card title="Outcomes" items={outcomes} />
                            </div>
                        </div>



                    </div>

                </div>



            </div>
        </div>
    )
}





function Card({ title, items }) {
    return (
        <div>

            <div
                className="w-full  bg-white relative pt-5 border-x-2 border-t-2 border-[#005312] rounded-tl-[20px] rounded-tr-[20px] "
            >
                <div
                    className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 text-white text-[13px] font-medium whitespace-nowrap
                 bg-[#52B920] rounded-[10px]"
                    style={{
                        top: "-18px",
                    }}
                >
                    <span className='text-[18px]'> {title}</span>
                </div>

                {/* List Items */}
                <div className="px-4 pt-5 pb-4">
                    <ul className="space-y-2">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 border-b border-b-[#E0E0E0] pb-3 ">
                                <span className="w-4 h-4 rounded-full flex-shrink-0 bg-[#52B920]" />
                                <span className="text-[#333333] text-[18px]">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>


            {/* Buttons */}
            <div className="flex gap-2 bg-white p-3 border-t-2 border-[#C9E9BA] shadow-xl rounded-bl-[20px] rounded-br-[20px]">
                {/* View in Details button */}
                <div className="relative flex-1">
                    <button
                        type="button"
                        aria-label="view"
                        className="w-full px-2 py-2 text-[16px] text-[#3E8B18] font-bold rounded-[10px] bg-[#C9E9BA]"

                    >
                        View in Details
                    </button>

                </div>

                {/* View in Japanese button */}
                <div className="relative flex-1">
                    <button
                        type="button"
                        aria-label="view"
                        className="w-full px-2 py-2 text-[16px] font-bold text-white rounded-[10px] bg-[#52B920]"

                    >
                        View in Japanese
                    </button>

                </div>
            </div>
        </div>
    )
}