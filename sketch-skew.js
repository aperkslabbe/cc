const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const color = require("canvas-sketch-util/color");
const risoColors = require("riso-colors");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ width, height }) => {
  let x, y, w, h, fill, stroke, blend;

  const rects = [];
  const colors = [random.pick(risoColors), random.pick(risoColors)];

  const bgColor = random.pick(risoColors).hex;

  for (let i = 0; i < 40; i++) {
    x = random.range(0, width);
    y = random.range(0, height);
    w = random.range(600, width);
    h = random.range(40, 200);
    fill = random.pick(colors).hex;
    stroke = random.pick(colors).hex;
    blend = random.value() > 0.5 ? "overlay" : "source-over";
    rects.push({ x, y, w, h, fill, stroke, blend });
  }

  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    rects.forEach(({ x, y, w, h, fill, stroke, blend }) => {
      const shadowColor = color.offsetHSL(fill, 0, 0, -20);
      shadowColor.rgba[3] = 0.5;

      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = stroke;
      ctx.fillStyle = fill;
      ctx.lineWidth = 10;
      ctx.globalCompositeOperation = blend;

      drawSkewedRect({ ctx, w, h, degrees: -45 });

      ctx.shadowColor = color.style(shadowColor.rgba);
      ctx.shadowOffsetX = -10;
      ctx.shadowOffsetY = 20;

      ctx.fill();

      ctx.shadowColor = null;
      ctx.stroke();

      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.stroke();
      ctx.restore();
    });
  };
};

const drawTriangle = ({ ctx }) => {
  ctx.save();
  
}

const drawSkewedRect = ({ ctx, w = 600, h = 200, degrees = -90 }) => {
  const angle = math.degToRad(degrees),
    rx = Math.cos(angle) * w,
    ry = Math.sin(angle) * w;

  ctx.save();
  ctx.translate(rx * -0.5, (ry + h) * -0.5);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(rx, ry);
  ctx.lineTo(rx, ry + h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.restore();
};

canvasSketch(sketch, settings);
