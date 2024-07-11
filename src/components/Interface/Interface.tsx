import '../../App.css'
import NavButton from '../Menu/NavButton';
import Scene from '../Scene/Scene';
import { useState } from 'react';

const Interface = () => {

  // useThree(({ camera }) => {
  //   camera.rotation.set(1, 0, 0);
  // });

  const [camPosition, setCamPosition] = useState([1, 1, 1]);
  const [inLibraryView, setIsLibraryView] = useState(false)


  const setLibraryView = () => {
    setCamPosition([10,0,0])
    setIsLibraryView(true)
  }

  return (
    <>
      <NavButton onClick={setLibraryView}/>
      <Scene camPosition={camPosition}/>
    </>
  );
}

export default Interface
