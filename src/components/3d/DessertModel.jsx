import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DessertModel({ isHovered = false, scale = 1 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    groupRef.current.rotation.y += delta * 0.4;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;

    if (isHovered) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.35, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale * 1.12, scale * 1.12, scale * 1.12), 0.1);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.2, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Slate Plate Base */}
      <mesh position={[0, -0.65, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.7, 1.5, 0.15, 32]} />
        <meshStandardMaterial color="#1E1E2A" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Warm Golden Caramel & Chocolate Drizzle Pool */}
      <mesh position={[0, -0.56, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.03, 32]} />
        <meshStandardMaterial color="#C87D32" roughness={0.15} metalness={0.3} />
      </mesh>

      {/* Rich Warm Milk Chocolate Lava Dome Sphere (Vibrant & Warm!) */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.15, 36, 36]} />
        <meshStandardMaterial 
          color="#7A422B" 
          roughness={0.2} 
          metalness={0.1} 
        />
      </mesh>

      {/* Warm Gold Caramel Glaze Crown Shell */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.7, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.35]} />
        <meshStandardMaterial color="#E69535" roughness={0.15} metalness={0.4} />
      </mesh>

      {/* 24K Gold Leaf Flecks Scattered On Dome */}
      {Array.from({ length: 20 }).map((_, i) => {
        const phi = Math.random() * Math.PI * 0.4;
        const theta = Math.random() * Math.PI * 2;
        const r = 1.16;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = 0.15 + r * Math.cos(phi);
        const z = r * Math.sin(phi) * Math.sin(theta);
        return (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[0.09 + Math.random() * 0.06, 0.01, 0.09 + Math.random() * 0.06]} />
            <meshStandardMaterial color="#FFC72C" roughness={0.1} metalness={0.95} />
          </mesh>
        );
      })}

      {/* Warm Molten Ganache Dripping Down Sides */}
      {[0, 1.5, 3.1, 4.6].map((angle, i) => (
        <mesh 
          key={i} 
          position={[Math.cos(angle) * 1.05, -0.2, Math.sin(angle) * 1.05]}
          rotation={[0, angle, 0.2]}
        >
          <cylinderGeometry args={[0.08, 0.14, 0.6, 12]} />
          <meshStandardMaterial color="#5C301E" roughness={0.15} />
        </mesh>
      ))}

      {/* Bright Ruby Raspberries at base */}
      {[
        { pos: [1.1, -0.45, 0.3], r: 0.19 },
        { pos: [0.9, -0.45, 0.75], r: 0.17 },
        { pos: [-1.0, -0.45, -0.4], r: 0.2 }
      ].map((berry, i) => (
        <group key={i} position={berry.pos}>
          <mesh castShadow>
            <sphereGeometry args={[berry.r, 12, 12]} />
            <meshStandardMaterial color="#E63946" roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* Bourbon Vanilla Bean Gelato Quenelle */}
      <mesh position={[-0.8, -0.38, 0.7]} rotation={[0.4, 0.2, 0.5]} castShadow>
        <sphereGeometry args={[0.32, 16, 16]} scale={[1.4, 0.7, 0.8]} />
        <meshStandardMaterial color="#FFFEEA" roughness={0.3} />
      </mesh>
    </group>
  );
}
