import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ScrollControls } from "@react-three/drei";

import '../index.css'
import Book from './Book';
import Bookshelf from './Bookshelf';
import { DirectionalLight } from 'three';
import { color } from 'three/examples/jsm/nodes/Nodes.js';



const Wall = ({
    position,
    dimensions,
    color
}: {
    position: [number, number, number];
    dimensions: [number, number, number];
    color?: string
}) => {
  return (
        <>
            <mesh position={[position[0], position[1], position[2]]} receiveShadow={true}>
              <boxGeometry args={dimensions}/>
              <meshStandardMaterial color={color}/>
            </mesh>
        </>
  );
}

export default Wall
