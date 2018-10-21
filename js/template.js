/*
 * @Author: QiangYin
 * @Date: 2018-10-21 17:40:54
 * @LastEditors: QiangYin
 * @LastEditTime: 2018-10-21 18:53:14
 * @Description: This is simple template for threejs project
 */
import * as THREE from 'three';
import * as Stats from './stats.min';
import * as OrbitControls from 'three-orbitcontrols';

const SCEEN_WIDTH = window.innerWidth;
const SCEEN_HEIGHT = window.innerHeight;
const NEAR = 0.1, FAR = 20000;
const VIEW_ANGLE = 45, ASPECT = SCEEN_WIDTH / SCEEN_HEIGHT;

let container, scene, camera, renderer, stats, controls;
let mesh; //custom global variables

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

  // Controls and Stats
  controls = new OrbitControls(camera, renderer.domElement);
  stats = new Stats();
  stat.domElement.style.position = 'absolute';
  stat.domElement.style.right = '0px';
  stat.domElement.style.top = '0px';
  container.appendChild(stat.domElement);
};
