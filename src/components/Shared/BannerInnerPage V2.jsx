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

  if (loading) return <SkeletonBanner />;
  if (error || !banner?.featured_image) return null;

  const left_logo = getImageFromExtraFields(banner, "left_logo");
  const right_logo = getImageFromExtraFields(banner, "right_logo");
  const center_top_image = getImageFromExtraFields(banner, "center_top_image");
  const center_bottom_image = getImageFromExtraFields(banner, "center_bottom_image");

  return (
    <div
      className="w-full overflow-hidden rounded-2xl"
      style={{
        backgroundImage: `url(${banner?.featured_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "270px", // default for xl
      }}
    >
      <div className=" items-center justify-center">

        <Container className="  h-[270px]">
          {/* Optional: you can position images/logos here */}
          <div className="relative  h-full">

            {left_logo && <div
              className="absolute left-0 bottom-0 "
            ><Image
                src={left_logo}
                alt="Inner Page Banner"
                width={358}
                height={240}
                priority={false}
                loading="lazy"
                className="h-full"
              /></div>}
            {center_top_image && (
              <div className=" absolute top-10 left-2/5 flex flex-col items-center">
                <Image
                  src={center_top_image}
                  alt="Inner Page Banner"
                  width={340}
                  height={100}
                  priority={false}
                  loading="lazy"
                  className=""
                />
                {center_bottom_image && (
                  <Image
                    src={center_bottom_image}
                    alt="Inner Page Banner"
                    width={348}
                    height={72}
                    priority={false}
                    loading="lazy"
                    className=""
                  />
                )}
              </div>
            )}
            {right_logo && <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <Image
                src={right_logo}
                alt="Inner Page Banner"
                width={204}
                height={305}
                priority={false}
                loading="lazy"
                className=""
              />
            </div>
            }
          </div>
        </Container>
      </div>
    </div>
  );
}
