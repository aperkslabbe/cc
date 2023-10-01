const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [800, 800],
  // animate: true,
  fps: 60,
};

const sketch = ({ ctx, width, height }) => {
  let x = 0,
    y = 0;

  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, width, height);

  return ({ ctx, width, height, frame }) => {
    if (frame > 139) return;
    x += 10;

    if (x > 460) {
      y += 240;
      x = 0;
    }

    ctx.fillStyle = frame % 2 ? "black" : "yellow";
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = 10;

    ctx.strokeRect(x + 75, y + 140, 150, 110);
    ctx.fillRect(x + 130, y + 190, 40, 60);

    ctx.beginPath();
    ctx.moveTo(x + 50, y + 140);
    ctx.lineTo(x + 150, y + 60);
    ctx.lineTo(x + 250, y + 140);
    ctx.closePath();
    ctx.stroke();
  };
};

canvasSketch(sketch, settings);
