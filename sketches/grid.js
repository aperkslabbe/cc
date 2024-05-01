const cs = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2040, 2040],
};

// 885000 is a cool seed
random.setSeed(random.getRandomSeed());
console.log({ randomSeed: random.getSeed() });
const sketch = () => {
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
  const createGrid = () => {
    const points = [];
    const count = 20;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.25;
        points.push({
          color: random.pick(palette),
          rotation: random.noise2D(u, v) * 0.05,
          radius,
          position: [u, v],
        });
      }
    }
    return points;
  };
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 200;
  return ({ context, width, height, rotation }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    points.forEach(({ position: [u, v], radius, color }) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      // context.beginPath();
      // context.arc(x, y, width * radius, 0, Math.PI * 2, false);
      // context.fillStyle = color;
      // context.fill();
      context.save();
      context.fillStyle = color;
      context.font = `${width * radius}px "Helvetica"`;
      context.translate(x * 0.9, y);
      context.rotate(rotation);
      context.fillText("🍑", 0, 0);
      context.restore();
    });
  };
};

cs(sketch, settings);
