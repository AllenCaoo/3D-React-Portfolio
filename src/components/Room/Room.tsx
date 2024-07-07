import '../../index.css'
import Bookshelf from '../Bookshelf/Bookshelf';
import CoffeeTable from '../CoffeeTable/CoffeeTable';
import AcousticGuitar from '../Guitar/AcousticGuitar';
import L_Couch from '../L_Couch/L_Couch';
import Wall from './Wall';



const Room = ({
    position,
}: {
    position: [number, number, number];
}) => {

  return (
        <>

            <directionalLight color={0xffffff} intensity={0.3} position={[0, 15, 0]} castShadow={true} />


            {/* <mesh position={[position[0], position[1] - 6, position[1]]} receiveShadow={true}>
              <boxGeometry args={[25, 0.1, 30]}/>
              <meshStandardMaterial/>
            </mesh> */}


            <Wall position={[position[0], position[1] - 6, position[1]]} dimensions={[25, 0.1, 30]}/>  {/* ground */}
            <Wall position={[position[0]+25/2, position[1] - 11 + 30/2, position[1]]} dimensions={[0.1, 20, 30]}/>
            <Wall position={[position[0], position[1] - 11 + 30/2, position[1] + 30/2]} dimensions={[25, 20, 0.1]}/>
            <Wall position={[position[0], position[1] - 11 + 30/2, position[1] - 30/2]} dimensions={[25, 20, 0.1]}/>
            <Wall position={[position[0]-25/2, position[1] - 11 + 30/2, position[1]]} dimensions={[0.1, 20, 30]}/>

            <L_Couch scale={0.015} rotation={[0,Math.PI/2,0]} position={[position[0]-10, position[1] - 6, position[1] - 6]} />
            <CoffeeTable scale={3} rotation={[0,Math.PI/2,0]} position={[position[0]-7.3, position[1] - 5, position[1] - 4.3]}/>
            <AcousticGuitar scale={0.1} rotation={[0,Math.PI/4,0]} position={[position[0]-10, position[1] - 5.95, position[1] - 11]}/>


            <Bookshelf position={[position[0], position[1], position[2] - 13.5]}/>



            {/* <mesh position={[position[0], position[1] + 1, position[1]]} receiveShadow={true}>
              <sphereGeometry args={[5, 32, 16]}/>
              <meshStandardMaterial color={0xffff00}/>
            </mesh> */}
        </>
  );
}

export default Room
