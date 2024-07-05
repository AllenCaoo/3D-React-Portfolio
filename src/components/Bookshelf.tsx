import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ScrollControls } from "@react-three/drei";

import '../index.css'



const Bookshelf = ({
    position,
}: {
    position: [number, number, number];
}) => {
  return (
        <>
          <ambientLight intensity={1} />
          <OrbitControls enableZoom={true} />
            <mesh position={position}>
              <boxGeometry args={[1.8, 0.1, 6]}/>
              <meshBasicMaterial/>
              <mesh>
                <boxGeometry/>
                <meshNormalMaterial/>
              </mesh>
            </mesh>
        </>
  );
}

export default Bookshelf
