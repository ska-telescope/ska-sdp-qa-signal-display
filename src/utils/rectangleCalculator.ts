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