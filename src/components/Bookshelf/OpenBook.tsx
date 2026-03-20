import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group, MathUtils, Vector3 } from 'three';

interface OpenBookProps {
  onClose: () => void;
}

const CLOSED_POSITION = new Vector3(-4.12, -1.48, 0.04);
const OPEN_POSITION = new Vector3(0, -0.35, 3.6);
const CLOSED_ROTATION = new Vector3(0, 0, 0);
const OPEN_ROTATION = new Vector3(-0.18, 0, 0);
const BOOK_HEIGHT = 2.34;
const COVER_WIDTH = 1.05;
const COVER_DEPTH = 0.08;
const PAGE_WIDTH = 0.9;
const PAGE_DEPTH = 0.14;
const SPINE_WIDTH = 0.16;
const CLOSED_SCALE = 1;
const OPEN_SCALE = 1.9;

const OpenBook = ({ onClose }: OpenBookProps) => {
  const groupRef = useRef<Group | null>(null);
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    progressRef.current = Math.min(progressRef.current + delta * 0.8, 1);
    const easedProgress = 1 - Math.pow(1 - progressRef.current, 3);
    const spread = MathUtils.lerp(0, 1.15, easedProgress);

    groupRef.current.position.lerpVectors(CLOSED_POSITION, OPEN_POSITION, easedProgress);
    const scale = MathUtils.lerp(CLOSED_SCALE, OPEN_SCALE, easedProgress);
    groupRef.current.scale.setScalar(scale);
    groupRef.current.rotation.set(
      MathUtils.lerp(CLOSED_ROTATION.x, OPEN_ROTATION.x, easedProgress),
      MathUtils.lerp(CLOSED_ROTATION.y, OPEN_ROTATION.y, easedProgress),
      MathUtils.lerp(CLOSED_ROTATION.z, OPEN_ROTATION.z, easedProgress),
    );

    const leftCover = groupRef.current.getObjectByName('leftCover');
    const rightCover = groupRef.current.getObjectByName('rightCover');

    if (leftCover) {
      leftCover.rotation.y = spread;
    }

    if (rightCover) {
      rightCover.rotation.y = -spread;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[SPINE_WIDTH, BOOK_HEIGHT, 0.22]} />
        <meshStandardMaterial color="#40558d" roughness={0.7} metalness={0.06} />
      </mesh>

      <group name="leftCover" position={[-SPINE_WIDTH / 2, 0, 0]} castShadow receiveShadow>
        <mesh position={[-COVER_WIDTH / 2, 0, 0]}>
          <boxGeometry args={[COVER_WIDTH, BOOK_HEIGHT, COVER_DEPTH]} />
          <meshStandardMaterial color="#5d73b7" roughness={0.78} metalness={0.06} />
        </mesh>
        <mesh position={[-(SPINE_WIDTH / 2 + PAGE_WIDTH / 2), 0, 0.03]} castShadow receiveShadow>
          <boxGeometry args={[PAGE_WIDTH, BOOK_HEIGHT - 0.12, PAGE_DEPTH]} />
          <meshStandardMaterial color="#f5eddc" roughness={0.96} metalness={0.01} />
        </mesh>
      </group>

      <group name="rightCover" position={[SPINE_WIDTH / 2, 0, 0]} castShadow receiveShadow>
        <mesh position={[COVER_WIDTH / 2, 0, 0]}>
          <boxGeometry args={[COVER_WIDTH, BOOK_HEIGHT, COVER_DEPTH]} />
          <meshStandardMaterial color="#5d73b7" roughness={0.78} metalness={0.06} />
        </mesh>
        <mesh position={[SPINE_WIDTH / 2 + PAGE_WIDTH / 2, 0, 0.03]} castShadow receiveShadow>
          <boxGeometry args={[PAGE_WIDTH, BOOK_HEIGHT - 0.12, PAGE_DEPTH]} />
          <meshStandardMaterial color="#f5eddc" roughness={0.96} metalness={0.01} />
        </mesh>
      </group>

      <Html position={[0, -1.95, 0.5]} transform>
        <button className="bookshelf-actionButton bookReaderClose" onClick={onClose}>
          Close Book
        </button>
      </Html>
    </group>
  );
};

export default OpenBook;
