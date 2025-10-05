import { useRef, useMemo, useEffect } from "react";
import { Group, InstancedMesh, Object3D, Color, Matrix4, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

interface MegaCityZoneProps {
  position: [number, number, number];
  buildingCount?: number;
}

export const MegaCityZone = ({ position, buildingCount = 15000 }: MegaCityZoneProps) => {
  const groupRef = useRef<Group>(null);
  
  // Références pour différents types de bâtiments
  const lowRiseRef = useRef<InstancedMesh>(null);
  const midRiseRef = useRef<InstancedMesh>(null);
  const highRiseRef = useRef<InstancedMesh>(null);
  const skyscraperRef = useRef<InstancedMesh>(null);
  
  // Références pour les toits verts
  const lowRiseRoofsRef = useRef<InstancedMesh>(null);
  const midRiseRoofsRef = useRef<InstancedMesh>(null);
  const highRiseRoofsRef = useRef<InstancedMesh>(null);
  const skyscraperRoofsRef = useRef<InstancedMesh>(null);

  // Distribution des types de bâtiments
  const buildingTypes = useMemo(() => {
    const lowRiseCount = Math.floor(buildingCount * 0.4); // 40% bâtiments bas
    const midRiseCount = Math.floor(buildingCount * 0.35); // 35% bâtiments moyens
    const highRiseCount = Math.floor(buildingCount * 0.2); // 20% bâtiments hauts
    const skyscraperCount = buildingCount - lowRiseCount - midRiseCount - highRiseCount; // 5% gratte-ciels
    
    return {
      lowRise: lowRiseCount,
      midRise: midRiseCount,
      highRise: highRiseCount,
      skyscraper: skyscraperCount
    };
  }, [buildingCount]);

  // Couleurs écologiques
  const wallColors = [
    "#fff9c4", "#ffe0b2", "#e1f5fe", "#fff3e0", "#fce4ec", 
    "#f3e5f5", "#e8f5e9", "#e0f2f1", "#fafafa", "#f1f8e9",
    "#e8eaf6", "#fff8e1", "#fce4ec", "#e3f2fd", "#f9fbe7",
    "#e1f5fe", "#f3e5f5", "#fff3e0", "#e8f5e9", "#fafafa"
  ];
  
  const roofColors = [
    "#66bb6a", "#4caf50", "#81c784", "#8bc34a", "#9ccc65",
    "#aed581", "#c5e1a5", "#689f38", "#7cb342", "#827717",
    "#558b2f", "#33691e", "#689f38", "#7cb342", "#8bc34a"
  ];

  // Génération procédurale optimisée
  const buildingData = useMemo(() => {
    const generateBuildings = (count: number, minHeight: number, maxHeight: number) => {
      const buildings = [];
      const gridSize = Math.ceil(Math.sqrt(count));
      const spacing = 2.0;
      
      for (let i = 0; i < count; i++) {
        const gridX = i % gridSize;
        const gridZ = Math.floor(i / gridSize);
        
        // Distribution en spirale pour plus de réalisme
        const angle = i * 0.1;
        const radius = Math.sqrt(i) * 0.5;
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * spacing;
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * spacing;
        
        const height = minHeight + Math.random() * (maxHeight - minHeight);
        const width = 0.8 + Math.random() * 1.2;
        const depth = 0.8 + Math.random() * 1.2;
        
        buildings.push({
          position: [x, height / 2, z],
          scale: [width, height, depth],
          wallColor: wallColors[Math.floor(Math.random() * wallColors.length)],
          roofColor: roofColors[Math.floor(Math.random() * roofColors.length)],
          height: height
        });
      }
      return buildings;
    };

    return {
      lowRise: generateBuildings(buildingTypes.lowRise, 1, 3),
      midRise: generateBuildings(buildingTypes.midRise, 3, 6),
      highRise: generateBuildings(buildingTypes.highRise, 6, 12),
      skyscraper: generateBuildings(buildingTypes.skyscraper, 12, 25)
    };
  }, [buildingTypes]);

  // Configuration des instances optimisée
  const setupInstances = (
    buildingsRef: React.RefObject<InstancedMesh>,
    roofsRef: React.RefObject<InstancedMesh>,
    buildings: any[]
  ) => {
    if (buildingsRef.current && roofsRef.current && buildings.length > 0) {
      const tempObject = new Object3D();
      const tempColor = new Color();
      
      buildings.forEach((building, i) => {
        // Bâtiment principal
        tempObject.position.set(...building.position as [number, number, number]);
        tempObject.scale.set(...building.scale as [number, number, number]);
        tempObject.updateMatrix();
        buildingsRef.current!.setMatrixAt(i, tempObject.matrix);
        
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
        
        tempColor.set(building.roofColor);
        roofsRef.current!.setColorAt(i, tempColor);
      });
      
      buildingsRef.current.instanceMatrix.needsUpdate = true;
      roofsRef.current.instanceMatrix.needsUpdate = true;
      
      if (buildingsRef.current.instanceColor) buildingsRef.current.instanceColor.needsUpdate = true;
      if (roofsRef.current.instanceColor) roofsRef.current.instanceColor.needsUpdate = true;
    }
  };

  // Configuration de tous les types de bâtiments
  useEffect(() => {
    setupInstances(lowRiseRef, lowRiseRoofsRef, buildingData.lowRise);
    setupInstances(midRiseRef, midRiseRoofsRef, buildingData.midRise);
    setupInstances(highRiseRef, highRiseRoofsRef, buildingData.highRise);
    setupInstances(skyscraperRef, skyscraperRoofsRef, buildingData.skyscraper);
  }, [buildingData]);

  // Animation subtile
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Bâtiments bas (1-3 étages) */}
      <instancedMesh
        ref={lowRiseRef}
        args={[undefined, undefined, buildingTypes.lowRise]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.4} metalness={0.1} />
      </instancedMesh>
      
      <instancedMesh
        ref={lowRiseRoofsRef}
        args={[undefined, undefined, buildingTypes.lowRise]}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.7} />
      </instancedMesh>

      {/* Bâtiments moyens (3-6 étages) */}
      <instancedMesh
        ref={midRiseRef}
        args={[undefined, undefined, buildingTypes.midRise]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.3} metalness={0.2} />
      </instancedMesh>
      
      <instancedMesh
        ref={midRiseRoofsRef}
        args={[undefined, undefined, buildingTypes.midRise]}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.6} />
      </instancedMesh>

      {/* Bâtiments hauts (6-12 étages) */}
      <instancedMesh
        ref={highRiseRef}
        args={[undefined, undefined, buildingTypes.highRise]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.2} metalness={0.3} />
      </instancedMesh>
      
      <instancedMesh
        ref={highRiseRoofsRef}
        args={[undefined, undefined, buildingTypes.highRise]}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.5} />
      </instancedMesh>

      {/* Gratte-ciels (12-25 étages) */}
      <instancedMesh
        ref={skyscraperRef}
        args={[undefined, undefined, buildingTypes.skyscraper]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.1} metalness={0.4} />
      </instancedMesh>
      
      <instancedMesh
        ref={skyscraperRoofsRef}
        args={[undefined, undefined, buildingTypes.skyscraper]}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.4} />
      </instancedMesh>

      {/* Infrastructure écologique étendue */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#7cb342" roughness={0.8} />
      </mesh>

      {/* Réseau de transport en commun */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={`metro-line-${i}`}
          position={[0, -0.05, (i - 15) * 10]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[300, 1]} />
          <meshStandardMaterial color="#1976d2" roughness={0.5} metalness={0.3} />
        </mesh>
      ))}

      {/* Espaces verts massifs */}
      {Array.from({ length: 100 }).map((_, i) => {
        const angle = (i / 100) * Math.PI * 2;
        const radius = 20 + Math.random() * 120;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const size = 3 + Math.random() * 8;
        return (
          <mesh
            key={`mega-park-${i}`}
            position={[x, -0.08, z]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <circleGeometry args={[size, 16]} />
            <meshStandardMaterial color="#66bb6a" roughness={0.9} />
          </mesh>
        );
      })}

      {/* Forêt urbaine dense */}
      {Array.from({ length: 2000 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 140;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = 1.5 + Math.random() * 3;
        return (
          <group key={`mega-tree-${i}`} position={[x, 0, z]}>
            <mesh position={[0, height * 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.15, height * 0.8, 6]} />
              <meshStandardMaterial color="#795548" />
            </mesh>
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
