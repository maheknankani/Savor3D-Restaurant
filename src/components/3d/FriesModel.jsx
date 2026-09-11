import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FriesModel({ isHovered = false, scale = 1 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    groupRef.current.rotation.y += delta * 0.4;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;

    if (isHovered) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.35, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale * 1.12, scale * 1.12, scale * 1.12), 0.1);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.15, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  // Generate randomized fry sticks sticking out of container
  const frySticks = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < 22; i++) {
      const angle = (i / 22) * Math.PI * 2;
      const radius = 0.1 + Math.random() * 0.35;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const height = 1.1 + Math.random() * 0.5;
      const rotZ = (Math.random() - 0.5) * 0.4;
      const rotX = (Math.random() - 0.5) * 0.4;
      list.push({ pos: [x, 0.5 + height / 2, z], rot: [rotX, Math.random(), rotZ], h: height });
    }
    return list;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Matte Black Fry Container Cup */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.5, 1.3, 24]} />
        <meshStandardMaterial color="#161622" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Gold Foil Logo Stripe on Container */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.76, 0.51, 0.25, 24]} />
        <meshStandardMaterial color="#FFC72C" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Golden Truffle Parmesan Fries Sticks */}
      <group position={[0, 0, 0]}>
        {frySticks.map((fry, idx) => (
          <mesh key={idx} position={fry.pos} rotation={fry.rot} castShadow>
            <boxGeometry args={[0.12, fry.h, 0.12]} />
            <meshStandardMaterial 
              color={idx % 2 === 0 ? "#F5B041" : "#E59866"} 
              roughness={0.4} 
            />
          </mesh>
        ))}
      </group>

      {/* Parmesan Cheese Dust Flakes */}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.5;
        return (
          <mesh key={i} position={[Math.cos(a) * r, 0.9 + Math.random() * 0.4, Math.sin(a) * r]}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
        );
      })}

      {/* Fresh Rosemary Sprig Garnish */}
      <mesh position={[0.2, 1.1, 0.1]} rotation={[0.3, 0.5, 0.2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
        <meshStandardMaterial color="#27AE60" roughness={0.5} />
      </mesh>
    </group>
  );
}
