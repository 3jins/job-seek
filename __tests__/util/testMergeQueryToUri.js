import mergeQueryToUri from '../../src/util/mergeQueryToUri';

describe('mergeQueryToUri', () => {
  it('should merge base uri with queries', () => {
    const uri = 'https://test.com';
    const queries = { q1: 'a', q2: 'b', q3: 'c' };
    const expected = 'https://test.com?q1=a&q2=b&q3=c';
    const result = mergeQueryToUri(uri, queries);
    expect(result).toEqual(expected);
  });
  it('should merge uri containing queries with other queries', () => {
    const uri = 'https://test.com?q1=a';
    const queries = { q2: 'b', q3: 'c' };
    const expected = 'https://test.com?q1=a&q2=b&q3=c';
    const result = mergeQueryToUri(uri, queries);
    expect(result).toEqual(expected);
  });
});
