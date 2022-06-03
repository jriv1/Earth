import './style.css'

import * as THREE from "three";

//scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer(
  {canvas : document.querySelector("#bg"),
  antialias:true}

);

camera.position.z = 30;
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const sphere = new THREE.Mesh
(new THREE.SphereGeometry(8,32,32),
new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("earthnight.jpeg")}));


const light = new THREE.AmbientLight(0xffffff,1);

scene.add(light);

scene.add(sphere);;




 // GENERATE RANDOM STARS
 function addStar(){
  // const geo = new THREE.SphereGeometry(0.12,24,24);
     const geo = new THREE.SphereGeometry(Math.random() * 0.2 ,24,24);
  
  const mat = new THREE.MeshStandardMaterial({color: 0xffffff})

  const star = new THREE.Mesh(geo,mat);

  const [x,y] = Array(2).fill().map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x,y);
  star.position.setZ(-300);
  scene.add(star);    

}
Array(1000).fill().forEach(addStar);


function animate(){
  requestAnimationFrame(animate);

  sphere.rotateY(0.001);

  renderer.render(scene,camera);
}

animate();