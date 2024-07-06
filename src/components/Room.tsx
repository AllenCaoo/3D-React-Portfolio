import '../index.css'
import Bookshelf from './Bookshelf';
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


            <Bookshelf position={[position[0], position[1], position[2] - 5]}/>



            {/* <mesh position={[position[0], position[1] + 1, position[1]]} receiveShadow={true}>
              <sphereGeometry args={[5, 32, 16]}/>
              <meshStandardMaterial color={0xffff00}/>
            </mesh> */}
        </>
  );
}

export default Room
