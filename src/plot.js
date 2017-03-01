export function mapXToCanvasCoords({width, xMin, xMax}, x) {
    return ((x - xMin) / (xMax - xMin)) * width;
}

export function mapYToCanvasCoords({height, yMin, yMax}, y) {
    return height - ((y - yMin) / (yMax - yMin)) * height;
}

export function gridLines(min, max, numberOfLines) {
    const dx = (max - min) / (numberOfLines + 1);
    let left = min + dx;
    const arr = [];
    
    for (let i = 0; i < numberOfLines; ++i) {
        arr.push(left);
        left += dx;
    }
    
    return arr;
}
