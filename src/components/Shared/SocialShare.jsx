"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Clipboard } from "lucide-react";
import toast from "react-hot-toast";
import CommonPDfDownloader from "./CommonPDfDownloader";

export default function SocialShare({ data }) {
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
  // Print only the passed data
  // const handlePrint = () => {
  //   if (!data) return;

  //   const printWindow = window.open("", "_blank", "width=800,height=600");
  //   if (!printWindow) return; // popup blocked

  //   // Write the content
  //   printWindow.document.open();
  //   printWindow.document.write(`
  //     <html>
  //       <head>
  //         <title>Print Preview</title>
  //         <style>
  //           body { font-family: Arial, sans-serif; padding: 20px; }
  //           /* Add any custom styles here */
  //         </style>
  //       </head>
  //       <body>

  //         <div class="print-header">
  //           <img 
  //             src="/images/fatwah/pdfbanner.svg"
  //            />
  //         </div>
  //         ${data}
  //       </body>
  //     </html>
  //   `);
  //   printWindow.document.close();

  //   // Wait for content to fully render
  //   printWindow.onload = () => {
  //     printWindow.focus();
  //     printWindow.print();
  //     // Optional: don't close immediately to let user see print dialog
  //     // printWindow.close();
  //   };
  // };
  const handlePrint = () => {
    if (!data) return;

    const printWindow = window.open("", "_blank", "width=900,height=700");

    printWindow.document.write(`
    <html>
      <head>
        <title>Print</title>

        <style>
          @page:first  {
            margin: 0;
            size: auto;
          }
            @page {
             margin: 10;
             size: auto;
              margin-top:30;
          }

          @media print {
            body {
              margin: 0;
              -webkit-print-color-adjust: exact;
            }
          }

          body {
            font-family: Arial, sans-serif;
          }

          .print-header {
            width: 100%;
            text-align: center;
          }

          .print-header img {
            width: 100%;
            max-width: 100%;
            height: auto;
            object-fit: contain;
            display: block;
          }

          .print-content {
            padding: 20px;
          }
        </style>

      </head>

      <body>

        <div class="print-header">
      
          <img src="${window.location.origin}/images/fatwah/pdfbanner.svg" />
        </div>

        <div class="print-content">
          ${data}
        </div>

      </body>
    </html>
  `);

    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.print();
    };
  };

  // images/fatwah/pdfbanner.svg


  // Download page
  const handleDownload = () => {
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = document.title || "page";
    // link.click();
  };

  if (!url) return null; // avoid hydration issues


  // console.log("data",data)


  return (
    <div className="flex items-center gap-4 text-[#D9E2DD]">
      {/* Twitter */}
      <div>
        <button
          onClick={() =>
            handleShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`)
          }
          className="border-r-2 border-gray-300 pr-3 hover:opacity-70 cursor-pointer"
        >
          <Image src="/images/social/twiter.svg" alt="Twitter" width={24} height={24} />
        </button>
      </div>

      {/* Facebook */}
      <div>  <button
        onClick={() =>
          handleShare(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          )
        }
        className="border-r-2 border-gray-300 pr-3 hover:opacity-70 cursor-pointer"
      >
        <Image src="/images/social/facebook.svg" alt="Facebook" width={24} height={24} />
      </button></div>

      {/* WhatsApp */}
      <div>
        <button
          onClick={() =>
            handleShare(`https://wa.me/?text=${encodeURIComponent(url)}`)
          }
          className="border-r-2 border-gray-300 pr-3 hover:opacity-70 cursor-pointer"
        >
          <Image src="/images/social/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
        </button>
      </div>

      {/* Print */}
      <div>
        <button
          onClick={handlePrint}
          className="border-r-2 border-gray-300 pr-3 hover:opacity-70 cursor-pointer "
        >
          <Image src="/images/social/printer.svg" alt="Print" width={24} height={24} />
        </button>
      </div>


      {/* Download */}
      <div className=" ">
        <CommonPDfDownloader htmlData={data}>

          <button
            // onClick={handleDownload}
            className="border-r-2 border-gray-300 pr-3 hover:opacity-70 cursor-pointer"
            title="Download page"
          >
            <Image src="/images/social/download.svg" alt="Download" width={24} height={24} />
          </button>
        </CommonPDfDownloader>
      </div>



      {/* Copy URL */}
      <div className="">
        <button
          onClick={handleCopyUrl}
          className="pr-3 hover:opacity-70 cursor-pointer"
          title="Copy URL"
        >
          <Clipboard className="w-6 h-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
