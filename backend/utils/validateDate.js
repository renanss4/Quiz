/**
 * This function validates a date string in the format YYYY-MM-DD.
 * It checks if the date is valid.
 * If the date is not valid, it returns false.
 * If the date is valid, it returns true.
 */

export function validateDate(dateStr) {
  const regex = /^(20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  if (!regex.test(dateStr)) {
    return false;
  }

  const [year, month, day] = dateStr.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  return true;
}
