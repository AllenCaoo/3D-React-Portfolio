import { Canvas } from '@react-three/fiber'
import { OrbitControls, ScrollControls } from "@react-three/drei";


import '../../App.css'
import Room from '../Room/Room';

function Scene() {

  // useThree(({ camera }) => {
  //   camera.rotation.set(1, 0, 0);
  // });

  return (
      <Canvas 
        camera={{
          position: [1, 15, 3],
          near: 0.1,
        }}
        >
        <>
          <ambientLight intensity={1} />
          <OrbitControls enableZoom={true} />
          <ScrollControls pages={3} damping={0.25}>
            <Room position={[0,0,0]}/>
          </ScrollControls>
        </>
      </Canvas>
  );
}

export default Scene
