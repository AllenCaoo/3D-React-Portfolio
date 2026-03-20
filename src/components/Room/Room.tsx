import '../../index.css'
import Bookshelf from '../Bookshelf/Bookshelf';
import CoffeeTable from '../CoffeeTable/CoffeeTable';
import AcousticGuitar from '../Guitar/AcousticGuitar';
import L_Couch from '../L_Couch/L_Couch';
import Wall from './Wall';
import Lamp from '../Lamp/Lamp';
import { roomDimensions, roomFurniture, roomLamps } from '../../config/room';

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
            <Wall position={[position[0], position[1] + roomDimensions.floorY, position[1]]} dimensions={[roomDimensions.width, 0.1, roomDimensions.depth]}/>  {/* ground */}
            <Wall position={[position[0], position[1] + roomDimensions.ceilingY, position[2]]} dimensions={[roomDimensions.width, 0.1, roomDimensions.depth]}/> {/* roof */}
            <Wall position={[position[0] + roomDimensions.width / 2, position[1] + roomDimensions.wallCenterY, position[1]]} dimensions={[0.1, roomDimensions.height, roomDimensions.depth]}/>
            <Wall position={[position[0], position[1] + roomDimensions.wallCenterY, position[1] + roomDimensions.depth / 2]} dimensions={[roomDimensions.width, roomDimensions.height, 0.1]}/>
            <Wall position={[position[0], position[1] + roomDimensions.wallCenterY, position[1] - roomDimensions.depth / 2]} dimensions={[roomDimensions.width, roomDimensions.height, 0.1]}/>
            <Wall position={[position[0] - roomDimensions.width / 2, position[1] + roomDimensions.wallCenterY, position[1]]} dimensions={[0.1, roomDimensions.height, roomDimensions.depth]}/>

            <L_Couch scale={roomFurniture.couch.scale} rotation={roomFurniture.couch.rotation} position={[position[0] + roomFurniture.couch.position[0], position[1] + roomFurniture.couch.position[1], position[2] + roomFurniture.couch.position[2]]} />
            <CoffeeTable scale={roomFurniture.coffeeTable.scale} rotation={roomFurniture.coffeeTable.rotation} position={[position[0] + roomFurniture.coffeeTable.position[0], position[1] + roomFurniture.coffeeTable.position[1], position[2] + roomFurniture.coffeeTable.position[2]]}/>
            <AcousticGuitar scale={roomFurniture.guitar.scale} rotation={roomFurniture.guitar.rotation} position={[position[0] + roomFurniture.guitar.position[0], position[1] + roomFurniture.guitar.position[1], position[2] + roomFurniture.guitar.position[2]]}/>

            <Lamp position={[position[0] + roomLamps.floorLamp.position[0], position[1] + roomLamps.floorLamp.position[1], position[2] + roomLamps.floorLamp.position[2]]} height={roomLamps.floorLamp.height} baseRadius={roomLamps.floorLamp.baseRadius} color={roomLamps.floorLamp.color} intensity={roomLamps.floorLamp.intensity} distance={roomLamps.floorLamp.distance} />

            <Lamp position={[position[0] + roomLamps.tableLamp.position[0], position[1] + roomLamps.tableLamp.position[1], position[2] + roomLamps.tableLamp.position[2]]} height={roomLamps.tableLamp.height} baseRadius={roomLamps.tableLamp.baseRadius} shadeRadiusTop={roomLamps.tableLamp.shadeRadiusTop} shadeRadiusBottom={roomLamps.tableLamp.shadeRadiusBottom} color={roomLamps.tableLamp.color} intensity={roomLamps.tableLamp.intensity} distance={roomLamps.tableLamp.distance} />

            <Bookshelf position={[position[0] + roomFurniture.bookshelf.position[0], position[1] + roomFurniture.bookshelf.position[1], position[2] + roomFurniture.bookshelf.position[2]]} inLibraryView={inLibraryView} setLibraryView={setLibraryView}/>

            <Lamp position={[position[0] + roomLamps.bookshelfLamp.position[0], position[1] + roomLamps.bookshelfLamp.position[1], position[2] + roomLamps.bookshelfLamp.position[2]]} height={roomLamps.bookshelfLamp.height} baseRadius={roomLamps.bookshelfLamp.baseRadius} color={roomLamps.bookshelfLamp.color} intensity={roomLamps.bookshelfLamp.intensity} distance={roomLamps.bookshelfLamp.distance} />


            {/* <mesh position={[position[0], position[1] + 1, position[1]]} receiveShadow={true}>
              <sphereGeometry args={[5, 32, 16]}/>
              <meshStandardMaterial color={0xffff00}/>
            </mesh> */}
        </>
  );
}

export default Room
