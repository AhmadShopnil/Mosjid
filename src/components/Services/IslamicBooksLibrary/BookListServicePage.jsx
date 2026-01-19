import Image from 'next/image';
import React from 'react'
import BookCard from './BookCard';



const books = [
  {
    id: 1,
    title: "Fatwa Al Kubra",
    author: "Md. Al Amin",
    volume: "01",
    image:
      "/images/offerServices/book3d.svg",
  },
  {
    id: 2,
    title: "Fatwa Al Kubra",
    author: "Md. Al Amin",
    volume: "01",
    image:
      "/images/offerServices/book3d.svg",
  },
  {
    id: 3,
    title: "Fatwa Al Kubra",
    author: "Md. Al Amin",
    volume: "01",
    image:
      "/images/offerServices/book3d.svg",
  },
  {
    id: 4,
    title: "Fatwa Al Kubra",
    author: "Md. Al Amin",
    volume: "01",
    image:
      "/images/offerServices/book3d.svg",
  },
   {
    id: 5,
    title: "Fatwa Al Kubra",
    author: "Md. Al Amin",
    volume: "01",
    image:
      "/images/offerServices/book3d.svg",
  },
  {
    id: 6,
    title: "Fatwa Al Kubra",
    author: "Md. Al Amin",
    volume: "01",
    image:
      "/images/offerServices/book3d.svg",
  },
  {
    id: 7,
    title: "Fatwa Al Kubra",
    author: "Md. Al Amin",
    volume: "01",
    image:
      "/images/offerServices/book3d.svg",
  },
  {
    id: 8,
    title: "Fatwa Al Kubra",
    author: "Md. Al Amin",
    volume: "01",
    image:
      "/images/offerServices/book3d.svg",
  },
];


export default function BookListServicePage() {
  return (
    <div className='border border-gray-200 p-4 md:p-6 rounded-xl'>
      <div className='w-full flex  justify-between  mb-4 '>
        <h3 className='text-gray-800 text-sm md:text-base  lg:text-xl xl:text-2xl font-bold'>Books List</h3>
        <h3 className='text-gray-800 text-sm md:text-base  lg:text-xl xl:text-2xl font-bold'>書籍リスト</h3>
      </div>

      {/* list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
         <BookCard
            key={book.id}
            book={book}
         />
        ))}
      </div>

    </div>
  )
}
