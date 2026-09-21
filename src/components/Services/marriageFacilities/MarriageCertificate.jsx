import React from 'react';

/**
 * Islamic Marriage Certificate — one A4 portrait page (794 x 1122 px).
 * ---------------------------------------------------------------------
 * Data shape (unchanged): groom, bride, details, witnesses, solemnizedBy
 *
 * Built so the on-screen preview and the html2pdf / html2canvas export match:
 *  - Every block has a fixed position and size, so nothing reflows when a value is
 *    long or short. Text never decides the layout.
 *  - Values go through fitText(): they shrink first, then wrap onto a second line
 *    (where the field allows it), and are cut with a real "…" as a last resort. No CSS ellipsis,
 *    because html2canvas ignores text-overflow.
 *  - Fonts are self-hosted (public/fonts/certificate) and declared in a <style>
 *    inside the certificate. Call preloadCertificateFonts() before capturing so the
 *    cloned document lays text out with the real fonts, not fallbacks.
 *  - All ornaments (border, corner lattice, arch, mosque, lanterns, photo frames)
 *    are inline SVG. Photos stay HTML backgrounds (an SVG rendered as an image can't
 *    load external URLs), masked by an SVG overlay in the page paper colour.
 *  - Height is 1122px, not 1123px: html2pdf slices floor(width * 297/210) px per page,
 *    so 1123px spills 1px onto a second page.
 */

const PAGE_W = 794;
const PAGE_H = 1122;

const C = {
  paper: '#F7F2E6',
  emerald: '#0F5F47',
  deep: '#0B4A38',
  darkest: '#083A2C',
  gold: '#B48A35',
  goldDark: '#8F6A1F',
  goldLight: '#E3CD8E',
  ink: '#1F3229',
  label: '#2B4A3D',
  value: '#83601A',
  muted: '#6C7068',
  line: '#D8CCAE',
  tint: '#F1EAD8',
  greenTint: '#E6ECDC',
  white: '#FFFDF8',
};

const F = {
  display: '"Playfair Display", "Times New Roman", Georgia, serif',
  serif: '"EB Garamond", Georgia, "Times New Roman", serif',
  jp: '"MC Noto JP", "Yu Gothic", "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif',
  arabic: '"Aref Ruqaa", "Amiri", "Traditional Arabic", "Times New Roman", serif',
};

/* ------------------------------------------------------------------ */
/*  Fonts                                                              */
/* ------------------------------------------------------------------ */

const FONT_DIR = '/fonts/certificate';
const LATIN_RANGE =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const ARABIC_RANGE = 'U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC';

const face = (family, style, weight, file, range) =>
  `@font-face{font-family:"${family}";font-style:${style};font-weight:${weight};font-display:block;` +
  `src:url(${FONT_DIR}/${file}) format("woff2");${range ? `unicode-range:${range};` : ''}}`;

const FONT_CSS = [
  face('EB Garamond', 'normal', '400 700', 'ebgaramond-latin.woff2', LATIN_RANGE),
  face('EB Garamond', 'italic', '400 600', 'ebgaramond-italic-latin.woff2', LATIN_RANGE),
  face('Playfair Display', 'normal', '700', 'playfair-700-latin.woff2', LATIN_RANGE),
  face('Aref Ruqaa', 'normal', '700', 'arefruqaa-700-arabic.woff2', ARABIC_RANGE),
  face('MC Noto JP', 'normal', '400', 'noto-sans-jp-cert.woff2'),
].join('');

const FONT_SPECS = [
  ['500 16px "EB Garamond"', 'Aa0'],
  ['600 16px "EB Garamond"', 'Aa0'],
  ['italic 400 16px "EB Garamond"', 'Aa0'],
  ['700 16px "Playfair Display"', 'Aa0'],
  ['700 16px "Aref Ruqaa"', 'بسم الله'],
  ['400 16px "MC Noto JP"', '結婚証明書'],
];

/**
 * Loads the certificate fonts into `doc`. Pass the document you are about to render
 * from (the live one, or html2canvas' cloned one inside `onclone`).
 */
export const preloadCertificateFonts = async (doc) => {
  const target = doc || (typeof document !== 'undefined' ? document : null);
  if (!target?.fonts?.load) return;
  try {
    await Promise.all(FONT_SPECS.map(([spec, sample]) => target.fonts.load(spec, sample)));
    await target.fonts.ready;
  } catch (e) {
    /* fall back to the stacks in F */
  }
};

/* ------------------------------------------------------------------ */
/*  Text fitting                                                       */
/* ------------------------------------------------------------------ */

/** Rough advance width, in em, of one character in EB Garamond (weight ~500). */
const charEm = (ch) => {
  const c = ch.codePointAt(0);
  if (c >= 0x2e80) return 1; // CJK / full-width
  if (c >= 0x0600 && c <= 0x06ff) return 0.55; // Arabic
  if (c >= 0x0980 && c <= 0x09ff) return 0.62; // Bengali
  if (ch === ' ') return 0.24;
  if ('mwMW@'.includes(ch)) return 0.8;
  if (ch >= 'A' && ch <= 'Z') return 0.66;
  if (ch >= '0' && ch <= '9') return 0.5;
  if ("iljtfrI.,:;'!|()-/".includes(ch)) return 0.3;
  return 0.45;
};

const textEm = (t) => [...t].reduce((sum, ch) => sum + charEm(ch), 0) * 1.1;

/**
 * Picks the font size for `text` (between max and min) so it fits in `lines` lines of
 * `width` px, erring on the side of smaller so the PDF export never overflows.
 * If it still does not fit at `min`, the text is cut with a real "…" (not CSS, which
 * html2canvas ignores) so preview and PDF agree; the full text stays in the tooltip.
 */
const fitText = (text, width, { max = 14, min = 9, lines = 1 } = {}) => {
  const t = String(text ?? '').trim();
  if (!t) return { size: max, text: t };
  const em = textEm(t);
  if (lines > 1) {
    // Prefer a single line if a small shrink is enough; otherwise wrap.
    const floor = Math.max(min, max * 0.82);
    for (let s = max; s >= floor; s -= 0.5) {
      if (em * s <= width) return { size: s, text: t };
    }
  }
  const room = lines === 1 ? width : width * lines * 0.8; // wrapping wastes some of each line
  for (let s = max; s >= min; s -= 0.5) {
    if (em * s <= room) return { size: s, text: t };
  }
  const chars = [...t];
  while (chars.length > 1 && textEm(`${chars.join('')}…`) * min > room) chars.pop();
  return { size: min, text: `${chars.join('').trimEnd()}…` };
};

const joinAddress = (...parts) => parts.filter(Boolean).join(' ');

/* ------------------------------------------------------------------ */
/*  SVG helpers                                                        */
/* ------------------------------------------------------------------ */

/** Eight-pointed star (Khatam): the union of two squares. */
const star8 = (cx, cy, r, rotate = 0) => {
  const inner = r * 0.7654;
  const pts = [];
  for (let i = 0; i < 16; i += 1) {
    const radius = i % 2 === 0 ? r : inner;
    const a = ((i * 22.5 + rotate - 90) * Math.PI) / 180;
    pts.push(`${(cx + radius * Math.cos(a)).toFixed(2)},${(cy + radius * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
};

const diamond = (cx, cy, r) => `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;

/** Rectangle with concave (inverted) corners. */
const notchPath = (w, h, n) =>
  `M ${n} 0 H ${w - n} A ${n} ${n} 0 0 0 ${w} ${n} V ${h - n} A ${n} ${n} 0 0 0 ${w - n} ${h} ` +
  `H ${n} A ${n} ${n} 0 0 0 0 ${h - n} V ${n} A ${n} ${n} 0 0 0 ${n} 0 Z`;

/**
 * Ogee arch for the photo frames: straight sides up to 30% of the height, then wide,
 * shallow shoulders rising to a small point. Wide enough that a portrait is not cropped.
 */
const ogeePath = (w, h, i) => {
  const L = i;
  const R = w - i;
  const B = h - i;
  const t = i;
  const S = 0.3 * h;
  const m = w / 2;
  const mx = (x) => w - x;
  return (
    `M ${L} ${B} V ${S} ` +
    `C ${L} ${S - 0.06 * h} ${L + 0.05 * w} ${S - 0.12 * h} ${L + 0.16 * w} ${S - 0.16 * h} ` +
    `C ${L + 0.3 * w} ${S - 0.21 * h} ${m - 0.06 * w} ${t + 0.07 * h} ${m} ${t} ` +
    `C ${m + 0.06 * w} ${t + 0.07 * h} ${mx(L + 0.3 * w)} ${S - 0.21 * h} ${mx(L + 0.16 * w)} ${S - 0.16 * h} ` +
    `C ${mx(L + 0.05 * w)} ${S - 0.12 * h} ${R} ${S - 0.06 * h} ${R} ${S} V ${B} Z`
  );
};

/**
 * Position SVGs with a wrapper <div>, never with inline styles on the <svg> itself:
 * html2canvas rasterises each <svg> as a standalone image, where `position/left/top`
 * on the root element shifts the drawing inside the image.
 */
const SvgAt = ({ left = 0, top = 0, width, height, children }) => (
  <div style={{ position: 'absolute', left, top, width, height }}>{children}</div>
);

const GOLD_GRAD = (
  <linearGradient id="mc-gold" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stopColor="#F0DEA3" />
    <stop offset="0.5" stopColor="#C29A40" />
    <stop offset="1" stopColor="#8F6A1F" />
  </linearGradient>
);

/** Triangular lattice corner with a scalloped outer edge. `flip` = [sx, sy]. */
const Fan = ({ x, y, size, flip = [1, 1] }) => {
  const n = Math.max(6, Math.round(size / 15));
  const chord = (size * Math.SQRT2) / n;
  const arcs = [];
  for (let i = 1; i <= n; i += 1) {
    arcs.push(`A ${(chord * 0.58).toFixed(2)} ${(chord * 0.58).toFixed(2)} 0 0 1 ${(size - (size * i) / n).toFixed(2)} ${((size * i) / n).toFixed(2)}`);
  }
  const d = `M 0 0 H ${size} ${arcs.join(' ')} Z`;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip[0]} ${flip[1]})`}>
      <path d={d} fill="url(#mc-lattice)" stroke="url(#mc-gold)" strokeWidth="1.6" strokeLinejoin="round" />
    </g>
  );
};

/** Page border, corner lattices and the ogee arch behind the header. */
const PageFrame = () => {
  const W = PAGE_W;
  const H = PAGE_H;
  return (
    <SvgAt width={W} height={H}>
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        {GOLD_GRAD}
        <pattern id="mc-lattice" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#0C4F3B" />
          <path d="M0 10H20M10 0V20" stroke={C.gold} strokeWidth="0.4" opacity="0.7" />
          <polygon points={star8(10, 10, 8.6)} fill="none" stroke={C.goldLight} strokeWidth="0.8" />
          <polygon points={star8(10, 10, 4.4, 22.5)} fill={C.gold} opacity="0.85" />
          <polygon points={diamond(0, 0, 3)} fill={C.goldLight} opacity="0.7" />
          <polygon points={diamond(20, 0, 3)} fill={C.goldLight} opacity="0.7" />
          <polygon points={diamond(0, 20, 3)} fill={C.goldLight} opacity="0.7" />
          <polygon points={diamond(20, 20, 3)} fill={C.goldLight} opacity="0.7" />
        </pattern>
        <linearGradient id="mc-arch-line" gradientUnits="userSpaceOnUse" x1="0" y1="24" x2="0" y2="156">
          <stop offset="0" stopColor="#B48A35" />
          <stop offset="0.7" stopColor="#B48A35" />
          <stop offset="1" stopColor="#B48A35" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="mc-arch-wash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill={C.paper} />

      {/* frame lines */}
      <rect x="4" y="4" width={W - 8} height={H - 8} fill="none" stroke={C.deep} strokeWidth="3.6" />
      <rect x="10" y="10" width={W - 20} height={H - 20} fill="none" stroke="url(#mc-gold)" strokeWidth="1.4" />
      <rect x="14.5" y="14.5" width={W - 29} height={H - 29} fill="none" stroke={C.gold} strokeWidth="0.6" />
      <rect x="19" y="19" width={W - 38} height={H - 38} fill="none" stroke={C.deep} strokeWidth="0.7" opacity="0.55" />

      {/* ogee arch behind the header */}
      <path
        d="M 176 152 C 176 112 196 96 232 88 C 292 80 384 68 397 27 C 410 68 502 80 562 88 C 598 96 618 112 618 152 Z"
        fill="url(#mc-arch-wash)"
      />
      <path
        d="M 176 152 C 176 112 196 96 232 88 C 292 80 384 68 397 27 C 410 68 502 80 562 88 C 598 96 618 112 618 152"
        fill="none"
        stroke="url(#mc-arch-line)"
        strokeWidth="1.9"
      />
      <path
        d="M 187 152 C 187 118 205 104 238 97 C 296 89 380 78 397 40 C 414 78 498 89 556 97 C 589 104 607 118 607 152"
        fill="none"
        stroke="url(#mc-arch-line)"
        strokeWidth="0.8"
      />
      {/* finial */}
      <circle cx="397" cy="20" r="3" fill="url(#mc-gold)" />
      <polygon points={diamond(397, 27, 3.4)} fill="url(#mc-gold)" />

      {/* corner lattices (top larger than bottom) */}
      <Fan x={10} y={10} size={150} />
      <Fan x={W - 10} y={10} size={150} flip={[-1, 1]} />
      <Fan x={10} y={H - 10} size={104} flip={[1, -1]} />
      <Fan x={W - 10} y={H - 10} size={104} flip={[-1, -1]} />
    </svg>
    </SvgAt>
  );
};

/** Mosque with dome, minarets and crescent. */
const Mosque = () => (
  <svg width="96" height="60" viewBox="0 0 112 70" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <defs>{GOLD_GRAD}</defs>
    {/* crescent */}
    <path d="M 53.2 6.4 A 5.6 5.6 0 1 0 60.4 10.8 A 4.4 4.4 0 1 1 53.2 6.4 Z" fill={C.deep} transform="translate(-1.4 -2)" />
    <line x1="56" y1="10" x2="56" y2="17" stroke={C.deep} strokeWidth="1.4" />
    {/* main dome */}
    <path d="M 36 46 C 33 34 46 28 56 16 C 66 28 79 34 76 46 Z" fill={C.deep} />
    <rect x="36" y="46" width="40" height="15" fill={C.deep} />
    <path d="M 50 61 V 54 A 6 6 0 0 1 62 54 V 61 Z" fill={C.goldLight} />
    {/* side domes */}
    <path d="M 24 52 C 24 45 30 44 31 40 C 33 44 38 45 38 52 Z" fill={C.deep} />
    <path d="M 74 52 C 74 45 79 44 81 40 C 82 44 88 45 88 52 Z" fill={C.deep} />
    <rect x="24" y="52" width="14" height="9" fill={C.deep} />
    <rect x="74" y="52" width="14" height="9" fill={C.deep} />
    {/* minarets */}
    {[16, 96].map((cx) => (
      <g key={cx}>
        <rect x={cx - 3} y="28" width="6" height="33" fill={C.deep} />
        <rect x={cx - 5} y="30" width="10" height="2.4" fill={C.deep} />
        <path d={`M ${cx - 4} 28 L ${cx} 14 L ${cx + 4} 28 Z`} fill={C.deep} />
        <line x1={cx} y1="14" x2={cx} y2="8" stroke={C.deep} strokeWidth="1" />
        <circle cx={cx} cy="7.5" r="1.4" fill={C.deep} />
      </g>
    ))}
    <rect x="6" y="61" width="100" height="4" fill={C.deep} />
    <rect x="2" y="65" width="108" height="1.4" fill="url(#mc-gold)" />
  </svg>
);

/** One hanging lantern, origin at the top of the string. */
const Lantern = ({ x, y, scale = 1, stringFrom = 0 }) => (
  <g>
    <line x1={x} y1={stringFrom} x2={x} y2={y + 4 * scale} stroke={C.gold} strokeWidth="0.9" />
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="4" r="3" fill="none" stroke="url(#mc-gold)" strokeWidth="1.2" />
      <path d="M -3.4 15 L 0 7 L 3.4 15 Z" fill="url(#mc-gold)" />
      <path d="M -12 30 C -12 21 -5 17 0 15 C 5 17 12 21 12 30 Z" fill={C.paper} stroke="url(#mc-gold)" strokeWidth="1.3" />
      <path d="M -6 28 C -6 23 -2 20 0 18 C 2 20 6 23 6 28 Z" fill={C.goldLight} opacity="0.7" />
      <rect x="-13.5" y="30" width="27" height="3.6" fill="url(#mc-gold)" />
      <path d="M -11.5 33.6 L -14.5 68 L 14.5 68 L 11.5 33.6 Z" fill={C.paper} stroke="url(#mc-gold)" strokeWidth="1.3" />
      {[-7, 0, 7].map((cx) => (
        <path key={cx} d={`M ${cx - 3.2} 63 V 46 A 3.2 3.2 0 0 1 ${cx + 3.2} 46 V 63 Z`} fill={C.goldLight} stroke={C.gold} strokeWidth="0.7" opacity="0.9" />
      ))}
      <rect x="-15.5" y="68" width="31" height="3.6" fill="url(#mc-gold)" />
      <path d="M -12.5 71.6 L 0 88 L 12.5 71.6 Z" fill="url(#mc-gold)" />
      <line x1="0" y1="88" x2="0" y2="95" stroke={C.gold} strokeWidth="1" />
      <circle cx="0" cy="96.5" r="1.8" fill="url(#mc-gold)" />
    </g>
  </g>
);

const Lanterns = () => (
  <svg width="120" height="230" viewBox="0 0 120 230" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <defs>{GOLD_GRAD}</defs>
    <Lantern x={32} y={64} scale={1} stringFrom={0} />
    <Lantern x={74} y={118} scale={0.86} stringFrom={0} />
  </svg>
);

/**
 * Thin gold line with a diamond at one end. `mirror` puts the diamond on the left.
 * Mirrored by geometry, not CSS: html2canvas ignores `transform` on <svg> elements.
 */
const OrnamentLine = ({ width = 200, mirror = false }) => {
  const id = `mc-of-${width}-${mirror ? 'r' : 'l'}`;
  return (
    <svg width={width} height="12" viewBox={`0 0 ${width} 12`} xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={width} y2="0">
          <stop offset="0" stopColor={C.gold} stopOpacity={mirror ? 1 : 0} />
          <stop offset="1" stopColor={C.gold} stopOpacity={mirror ? 0 : 1} />
        </linearGradient>
      </defs>
      <line x1={mirror ? 10 : 0} y1="6" x2={mirror ? width : width - 10} y2="6" stroke={`url(#${id})`} strokeWidth="1" />
      <polygon points={diamond(mirror ? 4 : width - 4, 6, 3.6)} fill={C.gold} />
    </svg>
  );
};

/** Ornamental divider under the title:  ——— ◇ ——— */
const TitleDivider = () => (
  <svg width="270" height="16" viewBox="0 0 270 16" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <defs>
      <linearGradient id="mc-td-l" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="118" y2="0">
        <stop offset="0" stopColor={C.gold} stopOpacity="0" />
        <stop offset="1" stopColor={C.gold} stopOpacity="1" />
      </linearGradient>
      <linearGradient id="mc-td-r" gradientUnits="userSpaceOnUse" x1="152" y1="0" x2="270" y2="0">
        <stop offset="0" stopColor={C.gold} stopOpacity="1" />
        <stop offset="1" stopColor={C.gold} stopOpacity="0" />
      </linearGradient>
    </defs>
    <line x1="0" y1="8" x2="118" y2="8" stroke="url(#mc-td-l)" strokeWidth="1" />
    <line x1="152" y1="8" x2="270" y2="8" stroke="url(#mc-td-r)" strokeWidth="1" />
    <polygon points={diamond(135, 8, 7)} fill="none" stroke={C.gold} strokeWidth="1" />
    <polygon points={diamond(135, 8, 3.2)} fill={C.gold} />
    <polygon points={diamond(123, 8, 2.2)} fill={C.gold} />
    <polygon points={diamond(147, 8, 2.2)} fill={C.gold} />
  </svg>
);

/**
 * Box background with concave corners, an inner keyline and optional side diamonds.
 * The SVG is larger than the box (by PAD) so the diamonds are not clipped.
 */
const PAD = 12;

/** Wrapper SVG sized box + PAD on every side, content translated by PAD (no negative viewBox origin). */
const BoxSvg = ({ width, height, children }) => (
  <SvgAt left={-PAD} top={-PAD} width={width + PAD * 2} height={height + PAD * 2}>
    <svg
      width={width + PAD * 2}
      height={height + PAD * 2}
      viewBox={`0 0 ${width + PAD * 2} ${height + PAD * 2}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>{GOLD_GRAD}</defs>
      <g transform={`translate(${PAD} ${PAD})`}>{children}</g>
    </svg>
  </SvgAt>
);

const NotchBox = ({ width, height, notch = 10, fill, stroke = C.gold, sideDiamonds = false, inner = true }) => (
  <BoxSvg width={width} height={height}>
    <path d={notchPath(width, height, notch)} fill={fill} stroke={stroke} strokeWidth="1.2" />
    {inner && (
      <path d={notchPath(width - 8, height - 8, Math.max(2, notch - 3))} transform="translate(4 4)" fill="none" stroke={C.goldLight} strokeWidth="0.7" />
    )}
    {sideDiamonds &&
      [0, width].map((x) => (
        <g key={x}>
          <polygon points={diamond(x, height / 2, 8)} fill={C.paper} stroke="url(#mc-gold)" strokeWidth="1.2" />
          <polygon points={diamond(x, height / 2, 3.6)} fill={C.gold} />
        </g>
      ))}
  </BoxSvg>
);

const RoundBox = ({ width, height, radius = 22, fill }) => (
  <BoxSvg width={width} height={height}>
    <rect width={width} height={height} rx={radius} fill={fill} stroke={C.gold} strokeWidth="1.2" />
    <rect x="4" y="4" width={width - 8} height={height - 8} rx={radius - 4} fill="none" stroke={C.goldLight} strokeWidth="0.7" />
  </BoxSvg>
);

/* ------------------------------------------------------------------ */
/*  Layout building blocks                                             */
/* ------------------------------------------------------------------ */

const Abs = ({ left = 0, top = 0, width, height, style, children }) => (
  <div style={{ position: 'absolute', left, top, width, height, ...style }}>{children}</div>
);

/** A value that shrinks / wraps to fit its box. Never changes the box size. */
const FitValue = ({
  text,
  width,
  lines = 1,
  max = 14,
  min = 9,
  align = 'left',
  color = C.value,
  weight = 500,
  center = false,
}) => {
  const value = text == null ? '' : String(text).trim();
  const { size, text: shown } = fitText(value, width, { max, min, lines });
  const lh = Math.round(size * 1.2);
  // +3px slack: html2canvas draws text ~1px lower than the browser, which would clip descenders.
  const boxH = Math.round(max * 1.2) * lines + 3;
  return (
    <div
      title={value}
      style={{
        width: `${width}px`,
        height: `${boxH}px`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: center ? 'center' : 'flex-start',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      <div
        style={{
          width: '100%',
          fontFamily: F.serif,
          fontSize: `${size}px`,
          lineHeight: `${lh}px`,
          fontWeight: weight,
          color,
          textAlign: align,
          whiteSpace: lines > 1 ? 'normal' : 'nowrap',
          wordBreak: 'break-word',
        }}
      >
        {shown || ' '}
      </div>
    </div>
  );
};

const Label = ({ en, jp, width }) => (
  <div style={{ width: `${width}px`, flexShrink: 0 }}>
    <div style={{ fontFamily: F.serif, fontSize: '10px', lineHeight: '12px', fontWeight: 600, color: C.label, whiteSpace: 'nowrap' }}>{en}</div>
    <div style={{ fontFamily: F.jp, fontSize: '7.5px', lineHeight: '9px', color: C.muted, whiteSpace: 'nowrap' }}>{jp}</div>
  </div>
);

/** "Label / 日本語   :   value" row with a fixed height. */
const Row = ({ en, jp, value, width, labelW = 66, lines = 1, max = 14, min = 9, height = 22, valueColor, weight }) => {
  const valueW = width - labelW - 10;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', width: `${width}px`, height: `${height}px` }}>
      <Label en={en} jp={jp} width={labelW} />
      <div style={{ width: '10px', textAlign: 'center', fontFamily: F.serif, fontSize: '12px', lineHeight: '14px', color: C.gold }}>:</div>
      <FitValue text={value} width={valueW} lines={lines} max={max} min={min} color={valueColor} weight={weight} />
    </div>
  );
};

const SignatureLine = ({ en, jp, url, width, imgH = 40 }) => (
  <div style={{ width: `${width}px` }}>
    <div style={{ height: `${imgH}px`, position: 'relative', borderBottom: `1px solid ${C.goldDark}` }}>
      {url && (
        <div
          style={{
            position: 'absolute',
            left: '4px',
            right: '4px',
            top: '2px',
            bottom: '1px',
            backgroundImage: `url(${url})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
    <div style={{ marginTop: '3px', fontFamily: F.serif, fontSize: '9.5px', lineHeight: '11px', fontWeight: 600, color: C.label, whiteSpace: 'nowrap' }}>{en}</div>
    <div style={{ fontFamily: F.jp, fontSize: '7.5px', lineHeight: '9px', color: C.muted, whiteSpace: 'nowrap' }}>{jp}</div>
  </div>
);

const SectionHeading = ({ en, jp, size = 13 }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontFamily: F.display, fontSize: `${size}px`, lineHeight: `${size + 4}px`, fontWeight: 700, letterSpacing: '0.1em', color: C.deep, whiteSpace: 'nowrap' }}>{en}</div>
    <div style={{ fontFamily: F.jp, fontSize: '8.5px', lineHeight: '11px', color: C.muted, whiteSpace: 'nowrap' }}>{jp}</div>
  </div>
);

/** SectionHeading with a fading ornament line on each side. */
const FlankedHeading = ({ en, jp, size = 13, line = 100 }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '14px' }}>
    <div style={{ paddingTop: `${Math.round((size + 4) / 2) - 6}px` }}>
      <OrnamentLine width={line} />
    </div>
    <SectionHeading en={en} jp={jp} size={size} />
    <div style={{ paddingTop: `${Math.round((size + 4) / 2) - 6}px` }}>
      <OrnamentLine width={line} mirror />
    </div>
  </div>
);

/* Photo frame: silhouette < photo < paper-coloured mask with an ogee hole < gold lines */
const PHOTO_W = 108;
const PHOTO_H = 144;

const Silhouette = ({ female }) => (
  <SvgAt width={PHOTO_W} height={PHOTO_H}>
  <svg width={PHOTO_W} height={PHOTO_H} viewBox={`0 0 ${PHOTO_W} ${PHOTO_H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <defs>
      <linearGradient id="mc-sil-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E3EAE4" />
        <stop offset="1" stopColor="#C6D3CA" />
      </linearGradient>
    </defs>
    <rect width={PHOTO_W} height={PHOTO_H} fill="url(#mc-sil-bg)" />
    {female ? (
      <g fill={C.deep}>
        <ellipse cx="54" cy="76" rx="25" ry="31" />
        <path d="M 12 144 C 12 108 32 98 54 98 C 76 98 96 108 96 144 Z" />
        <ellipse cx="54" cy="80" rx="12.5" ry="15.5" fill="#E3EAE4" />
      </g>
    ) : (
      <g fill={C.deep}>
        <circle cx="54" cy="72" r="17" />
        <path d="M 12 144 C 12 106 32 96 54 96 C 76 96 96 106 96 144 Z" />
        <path d="M 49 96 L 54 112 L 59 96 Z" fill="#E3EAE4" />
      </g>
    )}
  </svg>
  </SvgAt>
);

const PhotoMask = () => (
  <SvgAt width={PHOTO_W} height={PHOTO_H}>
  <svg width={PHOTO_W} height={PHOTO_H} viewBox={`0 0 ${PHOTO_W} ${PHOTO_H}`} xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <defs>{GOLD_GRAD}</defs>
    <path
      d={`M 0 0 H ${PHOTO_W} V ${PHOTO_H} H 0 Z ${ogeePath(PHOTO_W, PHOTO_H, 7)}`}
      fill={C.paper}
      fillRule="evenodd"
    />
    <path d={ogeePath(PHOTO_W, PHOTO_H, 7)} fill="none" stroke="url(#mc-gold)" strokeWidth="2.6" strokeLinejoin="round" />
    <path d={ogeePath(PHOTO_W, PHOTO_H, 3)} fill="none" stroke={C.gold} strokeWidth="0.9" strokeLinejoin="round" />
    <polygon points={diamond(PHOTO_W / 2, 1.6, 1.8)} fill="url(#mc-gold)" />
  </svg>
  </SvgAt>
);

const PhotoFrame = ({ url, female }) => (
  <div style={{ position: 'relative', width: `${PHOTO_W}px`, height: `${PHOTO_H}px`, background: C.paper }}>
    <Silhouette female={female} />
    {url && (
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat',
        }}
      />
    )}
    <PhotoMask />
  </div>
);

const COL_W = 326;
const TEXT_X = PHOTO_W + 14;
const TEXT_W = COL_W - TEXT_X;

const PersonColumn = ({ person = {}, type, left }) => {
  const isGroom = type === 'Groom';
  const address = joinAddress(person.addressLine1, person.addressLine2);
  const half = (TEXT_W - 8) / 2;
  return (
    <Abs left={left} top={300} width={COL_W} height={292}>
      <Abs left={0} top={2}>
        <PhotoFrame url={person.photoUrl} female={!isGroom} />
      </Abs>

      <Abs left={TEXT_X} top={0} width={TEXT_W} height={32}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '19px' }}>
          <div style={{ fontFamily: F.display, fontSize: '15px', lineHeight: '19px', fontWeight: 700, letterSpacing: '0.1em', color: C.deep, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{type}</div>
          <OrnamentLine width={TEXT_W - 76} mirror />
        </div>
        <div style={{ fontFamily: F.jp, fontSize: '9px', lineHeight: '12px', color: C.muted }}>{isGroom ? '新郎の詳細' : '新婦の詳細'}</div>
      </Abs>

      <Abs left={TEXT_X} top={36} width={TEXT_W}>
        <Row en="Muslim Name" jp="ムスリム名" value={person.muslimName} width={TEXT_W} max={15} min={9} valueColor={C.deep} weight={600} />
        <Row en="Name" jp="氏名" value={person.name} width={TEXT_W} lines={2} min={9.5} height={34} />
        <Row en="Father's Name" jp="父親の名前" value={person.fatherName} width={TEXT_W} min={9} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Row en="Age" jp="年齢" value={person.age} width={half} labelW={28} min={9.5} />
          <Row en="Religion" jp="宗教" value={person.religion} width={half} labelW={42} min={9.5} />
        </div>
        <Row en="Nationality" jp="国籍" value={person.nationality} width={TEXT_W} min={9} />
        <Row en="Passport No." jp="パスポート番号" value={person.passportNo} width={TEXT_W} min={9} />
        <Row en="Address" jp="住所" value={address} width={TEXT_W} lines={2} max={13} min={9} height={34} />
      </Abs>

      <Abs left={0} top={226} width={214}>
        <SignatureLine en={`${type} Signature`} jp={isGroom ? '新郎の署名' : '新婦の署名'} url={person.signUrl} width={214} imgH={40} />
      </Abs>
    </Abs>
  );
};

const WitnessBox = ({ witness = {}, index, left, top }) => {
  const W = 334;
  const H = 136;
  const inner = W - 32;
  return (
    <Abs left={left} top={top} width={W} height={H}>
      <NotchBox width={W} height={H} notch={11} fill={C.white} stroke={C.line} />
      <Abs left={16} top={9} width={inner}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', height: '20px' }}>
          <span style={{ fontFamily: F.display, fontSize: '13px', lineHeight: '18px', fontWeight: 700, color: C.deep }}>Witness {index + 1}</span>
          <span style={{ fontFamily: F.jp, fontSize: '8.5px', color: C.muted }}>証人 {index + 1}</span>
        </div>
        <div style={{ marginTop: '2px' }}>
          <Row en="Name" jp="氏名" value={witness.name} width={inner} labelW={48} height={22} />
          <Row en="Address" jp="住所" value={witness.address} width={inner} labelW={48} lines={2} max={13} min={9} height={30} />
        </div>
      </Abs>
      <Abs left={16} top={86} width={inner}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SignatureLine en="Signature" jp="署名" url={witness.signUrl} width={inner - 58} imgH={24} />
        </div>
      </Abs>
    </Abs>
  );
};

/* ------------------------------------------------------------------ */
/*  Certificate                                                        */
/* ------------------------------------------------------------------ */

const MarriageCertificate = ({ data = {} }) => {
  const { groom = {}, bride = {}, details = {}, witnesses = [], solemnizedBy = {} } = data;

  const facts = [
    { en: 'Date of Marriage', jp: '結婚の日', value: details.date },
    { en: 'Place of Marriage', jp: '結婚の場所', value: details.place },
    { en: 'Amount of Dower (Mahar)', jp: '結納金の額と内容', value: details.mahar },
  ];

  const PANEL_W = 682;
  const PANEL_X = 56;
  const colW = PANEL_W / 3;

  return (
    <div
      style={{
        position: 'relative',
        width: `${PAGE_W}px`,
        height: `${PAGE_H}px`,
        margin: '0 auto',
        boxSizing: 'border-box',
        overflow: 'hidden',
        background: C.paper,
        color: C.ink,
        fontFamily: F.serif,
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: FONT_CSS }} />

      <PageFrame />

      {/* ------------------------------ Header ------------------------------ */}
      <Abs left={641} top={16} width={120} height={230}>
        <Lanterns />
      </Abs>

      <Abs left={84} top={112} width={100}>
        <div style={{ fontFamily: F.jp, fontSize: '8.5px', lineHeight: '11px', color: C.muted }}>証明書番号</div>
        <div style={{ fontFamily: F.serif, fontSize: '12px', lineHeight: '14px', fontWeight: 600, color: C.ink }}>Certificate No.</div>
        <div style={{ marginTop: '2px', borderBottom: `1px solid ${C.gold}`, paddingBottom: '2px' }}>
          <FitValue text={details.certificateNo || '—'} width={100} lines={1} max={11.5} min={7.5} weight={600} />
        </div>
      </Abs>

      <Abs left={349} top={48} width={96} height={60}>
        <Mosque />
      </Abs>

      <Abs left={197} top={108} width={400} height={46} style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: F.arabic, fontSize: '30px', lineHeight: '46px', fontWeight: 700, color: C.deep, direction: 'rtl', whiteSpace: 'nowrap' }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
      </Abs>

      <Abs left={197} top={162} width={400} height={26} style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: F.jp, fontSize: '19px', lineHeight: '26px', letterSpacing: '0.55em', paddingLeft: '0.55em', color: C.gold, whiteSpace: 'nowrap' }}>結婚証明書</div>
      </Abs>

      <Abs left={56} top={190} width={682} height={46} style={{ textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontFamily: F.display, fontSize: '38px', lineHeight: '46px', fontWeight: 700, color: C.deep, whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>
          MARRIAGE CERTIFICATE
        </h1>
      </Abs>

      <Abs left={56} top={241} width={682} height={14} style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: F.serif, fontSize: '8.6px', lineHeight: '14px', fontWeight: 500, letterSpacing: '0.24em', paddingLeft: '0.24em', color: C.label, whiteSpace: 'nowrap' }}>
          IN THE NAME OF ALLAH, THE MOST GRACIOUS, THE MOST MERCIFUL
        </div>
      </Abs>

      <Abs left={262} top={262} width={270} height={16}>
        <TitleDivider />
      </Abs>

      {/* ------------------------------ Couple ------------------------------ */}
      <PersonColumn person={groom} type="Groom" left={56} />
      <PersonColumn person={bride} type="Bride" left={412} />

      <Abs left={396} top={308} width={2} height={276}>
        <svg width="2" height="276" viewBox="0 0 2 276" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="mc-vdiv" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="276">
              <stop offset="0" stopColor={C.gold} stopOpacity="0" />
              <stop offset="0.2" stopColor={C.gold} stopOpacity="1" />
              <stop offset="0.8" stopColor={C.gold} stopOpacity="1" />
              <stop offset="1" stopColor={C.gold} stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="1" y1="0" x2="1" y2="276" stroke="url(#mc-vdiv)" strokeWidth="1" />
        </svg>
      </Abs>
      <Abs left={390} top={438} width={14} height={14}>
        <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
          <polygon points={diamond(7, 7, 6)} fill={C.paper} stroke={C.gold} strokeWidth="1" />
          <polygon points={diamond(7, 7, 2.6)} fill={C.gold} />
        </svg>
      </Abs>

      {/* -------------------------- Marriage details ------------------------- */}
      <Abs left={PANEL_X} top={596} width={PANEL_W} height={114}>
        <NotchBox width={PANEL_W} height={114} notch={12} fill={C.tint} sideDiamonds />
        <Abs left={0} top={9} width={PANEL_W}>
          <FlankedHeading en="MARRIAGE DETAILS" jp="結婚の詳細" line={120} />
        </Abs>
        {facts.map((f, i) => (
          <Abs key={f.en} left={colW * i} top={44} width={colW} height={62} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: F.serif, fontSize: '10.5px', lineHeight: '12px', fontWeight: 600, color: C.label }}>{f.en}</div>
            <div style={{ fontFamily: F.jp, fontSize: '8px', lineHeight: '10px', color: C.muted }}>{f.jp}</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
              <FitValue text={f.value || '—'} width={colW - 44} lines={2} max={15} min={10} align="center" center weight={600} />
            </div>
          </Abs>
        ))}
        {[1, 2].map((i) => (
          <Abs key={i} left={colW * i} top={48} width={1} height={52}>
            <div style={{ width: '1px', height: '100%', background: C.goldLight }} />
          </Abs>
        ))}
      </Abs>

      {/* ---------------------------- Declaration --------------------------- */}
      <Abs left={77} top={722} width={640} height={42} style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: F.jp, fontSize: '8px', lineHeight: '11px', color: C.muted }}>
          新郎新婦が、イスラム法に従い、申し出と承諾（イジャーブとカブール）を交わしたことを証明し、二人が夫婦であることをここに宣言します。
        </div>
        <div style={{ marginTop: '3px', fontFamily: F.serif, fontStyle: 'italic', fontSize: '12.5px', lineHeight: '15px', fontWeight: 500, color: C.deep }}>
          I certify that the Bride &amp; Groom have exchanged the offering and acceptance (Ijab and Qubul) according to Islamic Law and are declared Husband and Wife.
        </div>
      </Abs>

      {/* ----------------------------- Witnesses ---------------------------- */}
      <Abs left={56} top={772} width={682} height={26}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
          <OrnamentLine width={230} />
          <SectionHeading en="WITNESSES" jp="証人" />
          <OrnamentLine width={230} mirror />
        </div>
      </Abs>
      <WitnessBox witness={witnesses[0]} index={0} left={56} top={804} />
      <WitnessBox witness={witnesses[1]} index={1} left={404} top={804} />

      {/* --------------------------- Solemnized by -------------------------- */}
      <Abs left={56} top={950} width={682} height={96}>
        <RoundBox width={682} height={96} radius={24} fill={C.greenTint} />
        <Abs left={0} top={7} width={682}>
          <FlankedHeading en="MARRIAGE SOLEMNIZED BY" jp="婚姻執行者" size={12} line={120} />
        </Abs>
        <Abs left={34} top={40} width={360}>
          <Row en="Name" jp="氏名" value={solemnizedBy.name} width={360} labelW={48} height={22} />
          <Row en="Address" jp="住所" value={solemnizedBy.address} width={360} labelW={48} lines={2} max={13} min={9} height={30} />
        </Abs>
        <Abs left={434} top={30} width={214}>
          <SignatureLine en="Solemnizer Signature" jp="執行者の署名" url={solemnizedBy.signUrl} width={214} imgH={36} />
        </Abs>
      </Abs>

      {/* ------------------------------ Footer ------------------------------ */}
      <Abs left={56} top={1064} width={682} height={16}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <OrnamentLine width={120} />
          <div style={{ fontFamily: F.serif, fontStyle: 'italic', fontSize: '11px', lineHeight: '14px', color: C.label, whiteSpace: 'nowrap' }}>
            May Allah bless this union with peace, love and barakah.
          </div>
          <OrnamentLine width={120} mirror />
        </div>
      </Abs>
    </div>
  );
};

export default MarriageCertificate;
