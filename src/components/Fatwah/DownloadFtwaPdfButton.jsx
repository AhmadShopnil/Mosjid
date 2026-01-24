"use client";

import { BlobProvider } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import FatwaPdf from "./FatwaPdf";
import { htmlToText } from "@/helper/htmlToText";


export default function DownloadFtwaPdfButton({ item }) {
  if (!item) return null;

  const descriptionText = htmlToText(item.description_ja);

  return (
    <BlobProvider
      document={
        <FatwaPdf
          fatwa={item}
          descriptionText={descriptionText}
        />
      }
    >
      {({ blob, loading, error }) => {
        if (error) {
          console.error("PDF ERROR:", error);
          return <span>PDF Error</span>;
        }

        const handleDownload = () => {
          if (!blob) return;

          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `fatwa-${item.id}.pdf`;
          a.click();
          URL.revokeObjectURL(url);
        };

        return (
          <button
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center gap-2 px-3 md:px-5 py-3
            gradient-border3 rounded-[100px] text-[#00401A]
            font-bold text-xs sm:text-sm md:text-lg"
          >
            {loading ? "Preparing..." : "Download"}
            <Download className="w-4 h-4" />
          </button>
        );
      }}
    </BlobProvider>
  );
}
