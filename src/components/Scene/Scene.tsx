import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ScrollControls } from "@react-three/drei";
import '../../App.css'
import Room from '../Room/Room';
import { Vector3 } from 'three';

const Scene = ({
  camPosition
} : {
  camPosition: any;
}) => {

  // useThree(({ camera }) => {
  //   camera.rotation.set(1, 0, 0);
  // });

  console.log(camPosition)

  return (
      <Canvas 
        camera={{
          position: camPosition
        }}
        >
        <CameraRig position={camPosition} />
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

const CameraRig = (position : any) => {
  useFrame((state) => {
    let vec = new Vector3(position[0], position[1], position[2])
    state.camera.position.lerp(vec, 0.1)
    // state.camera.lookAt(10, 10, 10)
  })

  return null
}

export default Scene
