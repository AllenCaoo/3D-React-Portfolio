import './App.css'
import NavButton from './components/Menu/NavButton';
import Scene from './components/Scene/Scene';

function App() {

  // useThree(({ camera }) => {
  //   camera.rotation.set(1, 0, 0);
  // });

  return (
    <>
      <NavButton/>
      <Scene/>
    </>
  );
}

export default App
