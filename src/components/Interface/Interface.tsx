import { Canvas, useFrame } from '@react-three/fiber';
import '../../App.css'
import NavButton from '../Menu/NavButton';
import Scene from '../Scene/Scene';
import { useState, useEffect } from 'react';
import { Vector3 } from 'three';

const Interface = () => {

  const [inLibraryView, setIsLibraryView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'library';
  });

  const INITAL_POSITION = new Vector3(10, 0, 12)

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

  const CameraRig = () => {
    useFrame((state) => {
      if (inLibraryView) {
        const vec = new Vector3(0, -0.5, -5)
        state.camera.position.lerp(vec, 0.03)
      } else {
        state.camera.position.lerp(INITAL_POSITION, 0.03)
      }
      state.camera.lookAt(0, 0, -40)
    })
  
    return null
  }

  return (
    <>
      <NavButton onClick={toggleLibraryView}/>
      <Canvas>
        <CameraRig />  {/* Comment this out for free move debugging */}
        <Scene inLibraryView={inLibraryView} setLibraryView={setIsLibraryView}/>
      </Canvas>
    </>
  );
}


export default Interface
