"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Clipboard } from "lucide-react"; 
import toast from "react-hot-toast";

export default function SocialShare() {
  const pathname = usePathname();
  const [url, setUrl] = useState("");

  // Set current page URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]);

  // Open share link in a new window
  const handleShare = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Copy URL to clipboard
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
       toast.success(`URL copied to clipboard!`);
  
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  // Print current page
  const handlePrint = () => {
    // window.print();
  };

  // Download page / URL (simple fallback)
  const handleDownload = () => {
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = document.title || "page";
    // link.click();
  };

  if (!url) return null; // avoid hydration issues

  return (
    <div className="flex items-center gap-4 text-[#D9E2DD]">
      {/* Twitter */}
      <button
        onClick={() =>
          handleShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`)
        }
        className="border-r-2 border-gray-300 pr-3 hover:opacity-70 cursor-pointer"
      >
        <Image src="/images/social/twiter.svg" alt="Twitter" width={24} height={24} />
      </button>

      {/* Facebook */}
      <button
        onClick={() =>
          handleShare(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          )
        }
        className="border-r-2 border-gray-300 pr-3 hover:opacity-70 cursor-pointer"
      >
        <Image src="/images/social/facebook.svg" alt="Facebook" width={24} height={24} />
      </button>

      {/* WhatsApp */}
      <button
        onClick={() =>
          handleShare(`https://wa.me/?text=${encodeURIComponent(url)}`)
        }
        className="border-r-2 border-gray-300 pr-3 hover:opacity-70 cursor-pointer"
      >
        <Image src="/images/social/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
      </button>

      {/* Print */}
      <button
        onClick={handlePrint}
        className="border-r-2 border-gray-300 pr-3 hover:opacity-70 cursor-pointer"
      >
        <Image src="/images/social/printer.svg" alt="Print" width={24} height={24} />
      </button>

      {/* Download */}
      <button
        onClick={handleDownload}
        className="border-r-2 border-gray-300 pr-3 hover:opacity-70 cursor-pointer"
        title="Download page"
      >
        <Image src="/images/social/download.svg" alt="Download" width={24} height={24} />
      </button>

      {/* Copy URL */}
      <button
        onClick={handleCopyUrl}
        className="hover:opacity-70 p-1 rounded cursor-pointer"
        title="Copy URL"
      >
        <Clipboard className="w-6 h-6 text-gray-500" />
      </button>
    </div>
  );
}
