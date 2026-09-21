import React from 'react';

/**
 * Islamic Marriage Certificate — single A4 portrait page (794 x 1122 px).
 * ---------------------------------------------------------------------
 * - Same data shape as before: groom, bride, details, witnesses, solemnizedBy
 * - The border, corner rosettes, arch, icons and seal are inline SVG, so no
 *   image assets are needed and they stay sharp in the PDF export.
 * - The page is 1122px (not 1123px) on purpose: html2pdf slices the canvas into
 *   floor(width * 297/210) px pages, and 1123px would spill 1px onto page two.
 * - Text stays in HTML so web fonts and Arabic / Japanese / Bengali shaping work.
 */

const PAGE_W = 794;
const PAGE_H = 1122;

const C = {
  ink: '#1C2B26',
  emerald: '#0E6B50',
  deep: '#0A4A38',
  darkest: '#06392B',
  gold: '#B8912F',
  goldDark: '#8E6D1E',
  goldLight: '#E6D296',
  ivory: '#FBF7EC',
  paper: '#FFFEFA',
  cream: '#F5EEDB',
  line: '#DCD1B6',
  muted: '#6C6F68',
};

const F = {
  display: '"Cinzel", "Cormorant Garamond", Georgia, serif',
  serif: '"EB Garamond", "Cormorant Garamond", Georgia, "Times New Roman", serif',
  italic: '"Cormorant Garamond", "EB Garamond", Georgia, serif',
  sans: '"Lato", "Noto Sans", Arial, sans-serif',
  arabic: '"Amiri", "Scheherazade New", "Traditional Arabic", serif',
};

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@1,500;1,600&family=EB+Garamond:wght@500;600;700&family=Lato:wght@400;700&display=swap';

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

/** Starburst / scalloped seal outline with `n` points. */
const burst = (cx, cy, rOuter, rInner, n) => {
  const pts = [];
  for (let i = 0; i < n * 2; i += 1) {
    const radius = i % 2 === 0 ? rOuter : rInner;
    const a = ((i * 180) / n - 90) * (Math.PI / 180);
    pts.push(`${(cx + radius * Math.cos(a)).toFixed(2)},${(cy + radius * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
};

/** Corner rosette: emerald disc, golden star, inner star and jewel. */
const Rosette = ({ x, y, r = 23 }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill={C.ivory} stroke={C.gold} strokeWidth="1.2" />
    <circle r={r - 3.5} fill={C.deep} />
    <circle r={r - 5} fill="none" stroke={C.goldLight} strokeWidth="0.6" />
    <polygon points={star8(0, 0, r - 5.5)} fill="url(#mc-gold)" />
    <polygon points={star8(0, 0, r - 10.5, 22.5)} fill={C.deep} />
    <polygon points={star8(0, 0, r - 13.5)} fill={C.goldLight} />
    <circle r={r * 0.16} fill={C.deep} />
  </g>
);

/** Small diamond ornament used at the mid-points of the frame. */
const Diamond = ({ x, y, s = 9, rotate = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    <rect x={-s} y={-s * 0.55} width={s * 2} height={s * 1.1} fill={C.ivory} />
    <polygon points={`0,${-s * 0.9} ${s * 0.9},0 0,${s * 0.9} ${-s * 0.9},0`} fill={C.deep} stroke={C.gold} strokeWidth="1" />
    <polygon points={`0,${-s * 0.45} ${s * 0.45},0 0,${s * 0.45} ${-s * 0.45},0`} fill={C.goldLight} />
  </g>
);

/** Full-page ornamental border, tiled background and corner / mid-point details. */
const PageFrame = () => {
  const W = PAGE_W;
  const H = PAGE_H;
  const inset = (n) => ({ x: n, y: n, width: W - n * 2, height: H - n * 2 });
  const cut = 16; // radius of the concave inner-corner cut-outs
  const i = 41; // inset of the innermost frame
  const inner =
    `M ${i + cut} ${i} H ${W - i - cut} A ${cut} ${cut} 0 0 0 ${W - i} ${i + cut} ` +
    `V ${H - i - cut} A ${cut} ${cut} 0 0 0 ${W - i - cut} ${H - i} ` +
    `H ${i + cut} A ${cut} ${cut} 0 0 0 ${i} ${H - i - cut} ` +
    `V ${i + cut} A ${cut} ${cut} 0 0 0 ${i + cut} ${i} Z`;

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', top: 0, left: 0, display: 'block' }}
    >
      <defs>
        <linearGradient id="mc-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F1DFA4" />
          <stop offset="0.45" stopColor="#C9A144" />
          <stop offset="1" stopColor="#8E6D1E" />
        </linearGradient>
        <linearGradient id="mc-emerald" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0E6B50" />
          <stop offset="1" stopColor="#06392B" />
        </linearGradient>
        <radialGradient id="mc-glow" cx="0.5" cy="0.45" r="0.75">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FBF7EC" stopOpacity="0" />
        </radialGradient>
        <pattern id="mc-tile" width="44" height="44" patternUnits="userSpaceOnUse">
          <polygon points={star8(22, 22, 14)} fill="none" stroke={C.emerald} strokeWidth="0.7" />
          <polygon points={star8(22, 22, 8, 22.5)} fill="none" stroke={C.gold} strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.6" fill={C.gold} />
          <circle cx="44" cy="0" r="1.6" fill={C.gold} />
          <circle cx="0" cy="44" r="1.6" fill={C.gold} />
          <circle cx="44" cy="44" r="1.6" fill={C.gold} />
        </pattern>
      </defs>

      {/* paper */}
      <rect width={W} height={H} fill={C.ivory} />
      <path d={inner} fill="url(#mc-tile)" opacity="0.13" />
      <path d={inner} fill="url(#mc-glow)" />

      {/* frame stack (outside -> inside) */}
      <rect {...inset(9)} fill="none" stroke="url(#mc-gold)" strokeWidth="1.6" />
      <rect {...inset(14)} fill="none" stroke="url(#mc-emerald)" strokeWidth="6" />
      <rect {...inset(20)} fill="none" stroke="url(#mc-gold)" strokeWidth="1.2" />
      <rect
        {...inset(26)}
        fill="none"
        stroke={C.gold}
        strokeWidth="2.4"
        strokeDasharray="0.1 6.2"
        strokeLinecap="round"
      />
      <rect {...inset(32)} fill="none" stroke={C.emerald} strokeWidth="0.8" />
      <path d={inner} fill="none" stroke="url(#mc-gold)" strokeWidth="1.4" />

      {/* mid-point ornaments */}
      <Diamond x={W / 2} y={17} s={12} />
      <Diamond x={W / 2} y={H - 17} s={12} />
      <Diamond x={17} y={H / 2} s={12} rotate={90} />
      <Diamond x={W - 17} y={H / 2} s={12} rotate={90} />

      {/* quarter mid-points */}
      {[0.25, 0.75].map((t) => (
        <React.Fragment key={t}>
          <Diamond x={W * t} y={17} s={6} />
          <Diamond x={W * t} y={H - 17} s={6} />
          <Diamond x={17} y={H * t} s={6} rotate={90} />
          <Diamond x={W - 17} y={H * t} s={6} rotate={90} />
        </React.Fragment>
      ))}

      {/* corner rosettes */}
      <Rosette x={28} y={28} />
      <Rosette x={W - 28} y={28} />
      <Rosette x={28} y={H - 28} />
      <Rosette x={W - 28} y={H - 28} />
    </svg>
  );
};

/** Pointed mihrab arch that frames the Bismillah. */
const ARCH_W = 380;
const ARCH_H = 132;

const archPath = (inset, radius, springY) => {
  const l = inset;
  const r = ARCH_W - inset;
  const mid = ARCH_W / 2;
  const top = inset + 1;
  return (
    `M ${l} ${ARCH_H - 1} V ${springY} A ${radius} ${radius} 0 0 1 ${mid} ${top} ` +
    `A ${radius} ${radius} 0 0 1 ${r} ${springY} V ${ARCH_H - 1} Z`
  );
};

const MihrabArch = () => (
  <svg
    width={ARCH_W}
    height={ARCH_H}
    viewBox={`0 0 ${ARCH_W} ${ARCH_H}`}
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', top: 0, left: 0, display: 'block' }}
  >
    <defs>
      <linearGradient id="mc-arch-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0E6B50" stopOpacity="0.12" />
        <stop offset="1" stopColor="#FFFEFA" stopOpacity="0.95" />
      </linearGradient>
      <linearGradient id="mc-arch-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#E6D296" />
        <stop offset="0.5" stopColor="#B8912F" />
        <stop offset="1" stopColor="#8E6D1E" />
      </linearGradient>
    </defs>
    <path d={archPath(3, 250, 84)} fill="url(#mc-arch-fill)" stroke="url(#mc-arch-gold)" strokeWidth="2.2" />
    <path d={archPath(10, 238, 86)} fill="none" stroke={C.emerald} strokeWidth="0.9" />
    <path
      d={archPath(16, 230, 88)}
      fill="none"
      stroke={C.gold}
      strokeWidth="1.6"
      strokeDasharray="0.1 4.6"
      strokeLinecap="round"
    />
    {/* finial at the apex */}
    <circle cx={ARCH_W / 2} cy="4" r="9" fill={C.ivory} stroke="url(#mc-arch-gold)" strokeWidth="1.2" />
    <polygon points={star8(ARCH_W / 2, 4, 6.4)} fill={C.deep} />
    <circle cx={ARCH_W / 2} cy="4" r="1.7" fill={C.goldLight} />
  </svg>
);

/** Thin ornamental divider: ——— ◆ ——— */
const Divider = ({ width = 210, mirror = false }) => (
  <svg width={width} height="12" viewBox={`0 0 ${width} 12`} xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', transform: mirror ? 'scaleX(-1)' : 'none' }}>
    <defs>
      <linearGradient id="mc-div" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={width} y2="0">
        <stop offset="0" stopColor="#B8912F" stopOpacity="0" />
        <stop offset="1" stopColor="#B8912F" stopOpacity="1" />
      </linearGradient>
    </defs>
    <line x1="0" y1="6" x2={width - 16} y2="6" stroke="url(#mc-div)" strokeWidth="1" />
    <polygon points={`${width - 12},6 ${width - 6},1 ${width},6 ${width - 6},11`} fill={C.gold} />
    <circle cx={width - 20} cy="6" r="1.4" fill={C.gold} />
  </svg>
);

/** Round decorative seal (bottom centre). */
const Seal = () => (
  <svg width="58" height="58" viewBox="0 0 74 74" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <defs>
      <linearGradient id="mc-seal-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F1DFA4" />
        <stop offset="0.5" stopColor="#C9A144" />
        <stop offset="1" stopColor="#8E6D1E" />
      </linearGradient>
    </defs>
    <polygon points={burst(37, 37, 36, 32.5, 24)} fill="url(#mc-seal-gold)" />
    <circle cx="37" cy="37" r="28.5" fill="none" stroke={C.ivory} strokeWidth="1" />
    <circle cx="37" cy="37" r="26" fill={C.deep} />
    <circle cx="37" cy="37" r="23.6" fill="none" stroke={C.goldLight} strokeWidth="0.7" />
    <polygon points={star8(37, 37, 20)} fill="none" stroke={C.goldLight} strokeWidth="0.8" />
    <polygon points={star8(37, 37, 14.5, 22.5)} fill="none" stroke={C.gold} strokeWidth="0.8" />
    <circle cx="35" cy="37" r="9" fill={C.goldLight} />
    <circle cx="38.5" cy="35.2" r="7.6" fill={C.deep} />
    <polygon points={star8(43.5, 33.5, 3.6)} fill={C.goldLight} />
  </svg>
);

/* Small line icons for the "marriage facts" strip. */
const IconCalendar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.goldLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <polygon points={star8(12, 15, 2.6)} fill={C.goldLight} stroke="none" />
  </svg>
);
const IconPin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.goldLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.4" fill={C.goldLight} stroke="none" />
  </svg>
);
const IconCoin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.goldLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="5.6" strokeWidth="0.9" />
    <polygon points={star8(12, 12, 3.2)} fill={C.goldLight} stroke="none" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */

const ellipsis = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

/** One label + value row. Label is bilingual (English over Japanese). */
const Field = ({ label, labelAlt, value, labelWidth = 66, wrap = false }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', minWidth: 0 }}>
    <div style={{ width: `${labelWidth}px`, flexShrink: 0, paddingBottom: '2px' }}>
      <div style={{ fontFamily: F.sans, fontSize: '7.5px', lineHeight: 1.1, color: C.muted }}>{labelAlt}</div>
      <div
        style={{
          fontFamily: F.sans,
          fontSize: '8.5px',
          lineHeight: 1.2,
          fontWeight: 700,
          letterSpacing: '0.02em',
          color: C.deep,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
    <div
      title={value || ''}
      style={{
        flex: 1,
        minWidth: 0,
        borderBottom: `1px dotted ${C.gold}`,
        fontFamily: F.serif,
        fontSize: '14px',
        fontWeight: 500,
        color: C.ink,
        ...(wrap
          ? { minHeight: '20px', maxHeight: '36px', lineHeight: '17px', paddingTop: '1px', overflow: 'hidden' }
          : { height: '20px', lineHeight: '20px', ...ellipsis }),
      }}
    >
      {value || ' '}
    </div>
  </div>
);

/** A row without a label (used for the second address line). */
const BlankLine = ({ value, labelWidth = 66 }) => (
  <div style={{ display: 'flex', gap: '6px' }}>
    <div style={{ width: `${labelWidth}px`, flexShrink: 0 }} />
    <div
      title={value || ''}
      style={{
        flex: 1,
        minWidth: 0,
        height: '20px',
        lineHeight: '20px',
        borderBottom: `1px dotted ${C.gold}`,
        fontFamily: F.serif,
        fontSize: '14px',
        fontWeight: 500,
        color: C.ink,
        ...ellipsis,
      }}
    >
      {value || ' '}
    </div>
  </div>
);

const Signature = ({ title, titleAlt, signUrl, height = 34 }) => (
  <div>
    <div
      style={{
        height: `${height}px`,
        borderBottom: `1.2px solid ${C.goldDark}`,
        position: 'relative',
      }}
    >
      {signUrl && (
        <div
          style={{
            position: 'absolute',
            left: '8px',
            right: '8px',
            bottom: '1px',
            top: '2px',
            backgroundImage: `url(${signUrl})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
    <div
      style={{
        marginTop: '3px',
        display: 'flex',
        justifyContent: 'center',
        gap: '5px',
        fontFamily: F.sans,
        fontSize: '7.5px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: C.muted,
      }}
    >
      <span>{title}</span>
      <span style={{ color: C.gold }}>◆</span>
      <span style={{ letterSpacing: '0.04em' }}>{titleAlt}</span>
    </div>
  </div>
);

const PhotoFrame = ({ url, fallback }) => (
  <div
    style={{
      width: '68px',
      height: '86px',
      flexShrink: 0,
      padding: '3px',
      boxSizing: 'border-box',
      background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold} 55%, ${C.goldDark})`,
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '2px',
        boxSizing: 'border-box',
        background: C.paper,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: C.cream,
          backgroundImage: url ? `url(${url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: F.display,
          fontSize: '22px',
          color: C.goldLight,
        }}
      >
        {!url && fallback}
      </div>
    </div>
  </div>
);

const PersonCard = ({ person = {}, type }) => {
  const isGroom = type === 'Groom';
  const titleJp = isGroom ? '新郎' : '新婦';
  const titleBn = isGroom ? 'বরের পরিচয়' : 'কনের পরিচয়';
  const muslimNameLength = (person?.muslimName || '').length;
  const muslimNameSize = muslimNameLength > 30 ? '13px' : muslimNameLength > 22 ? '15px' : '18px';

  return (
    <section
      style={{
        border: `1px solid ${C.gold}`,
        background: C.paper,
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ribbon header */}
      <div
        style={{
          background: `linear-gradient(90deg, ${C.darkest}, ${C.emerald} 55%, ${C.darkest})`,
          borderBottom: `2px solid ${C.gold}`,
          padding: '0 12px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span
            style={{
              fontFamily: F.display,
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: C.goldLight,
              textTransform: 'uppercase',
            }}
          >
            {type}
          </span>
          <span style={{ fontFamily: F.sans, fontSize: '10px', color: C.ivory, opacity: 0.85 }}>{titleJp}</span>
        </div>
        <span style={{ fontFamily: F.sans, fontSize: '8.5px', color: C.goldLight, letterSpacing: '0.03em' }}>{titleBn}</span>
      </div>

      <div style={{ padding: '11px 13px 10px' }}>
        {/* photo + names */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '7px' }}>
          <PhotoFrame url={person?.photoUrl} fallback={isGroom ? 'G' : 'B'} />
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div
              style={{
                background: `linear-gradient(90deg, ${C.cream}, rgba(245,238,219,0))`,
                borderLeft: `3px solid ${C.gold}`,
                padding: '4px 8px 5px',
              }}
            >
              <div style={{ fontFamily: F.sans, fontSize: '7.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.goldDark }}>
                Muslim Name
              </div>
              <div
                title={person?.muslimName || ''}
                style={{
                  marginTop: '1px',
                  fontFamily: F.serif,
                  fontSize: muslimNameSize,
                  lineHeight: '22px',
                  height: '22px',
                  fontWeight: 700,
                  color: C.deep,
                  ...ellipsis,
                }}
              >
                {person?.muslimName || ' '}
              </div>
            </div>
            <Field label="Name" labelAlt="名前" value={person?.name} labelWidth={44} wrap />
          </div>
        </div>

        <Field label="Father's Name" labelAlt="父親の名前" value={person?.fatherName} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
          <Field label="Age" labelAlt="年齢" value={person?.age} labelWidth={34} />
          <Field label="Religion" labelAlt="宗教" value={person?.religion} labelWidth={44} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px' }}>
          <Field label="Nationality" labelAlt="国籍" value={person?.nationality} labelWidth={50} />
          <Field label="Passport No." labelAlt="パスポート番号" value={person?.passportNo} labelWidth={54} />
        </div>

        <Field label="Address" labelAlt="住所" value={person?.addressLine1} />
        <BlankLine value={person?.addressLine2} />

        <div style={{ marginTop: '9px' }}>
          <Signature title="Signature" titleAlt="署名" signUrl={person?.signUrl} height={32} />
        </div>
      </div>
    </section>
  );
};

const WitnessCard = ({ witness = {}, index }) => (
  <div
    style={{
      border: `1px solid ${C.line}`,
      background: C.paper,
      padding: '8px 12px 9px',
      position: 'relative',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
      <span
        style={{
          width: '20px',
          height: '20px',
          boxSizing: 'border-box',
          flexShrink: 0,
          border: `1.2px solid ${C.gold}`,
          background: C.deep,
          color: C.goldLight,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: F.display,
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {index + 1}
      </span>
      <span style={{ fontFamily: F.display, fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.deep }}>
        Witness {index + 1}
      </span>
      <span style={{ fontFamily: F.sans, fontSize: '8.5px', color: C.muted }}>証人{index + 1}</span>
    </div>
    <Field label="Name" labelAlt="氏名" value={witness?.name} labelWidth={44} />
    <Field label="Address" labelAlt="住所" value={witness?.address} labelWidth={44} />
    <div style={{ marginTop: '6px' }}>
      <Signature title="Signature" titleAlt="署名" signUrl={witness?.signUrl} height={28} />
    </div>
  </div>
);

const SectionTitle = ({ en, alt }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '7px' }}>
    <Divider width={70} />
    <span style={{ fontFamily: F.display, fontSize: '11px', fontWeight: 700, letterSpacing: '0.24em', color: C.deep, textTransform: 'uppercase' }}>
      {en}
    </span>
    <span style={{ fontFamily: F.sans, fontSize: '8.5px', color: C.muted }}>{alt}</span>
    <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${C.gold}, rgba(184,145,47,0))` }} />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Certificate                                                        */
/* ------------------------------------------------------------------ */

const MarriageCertificate = ({ data = {} }) => {
  const {
    groom = {},
    bride = {},
    details = {},
    witnesses = [],
    solemnizedBy = {},
  } = data;

  const facts = [
    { label: 'Date of Marriage', alt: '結婚の日', value: details.date, Icon: IconCalendar },
    { label: 'Place of Marriage', alt: '結婚の場所', value: details.place, Icon: IconPin },
    { label: 'Amount of Dower (Mahar)', alt: '結納金の額と内容', value: details.mahar, Icon: IconCoin },
  ];

  return (
    <div
      style={{
        width: `${PAGE_W}px`,
        height: `${PAGE_H}px`,
        margin: '0 auto',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        background: C.ivory,
        color: C.ink,
        fontFamily: F.serif,
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      }}
    >
      {/* Web fonts (hoisted to <head> by React 19); safe fallbacks are in every font stack. */}
      <link rel="stylesheet" href={FONT_URL} precedence="default" />

      <PageFrame />

      <main
        style={{
          position: 'absolute',
          top: '52px',
          bottom: '52px',
          left: '58px',
          right: '58px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* ------------------------------ Header ------------------------------ */}
        <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: `${ARCH_W}px`, height: `${ARCH_H}px` }}>
            <MihrabArch />
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '44px',
                textAlign: 'center',
                fontFamily: F.arabic,
                fontSize: '34px',
                lineHeight: '52px',
                color: C.deep,
                direction: 'rtl',
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '14px',
                textAlign: 'center',
                fontFamily: F.sans,
                fontSize: '7px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: C.goldDark,
              }}
            >
              In the name of Allah, the Most Gracious, the Most Merciful
            </div>
          </div>

          <h1
            style={{
              margin: '10px 0 0',
              fontFamily: F.display,
              fontSize: '33px',
              lineHeight: 1.1,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: C.deep,
              textAlign: 'center',
            }}
          >
            MARRIAGE CERTIFICATE
          </h1>

          <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Divider width={120} mirror />
            <span
              style={{
                fontFamily: F.sans,
                fontSize: '9px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: C.goldDark,
                whiteSpace: 'nowrap',
              }}
            >
              Nikah Nama
            </span>
            <span style={{ fontFamily: F.sans, fontSize: '11px', color: C.muted, whiteSpace: 'nowrap' }}>結婚証明書</span>
            <Divider width={120} />
          </div>

          <div
            style={{
              marginTop: '8px',
              padding: '3px 16px',
              border: `1px solid ${C.gold}`,
              background: C.paper,
              fontFamily: F.sans,
              fontSize: '8.5px',
              letterSpacing: '0.08em',
              color: C.muted,
              whiteSpace: 'nowrap',
            }}
          >
            CERTIFICATE NO.&nbsp;&nbsp;
            <strong style={{ color: C.deep, fontSize: '10px', letterSpacing: '0.1em' }}>{details.certificateNo || '—'}</strong>
          </div>
        </header>

        {/* ------------------------------ Couple ------------------------------ */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px' }}>
          <PersonCard person={groom} type="Groom" />
          <PersonCard person={bride} type="Bride" />
        </section>

        {/* -------------------------- Marriage facts -------------------------- */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            background: `linear-gradient(90deg, ${C.darkest}, ${C.emerald} 50%, ${C.darkest})`,
            border: `1px solid ${C.gold}`,
            outline: `1px solid ${C.goldLight}`,
            outlineOffset: '-4px',
          }}
        >
          {facts.map(({ label, alt, value, Icon }, i) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                minWidth: 0,
                borderRight: i < facts.length - 1 ? '1px solid rgba(230,210,150,0.4)' : 'none',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  border: `1px solid ${C.goldLight}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontFamily: F.sans, fontSize: '7.5px', color: C.goldLight, opacity: 0.85 }}>{alt}</div>
                <div style={{ fontFamily: F.sans, fontSize: '8px', letterSpacing: '0.08em', textTransform: 'uppercase', color: C.ivory, fontWeight: 700 }}>
                  {label}
                </div>
                <div
                  title={value || ''}
                  style={{
                    marginTop: '2px',
                    fontFamily: F.serif,
                    fontSize: '15px',
                    lineHeight: '19px',
                    fontWeight: 700,
                    color: '#FFF3C9',
                    ...ellipsis,
                  }}
                >
                  {value || '—'}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* --------------------------- Declaration --------------------------- */}
        <section
          style={{
            position: 'relative',
            padding: '9px 30px 10px',
            background: C.paper,
            border: `1px solid ${C.line}`,
            textAlign: 'center',
          }}
        >
          <div style={{ position: 'absolute', left: '-1px', top: '-1px', bottom: '-1px', width: '4px', background: `linear-gradient(${C.goldLight}, ${C.goldDark})` }} />
          <div style={{ position: 'absolute', right: '-1px', top: '-1px', bottom: '-1px', width: '4px', background: `linear-gradient(${C.goldLight}, ${C.goldDark})` }} />
          <div style={{ fontFamily: F.sans, fontSize: '8.5px', lineHeight: 1.45, color: C.muted }}>
            新郎新婦が、イスラム法に従い、申し出と承諾（イジャーブとカブール）を交わしたことを証明し、
            二人が夫婦であることをここに宣言します。
          </div>
          <div
            style={{
              marginTop: '4px',
              fontFamily: F.italic,
              fontStyle: 'italic',
              fontSize: '15px',
              lineHeight: 1.3,
              fontWeight: 600,
              color: C.deep,
            }}
          >
            I certify that the Bride &amp; Groom have exchanged the offering and acceptance (Ijab and Qubul)
            according to Islamic Law and are declared Husband and Wife.
          </div>
        </section>

        {/* ---------------------------- Witnesses ---------------------------- */}
        <section>
          <SectionTitle en="Witnesses" alt="証人 / সাক্ষীগণ" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px' }}>
            {[0, 1].map((idx) => (
              <WitnessCard key={idx} witness={witnesses[idx] || {}} index={idx} />
            ))}
          </div>
        </section>

        {/* ------------------------- Solemnized by --------------------------- */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 210px',
            gap: '18px',
            alignItems: 'end',
            border: `1px solid ${C.line}`,
            background: C.paper,
            padding: '8px 14px 9px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '1px' }}>
              <span style={{ fontFamily: F.display, fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.deep }}>
                Marriage Solemnized By
              </span>
              <span style={{ fontFamily: F.sans, fontSize: '8.5px', color: C.muted }}>婚姻執行者</span>
            </div>
            <Field label="Name" labelAlt="氏名" value={solemnizedBy?.name} labelWidth={44} />
            <Field label="Address" labelAlt="住所" value={solemnizedBy?.address} labelWidth={44} />
          </div>
          <Signature title="Solemnizer" titleAlt="署名" signUrl={solemnizedBy?.signUrl} height={38} />
        </section>

        {/* ------------------------------ Footer ------------------------------ */}
        <footer style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: '1px', background: `linear-gradient(90deg, ${C.gold}, rgba(184,145,47,0.15) 45%, rgba(184,145,47,0.15) 55%, ${C.gold})` }} />
          <div
            style={{
              position: 'relative',
              background: C.ivory,
              paddingRight: '10px',
              fontFamily: F.sans,
              fontSize: '7.5px',
              lineHeight: 1.4,
              color: C.muted,
              maxWidth: '230px',
            }}
          >
            This certificate records the solemnization of marriage according to Islamic Law.
          </div>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div style={{ padding: '0 6px', background: C.ivory, borderRadius: '50%' }}>
              <Seal />
            </div>
          </div>
          <div
            style={{
              position: 'relative',
              background: C.ivory,
              paddingLeft: '10px',
              textAlign: 'right',
              fontFamily: F.sans,
              fontSize: '7.5px',
              lineHeight: 1.4,
              color: C.muted,
            }}
          >
            <div>Official Marriage Record</div>
            <div style={{ color: C.goldDark }}>結婚記録</div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MarriageCertificate;
