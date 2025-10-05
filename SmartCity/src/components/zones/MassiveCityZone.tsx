import { useRef, useMemo } from "react";
import { Group, InstancedMesh, Object3D, Color } from "three";
import { useFrame } from "@react-three/fiber";

interface MassiveCityZoneProps {
  position: [number, number, number];
  buildingCount?: number;
}

export const MassiveCityZone = ({ position, buildingCount = 10000 }: MassiveCityZoneProps) => {
  const groupRef = useRef<Group>(null);
  const buildingsRef = useRef<InstancedMesh>(null);
  const roofsRef = useRef<InstancedMesh>(null);
  const windowsRef = useRef<InstancedMesh>(null);

  // Génération procédurale des bâtiments
  const buildingData = useMemo(() => {
    const buildings = [];
    const tempObject = new Object3D();
    const tempColor = new Color();
    
    // Couleurs écologiques pour les bâtiments
    const wallColors = [
      "#fff9c4", "#ffe0b2", "#e1f5fe", "#fff3e0", "#fce4ec", 
      "#f3e5f5", "#e8f5e9", "#e0f2f1", "#fafafa", "#f1f8e9",
      "#e8eaf6", "#fff8e1", "#fce4ec", "#e3f2fd", "#f9fbe7"
    ];
    
    const roofColors = [
      "#66bb6a", "#4caf50", "#81c784", "#8bc34a", "#9ccc65",
      "#aed581", "#c5e1a5", "#689f38", "#7cb342", "#827717"
    ];

    // Grille de distribution sur une zone étendue
    const gridSize = Math.ceil(Math.sqrt(buildingCount));
    const spacing = 1.5; // Espacement entre bâtiments
    const areaSize = gridSize * spacing;
    
    for (let i = 0; i < buildingCount; i++) {
      const gridX = i % gridSize;
      const gridZ = Math.floor(i / gridSize);
      
      // Position avec variation aléatoire
      const x = (gridX - gridSize / 2) * spacing + (Math.random() - 0.5) * 0.5;
      const z = (gridZ - gridSize / 2) * spacing + (Math.random() - 0.5) * 0.5;
      
      // Variation de hauteur (1 à 8 étages)
      const height = 1 + Math.random() * 7;
      const width = 0.8 + Math.random() * 0.8;
      const depth = 0.8 + Math.random() * 0.8;
      
      buildings.push({
        position: [x, height / 2, z],
        scale: [width, height, depth],
        wallColor: wallColors[Math.floor(Math.random() * wallColors.length)],
        roofColor: roofColors[Math.floor(Math.random() * roofColors.length)],
        height: height
      });
    }
    
    return buildings;
  }, [buildingCount]);

  // Configuration des instances
  useMemo(() => {
    if (buildingsRef.current && roofsRef.current && windowsRef.current) {
      const tempObject = new Object3D();
      const tempColor = new Color();
      
      buildingData.forEach((building, i) => {
        // Bâtiment principal
        tempObject.position.set(...building.position as [number, number, number]);
        tempObject.scale.set(...building.scale as [number, number, number]);
        tempObject.updateMatrix();
        buildingsRef.current!.setMatrixAt(i, tempObject.matrix);
        
        // Couleur du bâtiment
        tempColor.set(building.wallColor);
        buildingsRef.current!.setColorAt(i, tempColor);
        
        // Toit vert
        tempObject.position.set(
          building.position[0], 
          building.position[1] + building.scale[1] / 2 + 0.1, 
          building.position[2]
        );
        tempObject.scale.set(
          building.scale[0] + 0.1, 
          0.2, 
          building.scale[2] + 0.1
        );
        tempObject.updateMatrix();
        roofsRef.current!.setMatrixAt(i, tempObject.matrix);
        
        // Couleur du toit
        tempColor.set(building.roofColor);
        roofsRef.current!.setColorAt(i, tempColor);
        
        // Fenêtres
        tempObject.position.set(
          building.position[0] + building.scale[0] / 2 + 0.01,
          building.position[1],
          building.position[2]
        );
        tempObject.scale.set(
          0.01,
          building.scale[1] * 0.8,
          building.scale[2] * 0.8
        );
        tempObject.updateMatrix();
        windowsRef.current!.setMatrixAt(i, tempObject.matrix);
        
        // Couleur des fenêtres
        tempColor.set("#4fc3f7");
        windowsRef.current!.setColorAt(i, tempColor);
      });
      
      buildingsRef.current.instanceMatrix.needsUpdate = true;
      roofsRef.current.instanceMatrix.needsUpdate = true;
      windowsRef.current.instanceMatrix.needsUpdate = true;
      
      if (buildingsRef.current.instanceColor) buildingsRef.current.instanceColor.needsUpdate = true;
      if (roofsRef.current.instanceColor) roofsRef.current.instanceColor.needsUpdate = true;
      if (windowsRef.current.instanceColor) windowsRef.current.instanceColor.needsUpdate = true;
    }
  }, [buildingData]);

  // Animation légère pour donner vie à la ville
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Bâtiments principaux */}
      <instancedMesh
        ref={buildingsRef}
        args={[undefined, undefined, buildingCount]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.3} metalness={0.1} />
      </instancedMesh>

      {/* Toits verts */}
      <instancedMesh
        ref={roofsRef}
        args={[undefined, undefined, buildingCount]}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.6} />
      </instancedMesh>

      {/* Fenêtres */}
      <instancedMesh
        ref={windowsRef}
        args={[undefined, undefined, buildingCount]}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial 
          transparent 
          opacity={0.6} 
          metalness={0.8} 
          roughness={0.2} 
        />
      </instancedMesh>

      {/* Sol étendu pour la zone massive */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#7cb342" roughness={0.8} />
      </mesh>

      {/* Réseau de routes écologiques */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`road-h-${i}`}
          position={[0, -0.05, (i - 10) * 10]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[200, 2]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.9} />
        </mesh>
      ))}
      
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`road-v-${i}`}
          position={[(i - 10) * 10, -0.05, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[2, 200]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.9} />
        </mesh>
      ))}

      {/* Parcs dispersés dans la ville */}
      {Array.from({ length: 50 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 180;
        const z = (Math.random() - 0.5) * 180;
        const size = 2 + Math.random() * 4;
        return (
          <mesh
            key={`park-${i}`}
            position={[x, -0.08, z]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <circleGeometry args={[size, 16]} />
            <meshStandardMaterial color="#66bb6a" roughness={0.9} />
          </mesh>
        );
      })}

      {/* Arbres urbains dispersés */}
      {Array.from({ length: 500 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 190;
        const z = (Math.random() - 0.5) * 190;
        const height = 1 + Math.random() * 2;
        return (
          <group key={`tree-${i}`} position={[x, 0, z]}>
            {/* Tronc */}
            <mesh position={[0, height * 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.15, height * 0.8, 6]} />
              <meshStandardMaterial color="#795548" />
            </mesh>
            {/* Feuillage */}
            <mesh position={[0, height * 0.9, 0]} castShadow>
              <sphereGeometry args={[height * 0.6, 8, 8]} />
              <meshStandardMaterial color="#2e7d32" roughness={0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
