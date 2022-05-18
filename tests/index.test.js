import { describe, expect } from '@jest/globals';
import { getCount } from '../src/modules/Helpers.js';

describe('Cont the number of shows', () => {
  const shows = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];
  test('Numer of items should be 5', () => {
    expect(getCount(shows)).toBe(5);
  });
});