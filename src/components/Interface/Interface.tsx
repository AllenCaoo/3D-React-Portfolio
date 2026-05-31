import { Canvas } from '@react-three/fiber';
import '../../App.css'
import NavButton from '../Menu/NavButton';
import Scene from '../Scene/Scene';
import { useState, useEffect } from 'react';
import useViewportMode from '../../hooks/useViewportMode';
import CameraRig from './CameraRig';
import ViewportDebug from './ViewportDebug';
import CategoryNav from '../Library/CategoryNav';
import CategoryPage from '../Library/CategoryPage';
import { getCategoryById } from '../../config/categories';

const Interface = () => {
  const [inLibraryView, setIsLibraryView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'library';
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
  });

  const { cameraState, profile, viewportMode } = useViewportMode(inLibraryView);
  const [cameraPosition, setCameraPosition] = useState('0.0, 0.0, 0.0');

  // Sync view to URL; use pushState for view changes (meaningful history entry)
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
        url.searchParams.delete('category');
        window.history.pushState({}, '', url.toString());
      }
    }
  }, [inLibraryView]);

  // Sync selected category to URL; use replaceState to avoid polluting back stack
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedCategory) {
      url.searchParams.set('category', selectedCategory);
    } else {
      url.searchParams.delete('category');
    }
    window.history.replaceState({}, '', url.toString());
  }, [selectedCategory]);

  // Clear category when leaving library view
  useEffect(() => {
    if (!inLibraryView) {
      setSelectedCategory(null);
    }
  }, [inLibraryView]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setIsLibraryView(params.get('view') === 'library');
      setSelectedCategory(params.get('category'));
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
      {inLibraryView && !selectedCategory && (
        <CategoryNav
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
          onClose={toggleLibraryView}
        />
      )}
      {selectedCategory && (
        <CategoryPage
          category={getCategoryById(selectedCategory)!}
          onClose={() => setSelectedCategory(null)}
        />
      )}
      <Canvas
        dpr={profile.canvas.dpr}
        shadows={profile.canvas.shadows}
        camera={{
          position: profile.camera.states.room.position.toArray(),
          fov: profile.camera.states.room.fov,
        }}
      >
        <CameraRig
          cameraState={cameraState}
          onCameraPositionChange={import.meta.env.DEV ? setCameraPosition : undefined}
          profile={profile}
        />
        <Scene
          cameraState={cameraState}
          inLibraryView={inLibraryView && !selectedCategory}
          controlsProfile={profile.controls}
          setLibraryView={setIsLibraryView}
        />
      </Canvas>
    </>
  );
}


export default Interface
