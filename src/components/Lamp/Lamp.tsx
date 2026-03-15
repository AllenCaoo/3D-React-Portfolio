import * as THREE from 'three';

interface LampProps {
  position: [number, number, number];
  color?: string;
  height?: number;
  baseRadius?: number;
  shadeRadiusTop?: number;
  shadeRadiusBottom?: number;
  intensity?: number;
  distance?: number;
  lightType?: 'point' | 'spot';
}

const Lamp = ({ 
  position, 
  color = '#ffcc77',
  height = 4,
  baseRadius = 0.3,
  shadeRadiusTop = 0.4,
  shadeRadiusBottom = 0.6,
  intensity = 20,
  distance = 50,
  lightType = 'point',
}: LampProps) => {
  const stemHeight = height - 1;

  return (
    <group position={position}>
      {/* Base/Foot */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[baseRadius, baseRadius, 0.2, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Stem */}
      <mesh position={[0, stemHeight / 2 + 0.1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, stemHeight, 16]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      
      {/* Shade */}
      <mesh position={[0, stemHeight + 0.5, 0]}>
        <cylinderGeometry args={[shadeRadiusTop, shadeRadiusBottom, 1, 32, 1, true]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>
      
      {/* Bulb (Visual Only) */}
      <mesh position={[0, stemHeight + 0.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={2} />
      </mesh>

      {/* Actual Light */}
      {lightType === 'point' ? (
        <>
          <pointLight 
            position={[0, stemHeight + 0.5, 0]} 
            intensity={intensity} 
            distance={distance} 
            color={color} 
            castShadow 
            shadow-bias={-0.001}
            decay={2}
          />
          {/* Bounce Light / Fill - No shadows for performance and to brighten walls */}
          <pointLight 
            position={[0, stemHeight + 0.5, 0]} 
            intensity={intensity * 0.3} 
            distance={distance * 1.5} 
            color={color} 
            decay={1} 
          />
        </>
      ) : (
        <spotLight
          position={[0, stemHeight + 0.5, 0]}
          intensity={intensity}
          distance={distance}
          color={color}
          angle={Math.PI / 4}
          penumbra={0.5}
          castShadow
          shadow-bias={-0.001}
          decay={2}
        />
      )}
    </group>
  );
};

export default Lamp;
