import '../index.css'
import Book from './Book';



const Bookshelf = ({
    position,
}: {
    position: [number, number, number];
}) => {
  return (
        <>
            <mesh position={position}>
              <boxGeometry args={[6, 0.1, 1.8]}/>
              <meshBasicMaterial/>
              <Book/>
            </mesh>
        </>
  );
}

export default Bookshelf
