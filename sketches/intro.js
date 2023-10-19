const cs = require("canvas-sketch");

const settings = {
  dimensions: [2040, 2040], // "A4" or [ width, height ]
  pixelPerInch: 300,
  // units: "cm",
  orientation: "landscape",
};

const sketch = () => {
  return ({ context, width, height }) => {
    console.log({ width, height });
    context.fillStyle = "blue";
    context.fillRect(0, 0, width, height);
    // circle
    context.beginPath();
    context.arc(width / 2, height / 2, width * 0.5, 0, Math.PI * 2, false);
    context.fillStyle = "red";
    context.fill();
    // circle
    context.beginPath();
    context.arc(width / 2, height / 2, width * 0.25, 0, Math.PI * 2, false);
    context.fillStyle = "white";
    context.fill();
    // circle stroke border
    context.lineWidth = width * 0.05;
    context.strokeStyle = "orange";
    context.stroke();
  };
};
cs(sketch, settings);
