import Image from 'next/image'
import React from 'react'

export default function BookCard({ book }) {
    return (
        <div className='rounded-xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909]'>
            <div

                className="flex gap-4.5 p-4  bg-white shadow-sm rounded-[11px]"
            >
                {/* Book Cover */}
                <div className="w-[150px] shrink-0  border-r-2 border-gray-200">
                    <Image
                        src={book?.image}
                        alt={book.title}
                        width={130}
                        height={200}
                        className="object-contain"
                    />
                </div>

                {/* Book Info */}
                <div className="flex flex-col justify-between flex-1">
                    <div>
                        <h3 className="font-semibold text-gray-800 text-sm md:text-base lg:text-xl">
                            {book.title}
                        </h3>
                        <p className="text-xs md:text-base  lg:text-lg text-gray-600">{book.author}</p>
                        <p className="text-xs md:text-base  lg:text-lg text-gray-600">
                            Volume : {book.volume}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-2">
                        <button className="px-4 py-2 text-xs md:text-sm font-semibold border  border-gray-200 text-[#00401A]
                 rounded-full hover:text-white hover:bg-[#00401A] cursor-pointer transition-all  ">
                            Read Online
                        </button>

                        <button className="px-4 py-2 text-xs md:text-sm font-semibold border border-gray-200 text-[#00401A]
                 rounded-full flex items-center gap-3 hover:text-white hover:bg-[#00401A] transition-all duration-300 cursor-pointer">
                            PDF
                            <span>⬇</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
