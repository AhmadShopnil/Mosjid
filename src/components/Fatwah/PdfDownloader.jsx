"use client";

import { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function PdfDownloader({ htmlData,children }) {
  const contentRef = useRef();

  const downloadPDF = () => {
    const element = contentRef.current;

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
