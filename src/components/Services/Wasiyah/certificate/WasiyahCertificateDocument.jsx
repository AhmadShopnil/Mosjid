import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ArabicHeading, CheckBadge, ColumnRule, Crest, Divider, Flourish, PageFrame, SectionMark } from "./ornaments";
import { COLORS, FONTS, PAGE, VALUE_FONT } from "./theme";
import { fitFontSize, lineBreaks } from "./textLayout";

/*
 * Certificate of Wasiyah — one A4 landscape page, rendered by react-pdf as a real vector
 * PDF (selectable text, crisp at any zoom). The preview page shows this same PDF, so what
 * the user previews is byte-for-byte what they download.
 *
 * Layout rule: every region has a fixed position and size, and every user value has a
 * fixed-height box with maxLines + ellipsis. However long the input, nothing can push
 * another element or spill onto a second page.
 */

const MARGIN_X = 46;
const CONTENT_WIDTH = PAGE.width - MARGIN_X * 2;

// Body columns: holder | rule | funeral wishes | rule | representative.
const COLUMN_GAP = 14;
const RULE_WIDTH = 8;
const COLUMNS = { holder: 312, wishes: 176, representative: 206 };
const BODY = { top: 222, height: 254 };

// Field geometry (points). react-pdf only draws the lines of a <Text> that fit in the
// height available to it, so the value box is given `slack` beyond its lines — without
// it, a box exactly one line tall (minus its hairline) would draw no text at all.
const FIELD = { labelHeight: 11, lineHeight: 14.5, slack: 3, ruleGap: 1, gap: 4 };
const valueBoxHeight = (lines) => FIELD.lineHeight * lines + FIELD.slack;
const fieldHeight = (lines) => FIELD.labelHeight + valueBoxHeight(lines) + FIELD.ruleGap + 0.5 + FIELD.gap;

const WISHES = [
  { key: "ghusl", en: "Ghusl (Washing)", jp: "グスル（清め）" },
  { key: "kafan", en: "Kafan (Shrouding)", jp: "カファン（死装束）" },
  { key: "janazah", en: "Janazah Prayer", jp: "ジャナーザ礼拝" },
  { key: "muslimCemetery", en: "Muslim Cemetery", jp: "ムスリム墓地" },
  { key: "burialInJapan", en: "Burial in Japan", jp: "日本での埋葬" },
  { key: "burialOutsideJapan", en: "Burial Outside Japan", jp: "国外での埋葬" },
  { key: "noCremation", en: "No Cremation", jp: "火葬なし" },
  { key: "osakaMasjidAssistance", en: "Osaka Masjid Assistance", jp: "大阪モスクの支援" },
];

const styles = StyleSheet.create({
  page: { backgroundColor: COLORS.paper, color: COLORS.ink, fontFamily: FONTS.serif },

  // Header
  metaBlock: { position: "absolute", top: 42, width: 190 },
  metaLabel: { fontFamily: FONTS.caps, fontWeight: 600, fontSize: 6.6, letterSpacing: 0.9, color: COLORS.goldDeep },
  metaLabelJp: { fontFamily: FONTS.jp, fontSize: 6.2, color: COLORS.muted, marginTop: 1.5 },
  metaValue: {
    fontFamily: VALUE_FONT,
    fontWeight: 600,
    fontSize: 12.5,
    lineHeight: 1.25,
    color: COLORS.green,
    marginTop: 3,
    paddingBottom: 2,
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.goldSoft,
    maxLines: 1,
    textOverflow: "ellipsis",
  },
  centered: { position: "absolute", left: 0, right: 0, alignItems: "center" },
  orgLine: { fontFamily: FONTS.caps, fontWeight: 700, fontSize: 8.5, letterSpacing: 3, color: COLORS.goldDeep },
  orgLineJp: { fontFamily: FONTS.jp, fontSize: 7.4, letterSpacing: 1, color: COLORS.muted },
  title: { fontFamily: FONTS.display, fontWeight: 700, fontSize: 31, lineHeight: 1.12, color: COLORS.green },
  subtitleRow: { flexDirection: "row", alignItems: "center" },
  subtitle: { fontFamily: FONTS.jp, fontSize: 9.5, letterSpacing: 3.5, color: COLORS.ink, marginHorizontal: 10 },

  // Certification statement
  statement: { position: "absolute", top: 172, left: 110, right: 110, alignItems: "center" },
  statementEn: { fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 10.2, lineHeight: 1.3, color: COLORS.greenDeep, textAlign: "center" },
  statementJp: { fontFamily: FONTS.jp, fontSize: 7.1, lineHeight: 1.5, color: COLORS.muted, textAlign: "center", marginTop: 3 },

  // Body
  body: { position: "absolute", top: BODY.top, left: MARGIN_X, width: CONTENT_WIDTH, height: BODY.height, flexDirection: "row" },
  column: { height: BODY.height },
  sectionTitle: { height: 34 },
  sectionTitleRow: { flexDirection: "row", alignItems: "center" },
  sectionTitleEn: { fontFamily: FONTS.caps, fontWeight: 600, fontSize: 8.2, letterSpacing: 1.1, color: COLORS.green, marginLeft: 6 },
  sectionTitleJp: { fontFamily: FONTS.jp, fontSize: 6.6, color: COLORS.muted, marginTop: 2, marginLeft: 13 },
  sectionTitleRule: { borderBottomWidth: 0.6, borderBottomColor: COLORS.goldSoft, marginTop: 5 },
  fieldGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  fieldLabelRow: { height: FIELD.labelHeight, flexDirection: "row", alignItems: "flex-end" },
  fieldLabel: { fontFamily: FONTS.caps, fontWeight: 600, fontSize: 6.4, letterSpacing: 0.8, color: COLORS.goldDeep },
  fieldLabelJp: { fontFamily: FONTS.jp, fontSize: 6, color: COLORS.muted, marginLeft: 5 },
  fieldValueBox: { paddingTop: 1 },
  fieldRule: { height: 0.5, backgroundColor: COLORS.goldSoft, marginTop: FIELD.ruleGap },
  fieldValue: { fontFamily: VALUE_FONT, fontWeight: 500, color: COLORS.ink, textOverflow: "ellipsis" },
  fieldEmpty: { color: COLORS.goldSoft },

  wishItem: { flexDirection: "row", height: 22, marginBottom: 3 },
  wishText: { marginLeft: 7 },
  wishEn: { fontFamily: FONTS.serif, fontWeight: 500, fontSize: 10.5, lineHeight: 1.1, color: COLORS.ink },
  wishJp: { fontFamily: FONTS.jp, fontSize: 6.4, color: COLORS.muted, marginTop: 1.5 },
  emptyNote: { fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 9.5, color: COLORS.muted, marginTop: 6 },
  emptyNoteJp: { fontFamily: FONTS.jp, fontSize: 6.6, color: COLORS.muted, marginTop: 2 },

  representativeNote: { marginTop: "auto" },
  noteEn: { fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 8, lineHeight: 1.3, color: COLORS.muted },
  noteJp: { fontFamily: FONTS.jp, fontSize: 6.2, lineHeight: 1.5, color: COLORS.muted, marginTop: 3 },

  // Footer
  footerDivider: { position: "absolute", top: 484, left: MARGIN_X },
  footer: { position: "absolute", top: 500, left: MARGIN_X, width: CONTENT_WIDTH, flexDirection: "row", justifyContent: "space-between" },
  footerLeft: { width: 500 },
  footerMetaRow: { flexDirection: "row" },
  footerMeta: { width: 150 },
  footerMetaValue: { fontFamily: FONTS.serif, fontWeight: 600, fontSize: 10.5, color: COLORS.green, marginTop: 3 },
  disclaimerEn: { fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 6.8, lineHeight: 1.3, color: COLORS.muted, marginTop: 8 },
  disclaimerJp: { fontFamily: FONTS.jp, fontSize: 5.8, lineHeight: 1.5, color: COLORS.muted, marginTop: 2 },
  signature: { width: 210, alignItems: "center" },
  signatureSpace: { height: 30, position: "relative" },
  // The signature stands on the line and may rise above the 30pt space into the empty
  // gap beneath the footer divider, so a tall signature isn't shrunk to fit 30pt.
  signatureImageBox: { position: "absolute", left: 0, right: 0, bottom: 1, alignItems: "center" },
  signatureLine: { width: 210, borderTopWidth: 0.8, borderTopColor: COLORS.goldDeep },
  signatureLabel: { fontFamily: FONTS.caps, fontWeight: 600, fontSize: 7, letterSpacing: 1, color: COLORS.green, marginTop: 5 },
  signatureLabelJp: { fontFamily: FONTS.jp, fontSize: 6.2, color: COLORS.muted, marginTop: 2 },
});

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

const MetaBlock = ({ label, jp, value, align = "left" }) => (
  <View style={[styles.metaBlock, align === "left" ? { left: MARGIN_X } : { right: MARGIN_X, alignItems: "flex-end" }]}>
    <Text style={styles.metaLabel}>{label}</Text>
    <Text style={styles.metaLabelJp}>{jp}</Text>
    <Text style={[styles.metaValue, { textAlign: align, minWidth: 120 }]} hyphenationCallback={lineBreaks}>
      {value || "—"}
    </Text>
  </View>
);

const SectionTitle = ({ en, jp }) => (
  <View style={styles.sectionTitle}>
    <View style={styles.sectionTitleRow}>
      <SectionMark />
      <Text style={styles.sectionTitleEn}>{en}</Text>
    </View>
    <Text style={styles.sectionTitleJp}>{jp}</Text>
    <View style={styles.sectionTitleRule} />
  </View>
);

/**
 * A labelled value on a hairline. The box is a fixed height; the value shrinks to fit
 * (down to `min`) and is cut with "…" past `lines` lines.
 */
const Field = ({ label, jp, value, width, lines = 1, max = 11.5, min = 8.5 }) => {
  const text = String(value ?? "").trim();
  const size = fitFontSize(text, width, { max, min, lines });

  return (
    <View style={{ width, height: fieldHeight(lines) }}>
      <View style={styles.fieldLabelRow}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldLabelJp}>{jp}</Text>
      </View>
      {/* One line sits on its rule; longer values start right under their label. */}
      <View style={[styles.fieldValueBox, { height: valueBoxHeight(lines), justifyContent: lines > 1 ? "flex-start" : "flex-end" }]}>
        <Text
          style={[styles.fieldValue, { fontSize: size, lineHeight: FIELD.lineHeight / size, maxLines: lines }, !text && styles.fieldEmpty]}
          hyphenationCallback={lineBreaks}
        >
          {text || "—"}
        </Text>
      </View>
      <View style={styles.fieldRule} />
    </View>
  );
};

const Wish = ({ en, jp }) => (
  <View style={styles.wishItem}>
    <CheckBadge size={11} />
    <View style={styles.wishText}>
      <Text style={styles.wishEn}>{en}</Text>
      <Text style={styles.wishJp}>{jp}</Text>
    </View>
  </View>
);

const Rule = () => (
  <View style={{ width: RULE_WIDTH, marginHorizontal: COLUMN_GAP - RULE_WIDTH / 2 }}>
    <ColumnRule height={BODY.height} />
  </View>
);

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

const Header = ({ meta }) => (
  <>
    <MetaBlock label="Certificate No." jp="証明書番号" value={meta.certificateNo} />
    <MetaBlock label="Registration Date" jp="登録日" value={meta.registrationDate} align="right" />

    <View style={[styles.centered, { top: 34 }]}>
      <Crest width={50} />
    </View>
    <View style={[styles.centered, { top: 71 }]}>
      <Text>
        <Text style={styles.orgLine}>OSAKA MASJID</Text>
        <Text style={styles.orgLineJp}>{"   大阪モスク"}</Text>
      </Text>
    </View>
    <View style={[styles.centered, { top: 86 }]}>
      <Text style={styles.title}>Certificate of Wasiyah</Text>
    </View>
    <View style={[styles.centered, { top: 124 }]}>
      <ArabicHeading height={20} />
    </View>
    <View style={[styles.centered, { top: 151 }]}>
      <View style={styles.subtitleRow}>
        <Flourish width={62} />
        <Text style={styles.subtitle}>ワシーヤ登録証明書</Text>
        <Flourish width={62} flip />
      </View>
    </View>
  </>
);

const Statement = () => (
  <View style={styles.statement}>
    <Text style={styles.statementEn}>
      This is to certify that the person named below has registered their Wasiyah with Osaka Masjid, expressing the
      wish that their funeral be carried out according to Islamic principles, subject to Japanese law and applicable
      regulations.
    </Text>
    <Text style={styles.statementJp} hyphenationCallback={lineBreaks}>
      下記の者が大阪モスクにワシーヤ（遺言）を登録し、日本の法律および関連規則に従うことを条件に、イスラームの教えに基づく葬儀の実施を希望していることを証明します。
    </Text>
  </View>
);

const HolderColumn = ({ person }) => {
  const width = COLUMNS.holder;
  const half = (width - 16) / 2;
  return (
    <View style={[styles.column, { width }]}>
      <SectionTitle en="Wasiyah Holder" jp="登録者（ワシーヤ作成者）" />
      <View style={styles.fieldGrid}>
        <Field label="Full Name" jp="氏名" value={person.fullName} width={width} max={13} />
        <Field label="Muslim Name" jp="ムスリム名" value={person.muslimName} width={half} />
        <Field label="Japanese Name" jp="日本語氏名" value={person.japaneseName} width={half} />
        <Field label="Father's Name" jp="父親の名前" value={person.fatherName} width={width} />
        <Field label="Gender" jp="性別" value={person.gender} width={half} />
        <Field label="Date of Birth" jp="生年月日" value={person.dateOfBirth} width={half} />
        <Field label="Nationality" jp="国籍" value={person.nationality} width={half} />
        <Field label="Phone" jp="電話番号" value={person.phone} width={half} />
        <Field label="Address in Japan" jp="日本の住所" value={person.addressInJapan} width={width} lines={2} max={10.5} />
      </View>
    </View>
  );
};

const WishesColumn = ({ wishes }) => {
  const selected = WISHES.filter((wish) => wishes[wish.key]);
  return (
    <View style={[styles.column, { width: COLUMNS.wishes }]}>
      <SectionTitle en="Funeral Arrangements" jp="登録された葬儀の希望" />
      {selected.length > 0 ? (
        selected.map((wish) => <Wish key={wish.key} en={wish.en} jp={wish.jp} />)
      ) : (
        <View>
          <Text style={styles.emptyNote}>No specific arrangements registered.</Text>
          <Text style={styles.emptyNoteJp}>特定の希望は登録されていません。</Text>
        </View>
      )}
    </View>
  );
};

const RepresentativeColumn = ({ person }) => {
  const width = COLUMNS.representative;
  return (
    <View style={[styles.column, { width }]}>
      <SectionTitle en="Authorized Representative" jp="委任代理人" />
      <Field label="Name" jp="氏名" value={person.name} width={width} />
      <Field label="Relationship" jp="続柄" value={person.relationship} width={width} />
      <Field label="Phone" jp="電話番号" value={person.phone} width={width} />
      <Field label="Address" jp="住所" value={person.address} width={width} lines={2} max={10.5} />
      <View style={styles.representativeNote}>
        <Text style={styles.noteEn}>
          Authorized to coordinate funeral arrangements with Osaka Masjid on behalf of the Wasiyah holder.
        </Text>
        <Text style={styles.noteJp} hyphenationCallback={lineBreaks}>
          登録者に代わり、大阪モスクと葬儀に関する調整を行う権限を有します。
        </Text>
      </View>
    </View>
  );
};

/** Largest area (points) the Imam's signature may occupy above the signature line. */
const SIGNATURE_BOX = { width: 160, height: 42 };

/** Scales an image to fit inside SIGNATURE_BOX, keeping its proportions. */
const fitSignature = ({ width, height }) => {
  const scale = Math.min(SIGNATURE_BOX.width / width, SIGNATURE_BOX.height / height);
  return { width: width * scale, height: height * scale };
};

const Footer = ({ meta, signature }) => (
  <>
    <View style={styles.footerDivider}>
      <Divider width={CONTENT_WIDTH} />
    </View>
    <View style={styles.footer}>
      <View style={styles.footerLeft}>
        <View style={styles.footerMetaRow}>
          <View style={styles.footerMeta}>
            <Text style={styles.metaLabel}>Last Updated</Text>
            <Text style={styles.metaLabelJp}>最終更新日</Text>
            <Text style={styles.footerMetaValue}>{meta.lastUpdated || "—"}</Text>
          </View>
          <View style={styles.footerMeta}>
            <Text style={styles.metaLabel}>Validity</Text>
            <Text style={styles.metaLabelJp}>有効期間</Text>
            <Text style={styles.footerMetaValue}>Valid until revoked</Text>
          </View>
        </View>
        <Text style={styles.disclaimerEn}>
          This certificate records information provided by the applicant and is an internal record of Osaka Masjid.
          It is not a legally binding will under Japanese law.
        </Text>
        <Text style={styles.disclaimerJp} hyphenationCallback={lineBreaks}>
          本証明書は申請者の提供した情報に基づく大阪モスクの内部記録であり、日本法上の法的効力を有する遺言書ではありません。
        </Text>
      </View>
      <View style={styles.signature}>
        <View style={styles.signatureSpace}>
          {signature && (
            <View style={styles.signatureImageBox}>
              <Image src={signature.src} style={fitSignature(signature)} />
            </View>
          )}
        </View>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureLabel}>Authorized Officer / Imam</Text>
        <Text style={styles.signatureLabelJp}>認定責任者（イマーム）・大阪モスク</Text>
      </View>
    </View>
  </>
);

// ---------------------------------------------------------------------------
// Document
// ---------------------------------------------------------------------------

/**
 * `signature` is the Imam's signature as `{ src, width, height }` (see signatureImage.js),
 * or null/undefined for none. It is passed in already loaded so this component does no I/O.
 */
export default function WasiyahCertificateDocument({ data, signature = null }) {
  const { person = {}, wishes = {}, authorizedPerson = {}, meta = {} } = data || {};

  return (
    <Document
      title={`Certificate of Wasiyah${meta.certificateNo ? ` — ${meta.certificateNo}` : ""}`}
      author="Osaka Masjid"
      subject="Certificate of Wasiyah"
      creator="Osaka Masjid"
      producer="Osaka Masjid"
    >
      {/* Not wrap={false}: in react-pdf 4 that renders a blank Letter-size page. Single-page
          output is guaranteed by the fixed layout instead (and checked by page count in tests). */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <PageFrame />
        <Header meta={meta} />
        <Statement />
        <View style={styles.body}>
          <HolderColumn person={person} />
          <Rule />
          <WishesColumn wishes={wishes} />
          <Rule />
          <RepresentativeColumn person={authorizedPerson} />
        </View>
        <Footer meta={meta} signature={signature} />
      </Page>
    </Document>
  );
}
