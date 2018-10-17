import * as THREE from 'three';
import * as Stats from './stats.min';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById( 'ThreeJS' ).appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

const lineMaterial = new THREE.LineBasicMaterial( {color: 0x0000ff} );
const lineGeometry = new THREE.Geometry();
lineGeometry.vertices.push(new THREE.Vector3(-1, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(0, 1, 0));
lineGeometry.vertices.push(new THREE.Vector3(1, 0, 0));
const line = new THREE.Line(lineGeometry, lineMaterial);
scene.add(line);

const stat = new Stats();
stat.domElement.style.position = 'absolute';
stat.domElement.style.right = '0px';
stat.domElement.style.top = '0px';
document.getElementById( 'ThreeJS' ).appendChild(stat.domElement);

function animatie() {
  stat.begin();
  requestAnimationFrame( animatie );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render( scene, camera );
  stat.end();
}

animatie();