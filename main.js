import * as THREE from "https://cdn.skypack.dev/three";

const socket = io();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff));

const players = {};

socket.on("move", ({ id, x, y }) => {
  if (!players[id]) {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })
    );
    scene.add(cube);
    players[id] = cube;
  }
  players[id].position.x += x * 0.2;
  players[id].position.z += y * 0.2;
});

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
