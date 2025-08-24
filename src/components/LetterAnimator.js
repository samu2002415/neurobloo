import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

function LetterAnimator({ letter }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(light);

    const loader = new FontLoader();
    let mesh;

    loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      const geometry = new TextGeometry(letter, {
        font: font,
        size: 2,
        height: 0.4,
      });

      const material = new THREE.MeshPhongMaterial({ color: 0x0077ff });
      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = 0.3;
      scene.add(mesh);

      const animate = () => {
        requestAnimationFrame(animate);
        if (mesh) mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    });

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [letter]);

  return <div ref={mountRef} style={{ width: "100%", height: "350px" }} />;
}

export default LetterAnimator;
