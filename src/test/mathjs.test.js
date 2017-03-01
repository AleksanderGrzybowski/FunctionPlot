import math from 'mathjs';

test('should properly handle extra whitespace', () => {
    [
        '2+2',
        '2 + 2',
        ' 2 + 2 ',
        '       2       +        2       '
    ].forEach(expr => expect(math.eval(expr)).toEqual(4));
});

test('should properly calculate typical expressions with maximum one variable', () => {
    expect(math.eval('x', {x: 1})).toEqual(1);
    expect(math.eval('2*x', {x: 1})).toEqual(2);
    expect(math.eval('x*x', {x: 9})).toEqual(81);
    expect(math.eval('3*x+3', {x: 1})).toEqual(6);

    expect(math.eval('sin(3.14159)')).toBeCloseTo(0);
    expect(math.eval('e^x', {x: 2})).toBeCloseTo(Math.E * Math.E);
});
