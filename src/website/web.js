import React, { Component, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import gsap from 'gsap';
import "../css/web.css"
// import {T, useSetLanguage, useCurrentLanguage } from "@tolgee/react"
let loader = []

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
const cameraGroup = new THREE.Group()
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( { antialias: true } );
loader[0] = new GLTFLoader();
const textureLoader = new THREE.TextureLoader()
const clock = new THREE.Clock()
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
const light = new THREE.AmbientLight( 0xffffff, 2 );
loader[1] = new RGBELoader().setDataType( THREE.UnsignedByteType )//.setPath(this.assetsPath);

let scrollY = window.scrollY
const objectsDistance = 4
const cursor = {}
let previousTime = 0
let sectionMeshes
let currentSection = 0

function Web() {
  useEffect(() => {
    
    camera.position.z = 5;
    camera.rotation.z = 1; 
    
  
      
      scene.add( light );

      // const setEnvironment=()=>{
        
      //   const pmremGenerator = new THREE.PMREMGenerator( renderer );
      //   pmremGenerator.compileEquirectangularShader();
        
        // loader[1].load( '/models/room.hdr', 
        // texture => {
        //       const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
        //       pmremGenerator.dispose();

        //       scene.environment = envMap;

        //  // loadingBar.visible = !loadingBar.loaded;
        //     }
        //     //, 
        // // xhr => {
        // //   this.loadingBar.update( 'envmap', xhr.loaded, xhr.total );
        // // },
        // // err => {
        // //         console.error( err.message );
        // //     } );
        // }
  
  
      loader[0].load("/models/free__house_low-poly_isometric/scene.gltf", (gltf) => {
          let model = gltf.scene
          model.scale.set(.1, .1, .1)
  
          gsap.to(camera.position, {
              z: 1,
              duration: 1,
              ease: "back.out(1.7)"
          })
          gsap.to(camera.rotation, {
              z: 0,
              duration: 1
          })
  
          gsap.to(model.rotation, {
              x: 1,
              duration: 1,
              delay: 1
          })
          gsap.to(model.rotation, {
              y: Math.PI * 1.75,
              duration: 2,
              delay: 1
          })
          gsap.to(model.scale, {
              delay: 1,
              duration: 1,
              x: .25,
              y: .25,
              z: .25
          })
          gsap.to(model.position, {
              delay: 1,
              duration: 1,
              x: .35,
              y: .3
          })
  
  
  
          scene.add(model)
      })


    const gradientTexture = textureLoader.load('/images/pizza.png')
    gradientTexture.magFilter = THREE.NearestFilter
    
    // Material
    const material = new THREE.MeshToonMaterial({
        color: 0xffeded,//parameters.materialColor,
        gradientMap: gradientTexture
    })

    const mesh1 = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.4, 16, 60),
      material
    )
    const mesh2 = new THREE.Mesh(
        new THREE.ConeGeometry(1, 2, 32),
        material
    )
    const mesh3 = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
        material
    )
    
    mesh1.position.x = 2
    mesh2.position.x = - 2
    mesh3.position.x = 2
    
    mesh1.position.y = - objectsDistance * 0
    mesh2.position.y = - objectsDistance * 1
    mesh3.position.y = - objectsDistance * 2
    
    scene.add(mesh1, mesh2, mesh3)
    
    sectionMeshes = [ mesh1, mesh2, mesh3 ]

    directionalLight.position.set(1, 1, 0)
    scene.add(directionalLight)


    const particlesCount = 144
    const positions = new Float32Array(particlesCount * 3)
    
    for(let i = 0; i < particlesCount; i++)
    {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 10
        positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }


    const particlesGeometry = new THREE.BufferGeometry()
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xffeded, //parameters.materialColor,
        sizeAttenuation: textureLoader,
        size: 0.03
    })
    
    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    scene.add(cameraGroup)
    camera.position.z = 6
    cameraGroup.add(camera)



    window.addEventListener('scroll', () =>
    {
        scrollY = window.scrollY
        const newSection = Math.round(scrollY / window.innerHeight)
    
        if(newSection != currentSection)
        {
            currentSection = newSection
    
            gsap.to(
                sectionMeshes[currentSection].rotation,
                {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    x: '+=6',
                    y: '+=3',
                    z: '+=1.5'
                }
            )
        }
    })

    cursor.x = 0
    cursor.y = 0

    window.addEventListener('mousemove', (event) =>
    {
        cursor.x = event.clientX / window.innerWidth - 0.5
        cursor.y = event.clientY / window.innerHeight - 0.5
    })
  
    //////////////////////////////////////////////////////////////////
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    renderer.setClearColor( 0x272727, 1 );
    document.body.appendChild( renderer.domElement );
  
      window.addEventListener( 'resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize( window.innerWidth, window.innerHeight );
      });
  }, [])

  // const setLanguage = useSetLanguage()
  // const getLanguage = useCurrentLanguage()

  return (

    <div className="Web">

    <div className="App">
    <div className="hero">
      <h1 className="title">Gaia Space Matrix</h1>
      <p className="text">Cooworking</p>
      {/* <p>
        <button className="btn" onClick={() => setLanguage("en")} style={{background: getLanguage() === "en" ? "#ffba02" : "#a7a7a7"}}>English</button>
        <button className="btn" onClick={() => setLanguage("ru")} style={{background: getLanguage() === "ru" ? "#ffba02" : "#a7a7a7"}}>Russian</button>
      </p> */}
    </div>

    <div className="pricing">
      <h1>our_packages</h1>
      <div className="pricing-table">
        <div className="pricing-card">
          <p className="title">Private Room</p>
          <p className="info">card_text</p>
          <button className="btn">text_buy</button>
        </div>
        <div className="pricing-card">
          <p className="title">Shared Space</p>
          <p className="info">card_text</p>
          <button className="btn">text_buy</button>
        </div>
        <div className="pricing-card">
          <p className="title">Collective Events</p>
          <p className="info">card_text</p>
          <button className="btn">text_buy</button>
        </div>
      </div>
    </div>
  </div>

    

      <section className="section">
          <h1>My Portfolio</h1>
      </section>
      <section className="section">
          <h2>My projects</h2>
      </section>
      <section className="section">
          <h2>Contact me</h2>
      </section>

      </div>

    

  );
}

function animation() {

  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime

  // Animate camera
  camera.position.y = - scrollY / window.innerHeight * objectsDistance

  const parallaxX = cursor.x * 0.5
  const parallaxY = - cursor.y * 0.5
  cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
  cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

  // Animate meshes
  for(const mesh of sectionMeshes)
  {
      mesh.rotation.x += deltaTime * 0.1
      mesh.rotation.y += deltaTime * 0.12
  }







	renderer.render( scene, camera );

}


export default Web;
