'use client'
import Booking from '@/components/Services/marriageFacilities/Booking'
import BookingList from '@/components/Services/marriageFacilities/BookingList'
import MyApplications from '@/components/Services/marriageFacilities/MyApplications'
import MarriageForm from '@/components/Services/marriageFacilities/MarriageForm'
import PolicyModal from '@/components/Shared/PolicyModal'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import axiosInstance from '@/helper/axiosInstance'

const Page = () => {
  const [slots, setSlots] = useState([]);
  const [marriages, setMarriages] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  
  const formRef = useRef(null);
  const bookingListRef = useRef(null);
  const myApplicationsRef = useRef(null);

  // Modal state
  const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: "", title: "" });

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

  const handleActionClick = (action) => {
    if (action === "Booking\nList") {
      bookingListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (action === "Marriage\nForm") {
      myApplicationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (action === "Marriage\nGuideline") {
      setModalConfig({ isOpen: true, slug: "marriage-guideline", title: "Marriage Guideline" });
    }
  };


  
  return (
    <div>
      <Booking slots={slots} onBookingSubmitted={fetchData} onActionClick={handleActionClick} />

      <div className="scroll-mt-32" ref={myApplicationsRef}>
        <MyApplications
          applications={myApplicationsRef ? myApplications : []}
          loading={loading}
          onFillForm={handleFillForm}
        />
      </div>

      <div className="mt-8 scroll-mt-32" ref={bookingListRef}>
        <BookingList marriages={marriages} loading={loading} />
      </div>

      <div className="scroll-mt-32" ref={formRef}>
        {selectedApplication && (
          <MarriageForm
            application={selectedApplication}
            onCancel={handleCancelForm}
            onSubmitSuccess={handleFormSubmitSuccess}
          />
        )}
      </div>

      <PolicyModal 
        isOpen={modalConfig.isOpen} 
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} 
        slug={modalConfig.slug} 
        title={modalConfig.title} 
      />
    </div>
  );
};

export default Page;