import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// Component that animates the 2D PNG image
function AnimatedDeliverySign({ imagePath }) {
  // Use useLoader to load the PNG file as a texture
  const texture = useLoader(TextureLoader, imagePath);
  const meshRef = useRef();

  // Animation logic: move the sign across the screen
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Move the sign along the X-axis
      meshRef.current.position.x += delta * 2; // Adjust speed as needed

      // Loop the animation: if it goes off screen, reset its position
      if (meshRef.current.position.x > 10) {
        meshRef.current.position.x = -10; // Reset to the left
      }
    }
  });

  return (
    // Plane geometry to display the 2D image
    // You may need to adjust the aspect ratio of the plane to match your PNG's dimensions
    <Plane
      args={[4, 3]} // Adjust the width and height of the plane
      ref={meshRef}
      position={[-10, -0.5, 0]} // Initial position to start off-screen
      castShadow
    >
      {/* Apply the loaded PNG texture to the material */}
      <meshStandardMaterial map={texture} transparent />
    </Plane>
  );
}

// Main DeliveryAnimation component
const DeliveryAnimation = () => {
  // Path to your PNG file
  // IMPORTANT: Ensure 'del.png' is in your project's public folder
  const deliverySignPath = '/del.jpg';

  return (
    <div style={{
      width: '100%',
      maxWidth: '800px',
      height: '400px',
      background: 'linear-gradient(to bottom, #87CEEB, #6A5ACD)', // Sky to horizon gradient
      borderRadius: '15px',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px auto',
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    }}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 75 }}
        gl={{ antialias: true }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Lights */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
          <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />

          {/* Ground Plane (Road) */}
          <Plane
            args={[50, 50]}
            rotation-x={-Math.PI / 2}
            position={[0, -1.5, 0]}
            receiveShadow
          >
            <meshStandardMaterial color="#696969" />
          </Plane>

          {/* Background (simple distant elements like buildings/hills) */}
          <group position={[0, 0, -5]}>
            <mesh position={[-8, 0, -2]}>
              <boxGeometry args={[3, 5, 1]} />
              <meshStandardMaterial color="#444" />
            </mesh>
            <mesh position={[-3, -0.5, -3]}>
              <boxGeometry args={[4, 6, 1.5]} />
              <meshStandardMaterial color="#555" />
            </mesh>
            <mesh position={[7, 0.5, -1]}>
              <boxGeometry args={[2.5, 4, 1]} />
              <meshStandardMaterial color="#333" />
            </mesh>
          </group>

          {/* Your PNG file, now correctly animated */}
          <AnimatedDeliverySign imagePath={deliverySignPath} />

        </Suspense>
      </Canvas>
      <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: 'white',
          padding: '8px 15px',
          borderRadius: '20px',
          fontSize: '0.9em',
          zIndex: 10
      }}>
          Your order is on its way!
      </div>
    </div>
  );
};

export default DeliveryAnimation;
