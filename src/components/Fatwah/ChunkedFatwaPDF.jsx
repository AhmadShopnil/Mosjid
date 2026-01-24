"use client";

import { useRef } from "react";

export default function FatwaPDF({ htmlData }) {
  const contentRef = useRef();

  const downloadPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = contentRef.current;

    if (!element) return;

    const opt = {
      margin: 0,
      filename: "fatwa.pdf",
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: ["css"] },
    };

    html2pdf().set(opt).from(element).toPdf().get("pdf").then((pdf) => {
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(11);
        pdf.setTextColor(20, 120, 60);
        pdf.text(
          `পৃষ্ঠা ${i} / ${totalPages}`,
          pdf.internal.pageSize.getWidth() - 25,
          pdf.internal.pageSize.getHeight() - 8
        );
      }
    }).save();
  };

  return (
    <div>
      <button
        onClick={downloadPDF}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download PDF
      </button>

      <div
        ref={contentRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "794px",
          opacity: 0,
        }}
      >
        <div className="pdf-page">
          {/* HEADER / BANNER */}
          <div className="banner">
            <img src="/images/fatwah/pdfbanner.svg" className="banner-img" />
          </div>

          {/* MAIN CONTENT */}
          <div className="main-content" dangerouslySetInnerHTML={{ __html: htmlData }} />

          {/* FOOTER */}
          <div className="footer">
            <span className="footer-text">Generated from My System</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pdf-page {
          display: flex;
          flex-direction: column;
          min-height: 1122px;
          background: white;
        }

        .banner-img {
          width: 100%;
          display: block;
        }

        .main-content {
          flex: 1;
          padding: 20px;
        }

        .footer {
          text-align: center;
          padding: 10px;
          border-top: 1px solid #ccc;
          page-break-inside: avoid;
        }

        .footer-text {
          font-size: 12px;
          color: #166534;
        }

        p, div, table {
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
