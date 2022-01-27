import './style.css'

import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { GUI } from 'dat.gui'

const width = window.innerWidth
const height = window.innerHeight

const textureLoader = new THREE.TextureLoader()
const objLoader = new OBJLoader()

// SET UP SCENE

// Create renderer

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer( { canvas } )
renderer.setSize( width, height )

// Create scene

const scene = new THREE.Scene()
scene.background = textureLoader.load("/assets/galaxy.jpeg")

// Create camera

const fov = 45; const aspect = width / height; const near = 1; const far = 1000;  
const camera = new THREE.Camera(fov, aspect, near, far)


// CREATE LIGHTS

const ambientLight = new THREE.AmbientLight("#ffffff")
const pointLight = new THREE.PointLight("#ff0000", 5)
pointLight.position.set(.6, .6, 0)
scene.add(ambientLight, pointLight)

// CREATE HELPERS

const lightHelper = new THREE.PointLightHelper(pointLight, .1)
scene.add(lightHelper)

const gui = new GUI()
gui.add(pointLight.position, 'x', 0, 1, .01)
gui.add(pointLight.position, 'y', 0, 1, .01)
gui.add(pointLight.position, 'z', 0, 1, .01)
gui.add(pointLight, 'intensity', 0, 10, .01)

// CREATE MOON

function createMoon() {
  // Load textures

  const texture = textureLoader.load('/assets/moon_texture.jpg');
  const normal = textureLoader.load('/assets/moon_normal.jpg');

  // Create geometry

  const geometry = new THREE.SphereGeometry(0.1)

  // Create material

  const material = new THREE.MeshStandardMaterial( {
    map: texture,
    normalMap: normal
  } );

  // Create sphere and add to scene
  
  const sphere = new THREE.Mesh(geometry, material)

  return sphere
}

const moon = createMoon()
scene.add(moon)

// LOAD WHALE

function loadWhale() {

  const material = new THREE.MeshStandardMaterial({color: 0x0000ff})
    
  const onLoad = obj => { 
    obj.scale.set(.3, .3, .3)
    obj.traverse( child => {
      if(child instanceof THREE.Mesh) child.material = material
    })
    console.log(obj)
    scene.add(obj) 
  }
  const onError = error => { alert(error) }

  objLoader.load( '/assets/whale.obj', onLoad, undefined, onError )

}

loadWhale()

// const whale = loadWhale()
// whale && scene.add(whale)

// RENDER SCENE

function animate() {
  requestAnimationFrame( animate )

  // Animation
  moon.rotation.x += 0.01
  moon.rotation.y -= 0.01
  // console.log(whale)
  renderer.render( scene, camera )
}

animate()


