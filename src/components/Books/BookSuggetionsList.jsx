import React from 'react'

import BooksCardSuggetion from './BooksCardSuggetion'
import Container from '../Shared/Container'

export default function BookSuggetionsList({ datas }) {




    return (
        <div className='md:mt-10 py-8 lg:py-10 bg-[#F9FFF6]'>

            <Container>
                <div className='mb-6 flex justify-center border-b-1 border-b-[#52B920] pb-6'>
                    <h4 className='text-xl md:text-2xl lg:text-3xl text-[#000000] font-bold '>
                        Islamic Books
                    </h4>
                    {/* <h4 className='text-xl md:text-2xl lg:text-3xl text-[#000000] font-bold '>{title}</h4> */}
                </div>

                <div className='flex flex-wrap   justify-center gap-2 md:gap-24 xl:gap-8  '>
                    {
                        datas?.slice(0,4).map((book, i) => (
                            <BooksCardSuggetion  key={book.id} book={book} />
                        ))
                    }


                </div>
            </Container>

        </div>
    )
}
