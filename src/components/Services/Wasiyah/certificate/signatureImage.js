// Prepares the Imam's signature image for the react-pdf certificate.
//
// react-pdf accepts only PNG and JPEG, and if an image it is given can't be loaded it
// fails the *whole* PDF. So the image is loaded here first, redrawn onto a canvas and
// re-encoded as a PNG of bounded size. That:
//   - accepts any format the browser can display (PNG, JPEG, WebP, GIF, SVG);
//   - keeps transparency, so a signature drawn on a transparent background stays clean;
//   - keeps the PDF small even if the uploaded file is a multi-megabyte scan;
//   - turns every failure (offline, blocked by CORS, not an image) into `null`, so the
//     certificate is simply made without a signature rather than not made at all.

const MAX_WIDTH = 720;

// The admin host sends no Access-Control-Allow-Origin header, so the browser won't let this
// site read its images directly. Next's image endpoint (the admin host is already in
// `images.domains`) fetches the file server-side and serves it from our own origin.
// `w` must be one of Next's configured widths; 750 is the closest to MAX_WIDTH.
const sameOriginUrl = (url) => `/_next/image?url=${encodeURIComponent(url)}&w=750&q=75`;

const decodeImage = async (blob) => {
  const objectUrl = URL.createObjectURL(blob);
  try {
    const image = new Image();
    image.src = objectUrl;
    await image.decode();
    return image;
  } finally {
    // Safe to revoke once decoded: the pixels are already in the image element.
    URL.revokeObjectURL(objectUrl);
  }
};

/**
 * Returns `{ src, width, height }` (a PNG data URL and its pixel size), or null.
 *
 * The image is fetched through the same-origin proxy above, so no CORS setup is needed on
 * the admin host and the canvas below is never tainted.
 */
export const loadSignatureImage = async (url) => {
  if (!url) return null;
  try {
    const response = await fetch(sameOriginUrl(url));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const image = await decodeImage(await response.blob());
    if (!image.naturalWidth || !image.naturalHeight) throw new Error("image has no size");

    const scale = Math.min(1, MAX_WIDTH / image.naturalWidth);
    const width = Math.round(image.naturalWidth * scale);
    const height = Math.round(image.naturalHeight * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);

    return { src: canvas.toDataURL("image/png"), width, height };
  } catch (error) {
    console.warn("Signature image unavailable; the certificate is made without it.", error);
    return null;
  }
};
