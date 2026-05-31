import '../../index.css'
import Books from './Books';
import OpenBook from './OpenBook';
import { useTexture, Html } from '@react-three/drei';
import { getCategoryById } from '../../config/categories';

const Bookshelf = ({
    position,
    inLibraryView,
    setLibraryView,
    selectedCategory,
    setSelectedCategory,
}: {
    position: [number, number, number];
    inLibraryView: boolean;
    setLibraryView: (value: boolean) => void;
    selectedCategory: string | null;
    setSelectedCategory: (id: string | null) => void;
}) => {
  const isReading = selectedCategory !== null;
  const bookshelfTexture = useTexture({map: 'textures/bookshelf.png'})
  const category = getCategoryById(selectedCategory);

  return (
        <>
            <mesh
              position={position}
              onClick={(e) => {
                e.stopPropagation();
                setLibraryView(true);
              }}
            >
              {inLibraryView && !isReading && (
                <Html position={[0, 1.5, 0]} center>
                  <div className="bookshelf-actions">
                    <button className="bookshelf-actionButton" onClick={(e) => { e.stopPropagation(); setLibraryView(false); }}>Close</button>
                  </div>
                </Html>
              )}
              {isReading && category && (
                <OpenBook category={category} onClose={() => setSelectedCategory(null)} />
              )}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[10, 0.1, 1.8]}/>
                <meshStandardMaterial {...bookshelfTexture} roughness={0.88} metalness={0.04}/>
              </mesh>
              <mesh position={[0, -2.9, 0]} castShadow receiveShadow>
                <boxGeometry args={[10, 0.1, 1.8]}/>
                <meshStandardMaterial {...bookshelfTexture} roughness={0.88} metalness={0.04}/>
              </mesh>
              <mesh position={[0, -5.8, 0]} castShadow receiveShadow>
                <boxGeometry args={[10, 0.1, 1.8]}/>
                <meshStandardMaterial {...bookshelfTexture} roughness={0.88} metalness={0.04}/>
              </mesh>
              <mesh position={[0, -2.9, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 5.8, 1.8]}/>
                <meshStandardMaterial {...bookshelfTexture} roughness={0.88} metalness={0.04}/>
              </mesh>
              <mesh position={[5, -2.9, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 5.8, 1.8]}/>
                <meshStandardMaterial {...bookshelfTexture} roughness={0.88} metalness={0.04}/>
              </mesh>
              <mesh position={[-5, -2.9, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.1, 5.8, 1.8]}/>
                <meshStandardMaterial {...bookshelfTexture} roughness={0.88} metalness={0.04}/>
              </mesh>
              <Books position={[-4.45,-1.6,0]} hiddenBookIndex={isReading ? 0 : undefined}/>
              <Books position={[-4.45, -4.5, 0]} shelfIndex={1}/>
              <Books position={[0.55,-1.6,0]} shelfIndex={2}/>
              <Books position={[0.55,-4.5,0]} shelfIndex={3}/>
            </mesh>
        </>
  );
}

export default Bookshelf
