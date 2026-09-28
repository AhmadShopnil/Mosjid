import { Circle, G, Line, Path, Polygon, Rect, Svg } from "@react-pdf/renderer";
import { ARABIC_HEADING } from "./arabicHeading";
import { COLORS, PAGE } from "./theme";

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

/** Eight-pointed star (two overlapping squares, the Rub el Hizb) as polygon points. */
const star8 = (cx, cy, r, rotateDeg = 0) => {
  const inner = r * 0.7654;
  const points = [];
  for (let i = 0; i < 16; i += 1) {
    const radius = i % 2 === 0 ? r : inner;
    const angle = ((i * 22.5 + rotateDeg - 90) * Math.PI) / 180;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return points.join(" ");
};

const diamond = (cx, cy, r) => `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;

// ---------------------------------------------------------------------------
// Page frame
// ---------------------------------------------------------------------------

const FRAME = { band: 14, rule: 19, fine: 22.5 };

const CornerRosette = ({ cx, cy }) => (
  <G>
    <Circle cx={cx} cy={cy} r={12.5} fill={COLORS.paper} />
    <Polygon points={star8(cx, cy, 11)} fill={COLORS.green} />
    <Polygon points={star8(cx, cy, 7.4, 22.5)} fill={COLORS.gold} />
    <Circle cx={cx} cy={cy} r={2.6} fill={COLORS.paper} />
  </G>
);

const EdgeDiamond = ({ cx, cy }) => (
  <G>
    <Polygon points={diamond(cx, cy, 6)} fill={COLORS.paper} stroke={COLORS.gold} strokeWidth={0.9} />
    <Polygon points={diamond(cx, cy, 2.6)} fill={COLORS.gold} />
  </G>
);

/**
 * Full-page decoration: faint geometric watermark, triple rule frame, corners.
 * Drawn 1pt shorter than the page: an SVG exactly as tall as the page trips react-pdf's
 * "can't split this across pages" check and pushes everything onto a second page. The
 * page's own background colour fills underneath, so nothing visible changes.
 */
export const PageFrame = () => {
  const W = PAGE.width;
  const H = PAGE.height;
  const inset = (n) => ({ x: n, y: n, width: W - n * 2, height: H - n * 2 });
  const wm = { cx: W / 2, cy: 336 };
  const corners = [
    [FRAME.fine, FRAME.fine],
    [W - FRAME.fine, FRAME.fine],
    [FRAME.fine, H - FRAME.fine],
    [W - FRAME.fine, H - FRAME.fine],
  ];

  return (
    <Svg width={W} height={H - 1} viewBox={`0 0 ${W} ${H - 1}`} style={{ position: "absolute", top: 0, left: 0 }}>

      <G strokeOpacity={0.09} stroke={COLORS.gold} fill="none">
        <Polygon points={star8(wm.cx, wm.cy, 150)} strokeWidth={1} />
        <Polygon points={star8(wm.cx, wm.cy, 112, 22.5)} strokeWidth={0.8} />
        <Circle cx={wm.cx} cy={wm.cy} r={70} strokeWidth={0.8} />
        <Polygon points={star8(wm.cx, wm.cy, 52)} strokeWidth={0.8} />
      </G>

      <Rect {...inset(FRAME.band)} fill="none" stroke={COLORS.green} strokeWidth={2.6} />
      <Rect {...inset(FRAME.rule)} fill="none" stroke={COLORS.gold} strokeWidth={0.9} />
      <Rect {...inset(FRAME.fine)} fill="none" stroke={COLORS.goldSoft} strokeWidth={0.5} />

      <EdgeDiamond cx={W / 2} cy={FRAME.rule} />
      <EdgeDiamond cx={W / 2} cy={H - FRAME.rule} />
      <EdgeDiamond cx={FRAME.rule} cy={H / 2} />
      <EdgeDiamond cx={W - FRAME.rule} cy={H / 2} />

      {corners.map(([cx, cy]) => (
        <CornerRosette key={`${cx}-${cy}`} cx={cx} cy={cy} />
      ))}
    </Svg>
  );
};

// ---------------------------------------------------------------------------
// Header pieces
// ---------------------------------------------------------------------------

/** Mosque crest: dome, minarets and crescent. Drawn in a 60 x 40 box. */
export const Crest = ({ width = 50 }) => (
  <Svg width={width} height={(width * 40) / 60} viewBox="0 0 60 40">
    <Path d="M28.1 2.2 A3.1 3.1 0 1 0 31.9 6.1 A2.4 2.4 0 1 1 28.1 2.2 Z" fill={COLORS.gold} />
    <Line x1={30} y1={7.4} x2={30} y2={10.6} stroke={COLORS.gold} strokeWidth={0.9} />
    <Path d="M20.5 24.5 C19.6 18.6 25.4 15.4 30 10.6 C34.6 15.4 40.4 18.6 39.5 24.5 Z" fill={COLORS.green} />
    <Rect x={20.5} y={24.5} width={19} height={10.5} fill={COLORS.green} />
    <Path d="M27 35 V30.2 A3 3 0 0 1 33 30.2 V35 Z" fill={COLORS.gold} />
    {[9, 51].map((cx) => (
      <G key={cx}>
        <Rect x={cx - 1.8} y={15.5} width={3.6} height={19.5} fill={COLORS.green} />
        <Rect x={cx - 2.8} y={17.5} width={5.6} height={1.4} fill={COLORS.gold} />
        <Path d={`M${cx - 2.3} 15.5 L${cx} 9.6 L${cx + 2.3} 15.5 Z`} fill={COLORS.green} />
        <Circle cx={cx} cy={8.6} r={0.9} fill={COLORS.gold} />
      </G>
    ))}
    <Rect x={14} y={27.5} width={6.5} height={7.5} fill={COLORS.green} />
    <Rect x={39.5} y={27.5} width={6.5} height={7.5} fill={COLORS.green} />
    <Rect x={4} y={35} width={52} height={2} fill={COLORS.green} />
    <Rect x={2} y={37.6} width={56} height={0.8} fill={COLORS.gold} />
  </Svg>
);

/** The Arabic heading, pre-shaped into vector outlines (see arabicHeading.js). */
export const ArabicHeading = ({ height, color = COLORS.goldDeep }) => (
  <Svg width={height * ARABIC_HEADING.aspectRatio} height={height} viewBox={ARABIC_HEADING.viewBox}>
    <Path d={ARABIC_HEADING.d} fill={color} />
  </Svg>
);

/** A rule ending in a small diamond; `flip` points the diamond to the left. */
export const Flourish = ({ width, flip = false }) => {
  const tip = flip ? 3 : width - 3;
  return (
    <Svg width={width} height={8}>
      <Line x1={flip ? 8 : 0} y1={4} x2={flip ? width : width - 8} y2={4} stroke={COLORS.gold} strokeWidth={0.7} />
      <Polygon points={diamond(tip, 4, 2.8)} fill={COLORS.gold} />
    </Svg>
  );
};

/** A centred rule with a diamond in the middle. */
export const Divider = ({ width }) => (
  <Svg width={width} height={8}>
    <Line x1={0} y1={4} x2={width / 2 - 9} y2={4} stroke={COLORS.goldSoft} strokeWidth={0.6} />
    <Line x1={width / 2 + 9} y1={4} x2={width} y2={4} stroke={COLORS.goldSoft} strokeWidth={0.6} />
    <Polygon points={diamond(width / 2, 4, 3.4)} fill="none" stroke={COLORS.gold} strokeWidth={0.7} />
    <Polygon points={diamond(width / 2, 4, 1.5)} fill={COLORS.gold} />
  </Svg>
);

/** Small solid diamond used as a section marker. */
export const SectionMark = () => (
  <Svg width={7} height={7}>
    <Polygon points={diamond(3.5, 3.5, 3.2)} fill={COLORS.gold} />
  </Svg>
);

/** Round check badge for a confirmed funeral wish. */
export const CheckBadge = ({ size = 11 }) => (
  <Svg width={size} height={size} viewBox="0 0 12 12">
    <Circle cx={6} cy={6} r={6} fill={COLORS.green} />
    <Path d="M3.3 6.2 L5.2 8.1 L8.8 4.2" fill="none" stroke={COLORS.white} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

/** Vertical hairline separating the body columns, with diamonds at both ends. */
export const ColumnRule = ({ height }) => (
  <Svg width={8} height={height}>
    <Line x1={4} y1={6} x2={4} y2={height - 6} stroke={COLORS.goldSoft} strokeWidth={0.6} />
    <Polygon points={diamond(4, 3, 2.4)} fill={COLORS.gold} />
    <Polygon points={diamond(4, height - 3, 2.4)} fill={COLORS.gold} />
  </Svg>
);
