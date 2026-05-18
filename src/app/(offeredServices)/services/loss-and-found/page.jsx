"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axiosInstance from '@/helper/axiosInstance';
import LossAndFoundSection from '@/components/Services/LossAndFound/LossAndFoundSection';
import LossAndFoundTopSection from '@/components/Services/LossAndFound/LossAndFoundTopSection';
import LostComplainForm from '@/components/Services/LossAndFound/LostComplainForm';
import GradientBorderWrapper1 from '@/components/Shared/GradientBorderWrapper1';
import ServiceInnerHeader from '@/components/Services/Shared/ServiceInnerHeader';
import PolicyModal from '@/components/Shared/PolicyModal';

export default function Page() {
  const [losses, setLosses] = useState([]);
  const [founds, setFounds] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchLossFoundData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/lossfound');
      setLosses(res.data?.losses?.data || []);
      setFounds(res.data?.founds?.data || []);
    } catch (error) {
      console.error("Failed to fetch loss and found data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLossFoundData();
  }, [fetchLossFoundData]);

  return (
    <div className='space-y-8'>
      <ServiceInnerHeader
        title="遺失物・拾得物"
        title2="المفقودات والموجودات"
      />
      <LossAndFoundTopSection onActionClick={handleActionClick} />

      <GradientBorderWrapper1 rounded="rounded-[20px]" innerRounded="rounded-[19px]">
        <LostComplainForm onSuccess={fetchLossFoundData} reportRef={reportRef} />
      </GradientBorderWrapper1>

      <LossAndFoundSection
        losses={losses}
        founds={founds}
        loading={loading}
        lostListRef={lostListRef}
        foundListRef={foundListRef}
      />

      <PolicyModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        slug={modalConfig.slug}
        title={modalConfig.title}
      />
    </div>
  );
}
