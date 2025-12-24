import React, { useEffect, useState } from 'react'
import FatwaListInner from './FatwaListInner'
import axiosInstance from '@/helper/axiosInstance';

export default function NewFatwa({ settings, homePage }) {


    const [fatwahs, setFatwahs] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const perPage = 10;





    // fetching data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            let url = `/fatwa?page=${currentPage}&per_page=${perPage}`;


            try {
                const response = await axiosInstance.get(url);
                const apiData = response?.data?.data || {};
                const list = apiData?.data || [];
                const meta = response?.data?.meta || {};

                setFatwahs(list);
                setTotalPages(meta?.last_page || 1);

            } catch (err) {
                console.error("Error fetching fatwa:", err);
                setError(err.message || "Failed to fetch fatwa");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);





    return (
        <>
            <FatwaListInner
                title="New Fatwa"
                titleWidth="w-[350px]"
                fatwahs={fatwahs}
                settings={settings}
                homePage={homePage}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />

        </>
    )
}
