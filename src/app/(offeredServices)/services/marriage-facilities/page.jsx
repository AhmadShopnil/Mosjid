'use client'
import Booking from '@/components/Services/marriageFacilities/Booking'
import BookingList from '@/components/Services/marriageFacilities/BookingList'
import MyApplications from '@/components/Services/marriageFacilities/MyApplications'
import MarriageForm from '@/components/Services/marriageFacilities/MarriageForm'
import PolicyModal from '@/components/Shared/PolicyModal'
import Pagination from '@/components/Shared/Pagination'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import axiosInstance from '@/helper/axiosInstance'
import ServiceInnerHeader from '@/components/Services/Shared/ServiceInnerHeader'

const Page = () => {
  const [slots, setSlots] = useState([]);
  const [marriages, setMarriages] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const formRef = useRef(null);
  const bookingListRef = useRef(null);
  const myApplicationsRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal state
  const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: "", title: "" });

  const fetchData = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/marriage?page=${page}`);
      const data = res.data;

      setSlots(data.slots || []);
      setMarriages(data.marriages?.data || []);
      setMyApplications(data.my_applications?.data || []);

      // Pick total pages from whichever paginated key is available
      const maxPages = Math.max(
          data.marriages?.last_page || 1,
          data.my_applications?.last_page || 1
      );
      setTotalPages(maxPages);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error fetching marriage data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
    fetchData(currentPage);
  };

  const handleActionClick = (action) => {
    if (action === "Booking List\n") {
      bookingListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (action === "My Applications\n") {
      myApplicationsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (action === "Marriage Guideline\n") {
      setModalConfig({ isOpen: true, slug: "marriage-guidelines", title: "Marriage Guideline" });
    }
  };

  return (
    <div>
      <ServiceInnerHeader
        title="結婚施設"
        title2="مرفق الزواج"
      />
      <Booking slots={slots} onBookingSubmitted={() => fetchData(currentPage)} onActionClick={handleActionClick} />

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

      {/* Single Pagination for all tables */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-4 pb-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

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