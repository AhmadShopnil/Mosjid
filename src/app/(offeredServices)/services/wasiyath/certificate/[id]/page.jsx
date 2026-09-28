"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import PdfPagePreview from "@/components/Services/Wasiyah/certificate/PdfPagePreview";
import useWasiyahCertificate from "@/components/Services/Wasiyah/certificate/useWasiyahCertificate";
import styles from "./page.module.css";

const WASIYAH_PAGE = "/services/wasiyath";
const A4_LANDSCAPE = "841.89 / 595.28";

export default function WasiyahCertificatePage() {
  const { id } = useParams();
  const { status, data, row, blob, reload } = useWasiyahCertificate(id);
  const [previewFailed, setPreviewFailed] = useState(false);

  const handlePreviewError = useCallback((error) => {
    console.error("Certificate preview failed", error);
    setPreviewFailed(true);
  }, []);

  const handleDownload = async () => {
    if (!blob) return;
    const { downloadBlob, certificateFileName } = await import("@/components/Services/Wasiyah/certificate/generatePdf");
    downloadBlob(blob, certificateFileName(data, id));
  };

  const holderName = data?.person?.fullName || row?.data?.fullName;
  const certificateNo = data?.meta?.certificateNo;

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <Link href={WASIYAH_PAGE} className={styles.backLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to My Wasiyah
        </Link>

        <div className={styles.heading}>
          <h1 className={styles.title}>Certificate of Wasiyah</h1>
          {(holderName || certificateNo) && (
            <p className={styles.subtitle}>
              {[holderName, certificateNo].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>

        <button
          type="button"
          className={styles.downloadButton}
          onClick={handleDownload}
          disabled={status !== "ready"}
        >
          <Download size={16} aria-hidden="true" />
          Download PDF
        </button>
      </div>

      <div className={styles.stage}>
        {status === "loading" && (
          <div className={styles.skeleton} style={{ aspectRatio: A4_LANDSCAPE }}>
            <span className={styles.spinner} aria-hidden="true" />
            <span>Preparing your certificate…</span>
          </div>
        )}

        {status === "ready" && !previewFailed && (
          <PdfPagePreview
            blob={blob}
            aspectRatio={A4_LANDSCAPE}
            label={`Certificate of Wasiyah${holderName ? ` for ${holderName}` : ""}`}
            onError={handlePreviewError}
          />
        )}

        {status === "ready" && previewFailed && (
          <div className={styles.message}>
            <p>The preview could not be displayed in this browser, but your certificate is ready.</p>
            <button type="button" className={styles.downloadButton} onClick={handleDownload}>
              <Download size={16} aria-hidden="true" />
              Download PDF
            </button>
          </div>
        )}

        {status === "unavailable" && (
          <div className={styles.message}>
            <p>This certificate has not been issued yet. It will be available once your Wasiyah is approved.</p>
            <Link href={WASIYAH_PAGE} className={styles.secondaryButton}>
              Back to My Wasiyah
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className={styles.message}>
            <p>We couldn&apos;t load this certificate. Please check your connection and try again.</p>
            <button type="button" className={styles.secondaryButton} onClick={reload}>
              <RefreshCw size={15} aria-hidden="true" />
              Try again
            </button>
          </div>
        )}
      </div>

      {status === "ready" && !previewFailed && (
        <p className={styles.note}>This preview is the exact PDF you will download.</p>
      )}
    </div>
  );
}
