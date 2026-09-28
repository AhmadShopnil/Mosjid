// Text helpers for the react-pdf certificate.

const CJK = /[　-ヿ㐀-鿿豈-﫿＀-￯]/;

// Japanese line-breaking rules (kinsoku): never start a line with these…
const NO_BREAK_BEFORE = new Set(Array.from("、。，．・：；？！ー）」』】〕〉》’”ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ々…‥"));
// …and never end a line with these.
const NO_BREAK_AFTER = new Set(Array.from("（「『【〔〈《‘“"));

// A Latin "word" longer than this (an email, a long ID) may break mid-word as a last resort.
const MAX_UNBROKEN_WORD = 28;

/**
 * Hyphenation callback for react-pdf <Text>.
 *
 * react-pdf breaks lines at whitespace, and inserts a "-" when it breaks inside a word.
 * Japanese has no spaces, so without this a sentence either can't wrap or gets hyphens
 * ("登録し-"). Returning each breakable chunk separated by an empty string gives
 * react-pdf a zero-width, hyphen-free break opportunity between chunks.
 *
 * Latin words are never hyphenated — a certificate reads better with whole words.
 */
export const lineBreaks = (word) => {
  const chars = Array.from(word);
  if (!CJK.test(word) && chars.length <= MAX_UNBROKEN_WORD) return [word];

  const chunks = [];
  chars.forEach((ch, i) => {
    const joinsPrevious = i > 0 && (NO_BREAK_BEFORE.has(ch) || NO_BREAK_AFTER.has(chars[i - 1]));
    if (joinsPrevious) chunks[chunks.length - 1] += ch;
    else chunks.push(ch);
  });
  return chunks.flatMap((chunk, i) => (i === 0 ? [chunk] : ["", chunk]));
};

// Approximate advance width of a character, in em, for EB Garamond / Noto Sans JP.
const charWidthEm = (ch) => {
  if (CJK.test(ch)) return 1;
  if (ch === " ") return 0.25;
  if ("mwMW@".includes(ch)) return 0.82;
  if (ch >= "A" && ch <= "Z") return 0.68;
  if (ch >= "0" && ch <= "9") return 0.5;
  if ("iljtfrI.,:;'!|()-/".includes(ch)) return 0.3;
  return 0.48;
};

/**
 * Picks the largest font size (from `max` down to `min`, in 0.5pt steps) at which `text`
 * is estimated to fit in `lines` lines of `width` points. It only chooses a size — the
 * <Text> it's used on also sets maxLines + ellipsis, so an under-estimate can never
 * overflow; at worst the value is shortened with "…".
 */
export const fitFontSize = (text, width, { max, min, lines = 1 }) => {
  const value = String(text ?? "");
  const em = Array.from(value).reduce((sum, ch) => sum + charWidthEm(ch), 0);
  const room = width * lines * (lines > 1 ? 0.88 : 1);
  for (let size = max; size > min; size -= 0.5) {
    if (em * size <= room) return size;
  }
  return min;
};
