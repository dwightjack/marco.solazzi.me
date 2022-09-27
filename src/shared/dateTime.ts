export const DATE_PARSE_REGEXP = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;

export function toDate(dateStr: string) {
  if (DATE_PARSE_REGEXP.test(dateStr) === false) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  return new Date(dateStr);
}

export function toMonthYear(dateStr: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(toDate(dateStr));
}

export function toIso(dateStr: string) {
  return toDate(dateStr).toISOString();
}
