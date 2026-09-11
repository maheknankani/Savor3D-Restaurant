import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SandwichModel({ isHovered = false, scale = 1 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    groupRef.current.rotation.y += delta * 0.4;
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.08;

    if (isHovered) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.3, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale * 1.1, scale * 1.1, scale * 1.1), 0.1);
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.15, 0.1);
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Sandwich Layer Stack - Tightly Stacked Gourmet Club */}
      <group rotation={[0, 0.35, 0]}>
        
        {/* Top Sourdough Toast */}
        <group position={[0, 0.38, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.2, 1.8]} />
            <meshStandardMaterial color="#D88A28" roughness={0.35} />
          </mesh>
          {/* Sourdough Crust Border */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.26, 0.18, 1.86]} />
            <meshStandardMaterial color="#A65B13" roughness={0.5} />
          </mesh>
          {/* Diagonal Wood-Fired Grill Marks */}
          {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
            <mesh key={i} position={[x, 0.11, 0]} rotation={[0, 0.5, 0]}>
              <boxGeometry args={[0.05, 0.02, 1.6]} />
              <meshStandardMaterial color="#5C330A" roughness={0.9} />
            </mesh>
          ))}
        </group>

        {/* Melted Swiss Gruyère Cheese (Drooping Over Edges) */}
        <group position={[0, 0.24, 0]}>
          <mesh rotation={[0.02, 0.05, -0.03]} castShadow>
            <boxGeometry args={[2.3, 0.06, 1.85]} />
            <meshStandardMaterial color="#FFC72C" roughness={0.25} metalness={0.1} />
          </mesh>
          {/* Dripping melted cheese corners */}
          {[[1.1, -0.06, 0.8], [-1.1, -0.06, -0.8], [0.9, -0.06, -0.85], [-0.95, -0.06, 0.85]].map((pos, idx) => (
            <mesh key={idx} position={pos} rotation={[0, 0, 0.2 * (idx % 2 === 0 ? 1 : -1)]}>
              <coneGeometry args={[0.08, 0.14, 8]} />
              <meshStandardMaterial color="#FFC72C" roughness={0.25} />
            </mesh>
          ))}
        </group>

        {/* Tender Roasted Wagyu Sirloin Slices */}
        <mesh position={[0, 0.14, 0]} rotation={[0.02, -0.1, 0.02]} castShadow>
          <boxGeometry args={[2.18, 0.12, 1.78]} />
          <meshStandardMaterial color="#802B2B" roughness={0.6} />
        </mesh>

        {/* Crispy Smoked Bacon Strips (Overhanging) */}
        <group position={[0, 0.04, 0]}>
          <mesh rotation={[0.03, 0.35, 0]} castShadow>
            <boxGeometry args={[2.45, 0.06, 0.55]} />
            <meshStandardMaterial color="#8B0000" roughness={0.45} />
          </mesh>
          <mesh rotation={[-0.03, -0.3, 0]} castShadow>
            <boxGeometry args={[2.45, 0.06, 0.55]} />
            <meshStandardMaterial color="#991B1B" roughness={0.45} />
          </mesh>
        </group>

        {/* Juicy Vine-Ripened Heirloom Tomato Slices */}
        <group position={[0, -0.05, 0]}>
          <mesh position={[-0.45, 0, 0.1]} rotation={[0.05, 0, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.1, 24]} />
            <meshStandardMaterial color="#C82323" roughness={0.3} metalness={0.08} />
          </mesh>
          <mesh position={[0.45, 0, -0.1]} rotation={[-0.05, 0, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.1, 24]} />
            <meshStandardMaterial color="#D32F2F" roughness={0.3} metalness={0.08} />
          </mesh>
        </group>

        {/* Ruffled Farm-Fresh Green Lettuce */}
        <group position={[0, -0.16, 0]}>
          <mesh rotation={[0.02, 0.1, 0]}>
            <boxGeometry args={[2.36, 0.08, 1.94]} />
            <meshStandardMaterial color="#2E8B57" roughness={0.5} />
          </mesh>
          {/* Ruffled edge spheres around lettuce perimeter */}
          {[
            [1.15, 0, 0.6], [-1.15, 0, -0.6], [0.6, 0, 0.95], [-0.6, 0, -0.95],
            [1.15, 0, -0.5], [-1.15, 0, 0.5], [-0.5, 0, 0.95], [0.5, 0, -0.95]
          ].map((p, i) => (
            <mesh key={i} position={p}>
              <sphereGeometry args={[0.12, 10, 10]} />
              <meshStandardMaterial color="#3CB371" roughness={0.5} />
            </mesh>
          ))}
        </group>

        {/* Bottom Sourdough Toast */}
        <group position={[0, -0.30, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.2, 1.8]} />
            <meshStandardMaterial color="#C67D25" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.26, 0.18, 1.86]} />
            <meshStandardMaterial color="#A65B13" roughness={0.5} />
          </mesh>
        </group>

        {/* Wooden Toothpick Flag */}
        <group position={[0.4, 0.45, 0.2]} rotation={[0.1, 0, -0.1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.85, 8]} />
            <meshStandardMaterial color="#D4AC0D" roughness={0.3} />
          </mesh>
          {/* Flag Banner */}
          <mesh position={[0.2, 0.35, 0]} rotation={[0, 0.1, 0]} castShadow>
            <boxGeometry args={[0.38, 0.22, 0.02]} />
            <meshStandardMaterial color="#FF6B00" roughness={0.3} />
          </mesh>
        </group>

      </group>
    </group>
  );
}

