import Booking from '@/components/Services/marriageFacilities/Booking'
import BookingList from '@/components/Services/marriageFacilities/BookingList'
import MarriageForm from '@/components/Services/marriageFacilities/MarriageForm'
import React from 'react'

const page = () => {
  return (
    <div>
        <Booking />
        <BookingList />
        <MarriageForm />
    </div>
  )
}

export default page