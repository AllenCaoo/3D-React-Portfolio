import { OrbitControls, ScrollControls } from "@react-three/drei";
import '../../App.css'
import Room from '../Room/Room';

interface SceneProps {
  inLibraryView: boolean;
  setLibraryView: (value: boolean) => void;
}

const Scene = ({ inLibraryView, setLibraryView }: SceneProps) => {

  return (
        <>
          <ambientLight intensity={1} />
          <OrbitControls 
              enableZoom={true} 
              minAzimuthAngle={-Math.PI/4}
              maxAzimuthAngle={Math.PI/4} 
              /* TODO:  Restrict vertical angling */
              />
          <ScrollControls pages={3} damping={0.25}>
            <Room position={[0,0,0]} inLibraryView={inLibraryView} setLibraryView={setLibraryView} />
          </ScrollControls>
        </>
  );
}

export default Scene
