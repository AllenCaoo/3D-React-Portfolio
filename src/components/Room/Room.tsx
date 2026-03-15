import '../../index.css'
import Bookshelf from '../Bookshelf/Bookshelf';
import CoffeeTable from '../CoffeeTable/CoffeeTable';
import AcousticGuitar from '../Guitar/AcousticGuitar';
import L_Couch from '../L_Couch/L_Couch';
import Wall from './Wall';
import Lamp from '../Lamp/Lamp';

const Room = ({
    position,
    inLibraryView,
    setLibraryView,
}: {
    position: [number, number, number];
    inLibraryView: boolean;
    setLibraryView: (value: boolean) => void;
}) => {

  return (
        <>
            <Wall position={[position[0], position[1] - 6, position[1]]} dimensions={[25, 0.1, 30]}/>  {/* ground */}
            <Wall position={[position[0], position[1] + 10, position[2]]} dimensions={[25, 0.1, 30]}/> {/* roof */}
            <Wall position={[position[0]+25/2, position[1] + 2, position[1]]} dimensions={[0.1, 16, 30]}/>
            <Wall position={[position[0], position[1] + 2, position[1] + 30/2]} dimensions={[25, 16, 0.1]}/>
            <Wall position={[position[0], position[1] + 2, position[1] - 30/2]} dimensions={[25, 16, 0.1]}/>
            <Wall position={[position[0]-25/2, position[1] + 2, position[1]]} dimensions={[0.1, 16, 30]}/>

            <L_Couch scale={0.015} rotation={[0,Math.PI/2,0]} position={[position[0]-10, position[1] - 6, position[1] - 6]} />
            <CoffeeTable scale={3} rotation={[0,Math.PI/2,0]} position={[position[0]-7.3, position[1] - 5, position[1] - 4.3]}/>
            <AcousticGuitar scale={0.1} rotation={[0,Math.PI/4,0]} position={[position[0]-10, position[1] - 5.95, position[1] - 11]}/>

            {/* Floor Lamp near Couch */}
            <Lamp position={[position[0] - 10, position[1] - 6, position[1] + 5]} height={6} baseRadius={0.4} color="#ffaa33" />
            
            {/* Table Lamp on Coffee Table */}
            <Lamp 
              position={[position[0] - 8, position[1] - 4.4, position[1] - 4]} 
              height={1.5} 
              baseRadius={0.15} 
              shadeRadiusTop={0.3} 
              shadeRadiusBottom={0.3} 
              color="#ffffff" 
            />


            <Bookshelf position={[position[0], position[1], position[2] - 13.5]} inLibraryView={inLibraryView} setLibraryView={setLibraryView}/>

            {/* Tall Lamp to the right of Bookshelf */}
            <Lamp position={[position[0] + 8.75, position[1] - 6, position[1] - 13.5]} height={8} baseRadius={0.5} color="#ffeebb" />



            {/* <mesh position={[position[0], position[1] + 1, position[1]]} receiveShadow={true}>
              <sphereGeometry args={[5, 32, 16]}/>
              <meshStandardMaterial color={0xffff00}/>
            </mesh> */}
        </>
  );
}

export default Room
