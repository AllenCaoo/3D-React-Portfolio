import { useEffect, useState } from 'react';
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
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

const useViewportMode = () => {
  const [viewportMode, setViewportMode] = useState<ViewportMode>(getViewportMode);

  useEffect(() => {
    const handleResize = () => {
      setViewportMode(getViewportMode());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewportMode;
};

export default useViewportMode;
