import * as THREE from 'three'
import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from "gsap";

// Scene
const scene = new THREE.Scene();
// create our sphere
const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({color:"#00ff83", roughness:0.4}) 

const mesh = new THREE.Line(geometry,material)
scene.add(mesh)


const sizes = {
width: window.innerWidth,
height: window.innerHeight,

}


const light = new THREE.PointLight(0xffffff, 1 ,100)
light.position.set(0,10,10)
light.intensity = 1.25
scene.add(light)

// camera
const camera = new THREE.PerspectiveCamera(45,sizes.width /sizes.height,)
camera.position.z = 5
scene.add(camera)


// renderer
const canvas = document.querySelector('.webGL')
const renderer = new THREE.WebGL1Renderer({canvas})
renderer.setPixelRatio(2)
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene,camera)

// controals
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

// resize
window.addEventListener('resize', () => {
// update Size
sizes.width = window.innerWidth
sizes.height= window.innerHeight
// update Camera
camera.aspect = sizes.width / sizes.height
camera.updateProjectionMatrix()
renderer.setSize(sizes.width,sizes.height)

})


const loop = () => {
  controls.update()
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}
loop()

// time line
const t1 = gsap.timeline({defaults:{duration:1} })
t1.fromTo(mesh.scale,{ z:0, x:0, y:0}, { z:1, x:1,  y:1})
t1.fromTo("nav", {y: "-100%"}, {y: "0%"})
t1.fromTo(".titel", {opacity:0}, {opacity:100})


// mouse animatio  color
let mouseDown = false
let rgb = []

window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener("mousemove", (e) =>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width)* 255),
      Math.round((e.pageY / sizes.width)* 255),
      150,
  ]
  // lets animate
  let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
  gsap.to(mesh.material.color,{
    r: newColor.r,
    g: newColor.g,
    b: newColor.b,
 
  })
  }
})


