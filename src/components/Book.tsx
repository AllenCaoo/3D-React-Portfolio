import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ScrollControls } from "@react-three/drei";

import '../index.css'



const Book = ({
    position,
}: {
    position: [number, number, number];
}) => {
  return (
        <>
          <mesh position={position} receiveShadow={true}>
            <boxGeometry args={[0.3, 2.5, 1.8]}/>
            <meshNormalMaterial/>
          </mesh>
        </>
  );
}

export default Book
