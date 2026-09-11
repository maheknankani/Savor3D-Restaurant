import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DrinkModel({ isHovered = false, scale = 1 }) {
  const groupRef = useRef();
  const bubblesRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;

    if (isHovered) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.3, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale * 1.1, scale * 1.1, scale * 1.1), 0.1);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.1, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }

    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((b, idx) => {
        b.position.y += delta * 0.4;
        if (b.position.y > 0.8) b.position.y = -0.7;
      });
    }
  });

  // Random bubble positions
  const bubbles = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < 18; i++) {
      list.push({
        x: (Math.random() - 0.5) * 0.9,
        y: (Math.random() - 0.5) * 1.4,
        z: (Math.random() - 0.5) * 0.9,
        size: 0.03 + Math.random() * 0.04
      });
    }
    return list;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Glass Container */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.65, 2.1, 32]} />
        <meshPhysicalMaterial 
          transmission={0.9} 
          opacity={1} 
          transparent={true} 
          roughness={0.05} 
          ior={1.5} 
          thickness={0.2}
          color="#FFFFFF"
        />
      </mesh>

      {/* Heavy Crystal Base of Glass */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.66, 0.72, 0.25, 32]} />
        <meshPhysicalMaterial 
          transmission={0.95} 
          roughness={0.02} 
          color="#FFFFFF" 
        />
      </mesh>

      {/* Glowing Violet-Orange Liquid Core */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.82, 0.6, 1.8, 32]} />
        <meshStandardMaterial 
          color="#7C3AED" 
          emissive="#5B21B6"
          emissiveIntensity={0.5}
          roughness={0.2} 
          transparent={true}
          opacity={0.85}
        />
      </mesh>

      {/* Floating Effervescent Bubbles */}
      <group ref={bubblesRef}>
        {bubbles.map((b, i) => (
          <mesh key={i} position={[b.x, b.y, b.z]}>
            <sphereGeometry args={[b.size, 8, 8]} />
            <meshStandardMaterial color="#FFD700" roughness={0.1} transparent opacity={0.7} />
          </mesh>
        ))}
      </group>

      {/* Crystal Ice Cubes */}
      {[
        { pos: [0.15, 0.35, 0.1], rot: [0.3, 0.4, 0.1] },
        { pos: [-0.2, 0.1, -0.15], rot: [0.1, 0.8, -0.3] },
        { pos: [0.1, -0.3, -0.1], rot: [-0.2, 0.2, 0.5] }
      ].map((ice, i) => (
        <mesh key={i} position={ice.pos} rotation={ice.rot}>
          <boxGeometry args={[0.36, 0.36, 0.36]} />
          <meshPhysicalMaterial transmission={0.95} roughness={0.1} color="#E0F7FA" />
        </mesh>
      ))}

      {/* Torched Citrus Lemon Wheel on Rim */}
      <group position={[0.82, 0.95, 0]} rotation={[0.4, 0, 0.8]}>
        {/* Rind */}
        <mesh>
          <cylinderGeometry args={[0.42, 0.42, 0.05, 24]} />
          <meshStandardMaterial color="#FFD700" roughness={0.3} />
        </mesh>
        {/* Inner Pulp */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.05, 24]} />
          <meshStandardMaterial color="#FFA500" roughness={0.4} />
        </mesh>
      </group>

      {/* Black Metallic Straw */}
      <mesh position={[-0.2, 0.4, 0.1]} rotation={[0.15, 0, -0.2]}>
        <cylinderGeometry args={[0.04, 0.04, 2.6, 16]} />
        <meshStandardMaterial color="#111116" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}
