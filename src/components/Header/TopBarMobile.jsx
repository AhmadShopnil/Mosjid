"use client";

import Image from "next/image";
import React from "react";
import Container from "../Shared/Container";
import { TbMailFilled } from "react-icons/tb";
import { FaPhoneVolume } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import Link from "next/link";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import LanguageSelector from "../Shared/LanguageSelector";

export default function TopbarMobile({ settings }) {
  const phone = getMetaValueByMetaName(settings, "company_phone") || "";
  const company_email = getMetaValueByMetaName(settings, "company_email") || "";
  const facebookLink = getMetaValueByMetaName(settings, "facebook_url") || "#";
  const linkedinLink = getMetaValueByMetaName(settings, "linkedin_url") || "#";
  const instagramLink = getMetaValueByMetaName(settings, "instagram_url") || "#";

  return (
    <div className="bg-gradient-to-b py-4 px-3 rounded-xl shadow-inner border border-gray-100">
      <Container>
        <div className="flex flex-col items-center gap-2">

          {/* 🌍 Language Selector */}
          {/* <div className="w-full">
            <LanguageSelector />
          </div> */}

          {/* ✉️ Contact Info */}
          <div className="flex flex-col gap-2 w-full text-center">
            {/* Email */}
            {company_email && (
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <TbMailFilled className="text-lg text-[#00401A]" />
                </div>
                <span className="text-sm font-medium text-[#00401A]">
                  {company_email}
                </span>
              </div>
            )}

            {/* Phone */}
            {phone && (
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <FaPhoneVolume className="text-lg text-[#00401A]" />
                </div>
                <span className="text-sm font-medium text-[#00401A]">
                  {phone}
                </span>
              </div>
            )}
          </div>

          {/* 🌐 Social Links */}
          <div className="flex gap-5 items-center justify-center mt-2">
            <Link
              href={facebookLink}
              target="_blank"
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-all"
            >
              <ImFacebook2 className="text-[#1877F2] text-lg" />
            </Link>

            <Link
              href={instagramLink}
              target="_blank"
              className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 transition-all"
            >
              <Image
                src="/images/footer/insta.png"
                alt="Instagram"
                width={20}
                height={20}
                className="object-contain"
              />
            </Link>

            <Link
              href={linkedinLink}
              target="_blank"
              className="p-2 rounded-full bg-sky-100 hover:bg-sky-200 transition-all"
            >
              <Image
                src="/images/footer/linkdin.png"
                alt="LinkedIn"
                width={18}
                height={18}
                className="object-contain"
              />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
