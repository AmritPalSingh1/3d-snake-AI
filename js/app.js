var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(3, 3, 3);
var edges = new THREE.EdgesGeometry(geometry);
var cube = new THREE.LineSegments(
  edges,
  new THREE.LineBasicMaterial({ color: 0xffffff })
);

scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();
