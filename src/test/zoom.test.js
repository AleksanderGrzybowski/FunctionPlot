import { zoom } from '../plot';

test('should zoom - cursor on the center', () => {
    expect(zoom(
        {xMin: 0, xMax: 4, yMin: 0, yMax: 4, anchorX: 2, anchorY: 2, scale: 2}
    )).toEqual(
        {xMin: 1, xMax: 3, yMin: 1, yMax: 3}
    );
});

test('should zoom - cursor on the far left', () => {
    expect(zoom(
        {xMin: 0, xMax: 4, yMin: 0, yMax: 4, anchorX: 0, anchorY: 2, scale: 2}
    )).toEqual(
        {xMin: 0, xMax: 2, yMin: 1, yMax: 3}
    );
});

test('should zoom - cursor on the far right', () => {
    expect(zoom(
        {xMin: 0, xMax: 4, yMin: 0, yMax: 4, anchorX: 4, anchorY: 2, scale: 2}
    )).toEqual(
        {xMin: 2, xMax: 4, yMin: 1, yMax: 3}
    );
});

test('should zoom - cursor on the far bottom', () => {
    expect(zoom(
        {xMin: 0, xMax: 4, yMin: 0, yMax: 4, anchorX: 2, anchorY: 0, scale: 2}
    )).toEqual(
        {xMin: 1, xMax: 3, yMin: 0, yMax: 2}
    );
});

test('should zoom - cursor on the far top', () => {
    expect(zoom(
        {xMin: 0, xMax: 4, yMin: 0, yMax: 4, anchorX: 2, anchorY: 4, scale: 2}
    )).toEqual(
        {xMin: 1, xMax: 3, yMin: 2, yMax: 4}
    );
});
