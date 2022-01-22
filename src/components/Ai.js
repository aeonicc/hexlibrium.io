import React, { Component } from 'react';
import * as YUKA from '../libs/yuka/yuka.module.js';
import * as THREE from 'three';


class Scene extends Component {

    componentDidMount() {   

        let time = new YUKA.Time();
        let target = [];
        let vehicle = []
        let entityManager=[];
        const obstacles = new Array();

        function arrive()
        {

            const vehicleGeometry = new THREE.ConeBufferGeometry( 1, 5, 8 );
			vehicleGeometry.rotateX( Math.PI * 0.5 );
			const vehicleMaterial = new THREE.MeshNormalMaterial();

			const vehicleMesh = new THREE.Mesh( vehicleGeometry, vehicleMaterial );
			vehicleMesh.matrixAutoUpdate = false;
			this.scene.add( vehicleMesh );

			const targetGeometry = new THREE.SphereBufferGeometry( 1 );
			const targetMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

			const targetMesh = new THREE.Mesh( targetGeometry, targetMaterial );
			targetMesh.matrixAutoUpdate = false;
			this.scene.add( targetMesh );

			//

			const sphereGeometry = new THREE.SphereBufferGeometry( 20, 32, 32 );
			const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe: true, transparent: true, opacity: 0.2 } );
			const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
			this.scene.add( sphere );

            loader.load(droneModel, function (gltf) {
                dron = gltf.scene
                this.scene.add(dron);
                dron.scale.set(0.2, 0.2, 0.2)
                dron.position.y = 30
                // dron.visible = false
                // dron.rotation.y = 90
                model.push(dron)
            });

			// game setup

			entityManager[0] = new YUKA.EntityManager();
			// time = new YUKA.Time();

			target[0] = new YUKA.GameEntity();
			target[0].setRenderComponent( targetMesh, sync );

			vehicle[0] = new YUKA.Vehicle();
            // vehicle.maxSpeed = 500
			vehicle[0].setRenderComponent( vehicleMesh, sync );
            
            // const arriveBehavior = new YUKA.SeekBehavior( target[0].position );
			const arriveBehavior = new YUKA.ArriveBehavior( target[0].position, 2.5, 0.1 );
			vehicle[0].steering.add( arriveBehavior );

			entityManager[0].add( target[0] );
			entityManager[0].add( vehicle[0] );

			generateTarget();
        }

        function obstacle(){

            const vehicleGeometry = new THREE.ConeBufferGeometry( 1, 5, 8 );
			vehicleGeometry.rotateX( Math.PI * 0.5 );
			vehicleGeometry.computeBoundingSphere();
			const vehicleMaterial = new THREE.MeshNormalMaterial();

			const vehicleMesh = new THREE.Mesh( vehicleGeometry, vehicleMaterial );
			vehicleMesh.matrixAutoUpdate = false;
			this.scene.add( vehicleMesh );

			// const gridHelper = new THREE.GridHelper( 25, 25 );
			// this.scene.add( gridHelper );

			// game setup

			entityManager[1] = new YUKA.EntityManager();
			// time = new YUKA.Time();

			const path = new YUKA.Path();
			path.loop = true;
			path.add( new YUKA.Vector3( 10, 0, 10 ) );
			path.add( new YUKA.Vector3( 10, 0, - 10 ) );
			path.add( new YUKA.Vector3( - 10, 0, - 10 ) );
			path.add( new YUKA.Vector3( 0, 0, 10 ) );


			// triangule = [
			// 	const x = 1,
			// 	const y = 1,
			// 	const z = 1,

			// ]

			const cubeGeometry=new THREE.BoxBufferGeometry(10,10,10)
			const cubeMaterial=new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: true})
			const cubeMesh=new THREE.Mesh(cubeGeometry, cubeMaterial)
			// cubeMesh.position.set(3,0,1)
			this.scene.add(cubeMesh)
			cubeMesh.position.setX = 20
			
		
			vehicle[1] = new YUKA.Vehicle();
            // vehicle[].velocity = 10
			vehicle[1].maxSpeed = 30;
			vehicle[1].setRenderComponent( vehicleMesh, sync );

			vehicle[1].boundingRadius = vehicleGeometry.boundingSphere.radius;
			vehicle[1].smoother = new YUKA.Smoother( 20 );

			entityManager[1].add( vehicle[1] );

			const obstacleAvoidanceBehavior = new YUKA.ObstacleAvoidanceBehavior( obstacles );
			vehicle[1].steering.add( obstacleAvoidanceBehavior );

			const followPathBehavior = new YUKA.FollowPathBehavior( path );
			vehicle[1].steering.add( followPathBehavior );

            setupObstacles();

        }

        function seekANDdestroy(){

            const vehicleGeometry = new THREE.ConeBufferGeometry( 1, 5, 8 );
			vehicleGeometry.rotateX( Math.PI * 0.5 );
			vehicleGeometry.computeBoundingSphere();
			const vehicleMaterial = new THREE.MeshNormalMaterial();

			const vehicleMesh = new THREE.Mesh( vehicleGeometry, vehicleMaterial );
			vehicleMesh.matrixAutoUpdate = false;
			this.scene.add( vehicleMesh );

			// const gridHelper = new THREE.GridHelper( 25, 25 );
			// this.scene.add( gridHelper );

			// game setup

			entityManager[2] = new YUKA.EntityManager();
            entityManager[3] = new YUKA.EntityManager();
			// time = new YUKA.Time();

			const path = new YUKA.Path();
			path.loop = true;
			path.add( new YUKA.Vector3( 10, 0, 10 ) );
			path.add( new YUKA.Vector3( 10, 0, - 10 ) );
			path.add( new YUKA.Vector3( - 10, 0, - 10 ) );
			path.add( new YUKA.Vector3( 0, 0, 10 ) );


            const targetGeometry = new THREE.SphereBufferGeometry( 1 );
			const targetMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
            const targetMesh = new THREE.Mesh( targetGeometry, targetMaterial );
			targetMesh.matrixAutoUpdate = false;
			this.scene.add( targetMesh );

			const cubeGeometry=new THREE.BoxBufferGeometry(10,10,10)
			const cubeMaterial=new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: true})
			const cubeMesh=new THREE.Mesh(cubeGeometry, cubeMaterial)
			// cubeMesh.position.set(3,0,1)
			this.scene.add(cubeMesh)
			cubeMesh.position.setX = 20

            target[2] = new YUKA.GameEntity();
			target[2].setRenderComponent( targetMesh, sync );
			
		
			vehicle[2] = new YUKA.Vehicle();
            // vehicle[].velocity = 10
			// vehicle[2].maxSpeed = 30;
			vehicle[2].setRenderComponent( vehicleMesh, sync );

			// vehicle[2].boundingRadius = vehicleGeometry.boundingSphere.radius;
			// vehicle[2].smoother = new YUKA.Smoother( 20 );

			// entityManager[2].add( vehicle[2] );

			// const obstacleAvoidanceBehavior = new YUKA.ObstacleAvoidanceBehavior( obstacles );
			// vehicle[2].steering.add( obstacleAvoidanceBehavior );

			// const followPathBehavior = new YUKA.FollowPathBehavior( path );
			// vehicle[2].steering.add( followPathBehavior );

            // const arriveBehavior = new YUKA.SeekBehavior( target[2].position );
			const arriveBehavior = new YUKA.ArriveBehavior( target[2].position, 2.5, 0.1 );
			vehicle[2].steering.add( arriveBehavior );


			entityManager[2].add( target[2] );
			entityManager[2].add( vehicle[2] );
			

            generateTargett();
            // setupObstacless();
        }

		function sync( entity, renderComponent ) {

			renderComponent.matrix.copy( entity.worldMatrix );

		}

		function generateTarget() {

			// generate a random point on a sphere

			const radius = 20;
			const phi = Math.acos( ( 2 * Math.random() ) - 1 );
			const theta = Math.random() * Math.PI * 2;

			target[0].position.fromSpherical( radius, phi, theta );

			setTimeout( generateTarget, 10000 );

		}

        function generateTargett() {

			// generate a random point on a sphere

			const radius = 20;
			const phi = Math.acos( ( 2 * Math.random() ) - 1 );
			const theta = Math.random() * Math.PI * 2;

			target[2].position.fromSpherical( radius, phi, theta );

			setTimeout( generateTarget, 10000 );

		}

        //
        function setupObstacles() {

			const geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
			geometry.computeBoundingSphere();
			const material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );

			const mesh1 = new THREE.Mesh( geometry, material );
			const mesh2 = new THREE.Mesh( geometry, material );
			const mesh3 = new THREE.Mesh( geometry, material );
					

			mesh1.position.set( - 10, 0, 0 );
			mesh2.position.set( 12, 0, 0 );
			mesh3.position.set( 4, 0, - 10 );
			

			this.scene.add( mesh1 );
			this.scene.add( mesh2 );
			this.scene.add( mesh3 );			

			const obstacle1 = new YUKA.GameEntity();
			obstacle1.position.copy( mesh1.position );
			obstacle1.boundingRadius = geometry.boundingSphere.radius;
			entityManager[1].add( obstacle1 );
			obstacles.push( obstacle1 );

			const obstacle2 = new YUKA.GameEntity();
			obstacle2.position.copy( mesh2.position );
			obstacle2.boundingRadius = geometry.boundingSphere.radius;
			entityManager[1].add( obstacle2 );
			obstacles.push( obstacle2 );

			const obstacle3 = new YUKA.GameEntity();
			obstacle3.position.copy( mesh3.position );
			obstacle3.boundingRadius = geometry.boundingSphere.radius;
			entityManager[1].add( obstacle3 );
			obstacles.push( obstacle3 );

            }
            
            function setupObstacless() {

                const geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
                geometry.computeBoundingSphere();
                const material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    
                const mesh1 = new THREE.Mesh( geometry, material );
                const mesh2 = new THREE.Mesh( geometry, material );
                const mesh3 = new THREE.Mesh( geometry, material );
                        
    
                mesh1.position.set( - 10, 0, 0 );
                mesh2.position.set( 12, 0, 0 );
                mesh3.position.set( 4, 0, - 10 );
                
    
                this.scene.add( mesh1 );
                this.scene.add( mesh2 );
                this.scene.add( mesh3 );			
    
                const obstacle1 = new YUKA.GameEntity();
                obstacle1.position.copy( mesh1.position );
                obstacle1.boundingRadius = geometry.boundingSphere.radius;
                entityManager[3].add( obstacle1 );
                obstacles.push( obstacle1 );
    
                const obstacle2 = new YUKA.GameEntity();
                obstacle2.position.copy( mesh2.position );
                obstacle2.boundingRadius = geometry.boundingSphere.radius;
                entityManager[3].add( obstacle2 );
                obstacles.push( obstacle2 );
    
                const obstacle3 = new YUKA.GameEntity();
                obstacle3.position.copy( mesh3.position );
                obstacle3.boundingRadius = geometry.boundingSphere.radius;
                entityManager[3].add( obstacle3 );
                obstacles.push( obstacle3 );
    
                }
          

    }
}


export default Scene

