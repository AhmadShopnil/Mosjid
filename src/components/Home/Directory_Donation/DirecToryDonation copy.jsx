import Container from '@/components/Shared/Container'
import React from 'react'
import Directory from './Directory/Directory'
import MakeDonation from './Donation/MakeDonation'

export default function DirecToryDonation() {
  return (
    <div className='py-20'
          style={{
        background: "linear-gradient(to bottom, rgba(245, 255, 250, 1), rgba(206, 255, 227, 1))",
      }}
    >

      <Container className=" flex flex-col xl:flex-row w-full h-full gap-6"

      >
         <div className="w-full xl:w-[50%]">
         <Directory/>
        </div>
         <div className="w-full xl:w-[50%] h-full">
          <MakeDonation/>
        </div>
      </Container>

    </div>
  )
}
