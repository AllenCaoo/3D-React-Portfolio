import { OrbitControls, ScrollControls } from "@react-three/drei";
import '../../App.css'
import Room from '../Room/Room';
import type { OrbitControlsProfile, ViewportProfile } from '../../config/viewports';

interface SceneProps {
  cameraState: ViewportProfile['camera']['states']['room'];
  inLibraryView: boolean;
  controlsProfile: OrbitControlsProfile;
  setLibraryView: (value: boolean) => void;
}

const Scene = ({
  cameraState,
  inLibraryView,
  controlsProfile,
  setLibraryView,
}: SceneProps) => {
  return (
        <>
          <OrbitControls
            key={inLibraryView ? 'library' : 'room'}
            target={cameraState.lookAt}
            {...controlsProfile}
          />
          <ScrollControls pages={3} damping={0.25}>
            <Room position={[0,0,0]} inLibraryView={inLibraryView} setLibraryView={setLibraryView} />
          </ScrollControls>
        </>
  );
}

export default Scene
