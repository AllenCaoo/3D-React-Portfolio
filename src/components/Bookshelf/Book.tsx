import '../../index.css'

interface BookProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number, number];
  coverColor?: string;
  pagesColor?: string;
  accentColor?: string;
}

const Book = ({
  position,
  rotation = [0, 0, 0],
  size = [0.28, 2.45, 1.7],
  coverColor = '#4f6aa3',
  pagesColor = '#dfd5bc',
  accentColor = '#d6b16d',
}: BookProps) => {
  const [width, height, depth] = size
  const pageInset = 0.06
  const pageHeightInset = 0.08
  const pageDepthInset = 0.14

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={coverColor} roughness={0.82} metalness={0.08} />
      </mesh>

      <mesh position={[0, 0, -pageDepthInset / 2]} castShadow receiveShadow>
        <boxGeometry
          args={[
            Math.max(width - pageInset, 0.04),
            Math.max(height - pageHeightInset, 0.08),
            Math.max(depth - pageDepthInset, 0.12),
          ]}
        />
        <meshStandardMaterial color={pagesColor} roughness={0.96} metalness={0.02} />
      </mesh>

      <mesh position={[0, 0, depth / 2 + 0.001]} castShadow receiveShadow>
        <boxGeometry args={[Math.max(width - 0.05, 0.04), Math.max(height - 0.12, 0.08), 0.035]} />
        <meshStandardMaterial color={coverColor} roughness={0.7} metalness={0.04} />
      </mesh>

      <mesh position={[0, 0, depth / 2 + 0.02]} castShadow receiveShadow>
        <boxGeometry args={[Math.max(width - 0.14, 0.03), Math.max(height * 0.58, 0.1), 0.05]} />
        <meshStandardMaterial color={accentColor} roughness={0.55} metalness={0.05} />
      </mesh>

      <mesh position={[0, height * 0.22, depth / 2 + 0.045]} castShadow receiveShadow>
        <boxGeometry args={[Math.max(width - 0.2, 0.025), 0.18, 0.04]} />
        <meshStandardMaterial color="#f6ead6" emissive="#2a1f16" emissiveIntensity={0.08} />
      </mesh>
    </group>
  );
}

export default Book
