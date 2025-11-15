import { describe, it, expect } from 'vitest';
import {
  formatEventDate,
  isUpcoming,
  isPast,
  formatDateRange,
} from './date-formatter';

describe('formatEventDate', () => {
  it('formats date in French locale', () => {
    const date = new Date('2024-03-15');
    const formatted = formatEventDate(date, 'fr');
    expect(formatted).toContain('mars');
    expect(formatted).toContain('2024');
  });

  it('formats date in English locale', () => {
    const date = new Date('2024-03-15');
    const formatted = formatEventDate(date, 'en');
    expect(formatted).toContain('March');
    expect(formatted).toContain('2024');
  });
});

describe('isUpcoming', () => {
  it('returns true for future dates', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    expect(isUpcoming(futureDate)).toBe(true);
  });

  it('returns false for past dates', () => {
    const pastDate = new Date('2020-01-01');
    expect(isUpcoming(pastDate)).toBe(false);
  });
});

describe('isPast', () => {
  it('returns true for past dates', () => {
    const pastDate = new Date('2020-01-01');
    expect(isPast(pastDate)).toBe(true);
  });

  it('returns false for future dates', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    expect(isPast(futureDate)).toBe(false);
  });
});

describe('formatDateRange', () => {
  it('formats date range in French', () => {
    const start = new Date('2024-03-15');
    const end = new Date('2024-03-17');
    const formatted = formatDateRange(start, end, 'fr');
    expect(formatted).toContain('au');
  });

  it('formats date range in English', () => {
    const start = new Date('2024-03-15');
    const end = new Date('2024-03-17');
    const formatted = formatDateRange(start, end, 'en');
    expect(formatted).toContain('to');
  });
});
