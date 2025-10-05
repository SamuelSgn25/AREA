import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Environment, Stars } from "@react-three/drei";
import { ResidentialZone } from "./zones/ResidentialZone";
import { LagoonZone } from "./zones/LagoonZone";
import { DowntownZone } from "./zones/DowntownZone";
import { Ground } from "./zones/Ground";
import { ParkZone } from "./zones/ParkZone";
import { DetailedCityZone } from "./zones/DetailedCityZone";

export const CityScene = () => {
  return (
    <Canvas
      camera={{ position: [30, 25, 30], fov: 60 }}
      shadows
      className="w-full h-full"
    >
      {/* Lumière naturelle chaleureuse et optimiste */}
      <ambientLight intensity={0.8} color="#fff5e6" />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.2}
        color="#fffacd"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ffeb3b" />
      <pointLight position={[15, 8, 15]} intensity={0.4} color="#4caf50" />

      {/* Ciel lumineux et optimiste */}
      <Sky
        distance={450000}
        sunPosition={[10, 8, 0]}
        inclination={0.5}
        azimuth={0.25}
        turbidity={0.5}
        rayleigh={1}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Environment pour réflexions naturelles */}
      <Environment preset="park" />

      {/* Sol de la ville */}
      <Ground />

      {/* Ville détaillée avec 100 constructions de qualité */}
      <DetailedCityZone position={[0, 0, 0]} />
      
      {/* Zones spécialisées complémentaires */}
      <LagoonZone position={[60, 0, 0]} />
      <DowntownZone position={[-60, 0, 0]} />

      {/* Contrôles de caméra */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={100}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  );
};
