const PHASE_NORM_FACTOR = 360;

export const enum WaterfallDirection {
  TOP_TO_BOTTOM = 'top-to-bottom',
  LEFT_TO_RIGHT = 'left-to-right',
}

export class SpectrogramPlot {
  direction: WaterfallDirection;
  canvas;
  ctx;
  width: number;
  height: number;
  len: 0;
  h: number;
  w: number;
  x: number;
  y: number;
  init: boolean;

  data = [];

  constructor(canvasId, direction = WaterfallDirection.TOP_TO_BOTTOM) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    console.log('SpectrogramPlot:constructor:', this.width, this.height);

    this.direction = direction;
  }

  draw(data) {
    if (!this.init) {
      this.ctx.fillStyle = 'hsl(0, 0%, 100%)';
      this.ctx.fillRect(0, 0, this.width, this.height);

      if (this.direction === WaterfallDirection.TOP_TO_BOTTOM) {
        this.y = 0;
      } else {
        this.x = this.width - 1;
      }

      this.init = true;
    }

    if (this.len !== data.length) {
      this.len = data.length;

      if (this.direction === WaterfallDirection.TOP_TO_BOTTOM) {
        this.w = this.width / this.len;
      } else {
        this.h = this.height / this.len;
      }
    }

    this.data = data;
    //console.log("SpectrogramPlot:draw: data = ", this.data);

    // window.requestAnimationFrame(this.loop.bind(this));
    this.loop();
  }

  loop() {
    if (this.direction === WaterfallDirection.TOP_TO_BOTTOM) {
      const imgData = this.ctx.getImageData(0, 0, this.width, this.height - 1);
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.putImageData(imgData, 0, 1);
    } else {
      const imgData = this.ctx.getImageData(1, 0, this.width - 1, this.height);
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.putImageData(imgData, 0, 0);
    }

    // console.log("SpectrogramPlot:loop: data = ", this.data);

    for (let i = 0; i < this.len; i = i + 1) {
      const rat = this.data[i] / PHASE_NORM_FACTOR; // 0-1 normalize
      const hue = Math.round(rat * 360); // hsl normalize
      const sat = '100%';
      const lit = '50%';

      // console.log(`rat = ${rat}, hue = ${hue}, sat = ${sat}, lit = ${lit}`);
      // console.log(`SpectrogramPlot:loop: h = ${this.h}, w = ${this.w}, x = ${this.x}, y = ${this.y}`);

      this.ctx.beginPath();
      this.ctx.strokeStyle = `hsl(${hue}, ${sat}, ${lit})`;

      if (this.direction === WaterfallDirection.TOP_TO_BOTTOM) {
        this.ctx.moveTo(0 + i * this.w, this.y);
        this.ctx.lineTo(0 + (i * this.w + this.w), this.y);
      } else {
        this.ctx.moveTo(this.x, this.height - i * this.h);
        this.ctx.lineTo(this.x, this.height - (i * this.h + this.h));
      }
      this.ctx.stroke();
    }
  }
}
