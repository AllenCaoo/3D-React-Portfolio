import '../../index.css'



const Book =  ({
  position, 
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) => {
  return (
        <>
          <mesh position={position} receiveShadow={true} rotation={rotation} >
            <boxGeometry args={[0.3, 2.5, 1.8]}/>
            <meshNormalMaterial/>
          </mesh>
        </>
  );
}

export default Book
