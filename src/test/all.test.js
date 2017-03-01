import sum from './../logic';

test('should sum 1 and 2 to 3', () => {
    expect(sum(1, 2)).toBe(3);
});