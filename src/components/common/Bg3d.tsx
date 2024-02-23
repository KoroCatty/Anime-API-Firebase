import { useRef, useEffect } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
/** ======================================================================
 * 必須の3要素 must have 3 elements (Scene, Camera, Renderer)
======================================================================  */
//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  85,
  sizes.width / sizes.height,
  0.1,
  1000,
);
camera.position.z = 6;
scene.add(camera);

function Bg3d() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Initialize the clock
    const clock = new THREE.Clock();

    const particlesMaterial = new THREE.PointsMaterial({
      size: matchMedia("(max-width: 480px)").matches ? 0.001 : 0.023,
      color: "#adc6ff",
    });

    const donutParticlesGeometry = new THREE.TorusGeometry(2.8, 0.7, 16, 100);
    // const donutParticlesGeometry = new THREE.BoxGeometry( 1, 1, 1 );

    const donutParticles = new THREE.Points(
      donutParticlesGeometry,
      particlesMaterial,
    );

    const count = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positionArray[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3),
    );

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);

    scene.add(donutParticles, particles);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;

    // Adjusted tick function to use the defined clock
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      camera.position.x = Math.cos(elapsedTime * 0.4) * 6;
      camera.position.z = Math.sin(elapsedTime * 0.4) * 6;
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };

    tick();

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="webgl"></canvas>
    </>
  );
}

export default Bg3d;
