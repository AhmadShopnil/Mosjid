import { getMetaValueFromExtraFields } from '@/helper/metaHelpers';
import { Download } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export default function BooksCarHome({ book }) {


    const writer_name_books = getMetaValueFromExtraFields(book, "writer_name_books");
    const published_date_books = getMetaValueFromExtraFields(book, "published_date_books");

    return (
        <div

            className={`snap-start flex-shrink-0 w-[150px] h-[250px] sm:w-[240px] sm:h-[390px] flex flex-col items-center
                 justify-between text-center rounded-full shadow-md bg-white cursor-pointer group islamicBookHome border border-gray-100`}
        >
            <div className="p-4 sm:p-9 rounded-full mt-2 sm:mt-4  bg-[#F8F8F8] w-[120px] h-[120px] 
            sm:w-[190px] sm:h-[190px] flex justify-center items-center  ">
                <Image
                    src={book?.featured_image || "/images/isamicBooks/bookIcon.png"}
                    alt={book?.name}
                    width={95}
                    height={95}
                    className="object-contain"
                />
            </div>

            <div className="flex flex-col items-center mt-4">
                <p className="text-lg sm:text-xl font-bold text-[#333333]">{book?.name}</p>
                <p className="text-xs sm:text-sm text-[#333333]">{writer_name_books}</p>
            </div>

            <div className="pb-4">
                <button
                    type="button"
                    aria-label="download"
                    className="cursor-pointer p-2 rounded-full border border-gray-300 text-gray-300
          transition-colors duration-300 group-hover:border-orange-400 group-hover:text-orange-400"
                >
                    <Download className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
