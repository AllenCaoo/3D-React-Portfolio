import { OrbitControls, ScrollControls } from "@react-three/drei";
import '../../App.css'
import Room from '../Room/Room';
import type { OrbitControlsProfile, ViewportProfile } from '../../config/viewports';
import type { BookProject } from '../../config/books';

interface SceneProps {
  cameraState: ViewportProfile['camera']['states']['room'];
  inLibraryView: boolean;
  controlsProfile: OrbitControlsProfile;
  setLibraryView: (value: boolean) => void;
  onContentReady: (project: BookProject) => void;
  isContentOpen: boolean;
}

const Scene = ({
  cameraState,
  inLibraryView,
  controlsProfile,
  setLibraryView,
  onContentReady,
  isContentOpen,
}: SceneProps) => {
  return (
        <>
          <OrbitControls
            key={inLibraryView ? 'library' : 'room'}
            target={cameraState.lookAt}
            {...controlsProfile}
          />
          <ScrollControls pages={3} damping={0.25}>
            <Room position={[0,0,0]} inLibraryView={inLibraryView} setLibraryView={setLibraryView} onContentReady={onContentReady} isContentOpen={isContentOpen} />
          </ScrollControls>
        </>
  );
}

export default Scene
