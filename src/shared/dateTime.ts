export const DATE_PARSE_REGEXP = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;

export function toDate(dateStr: string) {
  if (DATE_PARSE_REGEXP.test(dateStr) === false) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  return new Date(dateStr);
}

export function toMonthYear(dateStr: string | Date) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
  }).format(typeof dateStr === 'string' ? toDate(dateStr) : dateStr);
}

export function toIso(dateStr: string | Date) {
  if (typeof dateStr === 'string') {
    dateStr = toDate(dateStr);
  }
  return dateStr.toISOString();
}
