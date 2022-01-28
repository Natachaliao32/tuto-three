import './style.css'

import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { GUI } from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const width = window.innerWidth
const height = window.innerHeight

const textureLoader = new THREE.TextureLoader()
const objLoader = new OBJLoader()

// SET UP SCENE

// Create renderer

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer( { canvas, antialias: true } )
renderer.setSize( width, height )

// Create scene

const scene = new THREE.Scene()
scene.background = textureLoader.load("/assets/galaxy2.jpg")

// Create camera

const fov = 75; const aspect = width / height; const near = .1; const far = 10000;  
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 5;

// CREATE LIGHTS

const ambientLight = new THREE.AmbientLight(0x909090)
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(4, 3, 5)
scene.add(ambientLight)
scene.add(pointLight)

// CREATE LIGHT HELPERS

const lightHelper = new THREE.PointLightHelper(pointLight, 1)
scene.add(lightHelper)

const gui = new GUI()
const pointLightFolder = gui.addFolder('PointLight')
pointLightFolder.add(pointLight.position, 'x', -10, 10, 1)
pointLightFolder.add(pointLight.position, 'y', -10, 10, 1)
pointLightFolder.add(pointLight.position, 'z', -10, 10, 1)
pointLightFolder.add(pointLight, 'intensity', 0, 10, 1)
pointLightFolder.add(pointLight, 'distance', 0, 10, 1)

// CREATE CONTROLS

const controls = new OrbitControls( camera, renderer.domElement )

// CREATE MOON

function createMoon() {

  // Load textures

  const texture = textureLoader.load('/assets/pluto_texture.jpg')
  // const normal = textureLoader.load('/assets/moon_normal.jpg')
  const bump = textureLoader.load('/assets/pluto_bump.jpg')

  // Create geometry

  const geometry = new THREE.SphereGeometry()

  // Create material

  const material = new THREE.MeshStandardMaterial( {
    map: texture,
    bumpMap: bump,
    bumpScale: 0.05
  } );

  // Create sphere and add to scene
  
  const sphere = new THREE.Mesh(geometry, material)

  return sphere
}

const moon = createMoon()
scene.add(moon)

// LOAD WHALE

let whale;

function loadWhale() {

  // Create material

  const material = new THREE.MeshStandardMaterial( {color: 0x26267c} )
    
  // Load 3D model

  const onLoad = obj => { 

    whale = obj

    // Transform

    whale.scale.multiplyScalar(.5)
    whale.rotation.z -= Math.PI / 10
    whale.position.y = 1

    // Set material

    whale.traverse( child => {
      if(child instanceof THREE.Mesh) child.material = material
    })

    // Create color helper

    const whaleFolder = gui.addFolder('Whale')
    const whaleColor = { color: 0x26267c }
    whaleFolder.addColor(whaleColor, 'color')
    .onChange( () => {
      whale.children[0].material.color.set(whaleColor.color)
    } )

    // Add whale to scene

    scene.add(whale) 
  }
  
  const onError = error => { alert(error) }

  objLoader.load( '/assets/whale.obj', onLoad, undefined, onError )

}

loadWhale()

// CREATE SEA OF STARS

function createStar(size, x, y, z, material) {
  const geometry = new THREE.SphereGeometry( size )
  const star = new THREE.Mesh( geometry, material )
  star.position.set( x, y, z )
  // star.layers.set( 1 )
  return star
}

function generateRandomPosition(xmin, xmax, ymin, ymax, zmin, zmax) {
  const x = Math.random() * (xmax - xmin) + xmin;
  const y = Math.random() * (ymax - ymin) + ymin;
  const z = Math.random() * (zmax - zmin) + zmin;
  return new THREE.Vector3(x, y, z)
}

function createStars(n) {

  // Create a common material for all stars

  const material = new THREE.MeshStandardMaterial( { color: 0xf7f386} )

  // Create a group 

  const stars = new THREE.Group()

  // Create n stars at random positions and add to scene

  for (let i = 0; i < n; i++) {
    let pos = generateRandomPosition( -6, 6, -3, 3, -10, 1 )
    let star = createStar( .05, pos.x, pos.y, pos.z, material )
    stars.add( star )
  }
  scene.add( stars )
}

createStars(10)

// CREATE GLOW EFFECT WITH BLOOM PASS

// const renderScene = new RenderPass( scene, camera )
// const bloomPass = new UnrealBloomPass( new THREE.Vector2(width, height), 1.5, .4, .85 )
// bloomPass.treshold = 0
// bloomPass.strength = 2
// bloomPass.radius = 0

// const bloomComposer = new EffectComposer( renderer )
// bloomComposer.setSize( width, height )
// bloomComposer.renderToScreen = true
// bloomComposer.addPass( renderScene )
// bloomComposer.addPass( bloomPass )

// RENDER SCENE

function animate() {
  requestAnimationFrame( animate )

  // Controls
  controls.update()

  // Animation
  // if(whale) whale.rotation.y -= 0.01
  moon.rotation.x += 0.001
  moon.rotation.y -= 0.001

  renderer.render( scene, camera )
}

animate()


