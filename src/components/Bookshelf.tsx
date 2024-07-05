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
              <Book position={[position[0], position[1] + 2.5/2 + 0.05, position[2]]}/>
            </mesh>
        </>
  );
}

export default Bookshelf
