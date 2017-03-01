export function mapXToCanvasCoords({width, xMin, xMax}, x) {
    return ((x - xMin) / (xMax - xMin)) * width;
}

export function mapYToCanvasCoords({height, yMin, yMax}, y) {
    return height - ((y - yMin) / (yMax - yMin)) * height;
}

