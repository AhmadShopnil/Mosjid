export function getDay_Month_Year(
  dateString,
  type
) {
  const date = new Date(dateString);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formattedDate = {
    day: date.getDate(),
    month: monthNames[date.getMonth()],
    year: date.getFullYear(),
  };

  // Return based on type
  switch (type) {
    case "day":
      return formattedDate.day;
    case "month":
      return formattedDate.month;
    case "year":
      return formattedDate.year;
    case "all":
    default:
      return formattedDate;
  }
}
