"use client";

import axiosInstance from "@/helper/axiosInstance";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SkeletonBanner from "./Skeleton/SkeletonBanner";


export default function BannerInnerPage() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axiosInstance.get("/posts?term_type=banner_inner_page");
        const data = response?.data?.data?.[0];
        setBanner(data || null);
      } catch (err) {
        console.error("Error fetching banner:", err);
        setError("Failed to load banner");
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);

  if (loading) return <SkeletonBanner />;
  if (error || !banner?.featured_image) return null; // Avoid rendering broken images

  return (
    <div className="w-full overflow-hidden">
      <Image
        src={banner.featured_image}
        alt="Inner Page Banner"
        width={2000}
        height={400}
        priority={false}
        loading="lazy"
        className="w-full h-[90px] xs:h-[100px] sm:h-[120px] md:h-[170px] lg:h-[200px] xl:h-[270px] object-cover rounded-2xl"
      />
    </div>
  );
}
