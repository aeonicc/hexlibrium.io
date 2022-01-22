
import React, { Component, useEffect, useRef } from 'react';
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r110/examples/jsm/loaders/GLTFLoader.js';

import "../css/page.css"

import gsap from "gsap" // https://cdnjs.cloudflare.com/ajax/libs/gsap/3.0.2/gsap.min.js
import fullpage from "fullpage" //https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.0.8/fullpage.min.js

function Page() {

	const canvas = document.querySelector('#stage');
	
	// static
	const fov = 45;
	const aspect = 2;  // the canvas default
	const near = 0.1;
	const far = 10508790.505495341;
	const planeSize = 40;
	const repeats = planeSize / 2;
	let gltfScene;
	const stageAnimationDuration = 1;
	
	// Three.js: default
	const renderer = new THREE.WebGLRenderer({canvas});		
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	// Three.js: lights  		
	const hemisphereLight = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 1);
	const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
	
	// Three.js: texture	/mesh	
	const loader = new THREE.TextureLoader();
	const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');		
	const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
	const planeMat = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide, });
	const mesh = new THREE.Mesh(planeGeo, planeMat);		

	// Three.js: aniamtions
	let mixer;
	let clock = new THREE.Clock();
	
	
	// Three.js: gltf
	const gltfLoader = new GLTFLoader();
	
	const controls = new OrbitControls(camera, canvas);
	//controls.target.set(200, -684, -2290);
	controls.target.set(0,10,20);
	controls.update();

	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.magFilter = THREE.NearestFilter;
	texture.repeat.set(repeats, repeats);
	mesh.rotation.x = Math.PI * -.5;
	scene.add(mesh);
	
	scene.background = new THREE.Color('#DAA520');
	//camera.position.set(200, -684, -2290);
	camera.position.set(0, 10, 20);
	camera.lookAt(scene.position);
	camera.zooom = 5;
	
	scene.add(hemisphereLight);
	directionalLight.position.set(5, 10, 2);
	scene.add(directionalLight);
	scene.add(directionalLight.target);

	window.camera = camera;
	window.scene = scene;
	
	
	let stages = [{
		x: -822,
		y: -258,
		z: -8114,
		fov: 67,
		zoom: 6,
	},
	{
		x: 10000,
		y: -787,
		z: 10000,
		fov: 104,
		zoom: 16,
	},
	{
		x: 2226,
		y: 5957,
		z: -4570,
		fov: 153,
		zoom: 56,
	},
	{
		x: 3547,
		y: 2511,
		z: 2229,
		fov: 145,
		zoom: 60,
	},
	{
		x: 10000,
		y: 743,
		z: -4452,
		fov: 164,
		zoom: 60,
	},
	{
		x: -8865,
		y: 3150,
		z: 735,
		fov: 150,
		zoom: 60,
	},
	{
		x: 10000,
		y: 743,
		z: -4452,
		fov: 119,
		zoom: 60,
	}];
	

  	function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
  		const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
  		const halfFovY = THREE.Math.degToRad(camera.fov * .5);
  		const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
  		// compute a unit vector that points in the direction the camera is now
  		// in the xz plane from the center of the box
  		const direction = (new THREE.Vector3())
  			.subVectors(camera.position, boxCenter)
  			.multiply(new THREE.Vector3(1, 0, 1))
  			.normalize();

  		// move the camera to a position distance units way from the center
  		// in whatever direction the camera was from the center already
  		camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));

  		// pick some near and far values for the frustum that
  		// will contain the box.
  		camera.near = boxSize / 100;
  		camera.far = boxSize * 100;

  		camera.updateProjectionMatrix();

  		// point the camera to look at the center of the box
  		camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
  	}

  	function resizeRendererToDisplaySize(renderer) {
  		const canvas = renderer.domElement;
  		const width = canvas.clientWidth;
  		const height = canvas.clientHeight;
  		const needResize = canvas.width !== width || canvas.height !== height;
  		if (needResize) {
  			renderer.setSize(width, height, false);
  		}
  		return needResize;
  	}

  	function render() {
  		if (resizeRendererToDisplaySize(renderer)) {
  			const canvas = renderer.domElement;
  			camera.aspect = canvas.clientWidth / canvas.clientHeight;
  			camera.updateProjectionMatrix();
  		}

  		renderer.render(scene, camera);
		if (mixer) { mixer.update( clock.getDelta() ) }
  		requestAnimationFrame(render);
		
	}
	
	function animate(stage) {
		let current = stages[stage];
		if (current) {
			let started = window.performance.now();
			gsap.to(camera.position, {
				x: current.x, 
				y: current.y, 
				z: current.z, 
				duration: stageAnimationDuration, 
				onUpdate: function() {
					camera.lookAt(scene.position); 
				},
				onComplete: function() {
					console.log("finished", window.performance.now() - started)
				}
			});
			
			gsap.to(camera, {
					fov: current.fov, 
					zoom: current.zoom, 				
					duration: stageAnimationDuration, 
					onUpdate: function() { 
						camera.updateProjectionMatrix(); 
					}
			});
					
			if (stages[stage]) {
				setTimeout(animate, stageAnimationDuration*1000);
			}
		}
	}
		
		
	//gltfLoader.load('https://s3-us-west-1.amazonaws.com/cdn.linkcreative.com/scene.gltf', (gltf) => {	
	gltfLoader.load('https://s3-us-west-1.amazonaws.com/cdn.linkcreative.com/seed/Seed.gltf', (gltf) => {
		gltfScene = gltf.scene;
		scene.add(gltfScene[0]);
		const box = new THREE.Box3().setFromObject(gltfScene);
		const boxSize = box.getSize(new THREE.Vector3()).length();
		const boxCenter = box.getCenter(new THREE.Vector3());
		frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
		mixer = new THREE.AnimationMixer(gltfScene);
		//gltf.animations.forEach((clip) => {mixer.clipAction(clip).play(); });
		//scene.add(gltf.scene);	
		console.log(gltf)
		//animate();			
	});
	
		

	// kick off
	requestAnimationFrame(render);

	

	
	let myFullpage;
	let Nav;
	let NavLis;
	let threeD = document.querySelector('#three-d');
	let fullPage = document.querySelector('#fullpage');
	let panels = Array.from(fullPage.children);
	let currentPage = fullPage.children[0];
	let ambientVideo = document.querySelector('video');
	let threeDImg = threeD.querySelector('img');
	let randomHeight = () => (Math.random() * window.innerHeight/3 * (Math.round(Math.random())===1?1:-1));
	let randomWidth = () => (Math.random() * window.innerWidth/3 * (Math.round(Math.random())===1?1:-1));
	let panelAction = function(step) {
		//threeD.style.transform = `translate(${randomWidth()}px, ${randomHeight()}px)`;
		
		if (step === panels.length-1) {
			ambientVideo.play();
		} else if (!ambientVideo.paused) {
			ambientVideo.pause();
		}
		
		if (step !== 0 && !panels.length-1) {
			//threeDImg.style.transform = `scale(${(Math.random()*1.5) + .5})`;
			if (stages[step-1]) { animate(step-1); }
		}
	};
	let updateNav = function() {
		if (NavLis) {
		    let activeNav = Nav.querySelector('a.active');
		    let prev = activeNav.parentNode.previousElementSibling;
		    let next = activeNav.parentNode.nextElementSibling;
		        
		    NavLis.forEach((li) => li.classList.remove('active', 'active-adjacent'));
		    activeNav.parentNode.classList.add('active');
		      
		    if (prev) { prev.classList.add('active-adjacent'); }
		    if (next) {next.classList.add('active-adjacent'); }
	    }
	}

	ambientVideo.pause();
	
    myFullpage = new fullpage(fullPage, {
        //anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage', 'seventhPage', 'eigthPage', 'ninthPage'],
        navigation: true,
        navigationPosition: 'right',
        //navigationTooltips: ['First page', 'Second page', 'Third page', 'Fourth page', 'Fifth page', 'Sixth page', 'Seventh page', 'Eigth page', 'Ninth and last page'],
        touchSensitivity: 10,
        scrollingSpeed: 1000,
        afterLoad: function(origin, dest, dir) {
	        dest.item.classList.add('active');
	        updateNav();
        },
        onLeave: function(origin, dest, dir){
	        panelAction(panels.indexOf(dest.item));
	        origin.item.classList.add('active');
        },
        afterRender: function() {
			Nav = document.querySelector('#fp-nav');
			NavLis = Array.from(document.querySelectorAll('li'));
			updateNav();
        }
    });
    
	
	    
    requestAnimationFrame(() => document.body.classList.add('loaded'));

	return (
		<div
		  className="App"

		  style={{
			
			display: "flex",
			flexDirection: "column",
			alignItems: "center"

		  }}
		>

			th<div id="three-d"><canvas id="stage"></canvas></div>

			<div id="fullpage">
				<div class="section " id="section0">
					<div class="intro">
						<h1>
							<svg id="drop-dot" viewBox="0 0 456 235.25">
								<mask id="letter-i-mask">
									<polygon fill="white" points="296.25 177 279.5 177 300.25 60 317 60 296.25 177"/>
								</mask>
								<path d="M17.75,177H0L31.25,0H79a89.92,89.92,0,0,1,21.75,2.5,51,51,0,0,1,17.37,7.75,36.59,36.59,0,0,1,11.5,13.25,40.3,40.3,0,0,1,4.13,18.75q0,12.26-4,21.25a42.17,42.17,0,0,1-11.13,15.12A53.43,53.43,0,0,1,102,88.25a79.23,79.23,0,0,1-20.25,4.5l39,84.25H100.5l-37-82.75H32.25ZM35,79.25H66.5a115.05,115.05,0,0,0,17.75-1.37A49.44,49.44,0,0,0,100,72.75a30.28,30.28,0,0,0,11.38-10.63q4.37-6.87,4.37-17.87,0-14.49-10.5-21.75t-29-7.25h-30Z"/>
								<path d="M232.5,105.25q.75-4.25,1-6.63a40.89,40.89,0,0,0,.25-4.37q0-12.75-7.25-18T206.25,71A51.64,51.64,0,0,0,186,75.12,59.28,59.28,0,0,0,169.75,85l-7.5-11.25a66.14,66.14,0,0,1,21-12.13A71,71,0,0,1,208,57a65.83,65.83,0,0,1,15.88,1.88,36.81,36.81,0,0,1,13.25,6,30.35,30.35,0,0,1,9,10.5,32.43,32.43,0,0,1,3.37,15.37q0,2.25-.25,6.13a51,51,0,0,1-.75,6.37l-8.5,47.5q-1.25,6.75-2,14a122.41,122.41,0,0,0-.75,12.25h-15q0-4.25.38-9.25t1.12-9.75h-.5a85.74,85.74,0,0,1-10,9.88,48.46,48.46,0,0,1-10.37,6.62,47,47,0,0,1-11.5,3.62A73.38,73.38,0,0,1,178,179.25a52.4,52.4,0,0,1-12.25-1.5,32.58,32.58,0,0,1-11.37-5.13,29.53,29.53,0,0,1-8.5-9.37q-3.37-5.75-3.38-14.25,0-14,8-22.62t20.88-13.26a121.6,121.6,0,0,1,28.87-6.24A317.13,317.13,0,0,1,232.5,105.25ZM226.25,118q-11.25,0-23,1.12a100.2,100.2,0,0,0-21.37,4.26,42.18,42.18,0,0,0-15.75,8.74Q160,137.76,160,147a18.71,18.71,0,0,0,2,9.12,15.54,15.54,0,0,0,5.38,5.76,23,23,0,0,0,7.75,3,45.29,45.29,0,0,0,8.87.87,44,44,0,0,0,16.5-3,43.28,43.28,0,0,0,13.25-8.25,46.47,46.47,0,0,0,9.5-12.12,50.39,50.39,0,0,0,5.25-14.63l1.75-9.75Z"/>
								<polygon points="296.25 177 279.5 177 300.25 60 317 60 296.25 177"/>
								<path class="i-dot" d="M327,14.75a11.77,11.77,0,0,1-3.37,8.5,11.16,11.16,0,0,1-8.38,3.5,11.79,11.79,0,0,1-8.12-3,10.47,10.47,0,0,1-3.38-8.25,11.66,11.66,0,0,1,3.63-8.75,11.69,11.69,0,0,1,8.37-3.5A10.93,10.93,0,0,1,327,14.75Z" />
								<g mask="url(#letter-i-mask)">
									<path class="i-dot" d="M327,14.75a11.77,11.77,0,0,1-3.37,8.5,11.16,11.16,0,0,1-8.38,3.5,11.79,11.79,0,0,1-8.12-3,10.47,10.47,0,0,1-3.38-8.25,11.66,11.66,0,0,1,3.63-8.75,11.69,11.69,0,0,1,8.37-3.5A10.93,10.93,0,0,1,327,14.75Z" />	
								</g>
								<path d="M377.75,60c-.34,3.17-.75,6.67-1.25,10.5s-1,7-1.5,9.5h.5a49.64,49.64,0,0,1,17.43-16.88A44.85,44.85,0,0,1,415.63,57q19,0,29.71,9.62T456,92.75a48.32,48.32,0,0,1-.37,6c-.25,2-.55,4.17-.88,6.5L441.82,177H425l11.5-64.75A77.62,77.62,0,0,0,438,97.5q0-12.24-5.75-19.38T412,71a35.61,35.61,0,0,0-13.5,2.75,39.31,39.31,0,0,0-12.62,8.5A56.61,56.61,0,0,0,375.5,96.62,68.94,68.94,0,0,0,369,117l-10.5,60H341.75l16-91.25c.66-3.16,1.38-7.25,2.13-12.25S361.16,64,361.5,60Z"/>
							</svg>
						</h1>
						<p>It's wet ain't it...drink it!</p>
					</div>
				</div>
				<div class="section" id="section1">
					<div class="intro">
						<h1>3d Page One</h1>
					</div>
				</div>
				<div class="section" id="section2">
					<div class="intro">
						<h1>3d Page Two</h1>
					</div>
				</div>
				<div class="section" id="section3">
					<div class="intro">
						<h1>3d Page Three</h1>
					</div>
				</div>
				<div class="section" id="section4">
					<div class="intro">
						<h1>3d Page Four</h1>
					</div>
				</div>
				<div class="section" id="section5">
					<div class="intro">
						<h1>3d Page Five</h1>
					</div>
				</div>
				<div class="section" id="section6">
					<div class="intro">
						<h1>3d Page Six</h1>
					</div>
				</div>	
				<div class="section" id="section7">
					<div class="intro">
						<h1>3d Page Seven</h1>
					</div>
				</div>								
				<div class="section" id="section8">
					<video class="ambient" preload="auto" loop muted>
						{/* <source src="https://player.vimeo.com/external/335520392.hd.mp4?s=08cd0a1e974e7fd6bedfec37e11c25b64864ebb3&profile_id=174" type="video/mp4"> */}
					</video>
					<div class="intro">
						<h1>Last Page</h1>
					</div>
				</div>	
			</div>


		</div>
	  );
}

//();

export default Page