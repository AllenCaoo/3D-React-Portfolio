import '../../index.css';
import { useFBX } from '@react-three/drei';




const L_Couch =  ({
  scale,
  position, 
  rotation,
}: {
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
}) => {

  const scene = useFBX('models/L_couch.fbx');

  return (
    <primitive object={scene} scale={scale} rotation={rotation} position={position} />
  );
}

export default L_Couch
