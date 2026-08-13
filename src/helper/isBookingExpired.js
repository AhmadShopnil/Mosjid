export const isBookingExpired = (
  bookedDate,
  startTime,
  endTime
) => {
  if (!bookedDate || !startTime || !endTime) {
    return false;
  }

  // Create booking end datetime
  const bookingEndDateTime = new Date(
    `${bookedDate}T${endTime}:00`
  );

  // Current datetime
  const now = new Date();

  // Return true if booking end time has passed
  return now > bookingEndDateTime;
};