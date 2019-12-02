/**
 * Set global variables
 */
//  size of cube
const side = 3;
// size of snake cube
const snake_side = side / 30;
// Speed of snake (in milliseconds)
const speed = 50;

const snake_locations = new Queue();
let snake_blocks = [];
let food_location;

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

function distanceVector(v1, v2) {
  var dx = v1[0] - v2[0];
  var dy = v1[1] - v2[1];
  var dz = v1[2] - v2[2];

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function snake_food_collision(cube_center, sphere_center) {
  if (distanceVector(cube_center, sphere_center) < snake_side) {
    return true;
  } else {
    return false;
  }
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

function get_coordinate(count_valid_sides, in_side) {
  const left_most_value = Math.floor(in_side / snake_side) * snake_side * -1;
  return (
    left_most_value + snake_side * Math.floor(Math.random() * count_valid_sides)
  );
}

// Updates food location randomly
function change_food_location(food) {
  const in_side = side / 2 - snake_side / 2;

  // Number of valid values
  const count_valid_sides = Math.floor(in_side / snake_side) * 2 + 1;

  const rand_x = get_coordinate(count_valid_sides, in_side);
  const rand_y = get_coordinate(count_valid_sides, in_side);
  const rand_z = get_coordinate(count_valid_sides, in_side);

  food_location = [rand_x, rand_y, rand_z];
  food.position.set(rand_x, rand_y, rand_z);
}

function clear_snake_blocks() {
  // for (let i = 0; i < snake_blocks.length; i++){
  //   const block =
  // }
  snake_blocks.forEach(function(block) {
    scene.remove(block);
  });
  snake_blocks = [];
}

function create_snake() {
  clear_snake_blocks();

  const locations = snake_locations.getList();

  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];

    // Create cube at this location
    const snake_cube = create_snake_block(snake_side);
    snake_cube.position.set(location[0], location[1], location[2]);
    scene.add(snake_cube);
    snake_blocks.push(snake_cube);
  }
}

function is_head_in() {
  const head = snake_locations.head();
  let result = false;
  if (head == "No element in Queue") {
    result = false;
  } else {
    for (let i = 0; i < head.length; i++) {
      value = head[i];
      if (
        value < side / 2 - snake_side / 2 &&
        value > (side / 2) * -1 + snake_side / 2
      ) {
        result = true;
      } else {
        result = false;
        break;
      }
    }
  }
  return result;
}

function move(direction) {
  let current_head = snake_locations.head();

  switch (direction) {
    case "left":
      current_head[0] -= snake_side;
      break;
    case "right":
      current_head[0] += snake_side;
      break;
    case "up":
      current_head[1] += snake_side;
      break;
    case "down":
      current_head[1] -= snake_side;
      break;
    case "in":
      current_head[2] -= snake_side;
      break;
    case "out":
      current_head[2] += snake_side;
      break;
  }

  if (!is_head_in()) {
    clear();
  }

  snake_locations.enqueue(current_head);

  if (!snake_food_collision(current_head, food_location)) {
    // Collision with food
    snake_locations.dequeue();
  } else {
    change_food_location(food);
  }
  create_snake();
}

let food = new_food(snake_side / 2);

function clear() {
  console.log("clear");
  // reset variables
  snake_locations.clear();
  create_snake();
  snake_blocks = [];
}

function init() {
  console.log("reset");
  // reset variables
  snake_locations.clear();
  create_snake();
  snake_blocks = [];

  // Create the big cube container
  let cube = create_cube(side);
  scene.add(cube);

  // Set snake
  snake_locations.enqueue([0, 0, 0]);
  create_snake();

  // Create food
  change_food_location(food);
  scene.add(food);
  move_snake();
}

init();

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}
animate();

function check_collisions() {}

function move_snake() {
  setTimeout(function() {
    // Move randomly

    // Get food location
    let head = snake_locations.head();

    console.log(food_location + " , " + head);
    if (food_location[0] - head[0] > snake_side / 2) {
      move("right");
    } else if (food_location[1] - head[1] >= snake_side / 2) {
      move("up");
    } else if (food_location[2] - head[2] >= snake_side / 2) {
      move("out");
    } else if (head[0] - food_location[0] >= snake_side / 2) {
      move("left");
    } else if (head[1] - food_location[1] >= snake_side / 2) {
      move("down");
    } else if (head[2] - food_location[2] >= snake_side / 2) {
      move("in");
    }

    if (!is_head_in()) {
      // restart game
      console.log("game over");
      init();
    } else {
      move_snake();
    }
  }, speed);
}

function on_window_resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", on_window_resize, false);
