// those mapping functions are inverses of each other

export function mapXToCanvasCoords({width, xMin, xMax}, x) {
    return Math.round(((x - xMin) / (xMax - xMin)) * width);
}

export function mapXToFunctionCoords({width, xMin, xMax}, x) {
    return xMin + x * (xMax - xMin) / width
}

export function mapYToCanvasCoords({height, yMin, yMax}, y) {
    return Math.round(height - ((y - yMin) / (yMax - yMin)) * height);
}

export function mapYToFunctionCoords({height, yMin, yMax}, y) {
    return (height - y) * (yMax - yMin) / height + yMin;
}

// this is mostly trial-and-error
export function gridLines(min, max) {
    const delta = (max - min) / 3;

    //http://stackoverflow.com/questions/22491505/how-to-round-down-to-the-nearest-power-of-10
    const space = Math.pow(10, Math.floor(Math.log10(delta)));

    const arr = [];
    for (let left = Math.round(min / space) * space; left < Math.round(max / space) * space; left += space) {
        if (left > min && left < max) {
            arr.push(left);
        }
    }

    return arr;
}

export function zoom({xMin, xMax, yMin, yMax, anchorX, anchorY, scale}) {
    // put the zoomed area reactangle right on the center of the view
    // rectangle is represented by its bottom-left corner and width/height
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
    // depending on direction of zooming, we need to move
    // rectangle left or right, up or down
    const moveCoeff = (scale > 1) ? 1 : -1;

    const xDiff = anchorX - (xMax + xMin) / 2;
    zoomRect.xMin += moveCoeff * xDiff / 2;
    zoomRect.xMax += moveCoeff * xDiff / 2;

    const yDiff = anchorY - (yMax + yMin) / 2;
    zoomRect.yMin += moveCoeff * yDiff / 2;
    zoomRect.yMax += moveCoeff * yDiff / 2;

    return zoomRect;
}
