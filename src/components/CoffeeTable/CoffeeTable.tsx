import '../../index.css';
import { useGLTF } from '@react-three/drei';




const CoffeeTable =  ({
  scale,
  position, 
  rotation,
}: {
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
}) => {

  let { scene } = useGLTF('models/coffee_table.glb');


  return (
    <primitive object={scene} scale={scale} rotation={rotation} position={position} />
  );
}

export default CoffeeTable
