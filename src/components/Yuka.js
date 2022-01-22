


// import * as YUKA from '../libs/yuka/yuka.module.js';
// import * as THREE from 'three';

		// <style>
		// 	#status {
		// 		position: absolute;
		// 		display: flex;
		// 		align-items: center;
		// 		justify-content: center;
		// 		font-size: 28px;
		// 		color: #ffffff;
		// 		text-align: center;
		// 		line-height: 20px;
		// 		width: 100%;
		// 		bottom: 0;
		// 	}
		// 	#status>div {
		// 		background-color: #282828;
		// 		width: 600px;
		// 		padding: 16px;
		// 	}
		// 	#status>div>span {
		// 		display: inline-block;
		// 	}
		// </style>


	// <section id="loading-screen">
	// 	<div class="spinner">
	// 		<div class="rect1"></div>
	// 		<div class="rect2"></div>
	// 		<div class="rect3"></div>
	// 		<div class="rect4"></div>
	// 		<div class="rect5"></div>
	// 	</div>
	// </section>



import * as YUKA from '../libs/yuka/yuka.module.js';
// import * as THREE from '../libs/three/three.module.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { GLTFLoader } from '../libs/GLTFLoader.js';

import { Girl } from '../jsy/Girl.js';
import { Collectible } from '../jsy/Collectible.js';

class Yuka{

constructor(){


this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
this.scene = new THREE.Scene();
this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true} );

this.entityManager = new YUKA.EntityManager();
this.time = new YUKA.Time();



this.init();
// this.animate();

}

init() {

	this.scene = new THREE.Scene();
	this.scene.background = new THREE.Color( 0xa0a0a0 );
	this.scene.fog = new THREE.Fog( 0xa0a0a0, 20, 40 );

	// this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
	this.camera.position.set( 0, 5, 15 );
	this.camera.lookAt( this.scene.position );

	//

	const groundGeometry = new THREE.PlaneBufferGeometry( 150, 150 );
	const groundMaterial = new THREE.MeshPhongMaterial( { color: 0x999999 } );

	const groundMesh = new THREE.Mesh( groundGeometry, groundMaterial );
	groundMesh.rotation.x = - Math.PI / 2;
	groundMesh.matrixAutoUpdate = false;
	groundMesh.receiveShadow = true;
	groundMesh.updateMatrix();
	this.scene.add( groundMesh );

	//

	const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.6 );
	hemiLight.position.set( 0, 100, 0 );
	hemiLight.matrixAutoUpdate = false;
	hemiLight.updateMatrix();
	this.scene.add( hemiLight );

	// const dirLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
	// dirLight.position.set( 4, 5, 5 );
	// dirLight.matrixAutoUpdate = false;
	// dirLight.updateMatrix();
	// dirLight.castShadow = true;
	// dirLight.shadow.camera.top = 10;
	// dirLight.shadow.camera.bottom = - 10;
	// dirLight.shadow.camera.left = - 10;
	// dirLight.shadow.camera.right = 10;
	// dirLight.shadow.camera.near = 0.1;
	// dirLight.shadow.camera.far = 20;
	// dirLight.shadow.mapSize.x = 2048;
	// dirLight.shadow.mapSize.y = 2048;
	// this.scene.add( dirLight );

	// this.scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

	//

	// const loadingManager = new THREE.LoadingManager( () => {

	// 	const loadingScreen = document.getElementById( 'loading-screen' );

	// 	loadingScreen.classList.add( 'fade-out' );
	// 	loadingScreen.addEventListener( 'transitionend', this.onTransitionEnd );

	// 	this.animate();

	// } );

	

	const glTFLoader = new GLTFLoader(  ); //const glTFLoader = new GLTFLoader( loadingManager );
	glTFLoader.load( '/models/yuka.glb', ( gltf ) => {

		// add object to this.scene

		const avatar = gltf.scene;
		avatar.matrixAutoUpdate = false;
		avatar.animations = gltf.animations;

		avatar.traverse( ( object ) => {

			if ( object.isMesh ) {

				object.material.transparent = true;
				object.material.opacity = 1;
				object.material.alphaTest = 0.7;
				object.material.side = THREE.DoubleSide;
				object.castShadow = true;

			}

		} );

		this.scene.add( avatar );

		const mixer = new THREE.AnimationMixer( avatar );
		const animations = new Map();

		animations.set( 'IDLE', this.createAnimationAction( mixer, 'Character_Idle' ) );
		animations.set( 'WALK', this.createAnimationAction( mixer, 'Character_Walk' ) );
		animations.set( 'GATHER', this.createAnimationAction( mixer, 'Character_Gather' ) );
		animations.set( 'RIGHT_TURN', this.createAnimationAction( mixer, 'Character_RightTurn' ) );
		animations.set( 'LEFT_TURN', this.createAnimationAction( mixer, 'Character_LeftTurn' ) );

		// game setup

		// entityManager = new YUKA.EntityManager();
		// time = new YUKA.Time();

		const girl = new Girl( mixer, animations );
		girl.setRenderComponent( avatar, this.sync );

		this.scene.add( avatar );
		this.entityManager.add( girl );

		//

		const collectibleGeometry = new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 );
		collectibleGeometry.translate( 0, 0.1, 0 );
		const collectibleMaterial = new THREE.MeshBasicMaterial( { color: 0x040404 } );

		for ( let i = 0; i < 5; i ++ ) {

			const collectibleMesh = new THREE.Mesh( collectibleGeometry, collectibleMaterial );
			collectibleMesh.matrixAutoUpdate = false;
			collectibleMesh.castShadow = true;

			const collectible = new Collectible();
			collectible.setRenderComponent( collectibleMesh, this.sync );
			collectible.spawn();

			this.scene.add( collectibleMesh );
			this.entityManager.add( collectible );

		}

	} );

	//

	// this.renderer = new THREE.WebGLRenderer( { antialias: true } );
	this.renderer.setPixelRatio( window.devicePixelRatio );
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.gammaOutput = true;
	this.renderer.shadowMap.enabled = true;
	this.renderer.setAnimationLoop(  this.animate );
	document.body.appendChild( this.renderer.domElement );

	//

	window.addEventListener( 'resize', this.onWindowResize, false );

}

onWindowResize() {

	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();

	this.renderer.setSize( window.innerWidth, window.innerHeight );

}

animate() {

	requestAnimationFrame( this.animate );
	

	const delta = this.time.update().getDelta();

	this.entityManager.update( delta );

	this.renderer.render( this.scene, this.camera );
	

}

sync( entity, renderComponent ) {

	renderComponent.matrix.copy( entity.worldMatrix );

}

createAnimationAction( mixer, clip ) {

	let action = mixer.clipAction( clip );
	action.play();
	action.enabled = false;

	return action;

}

onTransitionEnd( event ) {

	event.target.remove();

}

}

export {Yuka}
// export default Yuka