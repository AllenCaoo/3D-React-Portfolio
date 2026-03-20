import { Canvas } from '@react-three/fiber';
import '../../App.css'
import NavButton from '../Menu/NavButton';
import Scene from '../Scene/Scene';
import { useState, useEffect } from 'react';
import useViewportMode from '../../hooks/useViewportMode';
import { viewportProfiles } from '../../config/viewports';
import CameraRig from './CameraRig';
import ViewportDebug from './ViewportDebug';

const Interface = () => {
  const viewportMode = useViewportMode();
  const profile = viewportProfiles[viewportMode];
  const [cameraPosition, setCameraPosition] = useState('0.0, 0.0, 0.0');

  const [inLibraryView, setIsLibraryView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'library';
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const currentView = url.searchParams.get('view');
    
    if (inLibraryView) {
      if (currentView !== 'library') {
        url.searchParams.set('view', 'library');
        window.history.pushState({}, '', url.toString());
      }
    } else {
      if (currentView === 'library') {
        url.searchParams.delete('view');
        window.history.pushState({}, '', url.toString());
      }
    }
  }, [inLibraryView]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setIsLibraryView(params.get('view') === 'library');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleLibraryView = () => {
    setIsLibraryView(!inLibraryView)
  }

  return (
    <>
      {import.meta.env.DEV && (
        <ViewportDebug
          cameraPosition={cameraPosition}
          inLibraryView={inLibraryView}
          viewportMode={viewportMode}
        />
      )}
      <NavButton onClick={toggleLibraryView} style={profile.hud.viewShelfButtonStyle} />
      <Canvas
        dpr={profile.canvas.dpr}
        shadows={profile.canvas.shadows}
        camera={{
          position: profile.camera.initialPosition.toArray(),
          fov: profile.canvas.fov,
        }}
      >
        <CameraRig
          inLibraryView={inLibraryView}
          onCameraPositionChange={import.meta.env.DEV ? setCameraPosition : undefined}
          profile={profile}
        />
        <Scene
          inLibraryView={inLibraryView}
          controlsProfile={profile.controls}
          setLibraryView={setIsLibraryView}
        />
      </Canvas>
    </>
  );
}


export default Interface
