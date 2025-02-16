import {
  timeFormats,
  formatDateTime,
  parseDateString,
} from 'common/utils/time-utils';

// Date object constructor takes a zero-indexed month number.

const testDate = new Date(2020, 2, 1);

describe('time formatting', () => {
  test('Date in ISO format', () => {
    expect(formatDateTime(testDate, timeFormats.YYYY_MM_DD)).toBe('2020-03-01');
  });
  test('Dash seperated date', () => {
    expect(formatDateTime(testDate, timeFormats.MM_DD_YYYY)).toBe('03/01/2020');
  });
  test('Date in full month, day, year', () => {
    expect(formatDateTime(testDate, timeFormats.MMMM_D_YYYY)).toBe(
      'March 1, 2020',
    );
  });
  test('Date in shorthand month, day, year', () => {
    expect(formatDateTime(testDate, timeFormats.MMM_DD_YYYY)).toBe(
      'Mar 01, 2020',
    );
  });
  test('Date in full month and unpadded day', () => {
    expect(formatDateTime(testDate, timeFormats.MMMM_D)).toBe('March 1');
  });
  test('Past date', () => {
    expect(formatDateTime(new Date(2015, 1, 1), timeFormats.YYYY_MM_DD)).toBe(
      '2015-02-01',
    );
  });
  test('Future date', () => {
    expect(formatDateTime(new Date(2025, 1, 1), timeFormats.YYYY_MM_DD)).toBe(
      '2025-02-01',
    );
  });
});

describe('date string parsing', () => {
  test('ISO format to date object', () => {
    expect(parseDateString('2020-03-01T00:00:00.000')).toEqual(testDate);
  });
  test('Date string to date object', () => {
    expect(parseDateString('2020-03-01')).toEqual(testDate);
  });
});
