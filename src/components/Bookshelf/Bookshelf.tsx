import '../../index.css'
import Books from './Books';
import { useTexture, Html } from '@react-three/drei';



/**
 * Returns a bookshelf mesh
 * @param position coordinates of the top shelf of the bookshelf
 * @returns bookshelf mesh
 */
const Bookshelf = ({
    position, 
    inLibraryView,
    setLibraryView
}: {
    position: [number, number, number];
    inLibraryView: boolean;
    setLibraryView: (value: boolean) => void;
}) => {

  const bookshelfTexture = useTexture({map: 'textures/bookshelf.png'})

  return (
        <>
            <mesh 
              position={position}
              onClick={(e) => {
                e.stopPropagation();
                setLibraryView(true);
              }}
            >
              {inLibraryView && (
                <Html position={[0, 1.5, 0]} transform>
                  <div style={{ display: 'flex', gap: '10px', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px' }}>
                    <button style={{ position: 'static' }} onClick={(e) => { e.stopPropagation(); console.log('Read clicked'); }}>Read</button>
                    <button style={{ position: 'static' }} onClick={(e) => { e.stopPropagation(); console.log('Arrange clicked'); }}>Arrange</button>
                    <button style={{ position: 'static' }} onClick={(e) => { e.stopPropagation(); setLibraryView(false); }}>Close</button>
                  </div>
                </Html>
              )}
              <mesh>
                <boxGeometry args={[10, 0.1, 1.8]}/>
                <meshLambertMaterial {...bookshelfTexture}/>
              </mesh>
              <mesh position={[0, -2.9, 0]}>
                <boxGeometry args={[10, 0.1, 1.8]}/>
                <meshLambertMaterial {...bookshelfTexture}/>
              </mesh>
              <mesh position={[0, -5.8, 0]}>
                <boxGeometry args={[10, 0.1, 1.8]}/>
                <meshLambertMaterial {...bookshelfTexture}/>
              </mesh>
              <mesh position={[0, -2.9, 0]}>
                <boxGeometry args={[0.1, 5.8, 1.8]}/>
                <meshLambertMaterial {...bookshelfTexture}/>
              </mesh>
              <mesh position={[5, -2.9, 0]}>
                <boxGeometry args={[0.1, 5.8, 1.8]}/>
                <meshLambertMaterial {...bookshelfTexture}/>
              </mesh>
              <mesh position={[-5, -2.9, 0]}>
                <boxGeometry args={[0.1, 5.8, 1.8]}/>
                <meshLambertMaterial {...bookshelfTexture}/>
              </mesh>
              <Books position={[-5 + 0.5,-(2.5/2 + 0.3),0]}/>
              <Books position={[-5 + 0.5, -4.5, 0]}/>
              <Books position={[0.5,-(2.5/2 + 0.3),0]}/>
              <Books position={[0.5,-4.5,0]}/>
            </mesh>
        </>
  );
}

export default Bookshelf
