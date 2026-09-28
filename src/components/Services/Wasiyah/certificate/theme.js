import { Font } from "@react-pdf/renderer";

/** A4 landscape, in PDF points. */
export const PAGE = { width: 841.89, height: 595.28 };

export const COLORS = {
  paper: "#FCFAF4",
  ink: "#1B2A22",
  green: "#0E4D36",
  greenDeep: "#093726",
  gold: "#B08D46",
  goldDeep: "#8A6A2C",
  goldSoft: "#D8C38E",
  goldPale: "#EEE3C6",
  muted: "#6E746C",
  white: "#FFFFFF",
};

export const FONTS = {
  display: "Playfair",
  caps: "Cinzel",
  serif: "Garamond",
  jp: "NotoSansJP",
};

// Values can be typed in any script; per-character fallback lets a Japanese address
// inside a Latin-font field render with the Japanese font.
export const VALUE_FONT = [FONTS.serif, FONTS.jp];

let registered = false;

/**
 * Registers the certificate fonts with react-pdf once. `base` is where `public/fonts`
 * is served from — the site root in the browser.
 *
 * Each weight is a separate static file: react-pdf picks one file per weight, so a
 * variable font would render every weight the same.
 */
export const registerCertificateFonts = (base = "/fonts") => {
  if (registered) return;
  registered = true;

  const latin = `${base}/certificate/wasiyah`;

  Font.register({
    family: FONTS.serif,
    fonts: [
      { src: `${latin}/EBGaramond-Regular.ttf`, fontWeight: 400 },
      { src: `${latin}/EBGaramond-Medium.ttf`, fontWeight: 500 },
      { src: `${latin}/EBGaramond-SemiBold.ttf`, fontWeight: 600 },
      { src: `${latin}/EBGaramond-Italic.ttf`, fontWeight: 400, fontStyle: "italic" },
    ],
  });
  Font.register({ family: FONTS.display, src: `${latin}/PlayfairDisplay-Bold.ttf`, fontWeight: 700 });
  Font.register({
    family: FONTS.caps,
    fonts: [
      { src: `${latin}/Cinzel-SemiBold.ttf`, fontWeight: 600 },
      { src: `${latin}/Cinzel-Bold.ttf`, fontWeight: 700 },
    ],
  });
  Font.register({ family: FONTS.jp, src: `${base}/NotoSansJP-Regular.ttf` });
};
