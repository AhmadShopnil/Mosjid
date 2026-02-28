"use client"

import React, { useState } from "react"
import DonationCard from "./DonationCard"
import Container from "../Shared/Container"
import DonationModal from "./DonationModal"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"

export default function DonationCardList({ allDonationsList }) {
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (donation) => {
    setSelectedDonation(donation)
    setIsModalOpen(true)
  }

  return (
    <div className="my-20 py-8 lg:py-10 bg-[#F9FFF6] ">
      <Container>
        <div className="flex justify-center border-b-2 border-b-[#53b92089] pb-6">
          <h4 className="text-xl md:text-2xl lg:text-3xl text-[#00401A] font-bold">
            Select Your <span className="text-[#F7BA2A]">Donation</span>
          </h4>
        </div>

        {/*  Swiper Slider */}
        <div className="py-6 lg:py-10">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop
            spaceBetween={30}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
          >
            {allDonationsList?.map((data, i) => (
              <SwiperSlide key={i}>
                <div className="flex justify-center">
                  <DonationCard
                    data={data}
                    handleOpenModal={handleOpenModal}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        donation={selectedDonation}
      />
    </div>
  )
}
