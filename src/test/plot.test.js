import { mapXToCanvasCoords, mapYToCanvasCoords } from '../plot';

test('should map x coords to canvas coords', () => {
    (ctx => {
        expect(mapXToCanvasCoords(ctx, 0)).toBeCloseTo(0);
        expect(mapXToCanvasCoords(ctx, 1)).toBeCloseTo(10);
        expect(mapXToCanvasCoords(ctx, 5)).toBeCloseTo(50);
        expect(mapXToCanvasCoords(ctx, 10)).toBeCloseTo(100);
    })({
        width: 100,
        xMin: 0,
        xMax: 10
    });

    (ctx => {
        expect(mapXToCanvasCoords(ctx, 5)).toBeCloseTo(0);
        expect(mapXToCanvasCoords(ctx, 7.5)).toBeCloseTo(50);
        expect(mapXToCanvasCoords(ctx, 10)).toBeCloseTo(100);
        expect(mapXToCanvasCoords(ctx, 10)).toBeCloseTo(100);
    })({
        width: 100,
        xMin: 5,
        xMax: 10
    });

    (ctx => {
        expect(mapXToCanvasCoords(ctx, -10)).toBeCloseTo(0);
        expect(mapXToCanvasCoords(ctx, 0)).toBeCloseTo(33.3333);
        expect(mapXToCanvasCoords(ctx, 20)).toBeCloseTo(100);
    })({
        width: 100,
        xMin: -10,
        xMax: 20
    });
});

test('should map y coords to canvas coords', () => {
    (ctx => {
        expect(mapYToCanvasCoords(ctx, 10)).toBeCloseTo(0);
        expect(mapYToCanvasCoords(ctx, 5)).toBeCloseTo(50);
        expect(mapYToCanvasCoords(ctx, 0)).toBeCloseTo(100);
    })({
        height: 100,
        yMin: 0,
        yMax: 10
    });

    (ctx => {
        expect(mapYToCanvasCoords(ctx, 10)).toBeCloseTo(0);
        expect(mapYToCanvasCoords(ctx, 7.5)).toBeCloseTo(50);
        expect(mapYToCanvasCoords(ctx, 5)).toBeCloseTo(100);
    })({
        height: 100,
        yMin: 5,
        yMax: 10
    });

    (ctx => {
        expect(mapYToCanvasCoords(ctx, 20)).toBeCloseTo(0);
        expect(mapYToCanvasCoords(ctx, 10)).toBeCloseTo(33.3333);
        expect(mapYToCanvasCoords(ctx, -10)).toBeCloseTo(100);
    })({
        height: 100,
        yMin: -10,
        yMax: 20
    });
});
