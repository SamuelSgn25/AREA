import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

interface ParkZoneProps {
  position: [number, number, number];
}

export const ParkZone = ({ position }: ParkZoneProps) => {
  const groupRef = useRef<Group>(null);
  const butterfliesRef = useRef<Group[]>([]);

  // Animation des papillons
  useFrame((state) => {
    butterfliesRef.current.forEach((butterfly, index) => {
      if (butterfly) {
        butterfly.position.x = Math.sin(state.clock.elapsedTime + index) * 2;
        butterfly.position.y = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.5;
        butterfly.position.z = Math.cos(state.clock.elapsedTime + index) * 2;
        butterfly.rotation.y = state.clock.elapsedTime + index;
      }
    });
  });

  // Forêt urbaine dense
  const trees = [
    { pos: [0, 0, 0], size: 1.2 },
    { pos: [2, 0, 1], size: 1.0 },
    { pos: [-2, 0, -1], size: 1.3 },
    { pos: [3, 0, -2], size: 0.9 },
    { pos: [-3, 0, 2], size: 1.1 },
    { pos: [1, 0, 3], size: 1.4 },
    { pos: [-1, 0, -3], size: 1.0 },
    { pos: [4, 0, 0], size: 0.8 },
    { pos: [-4, 0, 0], size: 1.2 },
    { pos: [0, 0, 4], size: 1.1 },
    { pos: [0, 0, -4], size: 1.3 },
    { pos: [2.5, 0, 2.5], size: 0.9 },
    { pos: [-2.5, 0, -2.5], size: 1.0 },
  ];

  // Jardins de fleurs colorées
  const flowerGardens = [
    { pos: [1.5, 0, 1.5], flowers: 8 },
    { pos: [-1.5, 0, -1.5], flowers: 6 },
    { pos: [2.5, 0, -1], flowers: 7 },
    { pos: [-2.5, 0, 1], flowers: 9 },
  ];

  // Visiteurs du parc
  const visitors = [
    { pos: [1, 0.4, 0], activity: "jogging" },
    { pos: [-1, 0.4, 2], activity: "walking" },
    { pos: [0, 0.4, -2], activity: "sitting" },
    { pos: [3, 0.4, 1], activity: "walking" },
    { pos: [-3, 0.4, -1], activity: "yoga" },
  ];

  return (
    <group ref={groupRef} position={position}>
      {/* Forêt urbaine dense */}
      {trees.map((tree, index) => (
        <group key={`park-tree-${index}`} position={tree.pos as [number, number, number]}>
          {/* Tronc */}
          <mesh position={[0, tree.size * 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.15 * tree.size, 0.2 * tree.size, tree.size * 1.2, 8]} />
            <meshStandardMaterial color="#6d4c41" />
          </mesh>
          {/* Feuillage dense */}
          <mesh position={[0, tree.size * 1.5, 0]} castShadow>
            <sphereGeometry args={[tree.size, 12, 12]} />
            <meshStandardMaterial color="#2e7d32" roughness={0.8} />
          </mesh>
          {/* Feuillage secondaire pour plus de densité */}
          <mesh position={[tree.size * 0.3, tree.size * 1.3, tree.size * 0.2]} castShadow>
            <sphereGeometry args={[tree.size * 0.6, 8, 8]} />
            <meshStandardMaterial color="#388e3c" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Jardins de fleurs colorées */}
      {flowerGardens.map((garden, gardenIndex) => (
        <group key={`garden-${gardenIndex}`} position={garden.pos as [number, number, number]}>
          {/* Base herbeuse du jardin */}
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1, 16]} />
            <meshStandardMaterial color="#7cb342" roughness={0.9} />
          </mesh>
          {/* Fleurs colorées */}
          {Array.from({ length: garden.flowers }).map((_, flowerIndex) => {
            const angle = (flowerIndex / garden.flowers) * Math.PI * 2;
            const radius = 0.3 + Math.random() * 0.5;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const colors = ["#ff4081", "#ffeb3b", "#9c27b0", "#00bcd4", "#ff5722", "#4caf50"];
            return (
              <mesh key={flowerIndex} position={[x, 0.1, z]} castShadow>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial 
                  color={colors[flowerIndex % colors.length]} 
                  emissive={colors[flowerIndex % colors.length]}
                  emissiveIntensity={0.3}
                />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Papillons animés */}
      {Array.from({ length: 5 }).map((_, index) => (
        <group 
          key={`butterfly-${index}`} 
          ref={(ref) => {
            if (ref) butterfliesRef.current[index] = ref;
          }}
        >
          <mesh castShadow>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshStandardMaterial 
              color={index % 2 === 0 ? "#ff6b6b" : "#4ecdc4"} 
              emissive={index % 2 === 0 ? "#ff6b6b" : "#4ecdc4"}
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
      ))}

      {/* Visiteurs du parc */}
      {visitors.map((visitor, index) => (
        <group key={`park-visitor-${index}`} position={visitor.pos as [number, number, number]}>
          {/* Corps */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.15, 0.6, 8]} />
            <meshStandardMaterial 
              color={
                visitor.activity === "jogging" ? "#e91e63" :
                visitor.activity === "yoga" ? "#9c27b0" :
                visitor.activity === "sitting" ? "#ff9800" : "#2196f3"
              } 
            />
          </mesh>
          {/* Tête */}
          <mesh position={[0, 0.7, 0]} castShadow>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#ffb74d" />
          </mesh>
          {/* Accessoires selon l'activité */}
          {visitor.activity === "yoga" && (
            <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.8, 0.8]} />
              <meshStandardMaterial color="#7b1fa2" />
            </mesh>
          )}
        </group>
      ))}

      {/* Bancs écologiques */}
      <group position={[2, 0.15, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.1, 0.4]} />
          <meshStandardMaterial color="#795548" />
        </mesh>
      </group>
      <group position={[-2, 0.15, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.1, 0.4]} />
          <meshStandardMaterial color="#795548" />
        </mesh>
      </group>

      {/* Chemin écologique */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 2.2, 32]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.8} />
      </mesh>

      {/* Ruche écologique pour les abeilles */}
      <group position={[3.5, 0.3, 3.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.6, 8]} />
          <meshStandardMaterial color="#ffc107" />
        </mesh>
        {/* Abeilles stylisées */}
        <mesh position={[0.5, 0.2, 0]} castShadow>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshStandardMaterial color="#ffeb3b" emissive="#ffc107" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.3, 0.3, 0.2]} castShadow>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshStandardMaterial color="#ffeb3b" emissive="#ffc107" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Composteur communautaire */}
      <group position={[-3.5, 0.2, -3.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.4, 0.8]} />
          <meshStandardMaterial color="#4caf50" />
        </mesh>
      </group>
    </group>
  );
};
