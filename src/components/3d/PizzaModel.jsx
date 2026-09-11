import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PizzaModel({ isHovered = false, scale = 1 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.8) * 0.1;

    if (isHovered) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.45, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale * 1.12, scale * 1.12, scale * 1.12), 0.1);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.25, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  // Pepperoni positions
  const pepperonis = React.useMemo(() => [
    { pos: [0.6, 0.15, 0.5], scale: 0.35 },
    { pos: [-0.7, 0.15, 0.3], scale: 0.38 },
    { pos: [0.2, 0.15, -0.8], scale: 0.34 },
    { pos: [-0.4, 0.15, -0.6], scale: 0.36 },
    { pos: [0.8, 0.15, -0.3], scale: 0.32 },
    { pos: [0.0, 0.15, 0.8], scale: 0.35 },
    { pos: [-0.8, 0.15, -0.2], scale: 0.33 },
    { pos: [0.3, 0.15, 0.0], scale: 0.36 },
  ], []);

  // Basil leaf positions
  const basilLeaves = React.useMemo(() => [
    { pos: [0.2, 0.18, 0.4], rot: [0.1, 0.5, 0.2] },
    { pos: [-0.3, 0.18, 0.1], rot: [-0.1, -0.8, 0.1] },
    { pos: [0.5, 0.18, -0.5], rot: [0.2, 1.2, -0.1] },
    { pos: [-0.2, 0.18, -0.7], rot: [0, -0.4, 0.3] },
  ], []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Wood-fired Outer Puffed Crust Ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.6, 0.3, 16, 48]} />
        <meshStandardMaterial 
          color="#D49B4B" 
          roughness={0.65} 
          metalness={0.05} 
        />
      </mesh>

      {/* Crust Leopard Burn Spots */}
      {Array.from({ length: 14 }).map((_, idx) => {
        const angle = (idx / 14) * Math.PI * 2;
        return (
          <mesh 
            key={idx} 
            position={[Math.cos(angle) * 1.62, (Math.random() - 0.5) * 0.1, Math.sin(angle) * 1.62]}
          >
            <sphereGeometry args={[0.08 + Math.random() * 0.05, 8, 8]} />
            <meshStandardMaterial color="#2B1A09" roughness={0.9} />
          </mesh>
        );
      })}

      {/* Pizza Base Dough */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.6, 1.6, 0.1, 32]} />
        <meshStandardMaterial color="#E8C587" roughness={0.7} />
      </mesh>

      {/* Rich San Marzano Tomato Sauce Layer */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.04, 32]} />
        <meshStandardMaterial color="#C82323" roughness={0.4} />
      </mesh>

      {/* Melted Buffalo Mozzarella Pools */}
      <group position={[0, 0.08, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.42, 32]} />
          <meshStandardMaterial color="#FDFBF7" roughness={0.25} metalness={0.05} />
        </mesh>
        {/* Cheese melt bumps */}
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          const r = 0.4 + Math.random() * 0.7;
          return (
            <mesh key={i} position={[Math.cos(a) * r, 0.02, Math.sin(a) * r]}>
              <sphereGeometry args={[0.2, 12, 12]} scale={[1.2, 0.3, 1.2]} />
              <meshStandardMaterial color="#FFFEEA" roughness={0.2} />
            </mesh>
          );
        })}
      </group>

      {/* Crispy Pepperoni Cups */}
      {pepperonis.map((pep, i) => (
        <group key={i} position={pep.pos}>
          {/* Pepperoni base */}
          <mesh castShadow>
            <cylinderGeometry args={[pep.scale, pep.scale * 0.9, 0.06, 24]} />
            <meshStandardMaterial color="#991B1B" roughness={0.4} />
          </mesh>
          {/* Pepperoni cupped rim */}
          <mesh position={[0, 0.03, 0]}>
            <torusGeometry args={[pep.scale, 0.02, 8, 24]} />
            <meshStandardMaterial color="#7F1D1D" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Fresh Organic Basil Leaves */}
      {basilLeaves.map((leaf, i) => (
        <mesh key={i} position={leaf.pos} rotation={leaf.rot} castShadow>
          <sphereGeometry args={[0.18, 12, 12]} scale={[1, 0.1, 1.8]} />
          <meshStandardMaterial color="#2E8B57" roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}
