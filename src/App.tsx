import './App.css'
import Scene from './components/Scene/Scene';

function App() {

  // useThree(({ camera }) => {
  //   camera.rotation.set(1, 0, 0);
  // });

  return (
    <>
      <button id="viewShelf" className="viewShelf">View Bookshelf</button>
      <Scene/>
    </>
  );
}

export default App
