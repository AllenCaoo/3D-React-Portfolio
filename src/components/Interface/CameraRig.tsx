import { useFrame } from '@react-three/fiber';
import type { ViewportProfile } from '../../config/viewports';

interface CameraRigProps {
  inLibraryView: boolean;
  onCameraPositionChange?: (position: string) => void;
  profile: ViewportProfile;
}

const CameraRig = ({ inLibraryView, onCameraPositionChange, profile }: CameraRigProps) => {
  useFrame((state) => {
    const targetPosition = inLibraryView
      ? profile.camera.libraryPosition
      : profile.camera.initialPosition;

    state.camera.position.lerp(targetPosition, 0.03);
    state.camera.lookAt(
      profile.camera.lookAt.x,
      profile.camera.lookAt.y,
      profile.camera.lookAt.z
    );

    if (onCameraPositionChange) {
      const { x, y, z } = state.camera.position;
      onCameraPositionChange(`${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)}`);
    }
  });

  return null;
};

export default CameraRig;
