import { Canvas, useFrame } from '@react-three/fiber';
import '../../App.css'
import NavButton from '../Menu/NavButton';
import Scene from '../Scene/Scene';
import { useState } from 'react';
import { Vector3 } from 'three';

const Interface = () => {

  const [inLibraryView, setIsLibraryView] = useState(false);

  const INITAL_POSITION = new Vector3(10, 0, 12)


  const setLibraryView = () => {
    setIsLibraryView(!inLibraryView)
  }

  const CameraRig = () => {
    useFrame((state) => {
      if (inLibraryView) {
        let vec = new Vector3(0, -0.5, -5)
        state.camera.position.lerp(vec, 0.03)
        state.camera.lookAt(0, 0, -40)
      } else {
        state.camera.position.lerp(INITAL_POSITION, 0.03)
      }
      state.camera.lookAt(0, 0, -40)
    })
  
    return null
  }

  return (
    <>
      <NavButton onClick={setLibraryView}/>
      <Canvas>
        <CameraRig />  {/* Comment this out for free move debugging */}
        <Scene />
      </Canvas>
    </>
  );
}


export default Interface
