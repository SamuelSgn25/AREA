import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

interface LagoonZoneProps {
  position: [number, number, number];
}

export const LagoonZone = ({ position }: LagoonZoneProps) => {
  const groupRef = useRef<Group>(null);
  const waterRef = useRef<any>(null);

  // Animation douce de l'eau
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  // Végétation aquatique abondante
  const aquaticPlants = [
    { pos: [2, 0, 1] },
    { pos: [-2, 0, -1] },
    { pos: [3, 0, -2] },
    { pos: [-3, 0, 2] },
    { pos: [1, 0, 3] },
    { pos: [-1, 0, -3] },
    { pos: [3.5, 0, 0.5] },
    { pos: [-3.5, 0, -0.5] },
  ];

  // Observateurs de la nature
  const visitors = [
    { pos: [4.5, 0.4, -1] },
    { pos: [-4, 0.4, 1.5] },
    { pos: [2.5, 0.4, -3.5] },
  ];

  return (
    <group ref={groupRef} position={position}>
      {/* Lagune - eau cristalline et vibrante */}
      <mesh
        ref={waterRef}
        position={[0, -0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[5, 32]} />
        <meshStandardMaterial
          color="#26c6da"
          transparent
          opacity={0.75}
          roughness={0.05}
          metalness={0.4}
          emissive="#00acc1"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Végétation aquatique */}
      {aquaticPlants.map((plant, index) => (
        <group key={`plant-${index}`} position={plant.pos as [number, number, number]}>
          {/* Roseau */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.08, 1, 6]} />
            <meshStandardMaterial color="#7cb342" />
          </mesh>
          {/* Feuilles */}
          <mesh position={[0, 1, 0]} castShadow>
            <coneGeometry args={[0.15, 0.5, 6]} />
            <meshStandardMaterial color="#8bc34a" />
          </mesh>
        </group>
      ))}

      {/* Mangroves stylisées */}
      <group position={[-4, 0, 0]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.15, 0.8, 8]} />
          <meshStandardMaterial color="#6d4c41" />
        </mesh>
        <mesh position={[0, 1.2, 0]} castShadow>
          <sphereGeometry args={[0.6, 8, 8]} />
          <meshStandardMaterial color="#558b2f" />
        </mesh>
      </group>

      {/* Oiseaux stylisés (plus nombreux) */}
      <group position={[2, 2, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
      <group position={[-1.5, 2.5, 1]}>
        <mesh castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
      <group position={[0, 3, -1.5]}>
        <mesh castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Visiteurs observant la lagune */}
      {visitors.map((visitor, index) => (
        <group key={`visitor-${index}`} position={visitor.pos as [number, number, number]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.15, 0.6, 8]} />
          <meshStandardMaterial color="#00897b" emissive="#00695c" emissiveIntensity={0.1} />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#ffb74d" />
        </mesh>
        </group>
      ))}

      {/* Plateforme d'observation */}
      <group position={[4, 0.1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.2, 1.5]} />
          <meshStandardMaterial color="#8d6e63" />
        </mesh>
      </group>

      {/* Poissons colorés visibles dans l'eau */}
      <group position={[0.5, -0.02, 0.5]}>
        <mesh>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#ff6f00" transparent opacity={0.9} emissive="#ff8f00" emissiveIntensity={0.3} />
        </mesh>
      </group>
      <group position={[-1, -0.02, -0.8]}>
        <mesh>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#ff6f00" transparent opacity={0.9} emissive="#ff8f00" emissiveIntensity={0.3} />
        </mesh>
      </group>
      <group position={[1.5, -0.02, -1.2]}>
        <mesh>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#2196f3" transparent opacity={0.9} emissive="#42a5f5" emissiveIntensity={0.3} />
        </mesh>
      </group>
      <group position={[-0.5, -0.02, 1.5]}>
        <mesh>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#e91e63" transparent opacity={0.9} emissive="#ec407a" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </group>
  );
};
