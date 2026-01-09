"use client";

import axiosInstance from "@/helper/axiosInstance";
import React, { useEffect, useState } from "react";
import { getImageFromExtraFields, getMetaValueFromExtraFields } from "@/helper/metaHelpers";
import Image from "next/image";
import Container from "../Shared/Container";

export default function BannerInnerFatwa({ ban = 0 }) {
  const [banners, setBanners] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axiosInstance.get("/posts?term_type=banner_inner_page");
        const data = response?.data?.data?.[ban];
        setBanners(response?.data?.data)
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
  const center_bottom_title = getMetaValueFromExtraFields(banner, "center_bottom_title");


//   console.log({banners})

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
        <Container className="h-[150px] sm:h-[180px] md:h-[286px]  relative">
          {/* Main Wrapper */}
          <div className="relative h-full w-full">

            {/* Left Logo */}
            {left_logo && (
              <div className="absolute left-0 bottom-0">
                <Image
                  src={left_logo}
                  alt="Left Logo"
                  width={188}
                  height={205}
                  priority={false}
                  loading="lazy"
                  className=" h-auto w-[170px] sm:w-[180px] md:w-[250px] lg:w-[320px] xl:w-[288px]"
                />

              </div>
            )}

            {/* Center Images */}
            {center_top_image && (
              <div className="hidden  md:flex flex-col items-center absolute bottom-4 left-1/2 -translate-x-1/2 ">
                <Image
                  src={center_top_image}
                  alt="Center Top"
                  width={340}
                  height={100}
                  priority={false}
                  loading="lazy"
                  className="h-auto w-[130px] sm:w-[180px] md:w-[280px] lg:w-[320px] xl:w-[340px]"
                />
                {center_bottom_title && (
                  <p className=" text-[50px] md:text-[60px] lg:text-[72px] text-[#00401A] font-medium ">
                    {center_bottom_title}
                    {/* 大阪モスク */}
                  </p>
                  // <Image
                  //   src={center_bottom_image}
                  //   alt="Center Bottom"
                  //   width={360}
                  //   height={72}
                  //   priority={false}
                  //   loading="lazy"
                  //   className="h-auto w-[150px] sm:w-[200px] md:w-[260px] lg:w-[300px] xl:w-[348px]"
                  // />
                )}
              </div>
            )}

            {/* Right Logo */}
            {right_logo && (
              <div className="absolute right-0 bottom-0 md:bottom-6">
                <Image
                  src={right_logo}
                  alt="Right Logo"
                  width={164}
                  height={205}
                  priority={false}
                  loading="lazy"
                  className="h-auto w-[80px] sm:w-[100px] md:w-[120px] lg:w-[144px] xl:w-[164px]"
                />
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
