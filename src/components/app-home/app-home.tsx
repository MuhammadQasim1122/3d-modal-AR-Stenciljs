import { Component, h } from '@stencil/core';
import * as THREE from 'three'
import { OrbitControls } from '../../assets/OBJLoader/OrbitControls.js';
import { MTLLoader } from '../../assets/OBJLoader/MTLLoader.js';
import { OBJLoader } from '../../assets/OBJLoader/OBJLoader.js';
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  public camera;
  private scene;
  private renderer;
  private controls;
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.camera.position.z = 200;

    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = true;

    const keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);
    
    const fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);
    console.log(this.scene);
    const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();
    
    this.scene.add(keyLight);
    this.scene.add(fillLight);
    this.scene.add(backLight);
    console.log(this.scene);
    const mtlLoader = new MTLLoader();
    mtlLoader.setResourcePath('../../assets/OBJLoader/');
    mtlLoader.setPath('../../assets/OBJLoader/');
    const scene1 = this.scene;
    mtlLoader.load('r2-d2.mtl', function (materials) {
      console.log(scene1);
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('../../assets/OBJLoader/');
        objLoader.load('r2-d2.obj', ( object ) => {
          object.position.y -= 60;
            scene1.add(object);
            this.scene = scene1;
        }
      ,
        function ( object ) {
          console.log( ( object.loaded / object.total * 100 ) + '% loaded' );
          console.log(scene1);
        },
        // called when loading has errors
        function ( error ) {
      
          console.log( error + 'An error happened' );
      
        });
        
    });
    this.animate();
  }
  private animate = () => {
    requestAnimationFrame( this.animate );
    this.controls.update();
	this.renderer.render(this.scene, this.camera);
  }


  render() {
    return (
      <div class="app-home">
        <p>
          Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on{' '}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
      </div>
    );
  }
}
