"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '@/helper/axiosInstance';
import LossAndFoundSection from '@/components/Services/LossAndFound/LossAndFoundSection';
import LossAndFoundTopSection from '@/components/Services/LossAndFound/LossAndFoundTopSection';
import LostComplainForm from '@/components/Services/LossAndFound/LostComplainForm';
import GradientBorderWrapper1 from '@/components/Shared/GradientBorderWrapper1';
import ServiceInnerHeader from '@/components/Services/Shared/ServiceInnerHeader';
import PolicyModal from '@/components/Shared/PolicyModal';
import Pagination from '@/components/Shared/Pagination';

export default function Page() {
  const [losses, setLosses] = useState([]);
  const [founds, setFounds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const reportRef = useRef(null);
  const lostListRef = useRef(null);
  const foundListRef = useRef(null);

  const [modalConfig, setModalConfig] = useState({ isOpen: false, slug: '', title: '' });

  const handleActionClick = (label) => {
    if (label === "Lost Item Report") {
      reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (label === "Lost Items List") {
      lostListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (label === "Found Items List") {
      foundListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (label === "Guides Line") {
      setModalConfig({ isOpen: true, slug: "loss-and-found-guidelines", title: "Loss & Found Guidelines" });
    }
  };

  const fetchLossFoundData = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/lossfound?page=${page}`);
      
      setLosses(res.data?.losses?.data || []);
      setFounds(res.data?.founds?.data || []);

      // Pick the maximum total pages from all paginated sections
      const lossesLast = res.data?.losses?.last_page || 1;
      const foundsLast = res.data?.founds?.last_page || 1;
      setTotalPages(Math.max(lossesLast, foundsLast));
      
      const currentLosses = res.data?.losses?.current_page || 1;
      const currentFounds = res.data?.founds?.current_page || 1;
      setCurrentPage(Math.max(currentLosses, currentFounds, page));
    } catch (error) {
      console.error("Failed to fetch loss and found data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLossFoundData(currentPage);
  }, [fetchLossFoundData, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='space-y-8'>
      <ServiceInnerHeader
        title="遺失物・拾得物"
        title2="المفقودات والموجودات"
      />
      <LossAndFoundTopSection onActionClick={handleActionClick} />

      <GradientBorderWrapper1
       rounded="rounded-[20px]"
       innerRounded="rounded-[19px] "
    
        className="shadow-md hover:shadow-lg transition-all duration-300 "
        innerClassName=""
      
      >
        <LostComplainForm onSuccess={() => fetchLossFoundData(currentPage)} reportRef={reportRef} />
      </GradientBorderWrapper1>

      <LossAndFoundSection
        losses={losses}
        founds={founds}
        loading={loading}
        lostListRef={lostListRef}
        foundListRef={foundListRef}
      />

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
}
