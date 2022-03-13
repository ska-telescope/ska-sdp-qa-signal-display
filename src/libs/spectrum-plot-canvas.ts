export class SpectrumPlotCanvas {
  canvas;
  xMin;
  yMin;
  xMax;
  yMax;
  unitsPerTickX;
  unitsPerTickY;

  // constants
  padding = 10;
  tickSize = 10;
  axisColor = "#555";
  pointRadius = 5;
  font = "12pt Calibri";

  fontHeight = 12;

  // relationships
  ctx;
  rangeX;
  rangeY;
  numXTicks;
  numYTicks;
  x;
  y;
  width;
  height;
  scaleX;
  scaleY;

  constructor(conf) {
    // user defined properties
    this.canvas = document.getElementById(conf.canvasId);

    this.unitsPerTickX = conf.unitsPerTickX;
    this.unitsPerTickY = conf.unitsPerTickY;

    // constants
    this.padding = 10;
    this.tickSize = 10;
    this.axisColor = "#555";
    this.pointRadius = 3;
    this.font = "12pt Calibri";

    this.fontHeight = 12;

    // relationships
    this.ctx = this.canvas.getContext("2d");
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw(data: any) {
    this.clear();

    this.xMin = data.xMin !== undefined ? data.xMin : data.x_min;
    this.yMin = data.yMin !== undefined ? data.yMin : data.y_min;
    this.xMax = data.xMax !== undefined ? data.xMax : data.x_max;
    this.yMax = data.yMax !== undefined ? data.yMax : data.y_max;

    // console.log("SpectrumPlotCanvas:draw:", data, this.xMin);

    this.rangeX = this.xMax - this.xMin;
    this.rangeY = this.yMax - this.yMin;

    this.numXTicks = 10; // Math.round(this.rangeX / this.unitsPerTickX);
    this.numYTicks = 4; // Math.round(this.rangeY / this.unitsPerTickY);

    this.x = this.getLongestValueWidth() + this.padding * 2;
    this.y = this.padding * 2;
    this.width = this.canvas.width - this.x - this.padding * 2;
    this.height = this.canvas.height - this.y - this.padding - this.fontHeight;
    this.scaleX = this.width / this.rangeX;
    this.scaleY = this.height / this.rangeY;

    this.drawXAxis();
    this.drawYAxis();
    this.drawLine(data);
  }

  drawXAxis() {
    var ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.strokeStyle = this.axisColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // draw tick marks
    for (var n = 0; n < this.numXTicks; n++) {
      ctx.beginPath();
      ctx.moveTo(
        ((n + 1) * this.width) / this.numXTicks + this.x,
        this.y + this.height,
      );
      ctx.lineTo(
        ((n + 1) * this.width) / this.numXTicks + this.x,
        this.y + this.height - this.tickSize,
      );
      ctx.stroke();
    }

    // draw labels
    ctx.font = this.font;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (var n = 0; n < this.numXTicks; n++) {
      var label = Math.round(((n + 1) * this.xMax) / this.numXTicks);
      ctx.save();
      ctx.translate(
        ((n + 1) * this.width) / this.numXTicks + this.x,
        this.y + this.height + this.padding,
      );
      ctx.fillText(label, 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  drawYAxis() {
    var ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.strokeStyle = this.axisColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // draw tick marks
    // ctx.save();
    for (var n = 0; n < this.numYTicks; n++) {
      ctx.beginPath();
      ctx.moveTo(this.x, (n * this.height) / this.numYTicks + this.y);
      ctx.lineTo(
        this.x + this.tickSize,
        (n * this.height) / this.numYTicks + this.y,
      );
      ctx.stroke();
    }
    // ctx.restore();

    // draw values
    // ctx.save();
    ctx.font = this.font;
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (var n = 0; n < this.numYTicks; n++) {
      ctx.save();

      var value = Math.round(this.yMax - (n * this.yMax) / this.numYTicks);

      ctx.translate(
        this.x - this.padding,
        (n * this.height) / this.numYTicks + this.y,
      );
      ctx.fillText(value, 0, 0);

      ctx.restore();
    }
    ctx.restore();
  }

  drawLine(data, color = "#3366CC", width = 1, showPoints = false) {
    let x = data.channels,
      y = data.power;

    var ctx = this.ctx;
    ctx.save();
    this.transformContext();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x[0] * this.scaleX, y[0] * this.scaleY);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    for (var n = 0; n < x.length; n++) {
      // draw segment
      ctx.lineTo(x[n] * this.scaleX, y[n] * this.scaleY);
      ctx.stroke();
      ctx.closePath();

      if (showPoints) {
        ctx.beginPath();
        ctx.arc(
          x[n] * this.scaleX,
          y[n] * this.scaleY,
          this.pointRadius,
          0,
          2 * Math.PI,
          false,
        );
        ctx.fill();
        ctx.closePath();
      }

      // position for next segment
      ctx.beginPath();
      ctx.moveTo(x[n] * this.scaleX, y[n] * this.scaleY);
    }

    ctx.restore();
  }

  drawArea(data, color = "#1f77b4 ", width = 0) {
    let x = data.channels,
      y = data.power,
      y1 = data.sdU || data?.sd_u,
      y2 = data.sdL || data?.sd_l;

    var ctx = this.ctx;
    ctx.save();
    this.transformContext();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.moveTo(x[0] * this.scaleX, y[0] * this.scaleY);

    for (var n = 0; n < x.length - 1; n++) {
      let startX = x[n] * this.scaleX,
        endX = x[n + 1] * this.scaleX,
        startY = y[n] * this.scaleY,
        startY1 = (y[n] - 4 * y1[n]) * this.scaleY,
        endY1 = (y[n + 1] - 4 * y1[n + 1]) * this.scaleY,
        startY2 = (y[n] + 4 * y2[n]) * this.scaleY,
        endY2 = (y[n + 1] + 4 * y2[n + 1]) * this.scaleY;

      ctx.moveTo(startX, startY1);
      ctx.lineTo(endX, endY1);

      ctx.moveTo(startX, startY2);
      ctx.lineTo(endX, endY2);

      ctx.stroke();
      ctx.closePath();

      // position for next segment
      ctx.beginPath();
      ctx.moveTo(startX, startY);
    }

    //ctx.beginPath();
    // ctx.moveTo(75, 25);
    // ctx.quadraticCurveTo(25, 25, 25, 62.5);
    // ctx.quadraticCurveTo(25, 100, 50, 100);
    // ctx.quadraticCurveTo(50, 120, 30, 125);
    // ctx.quadraticCurveTo(60, 120, 65, 100);
    // ctx.quadraticCurveTo(125, 100, 125, 62.5);
    // ctx.quadraticCurveTo(125, 25, 75, 25);
    //ctx.fill();

    ctx.restore();
  }

  getLongestValueWidth() {
    this.ctx.font = this.font;
    var longestValueWidth = 0;
    for (var n = 0; n <= this.numYTicks; n++) {
      var value = this.yMax - n * this.unitsPerTickY;
      longestValueWidth = Math.max(
        longestValueWidth,
        this.ctx.measureText(value).width,
      );
    }
    return longestValueWidth;
  }

  transformContext() {
    var ctx = this.ctx;

    // move ctx to center of canvas
    this.ctx.translate(this.x, this.y + this.height);

    // invert the y scale so that that increments
    // as you move upwards
    ctx.scale(1, -1);
  }
}
