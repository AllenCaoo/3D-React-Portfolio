import '../index.css'



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
