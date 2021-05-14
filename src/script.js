import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

const gltfloader = new  GLTFLoader();

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
 let tl =gsap.timeline()
///
//gsap.to("h1.title", {duration: 3, x: 100, y: 50, scale: 1,  rotation: 360});
gsap.to("h1.title", {duration: 5, opacity: 1});
//gsap.to("h3.title3", {duration: 3, x: 100, y: 50, scale: 1,  rotation: 360});
gsap.to("h3.title3", {duration: 5, opacity: 1});
//our care
gltfloader.load('scene.gltf',(gltf)=>{

    gltf.scene.scale.set(0.1,0.1,0.1);
    gltf.scene.rotation.set(0.5,0.1,0.1);
    gltf.scene.position.set(0.1,0.1,0.1)

    scene.add(gltf.scene)

    gui.add(gltf.scene.rotation,'x').min(0).max(9);
    gui.add(gltf.scene.rotation,'y').min(0).max(9);
    gui.add(gltf.scene.rotation,'z').min(0).max(9); 

  tl.to(gltf.scene.scale,{y:0.2,x:0.2,z:0.2,duration:1},"-=1")
//tl.to(gltf.scene.position,{x:0.6,y:0.3,x:0.5})
    tl.to(gltf.scene.rotation,{y:4.1,duration:1})
  
   //tl.to(gltf.scene.scale,{y:0.13,x:0.13,z:0.13,duration:1},"-=1")
   tl.to(gltf.scene.position,{x:0.8,y:0.1,z:0.1})
   tl.to(gltf.scene.scale,{y:0.1,x:0.1,z:0.1,duration:1},"-=1")
   tl.to(gltf.scene.rotation,{y:0.5,x:0.86,z:0.1,duration:1})

   




})

// Lights

const pointLight = new THREE.AmbientLight(0xffffff, 5)
pointLight.position.x = 10
pointLight.position.y = 55
pointLight.position.z = 19
scene.add(pointLight)

 const pointLight3 = new THREE.PointLight(0xc4c4c4,10)
pointLight3.position.set(0,10,500)
scene.add(pointLight3)
const pointLight4 = new THREE.PointLight(0xc4c4c4,10)
pointLight3.position.set(0,300,500)
scene.add(pointLight4)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()