type Vertex = { x: number, y: number, z: number };
type Face = { v1: Vertex, v2: Vertex, v3: Vertex };
const w = 10, h = 10, d = 10, p = { x: 0, y: 0, z: 0 };
const cube: Face[] = [
  { v1: { x: p.x - w, y: p.y - h, z: p.z - d }, v2: { x: p.x + w, y: p.y - h, z: p.z - d}, v3: { x: p.x - w, y: p.y - h, z: p.z + d } },
  { v1: { x: p.x + w, y: p.y - h, z: p.z - d }, v2: { x: p.x + w, y: p.y - h, z: p.z + d}, v3: { x: p.x - w, y: p.y - h, z: p.z + d } },
  { v1: { x: p.x - w, y: p.y - h, z: p.z + d }, v2: { x: p.x + w, y: p.y - h, z: p.z + d}, v3: { x: p.x - w, y: p.y + h, z: p.z + d } },
  { v1: { x: p.x - w, y: p.y + h, z: p.z + d }, v2: { x: p.x + w, y: p.y - h, z: p.z + d}, v3: { x: p.x + w, y: p.y + h, z: p.z + d } },
  { v1: { x: p.x + w, y: p.y - h, z: p.z - d }, v2: { x: p.x + w, y: p.y + h, z: p.z - d}, v3: { x: p.x + w, y: p.y - h, z: p.z + d } },
  { v1: { x: p.x + w, y: p.y + h, z: p.z - d }, v2: { x: p.x + w, y: p.y + h, z: p.z + d}, v3: { x: p.x + w, y: p.y - h, z: p.z + d } },
  { v1: { x: p.x - w, y: p.y + h, z: p.z - d }, v2: { x: p.x - w, y: p.y + h, z: p.z + d}, v3: { x: p.x + w, y: p.y + h, z: p.z - d } },
  { v1: { x: p.x + w, y: p.y + h, z: p.z - d }, v2: { x: p.x - w, y: p.y + h, z: p.z + d}, v3: { x: p.x + w, y: p.y + h, z: p.z + d } },
  { v1: { x: p.x - w, y: p.y - h, z: p.z - d }, v2: { x: p.x - w, y: p.y - h, z: p.z + d}, v3: { x: p.x - w, y: p.y + h, z: p.z + d } },
  { v1: { x: p.x - w, y: p.y - h, z: p.z - d }, v2: { x: p.x - w, y: p.y + h, z: p.z + d}, v3: { x: p.x - w, y: p.y + h, z: p.z - d } },
  { v1: { x: p.x - w, y: p.y - h, z: p.z - d }, v2: { x: p.x - w, y: p.y + h, z: p.z - d}, v3: { x: p.x + w, y: p.y - h, z: p.z - d } },
  { v1: { x: p.x + w, y: p.y - h, z: p.z - d }, v2: { x: p.x - w, y: p.y + h, z: p.z - d}, v3: { x: p.x + w, y: p.y + h, z: p.z - d } },
];

function rotateVertex(target: Vertex, center: Vertex, theta: number, phi: number) {
  const ct = Math.cos(theta), st = Math.sin(theta), cp = Math.cos(phi), sp = Math.sin(phi);

  const x = target.x - center.x,
        y = target.y - center.y,
        z = target.z - center.z;

  target.x = ct * x - st * cp * z + st * sp * y + center.x;
  target.z = st * x + ct * cp * z - ct * sp * y + center.z;
  target.y = sp * z + cp * y + center.y;
}

const camera: {
  position: Vertex,
  lookAt: Vertex,
} = {
  position: { x: 5, y: 5, z: 5 },
  lookAt: { x: 0, y: 0, z: 0 },
}

function autoRotate() {
  cube.forEach(face => {
    rotateVertex(face.v1, { x: 0, y: 0, z: 0 }, Math.PI / 180, Math.PI / 300);
    rotateVertex(face.v2, { x: 0, y: 0, z: 0 }, Math.PI / 180, Math.PI / 300);
    rotateVertex(face.v3, { x: 0, y: 0, z: 0 }, Math.PI / 180, Math.PI / 300);
  })
  requestAnimationFrame(autoRotate);
}
autoRotate();

const canvas = document.querySelector("canvas")!;
const context = canvas.getContext("2d")!;

const width = canvas.width;
const height = canvas.height;
function clear() {
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);
}

type Point = {x: number, y: number}
function draw(v1: Point, v2: Point, v3: Point) {
  context.beginPath();
  context.strokeStyle = "black";
  context.moveTo((width / 2) + v1.x, (height / 2) - v1.y);
  context.lineTo((width / 2) + v2.x, (height / 2) - v2.y);
  context.lineTo((width / 2) + v3.x, (height / 2) - v3.y);
  context.closePath();
  context.stroke();
}

function render() {
  clear();
  cube.forEach(face => draw(face.v1, face.v2, face.v3));
  requestAnimationFrame(render);
}

render();
