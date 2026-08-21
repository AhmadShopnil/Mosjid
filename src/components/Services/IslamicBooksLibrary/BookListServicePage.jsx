import Image from 'next/image';
import React from 'react';
import BookCard from './BookCard';

// Skeleton loader for book cards
function BookCardSkeleton() {
  return (
    <div className="rounded-xl p-[1px] bg-gradient-to-b from-[#3198A0] to-[#51F909]">
      <div className="flex gap-4 p-4 bg-white rounded-[11px] animate-pulse">
        <div className="w-[100px] h-[140px] bg-gray-200 rounded shrink-0" />
        <div className="flex-1 space-y-3 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="flex gap-2 mt-4">
            <div className="h-8 bg-gray-200 rounded-full w-24" />
            <div className="h-8 bg-gray-200 rounded-full w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookListServicePage({ books = [], loading = false }) {
  return (
    <div className="border border-gray-200 p-4 md:p-6 rounded-xl">
      <div className="w-full flex justify-between mb-4">
        <h3 className="text-gray-800 text-sm md:text-base lg:text-xl xl:text-2xl font-bold">Books List</h3>
        <h3 className="text-gray-800 text-sm md:text-base lg:text-xl xl:text-2xl font-bold">書籍リスト</h3>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && books.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Image
            src="/images/offerServices/book3d.svg"
            alt="No books"
            width={80}
            height={80}
            className="opacity-30 mb-4"
          />
          <p className="text-lg font-medium">No books found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Books grid */}
      {!loading && books.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books?.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}


