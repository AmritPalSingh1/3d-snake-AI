/**
 * Set global variables
 */
//  size of cube
const side = 3;
// size of snake cube
const snake_side = side / 40;

/**
 * Page setup
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit camera around center
var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 7);
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.update();

/**
 * Generates cube container
 */
function create_cube(side) {
  let geometry = new THREE.BoxGeometry(side, side, side);
  let edges = new THREE.EdgesGeometry(geometry);
  let cube = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xffffff })
  );
  return cube;
}

// Generates snake block
function create_snake_initial(side) {
  let geometry = new THREE.BoxGeometry(side, side, side);
  var material = new THREE.MeshBasicMaterial({ color: 0x8bf0ba });
  let head = new THREE.Mesh(geometry, material);
  return head;
}

// Generates food sphere
function new_food(radius) {
  let geometry = new THREE.SphereGeometry(radius);
  var material = new THREE.MeshBasicMaterial({ color: 0xff214f });
  let shpere = new THREE.Mesh(geometry, material);
  return shpere;
}

// Updates food location randomly
function change_food_location(food) {
  const rand_x = Math.random() * side - side / 2;
  const rand_y = Math.random() * side - side / 2;
  const rand_z = Math.random() * side - side / 2;
  food.position.set(rand_x, rand_y, rand_z);
}

// Create the big cube container
let cube = create_cube(side);
scene.add(cube);

// Set snake
let snake = create_snake_initial(side / 60);
// scene.add(snake);

// Create food
let food = new_food(snake_side / 2);
change_food_location(food);
scene.add(food);

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}
animate();
