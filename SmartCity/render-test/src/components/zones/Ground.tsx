import { useRef } from "react";
import { Mesh } from "three";

export const Ground = () => {
  const meshRef = useRef<Mesh>(null);

  return (
    <group>
      {/* Sol principal écologique */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#7cb342" roughness={0.8} />
      </mesh>

      {/* Chemins écologiques entre les zones */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <ringGeometry args={[8, 10, 32]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.9} />
      </mesh>

      {/* Zones de biodiversité dispersées */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[15, -0.08, 15]} receiveShadow>
        <circleGeometry args={[3, 16]} />
        <meshStandardMaterial color="#66bb6a" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-15, -0.08, -15]} receiveShadow>
        <circleGeometry args={[2.5, 16]} />
        <meshStandardMaterial color="#81c784" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[18, -0.08, -12]} receiveShadow>
        <circleGeometry args={[2, 16]} />
        <meshStandardMaterial color="#4caf50" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-18, -0.08, 12]} receiveShadow>
        <circleGeometry args={[2.8, 16]} />
        <meshStandardMaterial color="#8bc34a" roughness={0.9} />
      </mesh>
    </group>
  );
};
