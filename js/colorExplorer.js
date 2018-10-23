/*
 * @Author: QiangYin
 * @Date: 2018-10-23 09:56:34
 * @LastEditors: QiangYin
 * @LastEditTime: 2018-10-23 10:18:46
 * @Description: file content
 */
import * as DAT from 'dat.gui';
import * as THREE from 'three';
import * as Stats from './stats.min';
import * as OrbitControls from 'three-orbitcontrols';

const SCEEN_WIDTH = window.innerWidth;
const SCEEN_HEIGHT = window.innerHeight;
const NEAR = 0.1, FAR = 20000;
const VIEW_ANGLE = 45, ASPECT = SCEEN_WIDTH / SCEEN_HEIGHT;

let container, scene, camera, renderer, stats, controls;
let mesh; //custom global variables
let gui;

function init () {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 150, 400);
  camera.lookAt(scene.position);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(SCEEN_WIDTH, SCEEN_HEIGHT);

  container = document.getElementById('ThreeJS');
  container.appendChild(renderer.domElement);

  let light = new THREE.PointLight(0xffffff);
  light.position.set(-100, 150, 100);
  scene.add(light);

  let light2 = new THREE.AmbientLight(0x333333);
  light2.position.set(light.position);
  scene.add(light2);

  // add light geometry
  let lightbulbGeometry = new THREE.SphereGeometry(10, 16, 8);
  let lightbulbMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending});
  let wireMaterial = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
  let materialArray = [lightbulbMaterial, wireMaterial];
  let lightbulb = _createMultiMaterialObject(lightbulbGeometry, materialArray);
  lightbulb.position.set(light.position);
  scene.add(lightbulb);

  initObject();

  // Controls and Stats
  controls = new OrbitControls(camera, renderer.domElement);
  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.right = '0px';
  stats.domElement.style.top = '0px';
  container.appendChild(stats.domElement);
  // init GUI
  gui = new DAT.GUI();
};

function initObject () {
  let loader = new THREE.TextureLoader();
  let floorTexture = loader.load('img/checkerboard.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(10, 10);
  let floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
  let floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  let floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.5;
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);

  let skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
  let skyBoxMaterial = new THREE.MeshBasicMaterial({color:0x9999ff, side: THREE.BackSide});
  let skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  scene.add(skyBox);

  let geometry = new THREE.SphereGeometry(100, 50, 50);
  let material = new THREE.MeshLambertMaterial({color: 0x000088});
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 40, 0);
  scene.add(mesh);
};

function animate () {
  requestAnimationFrame(animate);
  render();
  update();
};

function update () {
  controls.update();
  stats.update();
};

function render () {
  renderer.render(scene, camera);
};

function _createMultiMaterialObject ( geometry, materials ) {
  var group = new THREE.Group();
  for ( var i = 0, l = materials.length; i < l; i ++ ) {
    group.add( new THREE.Mesh( geometry, materials[ i ] ) );
  }
  return group;
};

function __main__ () {
  init();
  animate();
}

__main__();
