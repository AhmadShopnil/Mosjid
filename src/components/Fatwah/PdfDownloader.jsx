"use client";

import { useRef } from "react";

export default function PdfDownloader({ htmlData, children }) {
  const contentRef = useRef();

  const downloadPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = contentRef.current;

    if (!element) return;

    const options = {
      margin: 8,
      filename: "document.pdf",
      image: { type: "jpeg", quality: 0.98 },

      html2canvas: {
        scale: 2,
        useCORS: true,
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div
      onClick={downloadPDF}
    >

      {children}

      {/* HIDDEN CONTENT FOR PDF ONLY */}
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          <div dangerouslySetInnerHTML={{ __html: htmlData }} />
        </div>
      </div>
    </div>
  );
}
