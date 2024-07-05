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
