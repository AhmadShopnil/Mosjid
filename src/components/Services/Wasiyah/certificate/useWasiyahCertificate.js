"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchCertificateData, isCertificateIssued } from "./certificateData";

/**
 * Loads a wasiyat's certificate data and renders it to a PDF Blob.
 *
 * status: "loading" | "ready" | "unavailable" (not issued yet) | "error"
 *
 * react-pdf is imported on demand: it is large and must only ever run in the browser.
 */
export default function useWasiyahCertificate(id) {
  const [state, setState] = useState({ status: "loading", data: null, row: null, blob: null });

  const load = useCallback(async () => {
    if (!id) return;
    setState({ status: "loading", data: null, row: null, blob: null });
    try {
      const { row, data } = await fetchCertificateData(id);
      if (row && !isCertificateIssued(row)) {
        setState({ status: "unavailable", data, row, blob: null });
        return;
      }
      const { createCertificatePdf } = await import("./generatePdf");
      const blob = await createCertificatePdf(data);
      setState({ status: "ready", data, row, blob });
    } catch (error) {
      console.error("Failed to prepare the Wasiyah certificate", error);
      setState({ status: "error", data: null, row: null, blob: null });
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
