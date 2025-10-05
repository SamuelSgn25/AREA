import { useRef, useMemo } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

interface DetailedCityZoneProps {
  position: [number, number, number];
}

export const DetailedCityZone = ({ position }: DetailedCityZoneProps) => {
  const groupRef = useRef<Group>(null);
  const animatedElementsRef = useRef<Group[]>([]);

  // Animation réduite pour optimiser les performances
  useFrame((state) => {
    // Animation seulement pour les 10 premiers arbres
    for (let i = 0; i < Math.min(10, animatedElementsRef.current.length); i++) {
      const element = animatedElementsRef.current[i];
      if (element) {
        element.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.05;
      }
    }
  });

  // 100 constructions : 60% maisons résidentielles + 40% bâtiments publics/commerciaux
  const detailedBuildings = useMemo(() => {
    const buildings = [];
    const residentialStyles = [
      'family-house', 'eco-cottage', 'modern-villa', 'townhouse', 'duplex', 'tiny-house'
    ];
    const commercialStyles = [
      'office-tower', 'eco-mall', 'community-center', 'library', 'hospital', 'school'
    ];
    
    const colors = {
      walls: [
        "#f8f9fa", "#e3f2fd", "#e8f5e9", "#fff3e0", "#fce4ec",
        "#f3e5f5", "#e0f2f1", "#fff8e1", "#e1f5fe", "#f9fbe7"
      ],
      roofs: [
        "#4caf50", "#66bb6a", "#81c784", "#8bc34a", "#9ccc65",
        "#aed581", "#c5e1a5", "#689f38", "#7cb342", "#558b2f"
      ],
      accents: [
        "#2196f3", "#ff9800", "#9c27b0", "#00bcd4", "#ff5722",
        "#795548", "#607d8b", "#e91e63", "#3f51b5", "#009688"
      ]
    };

    // Disposition en brassage urbain réaliste (mélange maisons/entreprises)
    for (let i = 0; i < 100; i++) {
      const row = Math.floor(i / 10);
      const col = i % 10;
      
      // Position avec plus de dispersion
      const x = (col - 4.5) * 12 + (Math.random() - 0.5) * 4;
      const z = (row - 4.5) * 12 + (Math.random() - 0.5) * 4;
      
      // Brassage urbain : alternance intelligente maisons/entreprises
      // Centre-ville plus d'entreprises, périphérie plus de maisons
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      const isResidential = distanceFromCenter > 30 ? Math.random() > 0.3 : Math.random() > 0.7;
      const style = isResidential 
        ? residentialStyles[Math.floor(Math.random() * residentialStyles.length)]
        : commercialStyles[Math.floor(Math.random() * commercialStyles.length)];
      
      // Maisons : 1-3 étages, Bâtiments : 3-10 étages
      const height = isResidential 
        ? 1.5 + Math.random() * 2.5  // Maisons 1.5-4m
        : 4 + Math.random() * 8;     // Bâtiments 4-12m
      
      const width = isResidential 
        ? 1.5 + Math.random() * 1.5  // Maisons plus petites
        : 2.5 + Math.random() * 2;   // Bâtiments plus larges
      
      const depth = isResidential 
        ? 1.5 + Math.random() * 1.5
        : 2.5 + Math.random() * 2;
      
      buildings.push({
        id: i,
        position: [x, 0, z],
        style,
        height,
        width,
        depth,
        isResidential,
        wallColor: colors.walls[Math.floor(Math.random() * colors.walls.length)],
        roofColor: colors.roofs[Math.floor(Math.random() * colors.roofs.length)],
        accentColor: colors.accents[Math.floor(Math.random() * colors.accents.length)],
        hasBalcony: isResidential ? Math.random() > 0.3 : Math.random() > 0.7,
        hasTerrace: isResidential ? Math.random() > 0.5 : Math.random() > 0.8,
        hasGarden: Math.random() > 0.2,
        hasSolarPanels: true, // 100% ont des panneaux solaires
        hasWindTurbine: !isResidential && Math.random() > 0.7, // Éoliennes sur bâtiments
        floors: Math.floor(height / (isResidential ? 1.0 : 1.2))
      });
    }
    
    return buildings;
  }, []);

  // Végétation abondante et variée
  const vegetation = useMemo(() => {
    const plants = [];
    
    // Arbres réduits et mieux dispersés
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 50;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      plants.push({
        type: 'tree',
        position: [x, 0, z],
        height: 2 + Math.random() * 3,
        width: 1 + Math.random() * 1.5,
        treeType: Math.random() > 0.5 ? 'oak' : 'pine',
        color: Math.random() > 0.3 ? '#2e7d32' : '#388e3c'
      });
    }
    
    // Buissons réduits
    for (let i = 0; i < 60; i++) {
      const x = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      
      plants.push({
        type: 'bush',
        position: [x, 0, z],
        height: 0.5 + Math.random() * 1.2,
        width: 0.8 + Math.random() * 1,
        color: '#43a047'
      });
    }
    
    // Fleurs réduites et mieux espacées
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 90;
      
      plants.push({
        type: 'flower',
        position: [x, 0, z],
        height: 0.2 + Math.random() * 0.6,
        color: ['#ff4081', '#ffeb3b', '#9c27b0', '#00bcd4', '#ff5722'][Math.floor(Math.random() * 5)]
      });
    }
    
    return plants;
  }, []);

  // Fonction pour créer un bâtiment détaillé selon son style
  const createDetailedBuilding = (building: any, index: number) => {
    const { position, style, height, width, depth, wallColor, roofColor, accentColor, hasBalcony, hasTerrace, hasGarden, floors, isResidential, hasSolarPanels, hasWindTurbine } = building;
    
    return (
      <group key={`building-${index}`} position={position as [number, number, number]}>
        {/* Structure principale avec style architectural spécifique */}
        {isResidential ? (
          // STYLES RÉSIDENTIELS AUTHENTIQUES
          <>
            {/* Base de la maison */}
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height, depth]} />
              <meshStandardMaterial color={wallColor} roughness={0.4} metalness={0.1} />
            </mesh>
            
            {/* Toit en pente résidentiel */}
            <mesh position={[0, height + 0.4, 0]} rotation={[0, 0, 0]} castShadow>
              <boxGeometry args={[width + 0.3, 0.8, depth + 0.3]} />
              <meshStandardMaterial color={roofColor} roughness={0.8} />
            </mesh>
            
            {/* Cheminée traditionnelle */}
            <mesh position={[width * 0.3, height + 0.8, depth * 0.2]} castShadow>
              <boxGeometry args={[0.3, 1.2, 0.3]} />
              <meshStandardMaterial color="#8d6e63" />
            </mesh>
            
            {/* Fenêtres résidentielles avec cadres */}
            {Array.from({ length: Math.max(1, floors) }).map((_, floorIndex) => (
              <group key={`res-windows-${floorIndex}`}>
                <mesh position={[width / 2 + 0.02, (floorIndex + 0.5) * (height / Math.max(1, floors)), 0]}>
                  <planeGeometry args={[depth * 0.7, (height / Math.max(1, floors)) * 0.6]} />
                  <meshStandardMaterial color="#e3f2fd" transparent opacity={0.8} />
                </mesh>
                <mesh position={[width / 2 + 0.01, (floorIndex + 0.5) * (height / Math.max(1, floors)), 0]}>
                  <planeGeometry args={[depth * 0.75, (height / Math.max(1, floors)) * 0.65]} />
                  <meshStandardMaterial color="#795548" />
                </mesh>
              </group>
            ))}
            
            {/* Porte d'entrée avec auvent */}
            <mesh position={[0, height * 0.4, depth / 2 + 0.02]}>
              <planeGeometry args={[0.8, height * 0.7]} />
              <meshStandardMaterial color="#6d4c41" />
            </mesh>
            <mesh position={[0, height * 0.8, depth / 2 + 0.15]} castShadow>
              <boxGeometry args={[1.2, 0.1, 0.3]} />
              <meshStandardMaterial color={accentColor} />
            </mesh>
          </>
        ) : (
          // STYLES COMMERCIAUX/ENTREPRISES MODERNES
          <>
            {/* Structure d'entreprise moderne */}
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height, depth]} />
              <meshStandardMaterial 
                color={wallColor} 
                roughness={style === 'office-tower' ? 0.1 : 0.3} 
                metalness={style === 'office-tower' ? 0.7 : 0.2} 
              />
            </mesh>
            
            {/* Toit plat commercial avec équipements */}
            <mesh position={[0, height + 0.1, 0]} castShadow>
              <boxGeometry args={[width + 0.1, 0.2, depth + 0.1]} />
              <meshStandardMaterial color="#37474f" roughness={0.6} />
            </mesh>
            
            {/* Façade vitrée moderne */}
            <mesh position={[width / 2 + 0.02, height / 2, 0]}>
              <planeGeometry args={[depth * 0.9, height * 0.8]} />
              <meshStandardMaterial 
                color="#1976d2" 
                transparent 
                opacity={0.6} 
                metalness={0.9} 
                roughness={0.1} 
              />
            </mesh>
            
            {/* Logo/Enseigne d'entreprise */}
            <mesh position={[0, height * 0.85, depth / 2 + 0.02]}>
              <planeGeometry args={[width * 0.6, 0.8]} />
              <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
            </mesh>
            
            {/* Entrée principale vitrée */}
            <mesh position={[0, height * 0.3, depth / 2 + 0.02]}>
              <planeGeometry args={[1.5, height * 0.5]} />
              <meshStandardMaterial color="#4fc3f7" transparent opacity={0.7} metalness={0.8} />
            </mesh>
          </>
        )}

        {/* Toit vert détaillé */}
        <mesh position={[0, height + 0.15, 0]} castShadow>
          <boxGeometry args={[width + 0.2, 0.3, depth + 0.2]} />
          <meshStandardMaterial color={roofColor} roughness={0.7} />
        </mesh>

        {/* Jardins sur le toit */}
        {hasGarden && (
          <>
            <mesh position={[width * 0.3, height + 0.35, 0]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.4, 8]} />
              <meshStandardMaterial color="#4caf50" />
            </mesh>
            <mesh position={[-width * 0.3, height + 0.35, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.3, 8]} />
              <meshStandardMaterial color="#66bb6a" />
            </mesh>
          </>
        )}

        {/* Balcons détaillés */}
        {hasBalcony && floors > 2 && (
          <>
            {Array.from({ length: Math.min(floors - 1, 4) }).map((_, floorIndex) => (
              <group key={`balcony-${floorIndex}`} position={[width / 2 + 0.3, (floorIndex + 1) * (height / floors), 0]}>
                {/* Plateforme du balcon */}
                <mesh castShadow>
                  <boxGeometry args={[0.6, 0.1, depth * 0.8]} />
                  <meshStandardMaterial color={accentColor} />
                </mesh>
                {/* Rambarde */}
                <mesh position={[0.25, 0.3, 0]}>
                  <boxGeometry args={[0.1, 0.6, depth * 0.8]} />
                  <meshStandardMaterial color={accentColor} />
                </mesh>
                {/* Plantes sur balcon */}
                <mesh position={[0.1, 0.2, depth * 0.2]} castShadow>
                  <cylinderGeometry args={[0.1, 0.1, 0.3, 6]} />
                  <meshStandardMaterial color="#4caf50" />
                </mesh>
              </group>
            ))}
          </>
        )}

        {/* Terrasse sur le toit */}
        {hasTerrace && (
          <group position={[0, height + 0.5, 0]}>
            {/* Structure de terrasse */}
            <mesh castShadow>
              <boxGeometry args={[width * 0.8, 0.1, depth * 0.8]} />
              <meshStandardMaterial color="#8d6e63" />
            </mesh>
            {/* Pergola */}
            <mesh position={[0, 0.8, 0]}>
              <boxGeometry args={[width * 0.9, 0.1, depth * 0.9]} />
              <meshStandardMaterial color="#6d4c41" />
            </mesh>
            {/* Piliers */}
            {[-1, 1].map((xPos) =>
              [-1, 1].map((zPos) => (
                <mesh key={`pillar-${xPos}-${zPos}`} position={[xPos * width * 0.3, 0.4, zPos * depth * 0.3]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                  <meshStandardMaterial color="#5d4037" />
                </mesh>
              ))
            )}
          </group>
        )}

        {/* Fenêtres détaillées par étage */}
        {Array.from({ length: floors }).map((_, floorIndex) => (
          <group key={`floor-${floorIndex}`}>
            {/* Fenêtres façade avant */}
            <mesh position={[0, (floorIndex + 0.5) * (height / floors), depth / 2 + 0.01]}>
              <planeGeometry args={[width * 0.8, (height / floors) * 0.6]} />
              <meshStandardMaterial 
                color="#4fc3f7" 
                transparent 
                opacity={0.7} 
                metalness={0.8} 
                roughness={0.1} 
              />
            </mesh>
            {/* Cadres de fenêtres */}
            <mesh position={[0, (floorIndex + 0.5) * (height / floors), depth / 2 + 0.02]}>
              <planeGeometry args={[width * 0.85, (height / floors) * 0.65]} />
              <meshStandardMaterial color={accentColor} />
            </mesh>
          </group>
        ))}

        {/* Mur végétal sur un côté */}
        <mesh position={[width / 2 + 0.01, height / 2, 0]} castShadow>
          <planeGeometry args={[depth, height]} />
          <meshStandardMaterial color="#43a047" roughness={0.8} />
        </mesh>

        {/* Panneaux solaires réalistes sur TOUS les toits */}
        <group position={[0, height + (isResidential ? 0.85 : 0.25), 0]}>
          {/* Panneaux solaires principaux */}
          {Array.from({ length: isResidential ? 2 : 4 }).map((_, panelRow) => 
            Array.from({ length: isResidential ? 3 : 6 }).map((_, panelCol) => {
              const panelWidth = width / (isResidential ? 3.2 : 6.2);
              const panelDepth = depth / (isResidential ? 2.2 : 4.2);
              const xPos = (panelCol - (isResidential ? 1 : 2.5)) * panelWidth * 1.1;
              const zPos = (panelRow - (isResidential ? 0.5 : 1.5)) * panelDepth * 1.1;
              
              return (
                <group key={`panel-${panelRow}-${panelCol}`} position={[xPos, 0, zPos]}>
                  {/* Panneau solaire individuel */}
                  <mesh castShadow rotation={[-Math.PI / 12, 0, 0]}>
                    <boxGeometry args={[panelWidth, 0.05, panelDepth]} />
                    <meshStandardMaterial 
                      color="#0d47a1" 
                      metalness={0.9} 
                      roughness={0.1}
                      emissive="#1565c0"
                      emissiveIntensity={0.2}
                    />
                  </mesh>
                  {/* Cadre aluminium */}
                  <mesh rotation={[-Math.PI / 12, 0, 0]}>
                    <boxGeometry args={[panelWidth + 0.02, 0.02, panelDepth + 0.02]} />
                    <meshStandardMaterial color="#90a4ae" metalness={0.8} />
                  </mesh>
                  {/* Cellules photovoltaïques */}
                  <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 12, 0, 0]}>
                    <boxGeometry args={[panelWidth * 0.95, 0.01, panelDepth * 0.95]} />
                    <meshStandardMaterial 
                      color="#1a237e" 
                      metalness={1.0} 
                      roughness={0.05}
                    />
                  </mesh>
                </group>
              );
            })
          )}
          
          {/* Support et câblage */}
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[width * 0.1, 0.2, depth * 0.1]} />
            <meshStandardMaterial color="#424242" />
          </mesh>
          
          {/* Onduleur (pour entreprises) */}
          {!isResidential && (
            <mesh position={[width * 0.3, -0.15, depth * 0.3]} castShadow>
              <boxGeometry args={[0.4, 0.3, 0.2]} />
              <meshStandardMaterial color="#37474f" />
            </mesh>
          )}
        </group>

        {/* Éoliennes urbaines sur bâtiments commerciaux */}
        {hasWindTurbine && (
          <group position={[0, height + 1, 0]}>
            {/* Mât */}
            <mesh castShadow>
              <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
              <meshStandardMaterial color="#eceff1" />
            </mesh>
            {/* Nacelle */}
            <mesh position={[0, 0.8, 0]} castShadow>
              <boxGeometry args={[0.3, 0.15, 0.15]} />
              <meshStandardMaterial color="#fff" />
            </mesh>
            {/* Pales (3 pales) */}
            {[0, 120, 240].map((rotation, i) => (
              <mesh 
                key={i}
                position={[0, 0.8, 0]} 
                rotation={[0, 0, (rotation * Math.PI) / 180]}
                castShadow
              >
                <boxGeometry args={[0.02, 0.8, 0.05]} />
                <meshStandardMaterial color="#f5f5f5" />
              </mesh>
            ))}
          </group>
        )}

        {/* Éléments spécifiques aux maisons résidentielles */}
        {isResidential && (
          <>
            {/* Cheminée écologique */}
            <mesh position={[width * 0.3, height + 0.3, depth * 0.3]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
              <meshStandardMaterial color="#8d6e63" />
            </mesh>
            {/* Porche d'entrée */}
            <mesh position={[0, 0.1, depth / 2 + 0.3]} castShadow>
              <boxGeometry args={[width * 0.6, 0.2, 0.6]} />
              <meshStandardMaterial color={accentColor} />
            </mesh>
            {/* Clôture de jardin */}
            <mesh position={[0, 0.3, -depth / 2 - 0.5]}>
              <boxGeometry args={[width + 1, 0.6, 0.05]} />
              <meshStandardMaterial color="#795548" />
            </mesh>
          </>
        )}

        {/* Éléments spécifiques aux bâtiments commerciaux */}
        {!isResidential && (
          <>
            {/* Antennes de communication */}
            <mesh position={[0, height + 0.8, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.8, 6]} />
              <meshStandardMaterial color="#424242" />
            </mesh>
            {/* Signalétique */}
            <mesh position={[0, height * 0.8, depth / 2 + 0.02]}>
              <planeGeometry args={[width * 0.8, 0.4]} />
              <meshStandardMaterial color={accentColor} />
            </mesh>
          </>
        )}
      </group>
    );
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Sol écologique étendu */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[140, 140]} />
        <meshStandardMaterial color="#7cb342" roughness={0.8} />
      </mesh>

      {/* Chemins principaux réduits */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`path-h-${i}`}
          position={[0, -0.05, (i - 3.5) * 15]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[140, 2]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.9} />
        </mesh>
      ))}
      
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`path-v-${i}`}
          position={[(i - 3.5) * 15, -0.05, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[2, 140]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.9} />
        </mesh>
      ))}

      {/* 100 constructions : maisons + bâtiments écologiques */}
      {detailedBuildings.map((building, index) => createDetailedBuilding(building, index))}

      {/* Éoliennes communautaires (grandes) */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const x = Math.cos(angle) * 45;
        const z = Math.sin(angle) * 45;
        return (
          <group key={`wind-turbine-${i}`} position={[x, 0, z]}>
            {/* Mât principal */}
            <mesh position={[0, 6, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.2, 12, 12]} />
              <meshStandardMaterial color="#eceff1" />
            </mesh>
            {/* Nacelle */}
            <mesh position={[0, 12.5, 0]} castShadow>
              <boxGeometry args={[1, 0.6, 0.6]} />
              <meshStandardMaterial color="#fff" />
            </mesh>
            {/* Pales principales */}
            {[0, 120, 240].map((rotation, j) => (
              <mesh 
                key={j}
                position={[0, 12.5, 0]} 
                rotation={[0, 0, (rotation * Math.PI) / 180]}
                castShadow
              >
                <boxGeometry args={[0.1, 3.5, 0.15]} />
                <meshStandardMaterial color="#f5f5f5" />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Stations de recharge électrique avec aménagement urbain */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 20 + Math.random() * 25;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <group key={`charging-station-${i}`} position={[x, 0, z]}>
            {/* Borne de recharge moderne */}
            <mesh position={[0, 0.8, 0]} castShadow>
              <boxGeometry args={[0.4, 1.6, 0.25]} />
              <meshStandardMaterial color="#2e7d32" metalness={0.3} roughness={0.4} />
            </mesh>
            {/* Écran tactile */}
            <mesh position={[0, 1.3, 0.13]}>
              <planeGeometry args={[0.25, 0.35]} />
              <meshStandardMaterial color="#000" emissive="#00e676" emissiveIntensity={0.4} />
            </mesh>
            {/* Câble de recharge */}
            <mesh position={[0.25, 0.6, 0]} castShadow>
              <cylinderGeometry args={[0.025, 0.025, 0.8, 8]} />
              <meshStandardMaterial color="#1976d2" />
            </mesh>
            {/* Auvent solaire */}
            <mesh position={[0, 2.2, 0]} castShadow>
              <boxGeometry args={[1.5, 0.05, 1.2]} />
              <meshStandardMaterial color="#0d47a1" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Support auvent */}
            <mesh position={[0, 1.6, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
              <meshStandardMaterial color="#424242" />
            </mesh>
            {/* Espace de stationnement */}
            <mesh position={[0, 0.01, -1]} rotation={[-Math.PI / 2, 0, 0]}>
              <boxGeometry args={[2.5, 5, 0.02]} />
              <meshStandardMaterial color="#37474f" />
            </mesh>
          </group>
        );
      })}

      {/* Commerces de proximité (brassage urbain) */}
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 15 + Math.random() * 40;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const commerceTypes = ['café', 'boulangerie', 'pharmacie', 'superette', 'coiffeur'];
        const type = commerceTypes[Math.floor(Math.random() * commerceTypes.length)];
        
        return (
          <group key={`commerce-${i}`} position={[x, 0, z]}>
            {/* Petit commerce */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[3, 3, 2.5]} />
              <meshStandardMaterial color="#fff3e0" roughness={0.3} />
            </mesh>
            {/* Vitrine */}
            <mesh position={[0, 1.2, 1.26]}>
              <planeGeometry args={[2.5, 2]} />
              <meshStandardMaterial color="#4fc3f7" transparent opacity={0.8} metalness={0.7} />
            </mesh>
            {/* Enseigne */}
            <mesh position={[0, 2.8, 1.3]}>
              <planeGeometry args={[2, 0.6]} />
              <meshStandardMaterial 
                color={type === 'café' ? '#8d6e63' : type === 'boulangerie' ? '#ff9800' : '#4caf50'} 
                emissive={type === 'café' ? '#8d6e63' : type === 'boulangerie' ? '#ff9800' : '#4caf50'}
                emissiveIntensity={0.3}
              />
            </mesh>
            {/* Terrasse (pour café) */}
            {type === 'café' && (
              <>
                <mesh position={[0, 0.05, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
                  <boxGeometry args={[4, 3, 0.1]} />
                  <meshStandardMaterial color="#8d6e63" />
                </mesh>
                {/* Tables */}
                <mesh position={[1, 0.4, 3]} castShadow>
                  <cylinderGeometry args={[0.3, 0.3, 0.05, 8]} />
                  <meshStandardMaterial color="#795548" />
                </mesh>
                <mesh position={[-1, 0.4, 3]} castShadow>
                  <cylinderGeometry args={[0.3, 0.3, 0.05, 8]} />
                  <meshStandardMaterial color="#795548" />
                </mesh>
              </>
            )}
          </group>
        );
      })}

      {/* Végétation abondante */}
      {vegetation.map((plant, index) => {
        if (plant.type === 'tree') {
          return (
            <group 
              key={`tree-${index}`} 
              position={plant.position as [number, number, number]}
              ref={(ref) => {
                if (ref && index < 20) animatedElementsRef.current[index] = ref;
              }}
            >
              {/* Tronc détaillé */}
              <mesh position={[0, plant.height * 0.4, 0]} castShadow>
                <cylinderGeometry args={[0.15, 0.25, plant.height * 0.8, 8]} />
                <meshStandardMaterial color="#6d4c41" roughness={0.8} />
              </mesh>
              {/* Feuillage principal */}
              <mesh position={[0, plant.height * 0.9, 0]} castShadow>
                <sphereGeometry args={[plant.width, 12, 12]} />
                <meshStandardMaterial color={plant.color} roughness={0.8} />
              </mesh>
              {/* Feuillage secondaire pour plus de réalisme */}
              <mesh position={[plant.width * 0.3, plant.height * 0.8, plant.width * 0.2]} castShadow>
                <sphereGeometry args={[plant.width * 0.6, 8, 8]} />
                <meshStandardMaterial color={plant.color} roughness={0.8} />
              </mesh>
              {/* Racines apparentes */}
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.4, 0.3, 0.2, 8]} />
                <meshStandardMaterial color="#5d4037" />
              </mesh>
            </group>
          );
        } else if (plant.type === 'bush') {
          return (
            <group key={`bush-${index}`} position={plant.position as [number, number, number]}>
              <mesh position={[0, plant.height / 2, 0]} castShadow>
                <sphereGeometry args={[plant.width, 8, 6]} />
                <meshStandardMaterial color={plant.color} roughness={0.9} />
              </mesh>
            </group>
          );
        } else if (plant.type === 'flower') {
          return (
            <group key={`flower-${index}`} position={plant.position as [number, number, number]}>
              <mesh position={[0, plant.height, 0]} castShadow>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial 
                  color={plant.color} 
                  emissive={plant.color}
                  emissiveIntensity={0.3}
                />
              </mesh>
              {/* Tige */}
              <mesh position={[0, plant.height / 2, 0]}>
                <cylinderGeometry args={[0.02, 0.02, plant.height, 6]} />
                <meshStandardMaterial color="#4caf50" />
              </mesh>
            </group>
          );
        }
        return null;
      })}

      {/* Parcs réduits et mieux espacés */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 25 + Math.random() * 30;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const size = 3 + Math.random() * 3;
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

      {/* Fontaines à énergie solaire */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 30;
        const z = Math.sin(angle) * 30;
        return (
          <group key={`solar-fountain-${i}`} position={[x, 0, z]}>
            {/* Base de la fontaine */}
            <mesh position={[0, 0.3, 0]} castShadow>
              <cylinderGeometry args={[1.2, 1.5, 0.5, 12]} />
              <meshStandardMaterial color="#90a4ae" />
            </mesh>
            {/* Eau propre */}
            <mesh position={[0, 0.6, 0]}>
              <cylinderGeometry args={[1.1, 1.1, 0.08, 12]} />
              <meshStandardMaterial 
                color="#00e5ff" 
                transparent 
                opacity={0.8} 
                metalness={0.5}
                roughness={0.1}
              />
            </mesh>
            {/* Panneau solaire pour la pompe */}
            <mesh position={[0, 1.2, 0]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
              <boxGeometry args={[0.8, 0.03, 0.6]} />
              <meshStandardMaterial color="#1a237e" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Indicateur qualité de l'eau */}
            <mesh position={[1.3, 0.8, 0]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color="#4caf50" emissive="#4caf50" emissiveIntensity={0.5} />
            </mesh>
          </group>
        );
      })}

      {/* Capteurs de qualité de l'air (indicateurs zone sans pollution) */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 35;
        const z = Math.sin(angle) * 35;
        return (
          <group key={`air-sensor-${i}`} position={[x, 0, z]}>
            {/* Mât du capteur */}
            <mesh position={[0, 1.5, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
              <meshStandardMaterial color="#607d8b" />
            </mesh>
            {/* Capteur */}
            <mesh position={[0, 3.2, 0]} castShadow>
              <boxGeometry args={[0.3, 0.4, 0.3]} />
              <meshStandardMaterial color="#fff" />
            </mesh>
            {/* LED verte (air pur) */}
            <mesh position={[0, 3.4, 0.16]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#4caf50" emissive="#4caf50" emissiveIntensity={0.8} />
            </mesh>
            {/* Panneau d'information */}
            <mesh position={[0, 1, 0.2]}>
              <planeGeometry args={[0.4, 0.3]} />
              <meshStandardMaterial color="#e8f5e9" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
