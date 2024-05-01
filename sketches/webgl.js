// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const eases = require("eases");
const BezierEasing = require("bezier-easing");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
  attributes: { antialias: true },
  dimensions: [2048, 2048],
  fps: 24,
  duration: 15,
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
  });
  // WebGL background color
  renderer.setClearColor("lightgrey", 1);
  // Setup a camera
  const camera = new THREE.OrthographicCamera();
  // Setup your scene
  const scene = new THREE.Scene();
  // Setup a geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const palette = random.pick(palettes);
  // Setup a mesh with geometry + material
  for (let i = 0; i < 200; i++) {
    // Setup a material
    // Material describe the surface qualities of the mesh
    const material = new THREE.MeshStandardMaterial({
      color: random.pick(palette),
    });
    const cubeMesh = new THREE.Mesh(geometry, material);
    cubeMesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    cubeMesh.scale.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    cubeMesh.scale.multiplyScalar(0.5);
    scene.add(cubeMesh);
  }
  scene.add(new THREE.AmbientLight(random.pick(palette), 1));
  scene.add(new THREE.AmbientLight("purple", 1));
  const light = new THREE.DirectionalLight("orange", 1);
  light.position.set(0, 0, 4);
  scene.add(light);

  const easeFn = BezierEasing(0.58, 0.03, 0.42, 1.03);
  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      // Setup an isometric perspective
      camera.aspect = viewportWidth / viewportHeight;
      const aspect = viewportWidth / viewportHeight;
      // Ortho zoom
      const zoom = 1.5;
      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;
      // Near/Far
      camera.near = -100;
      camera.far = 100;
      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());
      // Update the camera
      camera.updateProjectionMatrix();
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ playhead, time }) {
      const t = Math.sin(playhead * Math.PI);
      scene.rotation.z = easeFn(t);
      // scene.rotation.x = playhead * Math.PI * 2;

      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
