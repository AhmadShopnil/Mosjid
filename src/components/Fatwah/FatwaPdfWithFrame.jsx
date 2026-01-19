"use client";

import { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function FatwaPdfWithFrame({ htmlData, children }) {
  const contentRef = useRef();

  const downloadPDF = () => {
    const element = contentRef.current;

    const options = {
      margin: 0,                     // keep 0 globally
      filename: "document.pdf",

      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      },

      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },

      pagebreak: {
        mode: ["css", "legacy"]
      }
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div onClick={downloadPDF}>
      {children}

      <div style={{ position: "absolute", left: "-9999px" }}>
        <div ref={contentRef}>

          {/* ===== FIRST PAGE ===== */}
          <div className="pdf-page first-page">

            <div className="banner">
              <img
                src="/images/fatwah/pdfbanner.svg"
                alt="banner"
                className="banner-img"
              />
            </div>

            <div className="content first-content">
              <div dangerouslySetInnerHTML={{ __html: htmlData }} />
            </div>

            <div className="footer">
              <p>Generated from My System</p>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .pdf-page {
          width: 210mm;
          min-height: 297mm;
          display: flex;
          flex-direction: column;
        }

        /* ===== FIRST PAGE: NO MARGIN TOP ===== */
        .first-content {
          padding: 20px;
        }

        /* ===== FROM SECOND PAGE MARGIN EFFECT ===== */
        .first-content > * {
          page-break-inside: avoid;
        }

        /* this creates virtual margin after first page */
        .first-content::after {
          content: "";
          display: block;
          height: 20mm;
        }

        .banner-img {
          width: 100%;
          display: block;
        }

        .content {
          flex: 1;
          margin-top:20
        }

        .footer {
          text-align: center;
          padding: 10px;
          border-top: 1px solid #ccc;
          page-break-inside: avoid;
        }

        .arabic {
          direction: rtl;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
