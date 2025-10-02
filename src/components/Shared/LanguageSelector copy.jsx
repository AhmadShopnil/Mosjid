"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const languages = [
    { title: "English", icon: "/images/others/English.png", code: "en" },
    { title: "Japanese", icon: "/images/others/Japan.png", code: "ja" },
    { title: "Arabic", icon: "/images/others/Arabic.png", code: "ar" },
];

export default function LanguageSelector() {
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);

    useEffect(() => {
        // Avoid duplicate script load
        const existing = document.querySelector(
            'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
        );

        if (window.google && window.google.translate) {
            setIsTranslateLoaded(true);
            return;
        }

        if (existing) return;

        window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    autoDisplay: false,
                },
                "google_translate_element"
            );

            // Poll for .goog-te-combo to confirm it's ready
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

        // Append script
        const script = document.createElement("script");
        script.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            try {
                delete window.googleTranslateElementInit;
            } catch (e) { }
        };
    }, []);

    const changeLanguage = (languageCode, languageTitle) => {
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

        combo.value = languageCode;
        combo.dispatchEvent(new Event("change", { bubbles: true }));
    };

    return (
        <div className="text-center ">
            <span className="text-sm sm:text-base text-[#00401A] font-bold">Select Language: </span>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
                {languages.map((language) => (
                    <button
                        key={language.title}
                        onClick={() => changeLanguage(language.code, language.title)}
                        disabled={!isTranslateLoaded}
                        className={`px-3 sm:px-5 flex gap-1 py-1.5 text-sm sm:text-base  rounded-full  font-bold transition-colors ${selectedLanguage === language.title
                                ? "bg-[#00401A] text-white"
                                : "bg-white text-[#00401A] hover:bg-gray-300 border border-[#00401a51]"
                            } ${!isTranslateLoaded ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <Image
                            src={language.icon}
                            alt={language.title}
                            width={20}
                            height={10}
                            className="my-auto"
                        />
                        <span className="text-sm font-bold my-auto">{language.title}</span>
                    </button>
                ))}

            </div>

            {/* hidden Google element */}
            <div id="google_translate_element" className="hidden" />

            {/* hide google's default UI */}
            <style jsx global>{`
        .goog-te-banner-frame.skiptranslate,
        .goog-te-menu-frame,
        .goog-te-gadget-icon {
          display: none !important;
        }
        body .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
      `}</style>
        </div>
    );
}
