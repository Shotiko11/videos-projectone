import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const backgroundColor = new THREE.Color(0xf0f0f0);
renderer.setClearColor(backgroundColor);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1 * 3, 1 * 3, 1 * 3);

const material = new THREE.MeshStandardMaterial({
  color: 0x2194ce,
  emissive: 0x0,
  roughness: 0.4,
  metalness: 0.5,
});

const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
scene.add(cube);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(3, 5, 3);
directionalLight.castShadow = true;
scene.add(directionalLight);

const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa,
  roughness: 0.8,
  metalness: 0.1,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.receiveShadow = true;
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

let isMouseDown = false;
let previousMouseX = 0;
let previousMouseY = 0;
let rotationSpeedX = 0;
let rotationSpeedY = 0;
let currentRotationX = 0; 
let currentRotationY = 0;

document.addEventListener("mousedown", () => {
  isMouseDown = true;
  rotationSpeedX = 0;
  rotationSpeedY = 0;
  currentRotationX = cube.rotation.x; 
  currentRotationY = cube.rotation.y;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

document.addEventListener("mousemove", (event) => {
  if (isMouseDown) {
    const currentMouseX = event.clientX;
    const currentMouseY = event.clientY;

    const deltaX = currentMouseX - previousMouseX;
    const deltaY = currentMouseY - previousMouseY;

    cube.rotation.x = currentRotationX - deltaY * 0.002; 
    cube.rotation.y = currentRotationY - deltaX * 0.002;

    rotationSpeedX = deltaX * 0.002;
    rotationSpeedY = deltaY * 0.002;

    previousMouseX = currentMouseX;
    previousMouseY = currentMouseY;
  }
});

function animate() {
  requestAnimationFrame(animate);

  if (!isMouseDown) {
    cube.rotation.x += rotationSpeedX;
    cube.rotation.y += rotationSpeedY;

    rotationSpeedX *= 0.95;
    rotationSpeedY *= 0.95;
  }

  renderer.render(scene, camera);
}

animate();