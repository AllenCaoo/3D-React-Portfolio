import '../../index.css'
import Book from './Book';



/**
 * Returns a bookshelf mesh
 * @param position coordinates of the top shelf of the bookshelf
 * @returns bookshelf mesh
 */
const Bookshelf = ({
    position, 
}: {
    position: [number, number, number];
}) => {

  return (
        <>
            <mesh position={position}>
              <mesh>
                <boxGeometry args={[10, 0.1, 1.8]}/>
                <meshLambertMaterial/>
              </mesh>
              <mesh position={[0, -2.9, 0]}>
                <boxGeometry args={[10, 0.1, 1.8]}/>
                <meshLambertMaterial/>
              </mesh>
              <mesh position={[0, -5.8, 0]}>
                <boxGeometry args={[10, 0.1, 1.8]}/>
                <meshLambertMaterial/>
              </mesh>
              <mesh position={[0, -2.9, 0]}>
                <boxGeometry args={[0.1, 5.8, 1.8]}/>
                <meshLambertMaterial/>
              </mesh>
              <mesh position={[5, -2.9, 0]}>
                <boxGeometry args={[0.1, 5.8, 1.8]}/>
                <meshLambertMaterial/>
              </mesh>
              <mesh position={[-5, -2.9, 0]}>
                <boxGeometry args={[0.1, 5.8, 1.8]}/>
                <meshLambertMaterial/>
              </mesh>
              <Book/>
            </mesh>
        </>
  );
}

export default Bookshelf
