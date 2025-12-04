export function extractTimeUpdatedAt(prayers) {
  return prayers.map(prayer => {
    const timeField = prayer.extraFields?.find(
      f => f.meta_name === "time"
    );

    return timeField ? timeField.updated_at : null;
  });
}



export function getMostRecentTime(datesArray) {
  if (!Array.isArray(datesArray) || datesArray.length === 0) return null;


  const mostRecent = datesArray
    .map(date => new Date(date))
    .sort((a, b) => b - a)[0];

  if (!mostRecent) return null;

  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = mostRecent.toLocaleDateString('en-GB', options);


  let hours = mostRecent.getHours();
  let minutes = mostRecent.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12 || 12; 
  const formattedTime = `${hours}:${minutes}${ampm}`;

  return `${formattedDate.replace(',', '')} at ${formattedTime}`;
}
