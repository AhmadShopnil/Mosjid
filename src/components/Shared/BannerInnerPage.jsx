"use client";

import axiosInstance from "@/helper/axiosInstance";
import React, { useEffect, useState } from "react";
import SkeletonBanner from "./Skeleton/SkeletonBanner";
import { getImageFromExtraFields } from "@/helper/metaHelpers";
import Container from "./Container";
import Image from "next/image";

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

  if (loading) return null;
  if (error || !banner?.featured_image) return null;

  const left_logo = getImageFromExtraFields(banner, "left_logo");
  const right_logo = getImageFromExtraFields(banner, "right_logo");
  const center_top_image = getImageFromExtraFields(banner, "center_top_image");
  const center_bottom_image = getImageFromExtraFields(banner, "center_bottom_image");

  return (
    <div
      className="w-full overflow-hidden "
      style={{
        backgroundImage: `url(${banner?.featured_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="items-center justify-center">
        <Container className="h-[160px] sm:h-[180px] md:h-[286px]  relative">
          {/* Main Wrapper */}
          <div className="relative h-full w-full">
            
            {/* Left Logo */}
            {left_logo && (
              <div className="absolute left-0 bottom-0">
                <Image
                  src={left_logo}
                  alt="Left Logo"
                  width={358}
                  height={240}
                  priority={false}
                  loading="lazy"
                  className=" h-auto w-[180px] sm:w-[150px] md:w-[250px] lg:w-[320px] xl:w-[358px]"
                />
                
              </div>
            )}

            {/* Center Images */}
            {center_top_image && (
              <div className="hidden  md:flex flex-col items-center absolute bottom-10 left-1/2 -translate-x-1/2 ">
                <Image
                  src={center_top_image}
                  alt="Center Top"
                  width={340}
                  height={100}
                  priority={false}
                  loading="lazy"
                  className="h-auto w-[150px] sm:w-[220px] md:w-[280px] lg:w-[320px] xl:w-[340px]"
                />
                {center_bottom_image && (
                  <Image
                    src={center_bottom_image}
                    alt="Center Bottom"
                    width={360}
                    height={72}
                    priority={false}
                    loading="lazy"
                    className="h-auto w-[150px] sm:w-[200px] md:w-[260px] lg:w-[300px] xl:w-[348px]"
                  />
                )}
              </div>
            )}

            {/* Right Logo */}
            {right_logo && (
              <div className="absolute right-0 bottom-0 md:bottom-4">
                <Image
                  src={right_logo}
                  alt="Right Logo"
                  width={204}
                  height={305}
                  priority={false}
                  loading="lazy"
                  className="h-auto w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] xl:w-[204px]"
                />
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
