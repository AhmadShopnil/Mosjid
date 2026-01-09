"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // using Lucide icon
import clsx from "clsx";
import Image from "next/image";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            className={clsx(
                "fixed bottom-8 right-5 z-50 transition-opacity duration-300",
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            <button
                onClick={scrollToTop}
                className="p-3 rounded-full cursor-pointer bg-white w-[50px] h-[70px] sm:w-[60px] sm:h-[80px] up_navigation_button  
                flex justify-center items-center"
                aria-label="Scroll to top"
            >
                <Image
                    src="/images/others/up_arrow.svg"
                    alt="Up "
                    width={15}
                    height={15}
                    className="flex sm:hidden"
                />
                <Image
                    src="/images/others/up_arrow.svg"
                    alt="Up "
                    width={18}
                    height={18}
                    className="hidden sm:flex"
                />
                {/* <ArrowUp className="w-5 h-5" /> */}
            </button>
        </div>
    );
}
