"use client"

import { useState } from "react"

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  const images = [
    {
      id: 1,
      src: "/images/gallery/1.png",
      alt: "Historic Islamic Building",
    },
    {
      id: 2,
      src: "/images/gallery/1.png",
      alt: "Dome of the Rock",
    },
    {
      id: 3,
      src: "/images/gallery/1.png",
      alt: "Blue Mosque",
    },
    {
      id: 4,
      src: "/images/gallery/1.png",
      alt: "Traditional Islamic Architecture",
    },
    {
      id: 5,
      src: "/images/gallery/1.png",
      alt: "Prophet's Mosque",
    },
    {
      id: 6,
      src: "/images/gallery/1.png",
      alt: "Sheikh Zayed Grand Mosque",
    },
  ]

  const openModal = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-teal-600 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Gallery</h1>
        </div>
        <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
          View More
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-4 gap-4 h-96">
        {/* First column - tall image */}
        <div className="relative group cursor-pointer overflow-hidden rounded-lg">
          <img
            src={images[0].src || "/placeholder.svg"}
            alt={images[0].alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gray-100 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div
              className="opacity-0 group-hover:opacity-100 
               bg-white bg-opacity-90 backdrop-blur-sm 
               rounded-full p-3 cursor-pointer hover:bg-opacity-100 transform hover:scale-110
               transition-all duration-200"
              onClick={() => openModal(images[0])}
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Second column - two stacked images */}
        <div className="flex flex-col gap-4">
          <div className="relative group cursor-pointer overflow-hidden rounded-lg h-48">
            <img
              src={images[1].src || "/placeholder.svg"}
              alt={images[1].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <div
                className="opacity-0 group-hover:opacity-100 
                 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-3 
                 cursor-pointer hover:bg-opacity-100 transform hover:scale-110 transition-all duration-200"
                onClick={() => openModal(images[1])}
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="relative group cursor-pointer overflow-hidden rounded-lg flex-1">
            <img
              src={images[2].src || "/placeholder.svg"}
              alt={images[2].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <div
                className="opacity-0 group-hover:opacity-100  bg-white bg-opacity-90
                 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-opacity-100 transform hover:scale-110 transition-all duration-200"
                onClick={() => openModal(images[2])}
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Third column - tall image */}
        <div className="relative group cursor-pointer overflow-hidden rounded-lg">
          <img
            src={images[3].src || "/placeholder.svg"}
            alt={images[3].alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div
              className="opacity-0 group-hover:opacity-100  bg-white bg-opacity-90
               backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-opacity-100 
               transform hover:scale-110 transition-all duration-200"
              onClick={() => openModal(images[3])}
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Fourth column - two stacked images */}
        <div className="flex flex-col gap-4">
          <div className="relative group cursor-pointer overflow-hidden rounded-lg flex-1">
            <img
              src={images[4].src || "/placeholder.svg"}
              alt={images[4].alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40
             transition-all duration-300 flex items-center justify-center">
              <div
                className="opacity-0 group-hover:opacity-100  bg-white bg-opacity-90
                 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-opacity-100 
                 transform hover:scale-110 transition-all duration-200"
                onClick={() => openModal(images[4])}
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="relative group cursor-pointer overflow-hidden rounded-lg h-48">
            <img
              src={images[5].src || "/placeholder.svg"}
              alt={images[5].alt}
              className="w-full h-full object-cover transition-transform duration-300 
              group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0
             group-hover:bg-opacity-40 transition-all duration-300 flex items-center 
             justify-center">
              <div
                className="opacity-0 group-hover:opacity-100  bg-white bg-opacity-90
                 backdrop-blur-sm rounded-full p-3 cursor-pointer hover:bg-opacity-100
                  transform hover:scale-110 transition-all duration-200"
                onClick={() => openModal(images[5])}
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full animate-in zoom-in-95 duration-300">
            <img
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
