import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import type { ViewportProfile } from '../../config/viewports';

interface CameraRigProps {
  cameraState: ViewportProfile['camera']['states']['room'];
  onCameraPositionChange?: (position: string) => void;
  profile: ViewportProfile;
}

const CameraRig = ({
  cameraState,
  onCameraPositionChange,
  profile,
}: CameraRigProps) => {
  useFrame((state) => {
    const camera = state.camera as PerspectiveCamera;
    const transitionLerp = profile.camera.transitionLerp;

    camera.position.lerp(cameraState.position, transitionLerp);
    camera.fov += (cameraState.fov - camera.fov) * transitionLerp;
    camera.updateProjectionMatrix();
    camera.lookAt(
      cameraState.lookAt.x,
      cameraState.lookAt.y,
      cameraState.lookAt.z
    );

    if (onCameraPositionChange) {
      const { x, y, z } = camera.position;
      onCameraPositionChange(`${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)}`);
    }
  });

  return null;
};

export default CameraRig;
