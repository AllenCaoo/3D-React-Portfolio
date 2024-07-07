import '../../index.css'
import Book from './Book';



/**
 * Returns a set of books mesh
 * @param position coordinates of the leftmost book of the books
 * @returns books mesh
 */
const Books =  ({
    position, 
}: {
    position: [number, number, number];
}) => {
  return (
        <>
          <Book position={position} rotation={[0, 0, 0]}/>
          <Book position={[position[0] + 0.31, position[1], position[2]]} rotation={[0, 0, 0]}/>
          <Book position={[position[0] + 0.31*2, position[1], position[2]]} rotation={[0, 0, 0]}/>
          <Book position={[position[0] + 0.31*3, position[1], position[2]]} rotation={[0, 0, 0]}/>
          <Book position={[position[0] + 0.31*4, position[1], position[2]]} rotation={[0, 0, 0]}/>
          <Book position={[position[0] + 0.31*5, position[1], position[2]]} rotation={[0, 0, 0]}/>
          <Book position={[position[0] + 0.31*6, position[1], position[2]]} rotation={[0, 0, 0]}/>
          <Book position={[position[0] + 0.31*7, position[1], position[2]]} rotation={[0, 0, 0]}/>
          <Book position={[position[0] + 0.31*7 + 0.38, position[1], position[2]]} rotation={[0, 0, 0.06]}/>
          <Book position={[position[0] + 0.31*8 + 0.38, position[1], position[2]]} rotation={[0, 0, 0.06]}/>
          <Book position={[position[0] + 0.31*9 + 0.38, position[1], position[2]]} rotation={[0, 0, 0.06]}/>
          <Book position={[position[0] + 0.31*10 + 0.38, position[1], position[2]]} rotation={[0, 0, 0.06]}/>
          <Book position={[position[0] + 0.31*11 + 0.38, position[1], position[2]]} rotation={[0, 0, 0.06]}/>
          <Book position={[position[0] + 0.31*12 + 0.38, position[1], position[2]]} rotation={[0, 0, 0.06]}/>
        </>
  );
}

export default Books
