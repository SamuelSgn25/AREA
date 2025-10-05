import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

interface DowntownZoneProps {
  position: [number, number, number];
}

export const DowntownZone = ({ position }: DowntownZoneProps) => {
  const groupRef = useRef<Group>(null);
  const tramRef = useRef<Group>(null);
  const busRef = useRef<Group>(null);

  // Animation des transports en commun
  useFrame((state) => {
    if (tramRef.current) {
      tramRef.current.position.x = -2 + Math.sin(state.clock.elapsedTime * 0.3) * 4;
    }
    if (busRef.current) {
      busRef.current.position.z = -3 + Math.cos(state.clock.elapsedTime * 0.4) * 2;
    }
  });

  // Bâtiments du centre-ville colorés (haute densité)
  const buildings = [
    { pos: [0, 2.5, 0], size: [3, 5, 3], wallColor: "#b39ddb" },
    { pos: [4.5, 2.2, 1], size: [2.5, 4.4, 2.5], wallColor: "#90caf9" },
    { pos: [-4.5, 2.4, -1], size: [2.7, 4.8, 2.7], wallColor: "#a5d6a7" },
    { pos: [2, 1.8, -3.5], size: [2.2, 3.6, 2.2], wallColor: "#ffcc80" },
    { pos: [-2, 2, 3], size: [2.4, 4, 2.4], wallColor: "#ef9a9a" },
    { pos: [0, 1.5, 4], size: [2, 3, 2], wallColor: "#80deea" },
  ];

  // Zones d'ombre (pergolas, arbres)
  const shadedAreas = [
    { pos: [2, 0, -3] },
    { pos: [-3, 0, 2] },
    { pos: [3.5, 0, 2.5] },
  ];

  // Personnes en activité
  const people = [
    { pos: [1, 0.4, 1], activity: "walking" },
    { pos: [-1.5, 0.4, 0.5], activity: "walking" },
    { pos: [0, 0.4, -1.5], activity: "sitting" },
    { pos: [2.5, 0.4, -2], activity: "walking" },
    { pos: [-2, 0.4, 1.5], activity: "cycling" },
    { pos: [0.5, 0.4, 2], activity: "walking" },
  ];

  return (
    <group ref={groupRef} position={position}>
      {/* Bâtiments du centre-ville colorés avec végétalisation */}
      {buildings.map((building, index) => (
        <group key={`downtown-building-${index}`} position={building.pos as [number, number, number]}>
          {/* Structure principale colorée */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={building.size as [number, number, number]} />
            <meshStandardMaterial color={building.wallColor} roughness={0.2} metalness={0.2} />
          </mesh>
          
          {/* Murs végétaux (vert sur les côtés) */}
          <mesh position={[building.size[0] / 2, 0, 0]} castShadow>
            <planeGeometry args={[building.size[2], building.size[1]]} />
            <meshStandardMaterial color="#43a047" roughness={0.8} />
          </mesh>
          
          {/* Toit végétalisé */}
          <mesh position={[0, building.size[1] / 2 + 0.15, 0]} castShadow>
            <boxGeometry args={[building.size[0] + 0.2, 0.3, building.size[2] + 0.2]} />
            <meshStandardMaterial color="#66bb6a" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Pergolas pour zones d'ombre */}
      {shadedAreas.map((area, index) => (
        <group key={`pergola-${index}`} position={area.pos as [number, number, number]}>
          {/* Structure de pergola */}
          <mesh position={[0, 1.5, 0]}>
            <boxGeometry args={[2, 0.1, 2]} />
            <meshStandardMaterial color="#795548" />
          </mesh>
          {/* Piliers */}
          <mesh position={[-0.8, 0.75, -0.8]}>
            <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
            <meshStandardMaterial color="#5d4037" />
          </mesh>
          <mesh position={[0.8, 0.75, -0.8]}>
            <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
            <meshStandardMaterial color="#5d4037" />
          </mesh>
          <mesh position={[-0.8, 0.75, 0.8]}>
            <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
            <meshStandardMaterial color="#5d4037" />
          </mesh>
          <mesh position={[0.8, 0.75, 0.8]}>
            <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
            <meshStandardMaterial color="#5d4037" />
          </mesh>
        </group>
      ))}

      {/* Fontaine pour rafraîchissement urbain */}
      <group position={[0, 0, 3]}>
        {/* Base de la fontaine */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[1, 1.2, 0.4, 16]} />
          <meshStandardMaterial color="#90a4ae" />
        </mesh>
        {/* Eau brillante */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.1, 16]} />
          <meshStandardMaterial 
            color="#00e5ff" 
            transparent 
            opacity={0.8} 
            metalness={0.5}
            roughness={0.1}
            emissive="#00bcd4"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Jet d'eau stylisé */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.05, 0.1, 1, 8]} />
          <meshStandardMaterial color="#80deea" transparent opacity={0.7} emissive="#4dd0e1" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* Tramway électrique animé */}
      <group ref={tramRef} position={[-2, 0.3, 0]}>
        <mesh castShadow>
          <boxGeometry args={[3, 0.6, 0.8]} />
          <meshStandardMaterial color="#fdd835" metalness={0.3} roughness={0.4} emissive="#fbc02d" emissiveIntensity={0.2} />
        </mesh>
        {/* Roues */}
        <mesh position={[-1, -0.3, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
        <mesh position={[1, -0.3, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
        {/* Pantographe électrique */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#1976d2" emissive="#1976d2" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Arbres du centre-ville (plus nombreux) */}
      <group position={[3, 0, -2]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 1.2, 8]} />
          <meshStandardMaterial color="#795548" />
        </mesh>
        <mesh position={[0, 1.8, 0]} castShadow>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#2e7d32" />
        </mesh>
      </group>
      
      <group position={[-3.5, 0, 3.5]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.25, 1.2, 8]} />
          <meshStandardMaterial color="#795548" />
        </mesh>
        <mesh position={[0, 1.8, 0]} castShadow>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#2e7d32" />
        </mesh>
      </group>

      {/* Personnages urbains */}
      {people.map((person, index) => (
        <group key={`person-${index}`} position={person.pos as [number, number, number]}>
          {/* Corps */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.15, 0.6, 8]} />
            <meshStandardMaterial color={person.activity === "sitting" ? "#ff6f00" : person.activity === "cycling" ? "#00c853" : "#5e35b1"} />
          </mesh>
          {/* Tête */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#ffb74d" />
          </mesh>
          {person.activity === "cycling" && (
            <mesh position={[0, 0.1, 0.3]} castShadow>
              <torusGeometry args={[0.15, 0.03, 8, 16]} />
              <meshStandardMaterial color="#1976d2" />
            </mesh>
          )}
        </group>
      ))}

      {/* Bus électrique animé */}
      <group ref={busRef} position={[1, 0.3, -3]}>
        <mesh castShadow>
          <boxGeometry args={[2.5, 0.8, 1]} />
          <meshStandardMaterial color="#4caf50" />
        </mesh>
        <mesh position={[-0.8, -0.4, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
        <mesh position={[0.8, -0.4, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
          <meshStandardMaterial color="#424242" />
        </mesh>
        {/* Indicateur électrique */}
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#00e676" emissive="#00e676" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Station de vélos en libre-service */}
      <group position={[4, 0.2, 3]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.4, 0.3]} />
          <meshStandardMaterial color="#2196f3" />
        </mesh>
        {/* Vélos disponibles */}
        <mesh position={[-0.4, 0.3, 0.2]} castShadow>
          <torusGeometry args={[0.1, 0.02, 8, 16]} />
          <meshStandardMaterial color="#ff9800" />
        </mesh>
        <mesh position={[0, 0.3, 0.2]} castShadow>
          <torusGeometry args={[0.1, 0.02, 8, 16]} />
          <meshStandardMaterial color="#ff9800" />
        </mesh>
        <mesh position={[0.4, 0.3, 0.2]} castShadow>
          <torusGeometry args={[0.1, 0.02, 8, 16]} />
          <meshStandardMaterial color="#ff9800" />
        </mesh>
      </group>
    </group>
  );
};
