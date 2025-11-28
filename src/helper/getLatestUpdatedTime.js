// data = your array

export function getLatestUpdatedTime(data) {
  if (!Array.isArray(data)) return null;

  const latest = data.reduce((latestItem, currentItem) => {
    const latestDate = new Date(latestItem.updated_at);
    const currentDate = new Date(currentItem.updated_at);

    return currentDate > latestDate ? currentItem : latestItem;
  });

  return latest.updated_at;
}

export function getLatestUpdatedFormatted(data) {
  if (!Array.isArray(data) || data.length === 0) return null;

  // find latest updated item
  const latest = data.reduce((a, b) =>
    new Date(a.updated_at) > new Date(b.updated_at) ? a : b
  );

  const date = new Date(latest.updated_at);

  // format options
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // Aug
  const year = date.getFullYear();

  let hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");

  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;

  // Final format
  return `${day} ${month} ${year} at ${hour}:${minute}${ampm}`;
}
