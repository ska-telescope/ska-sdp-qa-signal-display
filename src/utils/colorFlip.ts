// Given a color, determine and pass back the appropriate contrasting color

export function padZero(str: string, len?: number) {
  len = len || 2;
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function colorFlip(hex: any, bw?: boolean) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }
  // invert color components
  r = parseInt((255 - r).toString(16), 10);
  g = parseInt((255 - g).toString(16), 10);
  b = parseInt((255 - b).toString(16), 10);
  // pad each with zeros and return
  return `#${padZero(r.toString())}${padZero(g.toString())}${padZero(b.toString())}`;
}
