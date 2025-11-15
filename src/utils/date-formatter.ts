/**
 * Format a date for display in the specified locale
 */
export function formatEventDate(date: Date, lang: 'fr' | 'en'): string {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Check if an event date is in the future
 */
export function isUpcoming(date: Date): boolean {
  return date > new Date();
}

/**
 * Check if an event date is in the past
 */
export function isPast(date: Date): boolean {
  return date < new Date();
}

/**
 * Format a date range for display
 */
export function formatDateRange(
  startDate: Date,
  endDate: Date,
  lang: 'fr' | 'en'
): string {
  const start = formatEventDate(startDate, lang);
  const end = formatEventDate(endDate, lang);
  const separator = lang === 'fr' ? ' au ' : ' to ';
  return `${start}${separator}${end}`;
}
