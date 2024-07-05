import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ScrollControls } from "@react-three/drei";


import './App.css'
import Bookshelf from './components/Bookshelf';

function App() {
  return (
      <Canvas 
        camera={{
          position: [0, 0, 8],
          fov: 75,
          near: 0.1,
        }}
        >
        {/* <color attach="background" args={["#ececec"]} /> */}
        <>
          <ambientLight intensity={1} />
          <OrbitControls enableZoom={true} />
          <ScrollControls pages={3} damping={0.25}>
            <Bookshelf position={[0,0,0]}/>
          </ScrollControls>
        </>
      </Canvas>
  );
}

export default App
