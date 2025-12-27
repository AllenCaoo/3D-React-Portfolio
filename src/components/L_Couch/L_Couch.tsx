import '../../index.css';
import { useFBX } from '@react-three/drei';
import { useEffect } from 'react';




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

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        console.log("child is mesh and has material");
        console.log(child);
        // Normalize to array (if it's already an array, keep it, otherwise wrap)
        const materials = Array.isArray(child.material) ? child.material : [child.material];

        materials.forEach((mat: any) => {
          if (mat.isMeshPhongMaterial) {
            mat.shininess = 2; // very low shininess
            // mat.specular.set(0x111111); // dark specular highlight
            mat.needsUpdate = true;  // Ensure the material updates
          }
        });
      }
    });
  }, [scene]);

  return (
    <primitive object={scene} scale={scale} rotation={rotation} position={position} />
  );
}

export default L_Couch
