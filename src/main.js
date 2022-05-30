import * as THREE from 'three';
import Moon from './sceneElements/Moon.js';
import Ufo from './sceneElements/Ufo.js';
import Stars from './sceneElements/Stars.js';
import Skybox from './sceneElements/Skybox.js';
import { onWindowResize } from './utils.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Créer la scène

const scene = new THREE.Scene();

// Créer la caméra

const fov = 75; 
const aspect = window.innerWidth / window.innerHeight; 
const near = .1; 
const far = 10000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

// Créer le renderer

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer( { canvas } );
renderer.setSize( window.innerWidth, window.innerHeight );

// Créer les lumières

const ambientLight = new THREE.AmbientLight(0x909090);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(4, 3, 5);
scene.add(ambientLight)
scene.add(pointLight)

// Créer les objets à ajouter à la scène
const moon = new Moon();
scene.add(moon.model);

const ufo = new Ufo();
ufo.load().then(() => scene.add(ufo.model));

const stars = new Stars(100);
scene.add(stars.model);

const skybox = new Skybox();
scene.add(skybox.model);

// Redimensionner

window.addEventListener('resize', () => onWindowResize(renderer, camera));

// Créer les contrôles

const controls = new OrbitControls( camera, renderer.domElement );
controls.maxDistance = 9
controls.minDistance = 3.5

// Animation

function animate() {
	requestAnimationFrame(animate);

    moon.update();
    ufo.update();

	renderer.render(scene, camera);
};

animate();