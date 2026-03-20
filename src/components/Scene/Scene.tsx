import { OrbitControls, ScrollControls } from "@react-three/drei";
import '../../App.css'
import Room from '../Room/Room';
import type { OrbitControlsProfile } from '../../config/viewports';

interface SceneProps {
  inLibraryView: boolean;
  controlsProfile: OrbitControlsProfile;
  setLibraryView: (value: boolean) => void;
}

const Scene = ({ inLibraryView, controlsProfile, setLibraryView }: SceneProps) => {
  return (
        <>
          <OrbitControls {...controlsProfile} />
          <ScrollControls pages={3} damping={0.25}>
            <Room position={[0,0,0]} inLibraryView={inLibraryView} setLibraryView={setLibraryView} />
          </ScrollControls>
        </>
  );
}

export default Scene
