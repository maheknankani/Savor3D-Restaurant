import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CoffeeModel({ isHovered = false, scale = 1 }) {
  const groupRef = useRef();
  const steamRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.08;

    if (isHovered) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.45, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale * 1.12, scale * 1.12, scale * 1.12), 0.1);
    } else {
      // Tilt cup slightly forward (0.35rad) so top latte art foam is clearly visible from front camera!
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.35, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }

    if (steamRef.current) {
      steamRef.current.children.forEach((p) => {
        p.position.y += delta * 0.35;
        p.scale.x += delta * 0.12;
        p.scale.z += delta * 0.12;
        if (p.position.y > 1.3) {
          p.position.y = 0.5;
          p.scale.set(1, 1, 1);
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Saucer Base Plate - Obsidian with Gold Metallic Rim */}
      <group position={[0, -0.62, 0]}>
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[1.55, 1.1, 0.12, 36]} />
          <meshStandardMaterial color="#1A1A24" roughness={0.25} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <torusGeometry args={[1.5, 0.04, 12, 36]} />
          <meshStandardMaterial color="#FFC72C" roughness={0.15} metalness={0.9} />
        </mesh>
      </group>

      {/* Luxury Warm Ivory Porcelain Cup Body */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.92, 0.62, 1.1, 36]} />
        <meshStandardMaterial color="#F4EAE1" roughness={0.15} metalness={0.05} />
      </mesh>

      {/* 24K Gold Rim Accent Ring on Top of Cup */}
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.035, 12, 36]} />
        <meshStandardMaterial color="#FFC72C" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Porcelain Cup Handle */}
      <mesh position={[0.98, -0.05, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.3, 0.08, 12, 24]} />
        <meshStandardMaterial color="#F4EAE1" roughness={0.15} />
      </mesh>

      {/* Rich Espresso Liquid Bed */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.88, 0.88, 0.06, 36]} />
        <meshStandardMaterial color="#3A1C0B" roughness={0.25} />
      </mesh>

      {/* Creamy Foam Latte Art Base */}
      <mesh position={[0, 0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.85, 36]} />
        <meshStandardMaterial color="#FFF5EA" roughness={0.35} />
      </mesh>

      {/* 24K Gold Leaf Rosette Art Swirl */}
      <mesh position={[0, 0.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.55, 24]} />
        <meshStandardMaterial color="#FFC72C" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Inner Heart Foam Art Detail */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.22, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>

      {/* Roasted Coffee Beans on Saucer */}
      {[
        { pos: [1.15, -0.52, 0.4], rot: [0.3, 0.2, 0.5] },
        { pos: [-1.05, -0.52, -0.3], rot: [0.1, 0.9, -0.2] },
        { pos: [0.85, -0.52, -0.75], rot: [-0.4, 0.4, 0.1] }
      ].map((bean, i) => (
        <mesh key={i} position={bean.pos} rotation={bean.rot} castShadow>
          <sphereGeometry args={[0.13, 10, 10]} scale={[1.4, 0.6, 0.9]} />
          <meshStandardMaterial color="#2C1609" roughness={0.5} />
        </mesh>
      ))}

      {/* Animated Rising Steam Vapor */}
      <group ref={steamRef}>
        {[
          { x: 0.1, y: 0.55, z: 0 },
          { x: -0.18, y: 0.75, z: 0.1 },
          { x: 0.05, y: 0.95, z: -0.1 }
        ].map((s, i) => (
          <mesh key={i} position={[s.x, s.y, s.z]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} transparent opacity={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
