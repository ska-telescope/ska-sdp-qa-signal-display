class Spectrogram {
  canvas;
  context;
  width;
  height;
  len;
  h;
  x;
  init;

  data = [];

  constructor(id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext("2d");
    this.width = 100; // this.canvas.width;
    this.height = 100; //this.canvas.height;
  }

  draw(data) {
    if (!this.init) {
      this.len = data.length;
      this.h = this.height / this.len;
      this.x = this.width - 1;
      this.context.fillStyle = "hsl(0, 0%, 100%)";
      this.context.fillRect(0, 0, this.width, this.height);

      this.init = true;
    }

    this.data = data;
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    const imgData = this.context.getImageData(1, 0, this.width - 1, this.height);
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.putImageData(imgData, 0, 0);

    const NORMALISE_FACTOR = 360;

    console.log("Spectrogram:loop: data = ", this.data);

    for (let i = 0; i < this.len; i++) {
      const rat = this.data[i] / NORMALISE_FACTOR; // 0-1 normalise
      const hue = Math.round(rat * 360); // hsl normalise
      const sat = "100%";
      const lit = "50%";

      console.log(`rat = ${rat}, hue = ${hue}, sat = ${sat}, lit = ${lit}`);

      this.context.beginPath();
      this.context.strokeStyle = `hsl(${hue}, ${sat}, ${lit})`;
      this.context.moveTo(this.x, this.height - i * this.h);
      this.context.lineTo(this.x, this.height - (i * this.h + this.h));
      this.context.stroke();
    }

    // this.data.fill(0);
  }
}

export default Spectrogram;
