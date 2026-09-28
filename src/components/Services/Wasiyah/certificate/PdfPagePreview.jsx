"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PdfPagePreview.module.css";

let pdfjsPromise = null;

/** Loads pdf.js once, in the browser only. The legacy build supports older Safari/Chrome. */
const loadPdfjs = () => {
  pdfjsPromise ??= import("pdfjs-dist/legacy/build/pdf.min.mjs").then((pdfjs) => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
    return pdfjs;
  });
  return pdfjsPromise;
};

const RESIZE_DEBOUNCE_MS = 120;
const MAX_PIXEL_RATIO = 3;

/**
 * Draws the first page of a PDF Blob into a canvas that fills its container's width.
 *
 * It renders the actual PDF (with pdf.js) rather than an HTML look-alike, so the preview
 * is exactly the file that downloads — and unlike an <iframe>, it works on mobile
 * browsers that can't display PDFs inline (e.g. Android Chrome).
 *
 * The frame's size comes from CSS (width + aspect-ratio) and never from the canvas, so
 * rendering can't change the size it is measured against: no resize loop, no shaking.
 */
export default function PdfPagePreview({ blob, aspectRatio, label = "PDF preview", onError }) {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [pdfDocument, setPdfDocument] = useState(null);
  const [rendered, setRendered] = useState(false);

  // Follow the frame's width, debounced so dragging a window edge doesn't re-render per pixel.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    let timer;
    const measure = () => setWidth(Math.round(frame.getBoundingClientRect().width));
    measure();
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(measure, RESIZE_DEBOUNCE_MS);
    });
    observer.observe(frame);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Parse the PDF once per Blob.
  useEffect(() => {
    if (!blob) return undefined;
    let cancelled = false;
    let loadingTask = null;
    setRendered(false);

    (async () => {
      const pdfjs = await loadPdfjs();
      loadingTask = pdfjs.getDocument({ data: new Uint8Array(await blob.arrayBuffer()) });
      const doc = await loadingTask.promise;
      if (cancelled) doc.destroy();
      else setPdfDocument(doc);
    })().catch((error) => {
      if (!cancelled) onError?.(error);
    });

    return () => {
      cancelled = true;
      loadingTask?.destroy();
    };
  }, [blob, onError]);

  useEffect(() => () => pdfDocument?.destroy(), [pdfDocument]);

  // Render page 1 at the frame's width x device pixel ratio, for a sharp result.
  useEffect(() => {
    if (!pdfDocument || !width) return undefined;
    let cancelled = false;
    let renderTask = null;

    (async () => {
      const page = await pdfDocument.getPage(1);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      const viewport = page.getViewport({ scale: (width / page.getViewport({ scale: 1 }).width) * pixelRatio });

      // Render off-screen, then copy in one step, so a re-render never flashes blank.
      const buffer = document.createElement("canvas");
      buffer.width = Math.floor(viewport.width);
      buffer.height = Math.floor(viewport.height);
      renderTask = page.render({ canvasContext: buffer.getContext("2d"), viewport });
      await renderTask.promise;
      if (cancelled) return;

      const canvas = canvasRef.current;
      canvas.width = buffer.width;
      canvas.height = buffer.height;
      canvas.getContext("2d").drawImage(buffer, 0, 0);
      setRendered(true);
    })().catch((error) => {
      if (!cancelled && error?.name !== "RenderingCancelledException") onError?.(error);
    });

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [pdfDocument, width, onError]);

  return (
    <div ref={frameRef} className={styles.frame} style={{ aspectRatio }}>
      {!rendered && <div className={styles.placeholder} aria-hidden="true" />}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ visibility: rendered ? "visible" : "hidden" }}
        role="img"
        aria-label={label}
      />
    </div>
  );
}
