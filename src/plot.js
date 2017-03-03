export function mapXToCanvasCoords({width, xMin, xMax}, x) {
    return ((x - xMin) / (xMax - xMin)) * width;
}

export function mapXToFunctionCoords({width, xMin, xMax}, x) {
    return xMin + x * (xMax - xMin) / width
}

export function mapYToCanvasCoords({height, yMin, yMax}, y) {
    return height - ((y - yMin) / (yMax - yMin)) * height;
}

export function mapYToFunctionCoords({height, yMin, yMax}, y) {
    return (height - y) * (yMax - yMin) / height + yMin;
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

export function zoom({xMin, xMax, yMin, yMax, anchorX, anchorY, scale}) {
    // put the zoomed area reactangle right on the center of the view
    // rectangle is represented by its bottom-left corner
    // zooming 2x means the size of the zooming rectangle is 1/2 the size of view

    const width = xMax - xMin;
    const rectX = xMin + (width - (1.0 / scale) * width) / 2;

    const h = yMax - yMin;
    const rectY = yMin + (h - (1.0 / scale) * h) / 2;

    const zoomRect = {
        xMin: rectX,
        xMax: rectX + (1 / scale) * width,
        yMin: rectY,
        yMax: rectY + (1 / scale) * h
    };

    // move centered rectangle relative to anchorX/Y
    const xDiff = anchorX - (xMax + xMin) / 2;
    zoomRect.xMin += xDiff / 2;
    zoomRect.xMax += xDiff / 2;

    const yDiff = anchorY - (yMax + yMin) / 2;
    zoomRect.yMin += yDiff / 2;
    zoomRect.yMax += yDiff / 2;

    return zoomRect;
}
