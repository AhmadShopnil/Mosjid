import axiosInstance from "@/helper/axiosInstance";
import { getSettingsClient } from "@/helper/actions";
import { BASE_URL } from "@/helper/baseUrl";
import { getMediaLinkByMetaName } from "@/helper/metaHelpers";

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
};

const capitalize = (value) => (value ? String(value).charAt(0).toUpperCase() + String(value).slice(1) : "");

// Burial-wish checkboxes arrive as 0/1, often as the strings "0"/"1". A plain `!!value`
// would be wrong: `!!"0"` is true in JavaScript.
const isChecked = (value) => [true, 1, "1", "true", "yes", "Yes"].includes(value);

/**
 * Maps a wasiyat list row and/or the /certificate endpoint's response to the data the
 * certificate renders. The endpoint's exact shape isn't pinned down, so this accepts a
 * few likely wrappers and falls back to the list row for anything missing.
 */
export const mapCertificateData = (row, record) => {
  const rec = record?.wasiyat || record?.data?.wasiyat || record || {};
  const info = rec.data || row?.data || {};
  const authorizedPersonData = rec?.authorized_persons[0] || {};
  // console.log("authorizedPersonData", rec?.authorized_persons);

  return {
    person: {
      fullName: info.fullName || "",
      muslimName: info.muslimName || "",
      japaneseName: info.japaneseName || "",
      fatherName: info.fatherName || "",
      gender: capitalize(info.gender),
      dateOfBirth: formatDate(info.dateOfBirth),
      nationality: info.nationality || "",
      phone: info.phone || "",
      addressInJapan: info.addressInJapan || "",
    },
    wishes: {
      ghusl: isChecked(info.ghusl),
      kafan: isChecked(info.kafan),
      janazah: isChecked(info.janazah),
      muslimCemetery: isChecked(info.muslimCemetery),
      burialInJapan: isChecked(info.burialInJapan),
      burialOutsideJapan: isChecked(info.burialOutsideJapan),
      noCremation: isChecked(info.noCremation),
      osakaMasjidAssistance: isChecked(info.osakaMasjidAssistance),
    },
    // The form has no separate "authorized person" section; Emergency Contact 1 holds
    // the same name / relationship / phone / address, so it is shown as the representative.
    authorizedPerson: {
      name: authorizedPersonData?.name || "",
      relationship: authorizedPersonData?.relationship || "",
      phone: authorizedPersonData.phone || "",
      address: authorizedPersonData?.email || "",
    },
    meta: {
      certificateNo: rec.unique_id || row?.unique_id || "",
      registrationDate: formatDate(rec.created_at || row?.created_at),
      lastUpdated: formatDate(rec.updated_at || row?.updated_at || rec.created_at || row?.created_at),
    },
  };
};

/**
 * URL of the Imam's signature image from the site settings, or null if none is set.
 * Never throws: a missing signature must not stop the certificate from being made.
 */
export const fetchSignatureUrl = async () => {
  try {
    const settings = await getSettingsClient();
    const signaturePath = getMediaLinkByMetaName(settings, "osaka_masjid_authorized_signature");
    return signaturePath ? `${BASE_URL}${signaturePath}` : null;
  } catch (error) {
    console.error("Could not load the Imam's signature setting", error);
    return null;
  }
};

/**
 * Loads everything the certificate needs for one wasiyat. Pass `row` when the caller
 * already has the list row; otherwise it is looked up from the user's list.
 *
 * Returns `{ row, data }`; `row` may be undefined if it isn't on the list's first page.
 * `data.signatureUrl` is the Imam's signature image URL (or null).
 */
export const fetchCertificateData = async (id, row) => {
  const [certificateRes, listRes, signatureUrl] = await Promise.all([
    axiosInstance.get(`/wasiyat/${id}/certificate`),
    row ? Promise.resolve(null) : axiosInstance.get("/wasiyat"),
    fetchSignatureUrl(),
  ]);
  const resolvedRow = row || listRes?.data?.wasiyats?.data?.find((item) => String(item.id) === String(id));
  return { row: resolvedRow, data: { ...mapCertificateData(resolvedRow, certificateRes?.data), signatureUrl } };
};

/** Whether the certificate has been issued for this row (same rule as the list's buttons). */
export const isCertificateIssued = (row) => row?.download_status === 1 || row?.download_status === "1";
