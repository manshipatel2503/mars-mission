export const calculateDaysRemaining = (departureDateStr: string) => {
  // Convert the departure date string to a Date object
  const departureDate = new Date(departureDateStr);

  // Get the current date
  const currentDate = new Date();

  // Calculate the Unix timestamps (milliseconds since January 1, 1970, 00:00:00 UTC)
  const departureTimestamp = departureDate.getTime();
  const currentTimestamp = currentDate.getTime();

  // Calculate the difference in milliseconds between the departure date and the current date
  const differenceMs = departureTimestamp - currentTimestamp;

  // Calculate the difference in days
  const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  // If the difference is negative, the departure date has passed
  if (differenceDays > 0) {
    return differenceDays;
  } else {
    return 0;
  }
};
