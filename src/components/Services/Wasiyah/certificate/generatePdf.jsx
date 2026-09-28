import { pdf } from "@react-pdf/renderer";
import WasiyahCertificateDocument from "./WasiyahCertificateDocument";
import { loadSignatureImage } from "./signatureImage";
import { registerCertificateFonts } from "./theme";

/** Renders the certificate to a PDF Blob. The same Blob backs both preview and download. */
export const createCertificatePdf = async (data) => {
  registerCertificateFonts();
  const signature = await loadSignatureImage(data?.signatureUrl);
  return pdf(<WasiyahCertificateDocument data={data} signature={signature} />).toBlob();
};

export const certificateFileName = (data, fallbackId) =>
  `Wasiyah_Certificate_${data?.meta?.certificateNo || fallbackId}.pdf`;

/** Saves a Blob as a file download. */
export const downloadBlob = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revoke on the next tick: some browsers start the download asynchronously.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
