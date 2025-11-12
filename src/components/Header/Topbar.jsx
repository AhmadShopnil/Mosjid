"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Container from "../Shared/Container";
import { TbMailFilled } from "react-icons/tb";
import { ImFacebook2 } from "react-icons/im";
import { FaPhoneVolume } from "react-icons/fa6";
import { getMetaValueByMetaName } from "@/helper/metaHelpers";
import Link from "next/link";

const languages = [
  { title: "English", icon: "/images/others/English.png", code: "en" },
  { title: "Japanese", icon: "/images/others/Japan.png", code: "ja" },
  { title: "Arabic", icon: "/images/others/Arabic.png", code: "ar" },
];

export default function Topbar({ settings }) {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);

  const phone = getMetaValueByMetaName(settings, "company_phone") || "";
  const company_email = getMetaValueByMetaName(settings, "company_email") || "";
  const facebookLink = getMetaValueByMetaName(settings, "facebook_url") || "#";
  const linkedinLink = getMetaValueByMetaName(settings, "linkedin_url") || "#";
  const instagramLink = getMetaValueByMetaName(settings, "instagram_url") || "#";

  useEffect(() => {
    // Prevent adding multiple scripts
    const existing = document.querySelector(
      'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
    );
    if (window.google && window.google.translate) {
      setIsTranslateLoaded(true);
      return;
    }
    if (existing) return;

    // Create the callback on window
    window.googleTranslateElementInit = function () {
      /* eslint-disable no-new */
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
      // Poll for the select element that Google injects
      const maxAttempts = 20;
      let attempts = 0;
      const poll = setInterval(() => {
        const combo = document.querySelector(".goog-te-combo");
        if (combo) {
          setIsTranslateLoaded(true);
          clearInterval(poll);
        } else if (++attempts >= maxAttempts) {
          clearInterval(poll);
          console.warn("Google Translate combo not found after polling.");
        }
      }, 250);
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // cleanup: do not remove script immediately to avoid breaking widget if other components rely on it.
    return () => {
      // optionally remove the global callback
      try {
        delete window.googleTranslateElementInit;
      } catch (e) {}
    };
  }, []);

  // change language via google's injected select element
  const changeLanguage = (languageCode, languageTitle) => {
    // If translator not ready -> alert
    if (!isTranslateLoaded) {
      alert("Google Translate is still loading, please wait...");
      return;
    }

    const combo = document.querySelector(".goog-te-combo");
    if (!combo) {
      alert("Translation control not found. Please try again in a moment.");
      return;
    }

    setSelectedLanguage(languageTitle);

    // Set value and dispatch change event
    combo.value = languageCode;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
  };

  return (
    <Container className="bg-white my-2 min-h-[20px]">
      {/* hide google ui elements but keep the element present */}
      <div id="google_translate_element" className="hidden" />

      {/* style to hide google injected UI (banner/iframe) */}
      <style jsx global>{`
        /* Hide the top banner (if any) and google toolbars so your UI stays unchanged */
        .goog-te-banner-frame.skiptranslate,
        .goog-te-menu-frame,
        .goog-te-gadget-icon {
          display: none !important;
        }
        /* Hide the toolbar that can push the page down */
        body .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
      `}</style>

      <div className="justify-end items-center gap-4 md:gap-6 hidden xl:flex ">
        {/* language selection */}
        <div className="flex items-center gap-2  justify-end">
          <span className="text-lg text-[#00401A] font-bold">Select Language: </span>
          {languages.map((language) => (
            <button
              key={language.title}
              onClick={() => changeLanguage(language.code, language.title)}
              className={`px-5 flex gap-1 py-2 rounded-full text-base font-bold  transition-colors ${
                selectedLanguage === language.title
                  ? "bg-[#00401A] text-white"
                  : "bg-white text-[#00401A] hover:bg-gray-300 border border-[#00401a51]"
              }`}
            >
              <div className="my-auto">
                <Image src={language.icon} alt={language.title} width={20} height={10} />
              </div>
              <div className="text-sm font-bold my-auto">{language.title}</div>
            </button>
          ))}
        </div>

        {/* mail */}
        <div className="flex gap-2 items-center">
          <span className="text-xl text-[#00401A]">
            <TbMailFilled />
          </span>
          <span className="text-base text-[#00401A]">{company_email}</span>
        </div>

        {/* phone no */}
        <div className="flex gap-2 items-center">
          <span className="text-xl text-[#00401A]">
            <FaPhoneVolume />
          </span>
          <span className="text-base text-[#00401A]">{phone}</span>
        </div>

        {/* social links */}
        <div className="flex gap-2 justify-center items-center">
          <Link href={facebookLink} className="text-blue-500">
              <Image
              src="/images/social/fb.png"
              alt="LinkedIn"
              width={26}
              height={26}
              className="hidden sm:flex"
            />
          </Link>
          <Link href={instagramLink}>
            <Image
              src="/images/social/instagram.png"
              alt="Instagram"
              width={29}
              height={29}
              className="hidden sm:flex"
            />
          </Link>
          <Link href={linkedinLink}>
            <Image
              src="/images/social/linkdin.png"
              alt="LinkedIn"
              width={26}
              height={26}
              className="hidden sm:flex"
            />
          </Link>
        </div>
      </div>
    </Container>
  );
}
