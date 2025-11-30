import { getMetaValueFromExtraFields } from '@/helper/metaHelpers';
import { Download } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export default function BooksCardSuggetion({ book }) {


    const writer_name_books = getMetaValueFromExtraFields(book, "writer_name_books");
    const published_date_books = getMetaValueFromExtraFields(book, "published_date_books");

    return (
        <div

         className={`snap-start flex-shrink-0 w-[150px] h-[250px] sm:w-[260px] sm:h-[420px]
        flex flex-col items-center justify-between text-center rounded-full
        shadow-lg hover:shadow-xl bg-white cursor-pointer
        group border border-[#BDBDBD] hover:border-[#F7BA2A]`

            }
        >

            <div className='flex justify-center '>
                <div className='mx-auto mt-4 rounded-full  w-[120px] h-[120px]  sm:w-[210px] sm:h-[210px]'>
                    <Image
                        src={book?.featured_image || "/images/isamicBooks/bookIcon.png"}
                        alt={book?.name}
                        width={254}
                        height={254}
                        className='rounded-full w-[120px] h-[120px]  sm:w-[210px] sm:h-[210px] border-5 border-[#FFDA82]'
                    />
                </div>

            </div>

            <div className="flex flex-col items-center mt-4">
                <p className="text-lg sm:text-xl font-bold text-[#333333] group-hover:text-[#F7BA2A]">{book?.name}</p>
                {/* <p className="text-xs sm:text-sm text-[#333333]">{writer_name_books}</p> */}
            </div>

            <div className="mb-4 md:pb-12">
                <button
                    className="cursor-pointer p-2 rounded-full border border-gray-300 text-gray-300
                    transition-colors duration-300 group-hover:border-[#F7BA2A] group-hover:text-[#F7BA2A]"
                >
                    <Download className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
