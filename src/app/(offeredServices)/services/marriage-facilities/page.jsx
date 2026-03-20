'use client'
import Booking from '@/components/Services/marriageFacilities/Booking'
import BookingList from '@/components/Services/marriageFacilities/BookingList'
import MyApplications from '@/components/Services/marriageFacilities/MyApplications'
import MarriageForm from '@/components/Services/marriageFacilities/MarriageForm'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import axiosInstance from '@/helper/axiosInstance'

const Page = () => {
  const [slots, setSlots] = useState([]);
  const [marriages, setMarriages] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const formRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/marriage');
      const data = res.data;

      setSlots(data.slots || []);
      setMarriages(data.marriages?.data || []);
      setMyApplications(data.my_applications?.data || []);
    } catch (err) {
      console.error('Error fetching marriage data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFillForm = (application) => {
    setSelectedApplication(application);
    // Scroll to the form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCancelForm = () => {
    setSelectedApplication(null);
  };

  const handleFormSubmitSuccess = () => {
    fetchData(); // Refresh data after form submission
  };

  return (
    <div>
      <Booking slots={slots} onBookingSubmitted={fetchData} />
      <BookingList marriages={marriages} loading={loading} />
      <MyApplications
        applications={myApplications}
        loading={loading}
        onFillForm={handleFillForm}
      />
      <div ref={formRef}>
        {selectedApplication && (
          <MarriageForm
            application={selectedApplication}
            onCancel={handleCancelForm}
            onSubmitSuccess={handleFormSubmitSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default Page;