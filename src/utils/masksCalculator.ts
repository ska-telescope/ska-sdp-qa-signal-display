export const INVALID_DATA_COLOR = "#fc0303";
export const MISSING_DATA_COLOR = "#03fc3d";

export function createRectangle(x0: number, x1: number, color: string) {
    return {
        type: 'rect',
        xref: 'x',
        yref: 'paper',
        x0: x0,
        y0: 0,
        x1: x1,
        y1: 1,
        fillcolor: color,
        opacity: 0.2,
        line: {
            width: 0
        }
    }
}

export function getMaskDomains(data: number[][]) {
    const frequencies = data[0];
    const masks = data[1];
    let indexArray = [];
    masks.forEach(onlyZero)

    function onlyZero(mask: number, i: number) {
        if(mask === 0.0) {
            indexArray.push(frequencies[i]);
        }
    }

    const maskData = [];
    let begin = 0;
    for(let i = 1; i < indexArray.length; i++) {
        if(indexArray[i] !== (indexArray[i-1]-1)) {
            maskData.push([frequencies[indexArray[begin]], frequencies[indexArray[i-1]]]);
            begin = i;
        }
    }

    maskData.push([frequencies[indexArray[begin]], frequencies[indexArray.at(-1)]]);

    return maskData
}