export function htmlToText(html = "") {
  if (typeof window === "undefined") return "";

  const div = document.createElement("div");
  div.innerHTML = html;

  return div.innerText || div.textContent || "";
}




export function splitArabicJapanese(text = "") {
  const arabicRegex = /[\u0600-\u06FF]+/g;

  const parts = [];
  let lastIndex = 0;

  text.replace(arabicRegex, (match, index) => {
    if (index > lastIndex) {
      parts.push({
        type: "jp",
        value: text.slice(lastIndex, index),
      });
    }

    parts.push({
      type: "ar",
      value: match,
    });

    lastIndex = index + match.length;
  });

  if (lastIndex < text.length) {
    parts.push({
      type: "jp",
      value: text.slice(lastIndex),
    });
  }

  return parts;
}
