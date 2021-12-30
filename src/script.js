import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { AxesHelper } from 'three'

// Debug
const gui = new dat.GUI()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes Helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/7.png')

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader()

const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
    // color: 0xff0000
})

fontLoader.load
(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new THREE.TextBufferGeometry(
            'atomic -\nradiation',
            {
                font: font,
                size: 0.35,
                height: 0.2,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3
            }
        )
        textGeometry.computeBoundingBox()
        textGeometry.center()

        


        // material.wireframe = true
        const text = new THREE.Mesh(textGeometry, material)
        text.rotation.z = .25

        scene.add(text)
  
    }
)

// fontLoader.load
// (
//     '/fonts/helvetiker_regular.typeface.json',
//     (font) =>
//     {
//         const textGeometry = new THREE.TextBufferGeometry(
//             'A minimal, dark blue theme',
//             {
//                 font: font,
//                 size: 0.2,
//                 height: 0.0,
//                 curveSegments: 4,
//                 bevelEnabled: true,
//                 bevelThickness: 0.03,
//                 bevelSize: 0.02,
//                 bevelOffset: 0,
//                 bevelSegments: 3
//             }
//         )
//         textGeometry.computeBoundingBox()
//         textGeometry.center()


//         // material.wireframe = true
//         const text = new THREE.Mesh(textGeometry, material)
//         text.position.y = -.5
        
//         scene.add(text)
  
//     }
// )



const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
for(let i = 0; i < 610; i++)
{
    // only have to redefine mesh, others will slow site down
    const donut = new THREE.Mesh(donutGeometry, material)
    donut.position.x = (Math.random() - 0.5) * 30
    donut.position.y = (Math.random() - 0.5) * 30
    donut.position.z = (Math.random() - 0.5) * 30
    
    // two is enough to see everything
    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI
    

    const scale = Math.random() + 0.20
    donut.scale.set(scale, scale, scale)

    scene.add(donut)
}


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
var touched = 0
window.addEventListener('click', () => {
    touched++
    console.log(touched)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -1
camera.position.y = -6
camera.position.z = 2
scene.add(camera)

//gui 
gui.add(camera.position, 'y').min(-10).max(10).step(0.01)
gui.add(camera.position, 'x').min(-10).max(10).step(0.01)
gui.add(camera.position, 'z').min(-10).max(10).step(0.01)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
    
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

    // Update controls
    controls.update()
    

    // if(elapsedTime < 2.2){
    //     camera.position.y += 0.05 
    //     camera.position.x += 0.020 
    // }
    
 

    if(touched == 0){
        camera.position.y =  Math.sin((0.5)*Math.cos(elapsedTime)) 
        camera.position.x =  Math.sin(elapsedTime/3) * 2
    }
   
    // scene.getObjectByName("text").rotation.x += 2;
    camera.position.z =  Math.cos(elapsedTime/3) + 2

    // camera.position.z =  

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()