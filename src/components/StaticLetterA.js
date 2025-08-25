import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/**
 * Static 3D letter A made from three boxes. No animation.
 * Fits any parent that gives it width+height.
 */
export default function StaticLetterA() {
  const color = "#8f8f94"; // soft gray like your mock

  return (
    <div className="three-root"> {/* fills parent */}
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 8]} intensity={0.9} />
        <directionalLight position={[-6, -3, 4]} intensity={0.3} />

        {/* Left leg */}
        <mesh position={[-0.9, 0, 0]} rotation={[0, 0, Math.PI / 8]}>
          <boxGeometry args={[0.35, 2.2, 0.35]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
        </mesh>

        {/* Right leg */}
        <mesh position={[0.9, 0, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <boxGeometry args={[0.35, 2.2, 0.35]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
        </mesh>

        {/* Crossbar */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[1.6, 0.28, 0.35]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
        </mesh>

        {/* soft ground shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
          <circleGeometry args={[3.0, 48]} />
          <meshBasicMaterial color="#000" transparent opacity={0.06} />
        </mesh>

        {/* Allow rotate-only view; zoom/pan off to match mock */}
        <OrbitControls enablePan={false} enableZoom={false}
          minPolarAngle={Math.PI/2.4} maxPolarAngle={Math.PI/2.4} />
      </Canvas>
    </div>
  );
}
