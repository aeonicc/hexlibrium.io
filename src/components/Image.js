import React, { Component, useRef } from 'react';

import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

import img01 from "../images/metam.png";

// class Scene extends Component {

//     componentDidMount() {   

// export default function NFT() {  
// export default function NFT() {  
    
    // this.mount.appendChild(renderer.domElement);

class Image{
    constructor(){

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshBasicMaterial({color: 0xff9944, side: THREE.DoubleSide})
    const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
    mesh.position.set(0,0,0);
    // Scene.scene.add(mesh)

    const loader = new THREE.TextureLoader();

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("webgl");
    mesh.material.map = new THREE.CanvasTexture(canvas)

    loader.load(img01, function(texture){

        const img = mesh.material.map = texture;         
    })
    // return(

    // {/* <div ref={ref => (this.mount = ref)}/> */}
    // )
}
}
export {Image}

