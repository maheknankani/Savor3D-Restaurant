import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { BurgerModel } from './BurgerModel';
import { PizzaModel } from './PizzaModel';
import { PastaModel } from './PastaModel';
import { DessertModel } from './DessertModel';
import { DrinkModel } from './DrinkModel';
import { FriesModel } from './FriesModel';
import { CoffeeModel } from './CoffeeModel';
import { DonutModel } from './DonutModel';
import { SandwichModel } from './SandwichModel';
import { FloatingIngredients } from './FloatingIngredients';

function ModelSelector({ modelType, isHovered, scale }) {
  switch (modelType) {
    case 'burger':
      return <BurgerModel isHovered={isHovered} scale={scale} />;
    case 'pizza':
      return <PizzaModel isHovered={isHovered} scale={scale} />;
    case 'pasta':
      return <PastaModel isHovered={isHovered} scale={scale} />;
    case 'dessert':
      return <DessertModel isHovered={isHovered} scale={scale} />;
    case 'drink':
      return <DrinkModel isHovered={isHovered} scale={scale} />;
    case 'fries':
      return <FriesModel isHovered={isHovered} scale={scale} />;
    case 'coffee':
      return <CoffeeModel isHovered={isHovered} scale={scale} />;
    case 'donut':
      return <DonutModel isHovered={isHovered} scale={scale} />;
    case 'sandwich':
      return <SandwichModel isHovered={isHovered} scale={scale} />;
    default:
      return <BurgerModel isHovered={isHovered} scale={scale} />;
  }
}

export function FoodCanvas({
  modelType = 'burger',
  isHovered = false,
  scale = 1,
  isInteractive = true,
  enableFloatingParticles = true,
  cameraPosition = [0, 1.2, 4.5],
  autoRotate = false,
  className = ''
}) {
  return (
    <div className={`w-full h-full relative cursor-grab active:cursor-grabbing ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
      >
        {/* Soft Ambient & Directional Studio Lights */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={15}
          shadow-camera-left={-4}
          shadow-camera-right={4}
          shadow-camera-top={4}
          shadow-camera-bottom={-4}
        />
        {/* Warm Ember Rim Spotlight */}
        <spotLight
          position={[-5, 4, -3]}
          intensity={1.2}
          color="#FF7700"
          angle={0.6}
          penumbra={0.8}
        />
        {/* Fill Cool Light */}
        <pointLight position={[3, -2, 2]} intensity={0.5} color="#38BDF8" />

        <Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
            <ModelSelector modelType={modelType} isHovered={isHovered} scale={scale} />
          </Float>

          {/* Floating Ingredient Cloud */}
          {enableFloatingParticles && (
            <FloatingIngredients count={20} modelType={modelType} />
          )}

          {/* Ground Soft Contact Shadow */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.6}
            scale={6}
            blur={2.5}
            far={4}
          />
        </Suspense>

        {/* Orbit Touch & Mouse Controls */}
        {isInteractive && (
          <OrbitControls
            enableZoom={isInteractive}
            minDistance={2.5}
            maxDistance={7}
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={1.5}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 6}
          />
        )}
      </Canvas>
    </div>
  );
}
