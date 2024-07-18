import { OrbitControls, ScrollControls } from "@react-three/drei";
import '../../App.css'
import Room from '../Room/Room';

const Scene = () => {

  return (
        <>
          <ambientLight intensity={1} />
          <OrbitControls 
              enableZoom={true} 
              minAzimuthAngle={-Math.PI/4}
              maxAzimuthAngle={Math.PI/4} 
              /* TODO:  Restrict vertical angling */
              />
          <ScrollControls pages={3} damping={0.25}>
            <Room position={[0,0,0]}/>
          </ScrollControls>
        </>
  );
}

export default Scene
