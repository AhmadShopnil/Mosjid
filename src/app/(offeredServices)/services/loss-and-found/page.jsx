"use client";

import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/helper/axiosInstance';
import LossAndFoundSection from '@/components/Services/LossAndFound/LossAndFoundSection';
import LossAndFoundTopSection from '@/components/Services/LossAndFound/LossAndFoundTopSection';
import LostComplainForm from '@/components/Services/LossAndFound/LostComplainForm';
import GradientBorderWrapper1 from '@/components/Shared/GradientBorderWrapper1';

export default function Page() {
  const [losses, setLosses] = useState([]);
  const [founds, setFounds] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <LossAndFoundTopSection />

      <GradientBorderWrapper1 rounded="rounded-[20px]" innerRounded="rounded-[19px]">
        <LostComplainForm onSuccess={fetchLossFoundData} />
      </GradientBorderWrapper1>

      <LossAndFoundSection losses={losses} founds={founds} loading={loading} />
    </div>
  );
}
