/**
 * Set global variables
 */
//  size of cube
const side = 3;
// size of snake cube
const snake_side = side / 20;
// Speed of snake (in milliseconds)
const speed = 100;

const snake_locations = new Queue();
const snake_blocks = [];

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

var renderer = new THREE.WebGLRenderer({ antialias: true });
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
function create_snake_block(side) {
  let geometry = new THREE.BoxGeometry(side, side, side);
  var material = new THREE.MeshBasicMaterial({ color: 0x8bf0ba });
  let head = new THREE.Mesh(geometry, material);
  return head;
}

// Generates food sphere
function new_food(radius) {
  let geometry = new THREE.SphereGeometry(radius);
  var material = new THREE.MeshBasicMaterial({ color: 0x2fddf4 });
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

function clear_snake_blocks() {
  snake_blocks.forEach(function(block) {
    scene.remove(block);
  });
}

function create_snake() {
  clear_snake_blocks();

  const locations = snake_locations.getList();

  locations.forEach(function(location) {
    // Create cube at this location
    const snake_cube = create_snake_block(snake_side);
    snake_cube.position.set(location[0], location[1], location[2]);
    scene.add(snake_cube);
    snake_blocks.push(snake_cube);
  });
}

function move_right() {
  let current_head = snake_locations.head();
  current_head[0] += snake_side;
  snake_locations.enqueue(current_head);
  snake_locations.dequeue();
  create_snake();
}

// Create the big cube container
let cube = create_cube(side);
scene.add(cube);

// Set snake
snake_locations.enqueue([0, 0, 0]);
create_snake();

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

function move_snake() {
  setTimeout(function() {
    move_right();

    move_snake();
  }, speed);
}

move_snake();

function on_window_resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", on_window_resize, false);
