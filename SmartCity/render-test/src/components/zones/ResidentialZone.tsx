import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

interface ResidentialZoneProps {
  position: [number, number, number];
}

export const ResidentialZone = ({ position }: ResidentialZoneProps) => {
  const groupRef = useRef<Group>(null);
  const cyclistRef = useRef<Group>(null);

  // Animation du cycliste
  useFrame((state) => {
    if (cyclistRef.current) {
      cyclistRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      cyclistRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 3;
      cyclistRef.current.rotation.y = -state.clock.elapsedTime * 0.5;
    }
  });

  // Vraies maisons résidentielles avec styles variés
  const houses = [
    { pos: [0, 1.2, 0], size: [2.5, 2.4, 2.5], roofColor: "#66bb6a", wallColor: "#fff9c4", style: "cottage", hasGarage: true },
    { pos: [3.5, 1.0, 1], size: [2, 2, 2.8], roofColor: "#4caf50", wallColor: "#ffe0b2", style: "modern", hasGarage: false },
    { pos: [-3.5, 1.3, -1], size: [2.2, 2.6, 2.2], roofColor: "#81c784", wallColor: "#e1f5fe", style: "villa", hasGarage: true },
    { pos: [1, 1.1, 3.5], size: [1.8, 2.2, 2.4], roofColor: "#66bb6a", wallColor: "#fff3e0", style: "townhouse", hasGarage: false },
    { pos: [-1, 0.9, 3], size: [1.5, 1.8, 2], roofColor: "#4caf50", wallColor: "#fce4ec", style: "bungalow", hasGarage: false },
    { pos: [3, 1.0, -2.5], size: [1.6, 2, 2.2], roofColor: "#81c784", wallColor: "#f3e5f5", style: "duplex", hasGarage: true },
    { pos: [-3, 1.2, 2.5], size: [1.7, 2.4, 2.4], roofColor: "#66bb6a", wallColor: "#e8f5e9", style: "family-house", hasGarage: true },
  ];

  // Arbres abondants
  const trees = [
    { pos: [2, 0, -2] },
    { pos: [-2, 0, 2] },
    { pos: [4, 0, -1] },
    { pos: [-4, 0, 1] },
    { pos: [0, 0, -3] },
    { pos: [1.5, 0, -4] },
    { pos: [-1.5, 0, -2.5] },
    { pos: [2.5, 0, 2] },
    { pos: [-2.5, 0, -3] },
  ];

  // Personnages (piétons, cyclistes)
  const people = [
    { pos: [0.5, 0.4, -1], activity: "walking" },
    { pos: [-1, 0.4, 1.5], activity: "walking" },
    { pos: [2, 0.4, 0], activity: "cycling" },
    { pos: [-2.5, 0.4, -2], activity: "walking" },
    { pos: [1.5, 0.4, 2], activity: "walking" },
  ];

  return (
    <group ref={groupRef} position={position}>
      {/* Vraies maisons résidentielles avec détails authentiques */}
      {houses.map((house, index) => (
        <group key={`house-${index}`} position={house.pos as [number, number, number]}>
          {/* Structure principale de la maison */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={house.size as [number, number, number]} />
            <meshStandardMaterial color={house.wallColor} roughness={0.3} metalness={0.1} />
          </mesh>
          
          {/* Toit résidentiel avec pente */}
          <mesh
            position={[0, house.size[1] / 2 + 0.3, 0]}
            castShadow
          >
            <boxGeometry args={[house.size[0] + 0.2, 0.6, house.size[2] + 0.2]} />
            <meshStandardMaterial color={house.roofColor} roughness={0.7} />
          </mesh>
          
          {/* Cheminée résidentielle */}
          <mesh position={[house.size[0] * 0.3, house.size[1] + 0.4, house.size[2] * 0.2]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.8, 8]} />
            <meshStandardMaterial color="#8d6e63" />
          </mesh>
          
          {/* Porte d'entrée */}
          <mesh position={[0, house.size[1] * 0.3, house.size[2] / 2 + 0.01]}>
            <planeGeometry args={[0.6, house.size[1] * 0.6]} />
            <meshStandardMaterial color="#795548" />
          </mesh>
          
          {/* Fenêtres résidentielles */}
          <mesh position={[house.size[0] / 2 + 0.01, house.size[1] * 0.4, 0]}>
            <planeGeometry args={[house.size[2] * 0.6, house.size[1] * 0.4]} />
            <meshStandardMaterial color="#4fc3f7" transparent opacity={0.7} />
          </mesh>
          <mesh position={[-house.size[0] / 2 - 0.01, house.size[1] * 0.4, 0]}>
            <planeGeometry args={[house.size[2] * 0.6, house.size[1] * 0.4]} />
            <meshStandardMaterial color="#4fc3f7" transparent opacity={0.7} />
          </mesh>
          
          {/* Garage (si la maison en a un) */}
          {house.hasGarage && (
            <group position={[house.size[0] * 0.8, house.size[1] * 0.4, 0]}>
              <mesh castShadow>
                <boxGeometry args={[1.2, house.size[1] * 0.8, house.size[2] * 0.8]} />
                <meshStandardMaterial color={house.wallColor} roughness={0.4} />
              </mesh>
              {/* Porte de garage */}
              <mesh position={[0.61, 0, 0]}>
                <planeGeometry args={[house.size[2] * 0.7, house.size[1] * 0.6]} />
                <meshStandardMaterial color="#607d8b" />
              </mesh>
            </group>
          )}
          
          {/* Jardin privatif */}
          <mesh position={[0, 0.01, -house.size[2] - 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
            <boxGeometry args={[house.size[0] + 1, house.size[2], 0.02]} />
            <meshStandardMaterial color="#7cb342" roughness={0.9} />
          </mesh>
          
          {/* Clôture de propriété */}
          <mesh position={[0, 0.4, -house.size[2] - 1.5]}>
            <boxGeometry args={[house.size[0] + 2, 0.8, 0.05]} />
            <meshStandardMaterial color="#795548" />
          </mesh>
          
          {/* Panneaux solaires résidentiels réalistes */}
          <group position={[0, house.size[1] + 0.9, 0]}>
            {Array.from({ length: 2 }).map((_, panelRow) => 
              Array.from({ length: 3 }).map((_, panelCol) => {
                const panelWidth = house.size[0] / 3.5;
                const panelDepth = house.size[2] / 2.5;
                const xPos = (panelCol - 1) * panelWidth * 1.1;
                const zPos = (panelRow - 0.5) * panelDepth * 1.1;
                
                return (
                  <group key={`house-panel-${panelRow}-${panelCol}`} position={[xPos, 0, zPos]}>
                    {/* Panneau solaire résidentiel */}
                    <mesh castShadow rotation={[-Math.PI / 8, 0, 0]}>
                      <boxGeometry args={[panelWidth, 0.04, panelDepth]} />
                      <meshStandardMaterial 
                        color="#0d47a1" 
                        metalness={0.9} 
                        roughness={0.1}
                        emissive="#1565c0"
                        emissiveIntensity={0.15}
                      />
                    </mesh>
                    {/* Cadre du panneau */}
                    <mesh rotation={[-Math.PI / 8, 0, 0]}>
                      <boxGeometry args={[panelWidth + 0.01, 0.02, panelDepth + 0.01]} />
                      <meshStandardMaterial color="#90a4ae" metalness={0.7} />
                    </mesh>
                    {/* Cellules photovoltaïques */}
                    <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 8, 0, 0]}>
                      <boxGeometry args={[panelWidth * 0.9, 0.005, panelDepth * 0.9]} />
                      <meshStandardMaterial color="#1a237e" metalness={1.0} roughness={0.05} />
                    </mesh>
                  </group>
                );
              })
            )}
            
            {/* Micro-onduleur résidentiel */}
            <mesh position={[house.size[0] * 0.3, -0.1, house.size[2] * 0.2]} castShadow>
              <boxGeometry args={[0.2, 0.15, 0.1]} />
              <meshStandardMaterial color="#37474f" />
            </mesh>
          </group>
        </group>
      ))}

      {/* Arbres et végétation */}
      {trees.map((tree, index) => (
        <group key={`tree-${index}`} position={tree.pos as [number, number, number]}>
          {/* Tronc */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 1, 8]} />
            <meshStandardMaterial color="#795548" />
          </mesh>
          {/* Feuillage */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <sphereGeometry args={[0.8, 8, 8]} />
            <meshStandardMaterial color="#43a047" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Personnages humains */}
      {people.map((person, index) => (
        <group key={`person-${index}`} position={person.pos as [number, number, number]}>
          {/* Corps */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.15, 0.6, 8]} />
            <meshStandardMaterial color={index % 3 === 0 ? "#ff6b6b" : index % 3 === 1 ? "#4ecdc4" : "#ffd93d"} />
          </mesh>
          {/* Tête */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#ffb74d" />
          </mesh>
          {person.activity === "cycling" && (
            <mesh position={[0, 0.1, 0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
              <meshStandardMaterial color="#1976d2" />
            </mesh>
          )}
        </group>
      ))}

      {/* Cycliste animé */}
      <group ref={cyclistRef} position={[0, 0.4, 0]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.15, 0.6, 8]} />
          <meshStandardMaterial color="#00c853" />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#ffb74d" />
        </mesh>
        <mesh position={[0, 0.1, 0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.15, 0.03, 8, 16]} />
          <meshStandardMaterial color="#1976d2" />
        </mesh>
      </group>

      {/* Bancs publics */}
      <group position={[0, 0.15, 1]}>
        <mesh castShadow>
          <boxGeometry args={[1, 0.1, 0.4]} />
          <meshStandardMaterial color="#795548" />
        </mesh>
      </group>

      {/* Mini parc avec pelouse vibrante */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3, 16]} />
        <meshStandardMaterial color="#7cb342" roughness={0.9} />
      </mesh>
      
      {/* Fleurs colorées dans les jardins */}
      <group position={[1, 0.1, 1]}>
        <mesh castShadow>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#ff4081" emissive="#ff4081" emissiveIntensity={0.2} />
        </mesh>
      </group>
      <group position={[-1.5, 0.1, 0.5]}>
        <mesh castShadow>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#ffeb3b" emissive="#ffeb3b" emissiveIntensity={0.2} />
        </mesh>
      </group>
      <group position={[0.5, 0.1, -1.5]}>
        <mesh castShadow>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#7c4dff" emissive="#7c4dff" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Véhicules électriques garés */}
      <group position={[2.5, 0.2, -1]}>
        {/* Voiture électrique */}
        <mesh castShadow>
          <boxGeometry args={[1.8, 0.4, 0.8]} />
          <meshStandardMaterial color="#4caf50" />
        </mesh>
        {/* Indicateur électrique */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#00e676" emissive="#00e676" emissiveIntensity={0.6} />
        </mesh>
      </group>

      <group position={[-2.8, 0.15, 1.5]}>
        {/* Vélo électrique */}
        <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.2, 0.04, 8, 16]} />
          <meshStandardMaterial color="#2196f3" />
        </mesh>
        <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.2, 0.04, 8, 16]} />
          <meshStandardMaterial color="#2196f3" />
        </mesh>
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.05, 0.2, 0.6]} />
          <meshStandardMaterial color="#1976d2" />
        </mesh>
      </group>

      {/* Borne de recharge résidentielle */}
      <group position={[4, 0, -0.5]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.2, 1.2, 0.15]} />
          <meshStandardMaterial color="#4caf50" />
        </mesh>
        <mesh position={[0, 0.9, 0.08]}>
          <planeGeometry args={[0.15, 0.2]} />
          <meshStandardMaterial color="#000" emissive="#00ff00" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </group>
  );
};
