import getQueryValueFromUri from '../../src/util/getQueryValueFromUri';

describe('getQueryValueFromUri', () => {
  it('should parse as intended', () => {
    const uri1 = 'https://test.com/exmple/?q1=a&q2=b&q3=c';
    expect(getQueryValueFromUri(uri1, 'q1')).toBe('a');
    expect(getQueryValueFromUri(uri1, 'q2')).toBe('b');
    expect(getQueryValueFromUri(uri1, 'q3')).toBe('c');

    const uri2 = 'https://test.com/exmple?q1=a&q2=b';
    expect(getQueryValueFromUri(uri2, 'q1')).toBe('a');
    expect(getQueryValueFromUri(uri2, 'q2')).toBe('b');

    const uri3 = 'https://test.com/exmple?q1=q2&q2=q1';
    expect(getQueryValueFromUri(uri3, 'q1')).toBe('q2');
    expect(getQueryValueFromUri(uri3, 'q2')).toBe('q1');
  });
});
