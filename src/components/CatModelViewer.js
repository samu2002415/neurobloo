// components/CatModelViewer.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function CatModel() {
  const gltf = useGLTF('/models/dog.glb');
  return <primitive object={gltf.scene} scale={2} />;
}

export default function CatModelViewer() {
  return (
    <div style={{ width: '1400px', height: '200px' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 4, 5]} />
        <Suspense fallback={null}>
          <CatModel />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
