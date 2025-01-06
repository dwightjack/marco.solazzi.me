export const DATE_PARSE_REGEXP = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;

export function toDate(dateStr: string) {
  if (DATE_PARSE_REGEXP.test(dateStr) === false) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }
  return new Date(dateStr);
}

export function toFormattedDate(
  dateStr: string | Date,
  dateFormat: 'short' | 'long' | Intl.DateTimeFormatOptions = 'short',
) {
  if (typeof dateStr === 'string') {
    dateStr = toDate(dateStr);
  }
  const options =
    typeof dateFormat === 'string'
      ? ({
          month: 'long',
          year: 'numeric',
          day: dateFormat === 'long' ? 'numeric' : undefined,
        } as const)
      : dateFormat;
  return dateStr.toLocaleDateString('en', options);
}
export function toMonthDayYear(dateStr: string | Date) {
  if (typeof dateStr === 'string') {
    dateStr = toDate(dateStr);
  }
  return dateStr.toLocaleDateString('en', {
    month: 'long',
    year: 'numeric',
  });
}

export function toIso(dateStr: string | Date) {
  if (typeof dateStr === 'string') {
    dateStr = toDate(dateStr);
  }
  return dateStr.toISOString();
}
