import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DonutModel({ isHovered = false, scale = 1 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    groupRef.current.rotation.y += delta * 0.4;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;

    if (isHovered) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.4, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale * 1.12, scale * 1.12, scale * 1.12), 0.1);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.25, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  // Rainbow sprinkles
  const sprinkles = React.useMemo(() => {
    const list = [];
    const colors = ['#FF4D4D', '#FFD700', '#38BDF8', '#4ADE80', '#F472B6', '#FFFFFF'];
    for (let i = 0; i < 35; i++) {
      const angle = (i / 35) * Math.PI * 2;
      const r = 1.0 + (Math.random() - 0.5) * 0.35;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = 0.22 + Math.random() * 0.08;
      list.push({
        pos: [x, y, z],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random()],
        color: colors[i % colors.length]
      });
    }
    return list;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Baked Golden Dough Ring Base */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.0, 0.45, 24, 48]} />
        <meshStandardMaterial color="#E5A758" roughness={0.4} />
      </mesh>

      {/* Glossy Pink Berry Glaze Top Layer */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1.01, 0.44, 24, 48, 0, Math.PI * 2]} />
        <meshStandardMaterial color="#FF4D8D" roughness={0.15} metalness={0.05} />
      </mesh>

      {/* Drip Glaze Details hugging donut curve */}
      {Array.from({ length: 10 }).map((_, idx) => {
        const angle = (idx / 10) * Math.PI * 2;
        return (
          <mesh 
            key={idx} 
            position={[Math.cos(angle) * 1.25, 0.02, Math.sin(angle) * 1.25]}
          >
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color="#FF4D8D" roughness={0.15} />
          </mesh>
        );
      })}

      {/* Rainbow Sprinkles */}
      {sprinkles.map((sp, idx) => (
        <mesh key={idx} position={sp.pos} rotation={sp.rot} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.16, 8]} />
          <meshStandardMaterial color={sp.color} roughness={0.3} />
        </mesh>
      ))}

      {/* 24K Gold Sparkle Flakes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = Math.random() * Math.PI * 2;
        const r = 0.9 + Math.random() * 0.3;
        return (
          <mesh key={i} position={[Math.cos(a) * r, 0.32, Math.sin(a) * r]}>
            <boxGeometry args={[0.06, 0.01, 0.06]} />
            <meshStandardMaterial color="#FFC72C" roughness={0.1} metalness={0.95} />
          </mesh>
        );
      })}
    </group>
  );
}
