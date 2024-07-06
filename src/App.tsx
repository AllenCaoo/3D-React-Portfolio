import { Canvas } from '@react-three/fiber'
import { OrbitControls, ScrollControls } from "@react-three/drei";


import './App.css'
import Room from './components/Room';

function App() {
  return (
      <Canvas 
        camera={{
          position: [0, 15, 1],
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

export default App