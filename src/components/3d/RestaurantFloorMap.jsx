import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { playClickSound } from '../../utils/sound';

// Pre-configured 3D Restaurant Tables data
export const RESTAURANT_TABLES = [
  { id: 'T1', name: 'Table 1 - Rooftop Sunset', zone: 'Rooftop Deck', capacity: 2, pos: [-3, 0.4, -2.5], color: '#FF7700', status: 'available' },
  { id: 'T2', name: 'Table 2 - Rooftop Panoramic', zone: 'Rooftop Deck', capacity: 4, pos: [-1, 0.4, -3], color: '#FF7700', status: 'available' },
  { id: 'T3', name: 'Table 3 - Chef’s Counter VIP', zone: 'Chef Counter', capacity: 2, pos: [2, 0.2, -2], color: '#FFC72C', status: 'reserved' },
  { id: 'T4', name: 'Table 4 - Flame Pit Main', zone: 'Chef Counter', capacity: 6, pos: [3.2, 0.2, 0], color: '#FFC72C', status: 'available' },
  { id: 'T5', name: 'Table 5 - VIP Leather Booth', zone: 'Private Lounge', capacity: 4, pos: [-3.2, 0.2, 1.5], color: '#10B981', status: 'available' },
  { id: 'T6', name: 'Table 6 - Royal Gold Suite', zone: 'Private Lounge', capacity: 8, pos: [-1.5, 0.2, 3], color: '#10B981', status: 'available' },
  { id: 'T7', name: 'Table 7 - Garden Fairy Lights', zone: 'Garden Terrace', capacity: 4, pos: [1.8, 0.2, 2.5], color: '#38BDF8', status: 'available' },
  { id: 'T8', name: 'Table 8 - Courtyard Corner', zone: 'Garden Terrace', capacity: 2, pos: [3.5, 0.2, 3.2], color: '#38BDF8', status: 'available' },
];

function TableMesh({ table, isSelected, onSelectTable }) {
  const [hovered, setHovered] = useState(false);
  const candleRef = useRef();

  useFrame((state, delta) => {
    if (candleRef.current) {
      candleRef.current.intensity = 1.5 + Math.sin(state.clock.getElapsedTime() * 8) * 0.4;
    }
  });

  const isReserved = table.status === 'reserved';
  const tableColor = isSelected
    ? '#FF6B00'
    : isReserved
    ? '#475569'
    : hovered
    ? '#F59E0B'
    : table.color;

  return (
    <group position={table.pos}>
      {/* Table Top Surface */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          if (isReserved) return;
          playClickSound();
          onSelectTable(table);
        }}
        onPointerOver={(e) => { e.stopPropagation(); if (!isReserved) setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.85, 0.8, 0.12, 32]} />
        <meshStandardMaterial
          color={tableColor}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>

      {/* Selected Table Ring Glow */}
      {isSelected && (
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1.05, 32]} />
          <meshBasicMaterial color="#FF6B00" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Central Table Leg */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 0.7, 16]} />
        <meshStandardMaterial color="#1E293B" roughness={0.5} />
      </mesh>

      {/* Table Base Foot */}
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.06, 24]} />
        <meshStandardMaterial color="#0F172A" roughness={0.4} />
      </mesh>

      {/* Chairs */}
      {Array.from({ length: Math.min(table.capacity, 4) }).map((_, i) => {
        const angle = (i / Math.min(table.capacity, 4)) * Math.PI * 2;
        const cx = Math.cos(angle) * 1.15;
        const cz = Math.sin(angle) * 1.15;
        return (
          <group key={i} position={[cx, -0.2, cz]} rotation={[0, -angle + Math.PI / 2, 0]}>
            {/* Chair Seat */}
            <mesh castShadow>
              <boxGeometry args={[0.45, 0.08, 0.45]} />
              <meshStandardMaterial color={isSelected ? '#EA580C' : '#334155'} roughness={0.4} />
            </mesh>
            {/* Chair Backrest */}
            <mesh position={[0, 0.3, -0.2]} castShadow>
              <boxGeometry args={[0.42, 0.5, 0.06]} />
              <meshStandardMaterial color={isSelected ? '#C2410C' : '#1E293B'} roughness={0.4} />
            </mesh>
          </group>
        );
      })}

      {/* Table Candle Light */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.15, 12]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      {/* Candle Flame PointLight */}
      <pointLight
        ref={candleRef}
        position={[0, 0.28, 0]}
        color={isSelected ? '#FF9900' : '#FFD700'}
        intensity={1.8}
        distance={2.5}
      />

      {/* Table Name & Status Floating Label */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
        <Text
          position={[0, 1.1, 0]}
          fontSize={0.26}
          color={isSelected ? '#FF6B00' : isReserved ? '#94A3B8' : '#FFFFFF'}
          anchorX="center"
          anchorY="middle"
        >
          {table.id} {isReserved ? '(Booked)' : isSelected ? '✓ Selected' : ''}
        </Text>
      </Float>
    </group>
  );
}

function FloorPlanScene({ selectedTable, onSelectTable }) {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Main Restaurant Floor Base */}
      <mesh position={[0, -0.8, 0]} receiveShadow>
        <boxGeometry args={[11, 0.2, 9]} />
        <meshStandardMaterial color="#0A0A10" roughness={0.8} />
      </mesh>

      {/* Tile Grid Lines */}
      <gridHelper args={[11, 11, '#334155', '#1E293B']} position={[0, -0.69, 0]} />

      {/* Elevated Rooftop Wooden Deck Section */}
      <mesh position={[-2.2, -0.6, -2.7]} receiveShadow>
        <boxGeometry args={[4.8, 0.25, 3.2]} />
        <meshStandardMaterial color="#78350F" roughness={0.5} />
      </mesh>

      {/* VIP Private Lounge Carpet Section */}
      <mesh position={[-2.4, -0.65, 2.2]} receiveShadow>
        <boxGeometry args={[4.5, 0.1, 3.8]} />
        <meshStandardMaterial color="#064E3B" roughness={0.6} />
      </mesh>

      {/* Garden Terrace Grass Deck */}
      <mesh position={[2.6, -0.65, 2.6]} receiveShadow>
        <boxGeometry args={[4.6, 0.1, 3.2]} />
        <meshStandardMaterial color="#14532D" roughness={0.7} />
      </mesh>

      {/* Open Kitchen Bar Counter Base */}
      <mesh position={[2.5, -0.3, -1.2]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.7, 1.8]} />
        <meshStandardMaterial color="#1F2937" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Marble Countertop */}
      <mesh position={[2.5, 0.08, -1.2]}>
        <boxGeometry args={[4.0, 0.08, 2.0]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.25} />
      </mesh>

      {/* Render Tables */}
      {RESTAURANT_TABLES.map((tbl) => (
        <TableMesh
          key={tbl.id}
          table={tbl}
          isSelected={selectedTable?.id === tbl.id}
          onSelectTable={onSelectTable}
        />
      ))}
    </group>
  );
}

export function RestaurantFloorMap({ selectedTable, onSelectTable }) {
  return (
    <div className="w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden relative border border-white/10 bg-[#07070b]">
      {/* 3D Canvas Viewport */}
      <Canvas
        camera={{ position: [0, 8.5, 9], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[6, 10, 6]}
          intensity={1.6}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-4, 5, -4]} intensity={0.8} color="#FF7700" />
        <pointLight position={[4, 5, 4]} intensity={0.8} color="#38BDF8" />

        <FloorPlanScene selectedTable={selectedTable} onSelectTable={onSelectTable} />

        <ContactShadows position={[0, -1.3, 0]} opacity={0.6} scale={12} blur={2.5} far={4} />

        <OrbitControls
          enableZoom={true}
          minDistance={5}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>

      {/* Floor Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300 pointer-events-none">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Available</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
            <span>Selected</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
            <span>Booked</span>
          </span>
        </div>
        <span className="text-slate-400 font-medium hidden sm:inline">
          💡 Drag & Scroll to Rotate 3D Floor Layout
        </span>
      </div>
    </div>
  );
}
