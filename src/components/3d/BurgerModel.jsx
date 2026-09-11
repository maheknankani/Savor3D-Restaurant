import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function BurgerModel({ isHovered = false, scale = 1, isInteractive = true }) {
  const groupRef = useRef();
  const sesameRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Constant slow rotation
    groupRef.current.rotation.y += delta * 0.4;

    // Hover bobbing motion
    const hoverOffset = Math.sin(state.clock.getElapsedTime() * 2) * 0.12;
    groupRef.current.position.y = hoverOffset;

    if (isHovered) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.2, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale * 1.1, scale * 1.1, scale * 1.1), 0.1);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }

    if (sesameRef.current) {
      sesameRef.current.rotation.y -= delta * 0.2;
    }
  });

  // Generate sesame seeds positions on top bun
  const sesameSeeds = React.useMemo(() => {
    const seeds = [];
    for (let i = 0; i < 28; i++) {
      const phi = Math.random() * Math.PI * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const r = 1.35;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = 0.55 + r * Math.cos(phi) * 0.6;
      const z = r * Math.sin(phi) * Math.sin(theta);
      seeds.push({ pos: [x, y, z], rot: [Math.random() * 0.5, theta, 0] });
    }
    return seeds;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Top Brioche Bun */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1.38, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
        <meshStandardMaterial 
          color="#D88A28" 
          roughness={0.35} 
          metalness={0.05} 
        />
      </mesh>

      {/* Sesame Seeds */}
      <group ref={sesameRef}>
        {sesameSeeds.map((seed, idx) => (
          <mesh key={idx} position={[seed.pos[0], seed.pos[1] - 0.35, seed.pos[2]]} rotation={seed.rot}>
            <sphereGeometry args={[0.035, 8, 8]} scale={[1, 0.5, 1.8]} />
            <meshStandardMaterial color="#FFF5DC" roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Melted Cheese Layer (Dripping over patty) */}
      <group position={[0, 0.26, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0.2]} castShadow>
          <boxGeometry args={[2.3, 2.3, 0.07]} />
          <meshStandardMaterial color="#FFB800" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Cheese drip edges */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <mesh 
            key={idx} 
            position={[Math.cos(angle) * 1.15, -0.12, Math.sin(angle) * 1.15]}
            rotation={[0, angle, 0.3]}
          >
            <cylinderGeometry args={[0.07, 0.02, 0.25, 8]} />
            <meshStandardMaterial color="#FFB800" roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Wagyu Beef Patty */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.35, 1.38, 0.36, 32]} />
        <meshStandardMaterial 
          color="#42211D" 
          roughness={0.8} 
          metalness={0.1} 
        />
      </mesh>

      {/* Crispy Bacon Strips */}
      <group position={[0, -0.08, 0]} rotation={[0, 0.6, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0.05, 0, 0]} castShadow>
          <boxGeometry args={[2.6, 0.04, 0.4]} />
          <meshStandardMaterial color="#8B2500" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[-0.05, 1.2, 0]} castShadow>
          <boxGeometry args={[2.6, 0.04, 0.4]} />
          <meshStandardMaterial color="#A52A2A" roughness={0.5} />
        </mesh>
      </group>

      {/* Ruffled Butter Lettuce */}
      <group position={[0, -0.18, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.4, 1.45, 32]} />
          <meshStandardMaterial 
            color="#2E8B57" 
            roughness={0.6} 
            side={THREE.DoubleSide} 
          />
        </mesh>
        {/* Wave details on lettuce */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.25, -0.04, Math.sin(a) * 1.25]}>
              <sphereGeometry args={[0.18, 8, 8]} />
              <meshStandardMaterial color="#3CB371" roughness={0.5} />
            </mesh>
          );
        })}
      </group>

      {/* Heirloom Tomato Slices */}
      <group position={[0, -0.30, 0]}>
        <mesh position={[-0.4, 0, -0.15]} rotation={[0.08, 0, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 24]} />
          <meshStandardMaterial color="#C82323" roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0.4, 0, 0.15]} rotation={[-0.08, 0, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 24]} />
          <meshStandardMaterial color="#D32F2F" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>

      {/* Bottom Brioche Bun */}
      <mesh position={[0, -0.48, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.32, 1.2, 0.35, 32]} />
        <meshStandardMaterial color="#CD7F32" roughness={0.4} />
      </mesh>
    </group>
  );
}
