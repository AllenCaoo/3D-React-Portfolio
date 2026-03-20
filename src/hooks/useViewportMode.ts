import { useEffect, useState } from 'react';
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  viewportProfiles,
  type ViewportMode,
} from '../config/viewports';

const getViewportMode = (): ViewportMode => {
  if (window.innerWidth <= MOBILE_BREAKPOINT) {
    return 'mobile';
  }

  if (window.innerWidth <= TABLET_BREAKPOINT) {
    return 'tablet';
  }

  return 'desktop';
};

const useViewportMode = (inLibraryView = false) => {
  const [viewportMode, setViewportMode] = useState<ViewportMode>(getViewportMode);
  const profile = viewportProfiles[viewportMode];
  const cameraState = inLibraryView
    ? profile.camera.states.library
    : profile.camera.states.room;

  useEffect(() => {
    const handleResize = () => {
      setViewportMode(getViewportMode());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    cameraState,
    profile,
    viewportMode,
  };
};

export default useViewportMode;
