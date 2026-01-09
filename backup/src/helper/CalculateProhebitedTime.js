




// Helper: convert "HH:mm" → "h:mm AM/PM"
const to12HourFormat = (time24) => {
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
};

// Helper: add or subtract minutes from "HH:mm" and return 12-hour format
const addMinutes = (time, minutes) => {
  const [h, m] = time.split(":").map(Number);
  const date = new Date(2000, 0, 1, h, m + minutes);
  const time24 = date.toTimeString().slice(0, 5);
  return to12HourFormat(time24);
};

export function getProhibitedTimes(prayerTimes) {
  if (!Array.isArray(prayerTimes) || prayerTimes.length === 0) {
    return null;
  }

  const fajr = prayerTimes.find(p => p.prayer_name === "fajr");
  const dhuhr = prayerTimes.find(p => p.prayer_name === "dhuhr");
  const asr = prayerTimes.find(p => p.prayer_name === "asr");

  if (
    !fajr?.wakt_end_hanfi ||
    !dhuhr?.wakt_start_hanfi ||
    !asr?.wakt_end_hanfi
  ) {
    // console.warn("Prayer times missing or not loaded yet", prayerTimes);
    return null;
  }

  return {
    Sunrise: {
      start: to12HourFormat(fajr.wakt_end_hanfi),
      end: addMinutes(fajr.wakt_end_hanfi, 12),
    },
    Solar: {
      start: addMinutes(dhuhr.wakt_start_hanfi, -5),
      end: addMinutes(dhuhr.wakt_start_hanfi, 5),
    },
    Sunset: {
      start: to12HourFormat(asr.wakt_end_hanfi),
      end: addMinutes(asr.wakt_end_hanfi, 3),
    },
  };
}















// 24 hour format
// const addMinutes = (time, minutes) => {
//   const [h, m] = time.split(":").map(Number);
//   const date = new Date(2000, 0, 1, h, m + minutes);
//   return date.toTimeString().slice(0, 5);
// };

// export function getProhibitedTimes(prayerTimes) {
//   if (!Array.isArray(prayerTimes) || prayerTimes.length === 0) {
//     return null;
//   }

//   const fajr = prayerTimes.find(p => p.prayer_name === "fajr");
//   const dhuhr = prayerTimes.find(p => p.prayer_name === "dhuhr");
//   const asr = prayerTimes.find(p => p.prayer_name === "asr");

//   if (
//     !fajr?.wakt_start_hanfi ||
//     !dhuhr?.wakt_start_hanfi ||
//     !asr?.wakt_end_hanfi
//   ) {
//     console.warn("Prayer times missing or not loaded yet", prayerTimes);
//     return null;
//   }

//   return {
//     Sunrise: {
//       start: fajr.wakt_start_hanfi,
//       end: addMinutes(fajr.wakt_start_hanfi, 12),
//     },
//     Solar: {
//       start: addMinutes(dhuhr.wakt_start_hanfi, -5),
//       end: addMinutes(dhuhr.wakt_start_hanfi, 5),
//     },
//     Sunset: {
//       start: asr.wakt_end_hanfi,
//       end: addMinutes(asr.wakt_end_hanfi, 3),
//     },
//   };
// }
