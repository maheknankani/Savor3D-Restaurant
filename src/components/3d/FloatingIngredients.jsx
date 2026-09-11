import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingIngredients({ count = 25, modelType = 'burger' }) {
  const groupRef = useRef();

  // Create random floating particle data
  const particles = React.useMemo(() => {
    const list = [];
    const colors = {
      burger: ['#FFB800', '#2E8B57', '#C82323', '#FFF5DC'],
      pizza: ['#C82323', '#2E8B57', '#FFB800', '#3A1700'],
      pasta: ['#FFF8E7', '#2B2A2A', '#F7DB75', '#2E8B57'],
      dessert: ['#FFC72C', '#E63946', '#7A422B', '#FFFEEA'],
      drink: ['#FFD700', '#7C3AED', '#E0F7FA', '#2E8B57'],
      fries: ['#F5B041', '#FFFFFF', '#27AE60', '#FFC72C'],
      coffee: ['#4A2511', '#FFC72C', '#FFF8E7', '#D4AC0D'],
      donut: ['#FF4D8D', '#FFD700', '#38BDF8', '#4ADE80', '#FFFFFF'],
      sandwich: ['#D88A28', '#2E8B57', '#C82323', '#FFD000']
    }[modelType] || ['#FF6B00', '#FFC72C', '#FFFFFF'];

    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      list.push({
        x: radius * Math.cos(theta) * Math.cos(phi),
        y: radius * Math.sin(phi),
        z: radius * Math.sin(theta) * Math.cos(phi),
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        speed: 0.2 + Math.random() * 0.5,
        scale: 0.05 + Math.random() * 0.08,
        color: colors[i % colors.length],
        shape: i % 3 // 0 = sphere, 1 = box/flake, 2 = leaf
      });
    }
    return list;
  }, [count, modelType]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    groupRef.current.rotation.y += delta * 0.15;
    
    groupRef.current.children.forEach((child, idx) => {
      const p = particles[idx];
      if (!p) return;
      child.rotation.x += delta * p.speed;
      child.rotation.y += delta * p.speed * 0.8;
      child.position.y += Math.sin(state.clock.getElapsedTime() * p.speed + idx) * 0.003;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <mesh 
          key={idx} 
          position={[p.x, p.y, p.z]} 
          rotation={[p.rotX, p.rotY, 0]}
        >
          {p.shape === 0 ? (
            <sphereGeometry args={[p.scale, 8, 8]} />
          ) : p.shape === 1 ? (
            <boxGeometry args={[p.scale * 1.5, p.scale * 0.3, p.scale * 1.2]} />
          ) : (
            <sphereGeometry args={[p.scale * 1.4, 8, 8]} scale={[1, 0.2, 1.8]} />
          )}
          <meshStandardMaterial color={p.color} roughness={0.3} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}
