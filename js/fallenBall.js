/*
 * @Description: Fallen ball
 * @Author: QiangYin
 * @Date: 2018-10-17 11:26:54
 * @LastEditTime: 2018-10-17 15:23:40
 * @LastEditors: your name
 */
import * as THREE from 'three';
import * as Stats from './stats.min';
import * as OrbitControls from 'three-orbitcontrols';

const container = document.getElementById('ThreeJS');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const stat = new Stats();
const controls = new OrbitControls(camera, renderer.domElement);

let id = null;
let ballMesh = null;
let ballRadius = 0.5;

let isMoving = true;
let maxHeight = 5;  // the init height of ball
let velocity = 0;   // the velocity of ball
let acc = -0.01;   // accelerated velocity of ball


function init () {
  /** init stat */
  stat.domElement.style.position = 'absolute';
  stat.domElement.style.right = '0px';
  stat.domElement.style.top = '0px';
  container.appendChild(stat.domElement);
  
  /** set camera */
  //camera = new THREE.OrthographicCamera();
  camera.position.set(5, 5, 10);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  /** set renderer */
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  /** set ball */
  ballMesh = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 16, 8), 
                            new THREE.MeshLambertMaterial({color: 0xffff00}));
  ballMesh.position.y = ballRadius + maxHeight;
  scene.add(ballMesh);

  /** set plane */
  THREE.ImageUtils.crossOrigin = '';
  let texture = THREE.ImageUtils.loadTexture('img/checkerboard.jpg', {}, function () {
    renderer.render(scene, camera);
  });
  // let loader = new THREE.TextureLoader();
  // let texture = loader.load('img/checkerboard.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  let plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5),
                             new THREE.MeshLambertMaterial({map:texture}));
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  /** set light */
  let light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
  //scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

  /** set sky box*/
  let skyBoxGeometry = new THREE.BoxGeometry( 100, 100, 100 );
	// BackSide: render faces from inside of the cube, instead of from outside (default).
	let skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	let skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);

  // create a set of coordinate axes to help orient user
  //    specify length in pixels in each direction
  let axis = new THREE.AxesHelper(7);
  scene.add(axis);

  id = requestAnimationFrame(draw);
};

function draw () {
  stat.begin();

  if (isMoving) {
    ballMesh.position.y += velocity;
    velocity += acc;

    if (velocity < 0 && ballMesh.position.y <= ballRadius) {
      // hit plane
      velocity = -velocity * 0.8;
    }

    if (Math.abs(velocity) < 10e-5) {
      isMoving = false;
      ballMesh.position.y = ballRadius;   // set ball on the plane
    }
  }

  renderer.render(scene, camera);
  id = requestAnimationFrame(draw);
  stat.end();
  controls.update();
};

function stop () {
  if (id !== null) {
    cancelAnimationFrame(id);
    id = null;
  }
};

function drop () {
  isMoving = true;
  ballMesh.position.y = maxHeight;
};

init();