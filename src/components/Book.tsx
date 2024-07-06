import '../index.css'



const Book = () => {
  return (
        <>
          <mesh position={[0,2.5/2 + 0.05,0]} receiveShadow={true}>
            <boxGeometry args={[0.3, 2.5, 1.8]}/>
            <meshNormalMaterial/>
          </mesh>
        </>
  );
}

export default Book
