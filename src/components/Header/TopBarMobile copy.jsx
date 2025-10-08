"use client";

import Image from "next/image";
import React, { useState } from "react";
import Container from "../Shared/Container";
import { TbMailFilled } from "react-icons/tb";
import { FaPhoneVolume } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import Link from "next/link";
import LanguageSelector from "../Shared/LanguageSelector";

const languages = [
  {
    title: "English",
    icon: "/images/others/English.png",
  },
  {
    title: "Japanese",
    icon: "/images/others/Japan.png",
  },
  {
    title: "Arabic",
    icon: "/images/others/Arabic.png",
  },
];

export default function TopbarMobile({ settings }) {
  // const [selectedLanguage, setSelectedLanguage] = useState("English");

  const phone = getMetaValueByMetaName(settings, "company_phone") || "";
  const company_email = getMetaValueByMetaName(settings, "company_email") || "";
  const facebookLink = getMetaValueByMetaName(settings, "facebook_url") || "#";
  const linkedinLink = getMetaValueByMetaName(settings, "linkedin_url") || "#";
  const instagramLink =
    getMetaValueByMetaName(settings, "instagram_url") || "#";

  return (
    <div className="bg-white py-2 z-[50] ">
      <Container>
        <div className="flex flex-col  items-center justify-between gap-4">
          {/* Language Selection */}
          <LanguageSelector/>
    

          {/* Contact and Social Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full">
            {/* Mail */}
            <div className="flex items-center gap-2">
              <TbMailFilled className="text-lg text-[#00401A]" />
              <span className="text-sm sm:text-base text-[#00401A]">
                {company_email}
              </span>
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-2">
              <FaPhoneVolume className="text-lg text-[#00401A]" />
              <span className="text-sm sm:text-base text-[#00401A]">
                {phone}
              </span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 items-center">
              <Link
                href={facebookLink}
                className="text-blue-500 text-xl hover:text-blue-600 transition"
              >
                <ImFacebook2 />
              </Link>
              <Link
                href={instagramLink}
              >
                <Image
                  src="/images/footer/insta.png"
                  alt="Instagram"
                  width={28}
                  height={28}
                  className="hover:opacity-80 transition"
                />
              </Link>
              <Link
                href={linkedinLink}
              >
                <Image
                  src="/images/footer/linkdin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="hover:opacity-80 transition"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
