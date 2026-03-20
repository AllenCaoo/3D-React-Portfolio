import * as THREE from 'three';
import { lampLightDefaults, lampVisualDefaults, type LampLightType } from '../../config/lighting';

interface LampProps {
  position: [number, number, number];
  color?: string;
  height?: number;
  baseRadius?: number;
  shadeRadiusTop?: number;
  shadeRadiusBottom?: number;
  intensity?: number;
  distance?: number;
  lightType?: LampLightType;
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
  lightType = lampLightDefaults.lightType,
}: LampProps) => {
  const stemHeight = height - 1;

  return (
    <group position={position}>
      {/* Base/Foot */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[baseRadius, baseRadius, 0.2, 32]} />
        <meshStandardMaterial color={lampVisualDefaults.baseColor} />
      </mesh>
      
      {/* Stem */}
      <mesh position={[0, stemHeight / 2 + 0.1, 0]}>
        <cylinderGeometry args={[lampVisualDefaults.stemRadius, lampVisualDefaults.stemRadius, stemHeight, 16]} />
        <meshStandardMaterial color={lampVisualDefaults.stemColor} />
      </mesh>
      
      {/* Shade */}
      <mesh position={[0, stemHeight + 0.5, 0]}>
        <cylinderGeometry args={[shadeRadiusTop, shadeRadiusBottom, lampVisualDefaults.shadeHeight, 32, 1, true]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={lampVisualDefaults.shadeOpacity} />
      </mesh>
      
      {/* Bulb (Visual Only) */}
      <mesh position={[0, stemHeight + 0.5, 0]}>
        <sphereGeometry args={[lampVisualDefaults.bulbRadius, 16, 16]} />
        <meshStandardMaterial color={lampVisualDefaults.bulbColor} emissive={color} emissiveIntensity={lampVisualDefaults.bulbEmissiveIntensity} />
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
            shadow-bias={lampLightDefaults.shadowBias}
            decay={lampLightDefaults.decay}
          />
          {/* Bounce Light / Fill - No shadows for performance and to brighten walls */}
          <pointLight 
            position={[0, stemHeight + 0.5, 0]} 
            intensity={intensity * lampLightDefaults.bounceIntensityMultiplier} 
            distance={distance * lampLightDefaults.bounceDistanceMultiplier} 
            color={color} 
            decay={lampLightDefaults.bounceDecay} 
          />
        </>
      ) : (
        <spotLight
          position={[0, stemHeight + 0.5, 0]}
          intensity={intensity}
          distance={distance}
          color={color}
          angle={lampLightDefaults.spotAngle}
          penumbra={lampLightDefaults.penumbra}
          castShadow
          shadow-bias={lampLightDefaults.shadowBias}
          decay={lampLightDefaults.decay}
        />
      )}
    </group>
  );
};

export default Lamp;
