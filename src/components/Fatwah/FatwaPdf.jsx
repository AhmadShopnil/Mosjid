import { splitArabicJapanese } from "@/helper/htmlToText";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Japanese
Font.register({
  family: "JP",
  src: "/fonts/NotoSansJP-Regular.ttf",
});

// Arabic
Font.register({
  family: "AR",
  src: "/fonts/NotoNaskhArabic-Regular.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    lineHeight: 1.8,
  },
  jp: {
    fontFamily: "JP",
    textAlign: "left",
  },
  ar: {
    fontFamily: "AR",
    textAlign: "right",
    direction: "rtl",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
});


export default function FatwaPdf({ fatwa, descriptionText }) {
  const parts = splitArabicJapanese(descriptionText);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={[styles.title, styles.jp]}>
          Fatwa No: {String(fatwa?.id || "")}
        </Text>

        <Text style={styles.jp}>
          {String(fatwa?.word_ja || "")}
        </Text>

        {parts.map((part, index) => (
          <Text
            key={index}
            style={part.type === "ar" ? styles.ar : styles.jp}
          >
            {part.value}
          </Text>
        ))}
      </Page>
    </Document>
  );
}
