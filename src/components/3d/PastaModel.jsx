import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PastaModel({ isHovered = false, scale = 1 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.08;

    if (isHovered) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.4, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale * 1.1, scale * 1.1, scale * 1.1), 0.1);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.2, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  // Pasta ribbon coils
  const pastaCoils = React.useMemo(() => {
    const coils = [];
    for (let i = 0; i < 9; i++) {
      const radius = 0.3 + (i * 0.12);
      const angle = (i * Math.PI) / 3;
      coils.push({
        pos: [Math.cos(angle) * radius, 0.2 + i * 0.06, Math.sin(angle) * radius],
        rot: [Math.sin(i), angle, Math.cos(i)],
        scale: [0.8 + Math.random() * 0.4, 0.15, 0.8 + Math.random() * 0.4]
      });
    }
    return coils;
  }, []);

  // Truffle shavings
  const truffles = React.useMemo(() => [
    { pos: [0.1, 0.65, 0.1], rot: [0.2, 0.5, -0.3] },
    { pos: [-0.25, 0.6, -0.15], rot: [-0.4, 1.1, 0.2] },
    { pos: [0.25, 0.58, -0.2], rot: [0.1, -0.8, 0.4] },
    { pos: [-0.1, 0.62, 0.25], rot: [0.5, 0.2, -0.1] },
  ], []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Luxury Matte Black Ceramic Plate */}
      <mesh position={[0, -0.3, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.8, 1.2, 0.35, 36]} />
        <meshStandardMaterial color="#16161F" roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Plate Inner Well */}
      <mesh position={[0, -0.12, 0]} receiveShadow>
        <cylinderGeometry args={[1.4, 1.3, 0.05, 36]} />
        <meshStandardMaterial color="#111118" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Creamy Sauce Bed */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.04, 32]} />
        <meshStandardMaterial color="#FFF9E6" roughness={0.3} />
      </mesh>

      {/* Hand-Rolled Tagliatelle Nest Coils */}
      <group position={[0, 0.05, 0]}>
        {pastaCoils.map((coil, idx) => (
          <mesh key={idx} position={coil.pos} rotation={coil.rot} castShadow>
            <torusGeometry args={[0.45, 0.08, 12, 24]} />
            <meshStandardMaterial color="#F7DB75" roughness={0.4} />
          </mesh>
        ))}

        {/* Central pasta mound core */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.65, 16, 16]} scale={[1.2, 0.7, 1.2]} />
          <meshStandardMaterial color="#F4D056" roughness={0.45} />
        </mesh>
      </group>

      {/* Shaved Umbrian Black Truffles */}
      {truffles.map((trf, idx) => (
        <mesh key={idx} position={trf.pos} rotation={trf.rot} castShadow>
          <boxGeometry args={[0.24, 0.015, 0.24]} />
          <meshStandardMaterial color="#1E1C1A" roughness={0.9} />
        </mesh>
      ))}

      {/* Parmigiano-Reggiano Dust flakes */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 0.9;
        return (
          <mesh key={i} position={[Math.cos(angle) * dist, 0.55 + Math.random() * 0.1, Math.sin(angle) * dist]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}
