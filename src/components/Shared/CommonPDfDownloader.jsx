"use client";

import { useRef } from "react";

export default function CommonPDfDownloader({ htmlData, children }) {


  const contentRef = useRef();

  const downloadPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = contentRef.current;

    if (!element) return;

    const options = {
      margin: 5,

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
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div
      onClick={downloadPDF}>

      {children}

      {/* ===== HIDDEN PDF CONTENT ===== */}
      <div style={{ position: "absolute", left: "-9999px" }}>
        <div ref={contentRef}>

          <div className=""


          >

            {/* ===== BANNER HEADER ===== */}
            <div className=""
              style={{}}


            >
              <img
                src="/images/fatwah/pdfbanner.svg"
                alt="banner"
                className="banner-img"
              />
            </div>

            {/* ===== YOUR ORIGINAL DATA ===== */}
            {/* <div className="content"
            
              style={{padding:20 }}
            
            >
              <div dangerouslySetInnerHTML={{ __html: htmlData }} />
            </div> */}
            <div
              className="content"
              style={{ padding: 20, color: '#000', backgroundColor: '#fff' }} // safe colors
            >
              <div dangerouslySetInnerHTML={{ __html: htmlData?.replace(/oklch\([^)]+\)/g, '#000') }} />
            </div>


            {/* ===== FOOTER ===== */}
            {/* <div className="footer">
             
            </div> */}

          </div>

        </div>
      </div>

      {/* ===== STYLES ===== */}
      <style jsx>{`
        .pdf-frame {
          border: 6px solid #0f172a;
          min-height: 1120px;
          padding: 10px;
        }

        .banner {
          width: 100%;
          text-align: center;
          margin-bottom: 10px;
        }

        .banner-img {
          width: 100%;
          max-height: 160px;
          object-fit: cover;
        }

        .content {
          padding: 10px;
        }

        .footer {
          border-top: 1px solid #ccc;
          margin-top: 10px;
          text-align: center;
        }

        .arabic {
          direction: rtl;
          text-align: right;
        }
      `}</style>

    </div>
  );
}
