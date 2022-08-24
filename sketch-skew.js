const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ], 
  // animate: true
};

const sketch = ({ width, height }) => {
  let x, y, w, h;

  const rects = [];
 
  for (let i = 0; i < 20; i++) { 
    x = random.range(0, width);
    y = random.range(0, height);
    w = random.range(200, 600);
    h = random.range(40, 200);
    rects.push({ x, y, w, h });
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    rects.forEach(({ x, y, w, h }) => {
      context.save();
      context.translate(x, y);
      context.strokeStyle = 'blue';
      drawSkewedRect({ context, w, h, degrees: -45 });
      context.stroke();
      context.restore();
    });
  };
};

const drawSkewedRect = ({ context, w = 600, h = 200, degrees = -90  }) => {
  const angle = math.degToRad(degrees),
    rx = Math.cos(angle) * w, 
    ry = Math.sin(angle) * w;

  context.save();
  context.translate(rx * -0.5, (ry + h) * -0.5); 
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry); 
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath();
  context.restore();
}

canvasSketch(sketch, settings);
