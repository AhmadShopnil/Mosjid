// components/Footer.jsx
"use client";


import Image from "next/image";
import {
  FaEnvelope,
} from "react-icons/fa";
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import { getMediaLinkByMetaName, getMetaValueByMetaName } from "@/helper/metaHelpers";
import { BASE_URL } from "@/helper/baseUrl";
import Link from "next/link";
import QuickContactForm from "./QuickContactForm";

export default function FooterSections({ settings }) {





  const phone = getMetaValueByMetaName(settings, "company_phone") || "";
  const company_email = getMetaValueByMetaName(settings, "company_email") || "";
  const facebookLink = getMetaValueByMetaName(settings, "facebook_url") || "#";
  const linkedinLink = getMetaValueByMetaName(settings, "linkedin_url") || "#";
  const instagramLink =
    getMetaValueByMetaName(settings, "instagram_url") || "#";
  const location = getMetaValueByMetaName(settings, "office_location") || "";
  const looter_logo_path = getMediaLinkByMetaName(settings, "footer_logo");
  const footer_logo_url = `${BASE_URL}${looter_logo_path}`;

  const footer_content =
    getMetaValueByMetaName(settings, "site_description") || "";
  const copyright_content =
    getMetaValueByMetaName(settings, "bottom_footer_content") ||
    "OSAKA MASJID© 2025 | ALL RIGHTS RESERVED";

  // sectionTittles
  const section_1_title = getMetaValueByMetaName(settings, "section_1_title") || "";
  const section_2_title = getMetaValueByMetaName(settings, "section_2_title") || "";
  const section_3_title = getMetaValueByMetaName(settings, "section_3_title") || "";



  // Demo Data


  const contactInfo = [
    {
      id: 1,
      icon: <FaLocationDot className="text-[#00401A] min-w-[20px]" />,
      text: location,
    },
    {
      id: 2,
      icon: <FaPhoneVolume className="text-[#00401A] min-w-[20px]" />,
      text: phone,
    },
    {
      id: 3,
      icon: <FaEnvelope className="text-[#00401A] min-w-[20px]" />,
      text: company_email,
    },
  ];



  const usefulLinks = [
    { id: 1, label: "Home", url: "#" },
    { id: 2, label: "Fatwa", url: "#" },
    { id: 3, label: "Prayer Time", url: "#" },
    { id: 4, label: "Notice Board", url: "#" },
    { id: 5, label: "Blog & Event", url: "#" },
    { id: 6, label: "Dictionary", url: "#" },
    { id: 7, label: "Contact Us", url: "#" },
  ];










  return (
    <footer className="bg-white shadow-md px-4 md:px-12 xl:px-16 py-10 rounded-[30px]">
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4
       gap-10 xl:gap-8">
        {/* Logo + About */}
        <div>
          <div className="mb-4 gradient-border_b pb-2 flex gap-3 items-center">
            <Image
              src={footer_logo_url}
              // src="/images/logo.png"
              alt="Osaka Masjid Logo"
              width={70}
              height={75}
              className="w-[61px] h-[76px]"
            />
            <span className="text-[#F7BA2A] font-bold text-3xl">OSAKA MASJID</span>
          </div>
          <p className="text-[#333333] text-base">
            {footer_content}
          </p>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="text-2xl text-[#00401A] font-bold mb-4 gradient-border_b pb-2.5">
            {section_1_title}
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {contactInfo.map((info) => (
              <li key={info.id} className="flex items-start   gap-2">
                <span className=" text-lg bg-[#D9E2DD] p-2 rounded-full">
                  {info.icon}
                </span>
                <span className="text-[#333333] text-base">{info.text}</span>
              </li>
            ))}
          </ul>
          <div className='flex gap-2 mt-6 px-1  items-center'>
            <Link
              href={facebookLink}
              className=''>
              {/* <ImFacebook2 /> */}
              <Image
                src="/images/footer/fb.png"
                alt='a1'
                width={26}
                height={24}
                className='hidden sm:flex'
              />
            </Link>
            <Link
              href={instagramLink}
              className=''>
              <Image
                src="/images/footer/insta.png"
                alt='a1'
                width={38}
                height={38}
                className='hidden sm:flex'
              />
            </Link>
            <Link
              href={linkedinLink}
              className='text-blue-500'>
              <Image
                src="/images/footer/linkdin.png"
                alt='a1'
                width={26}
                height={26}
                className='hidden sm:flex'
              />

            </Link>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-2xl text-[#00401A] font-bold mb-3 gradient-border_b pb-2.5">
            {section_2_title}
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {usefulLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  className="text-[#333333] text-lg hover:text-[#F7BA2A]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Contact Form */}
        <QuickContactForm section_3_title={section_3_title} />
      </div>
    </footer>
  );
}
