import '../../index.css'
import Book from './Book';

type BookConfig = {
  width: number;
  height: number;
  depth: number;
  tilt?: number;
  yOffset?: number;
  zOffset?: number;
  gapAfter?: number;
  coverColor: string;
  pagesColor?: string;
  accentColor?: string;
};

const SHELF_VARIANTS: BookConfig[][] = [
  [
    { width: 0.22, height: 2.3, depth: 1.62, coverColor: '#5d73b7', accentColor: '#d7bb7b' },
    { width: 0.24, height: 2.36, depth: 1.68, coverColor: '#6f87d8', accentColor: '#caa56f' },
    { width: 0.18, height: 2.2, depth: 1.55, coverColor: '#5367a2', accentColor: '#d1bf87' },
    { width: 0.26, height: 2.46, depth: 1.72, coverColor: '#6d84d0', accentColor: '#c89d66' },
    { width: 0.23, height: 2.41, depth: 1.7, coverColor: '#7f95df', accentColor: '#d8b276' },
    { width: 0.2, height: 2.28, depth: 1.6, coverColor: '#5166a0', accentColor: '#c5a06f' },
    { width: 0.27, height: 2.5, depth: 1.76, coverColor: '#6a7fd4', accentColor: '#dfb977' },
    { width: 0.21, height: 2.34, depth: 1.63, coverColor: '#6780d2', accentColor: '#bf945f' },
    { width: 0.24, height: 2.38, depth: 1.67, coverColor: '#7389d5', accentColor: '#cfab73', tilt: 0.028, gapAfter: 0.02 },
    { width: 0.28, height: 2.43, depth: 1.73, coverColor: '#5570c0', accentColor: '#d2ae70', tilt: 0.042 },
    { width: 0.25, height: 2.34, depth: 1.69, coverColor: '#7a8fda', accentColor: '#cba16b', tilt: 0.055 },
    { width: 0.31, height: 2.47, depth: 1.76, coverColor: '#8da0e6', accentColor: '#ddb87a', tilt: 0.07 },
    { width: 0.33, height: 2.52, depth: 1.78, coverColor: '#c77f92', accentColor: '#f0d39b', tilt: 0.082, zOffset: 0.02 },
  ],
  [
    { width: 0.19, height: 2.24, depth: 1.56, coverColor: '#5f72b2', accentColor: '#c49c62' },
    { width: 0.29, height: 2.48, depth: 1.74, coverColor: '#7c8fda', accentColor: '#ddbb7e' },
    { width: 0.23, height: 2.37, depth: 1.65, coverColor: '#6d82d4', accentColor: '#d1ab75' },
    { width: 0.18, height: 2.18, depth: 1.52, coverColor: '#53649b', accentColor: '#c59f70' },
    { width: 0.27, height: 2.45, depth: 1.69, coverColor: '#6880cb', accentColor: '#cda76e' },
    { width: 0.21, height: 2.29, depth: 1.58, coverColor: '#4e639b', accentColor: '#b98f5d' },
    { width: 0.26, height: 2.42, depth: 1.68, coverColor: '#7b91de', accentColor: '#dbb97d' },
    { width: 0.22, height: 2.32, depth: 1.61, coverColor: '#6077bd', accentColor: '#c79b66' },
    { width: 0.24, height: 2.36, depth: 1.66, coverColor: '#6d84d6', accentColor: '#d2ac72', tilt: -0.02, gapAfter: 0.018 },
    { width: 0.28, height: 2.41, depth: 1.72, coverColor: '#5671c4', accentColor: '#d4ae75', tilt: -0.032 },
    { width: 0.3, height: 2.46, depth: 1.76, coverColor: '#7990dd', accentColor: '#e1c084', tilt: -0.045 },
    { width: 0.32, height: 2.5, depth: 1.8, coverColor: '#d68597', accentColor: '#f3d79e', tilt: -0.06, zOffset: 0.02 },
  ],
  [
    { width: 0.2, height: 2.22, depth: 1.55, coverColor: '#556ca9', accentColor: '#c49e67' },
    { width: 0.25, height: 2.38, depth: 1.67, coverColor: '#6e83d1', accentColor: '#d4af75' },
    { width: 0.21, height: 2.3, depth: 1.6, coverColor: '#6276bc', accentColor: '#ca9d62' },
    { width: 0.27, height: 2.49, depth: 1.73, coverColor: '#8597df', accentColor: '#dbb97f' },
    { width: 0.18, height: 2.16, depth: 1.5, coverColor: '#4d6193', accentColor: '#b98d5d' },
    { width: 0.24, height: 2.33, depth: 1.62, coverColor: '#7086d0', accentColor: '#cfaa72' },
    { width: 0.23, height: 2.35, depth: 1.64, coverColor: '#6177c2', accentColor: '#c89a61' },
    { width: 0.29, height: 2.44, depth: 1.71, coverColor: '#7c93e2', accentColor: '#ddbd82', tilt: 0.024, gapAfter: 0.018 },
    { width: 0.26, height: 2.4, depth: 1.68, coverColor: '#5972c2', accentColor: '#cda76c', tilt: 0.038 },
    { width: 0.28, height: 2.46, depth: 1.74, coverColor: '#7290da', accentColor: '#d8b67d', tilt: 0.052 },
    { width: 0.34, height: 2.53, depth: 1.79, coverColor: '#cf8092', accentColor: '#efd299', tilt: 0.075, zOffset: 0.022 },
  ],
  [
    { width: 0.22, height: 2.29, depth: 1.6, coverColor: '#586fb0', accentColor: '#c69e66' },
    { width: 0.2, height: 2.2, depth: 1.54, coverColor: '#4f6398', accentColor: '#b98e5d' },
    { width: 0.27, height: 2.47, depth: 1.71, coverColor: '#6f86d3', accentColor: '#d7b67b' },
    { width: 0.23, height: 2.34, depth: 1.64, coverColor: '#6480ca', accentColor: '#cfa76d' },
    { width: 0.18, height: 2.12, depth: 1.48, coverColor: '#4c5e91', accentColor: '#b48756' },
    { width: 0.25, height: 2.4, depth: 1.66, coverColor: '#7890de', accentColor: '#debc7f' },
    { width: 0.21, height: 2.26, depth: 1.57, coverColor: '#5970b3', accentColor: '#c39561' },
    { width: 0.24, height: 2.37, depth: 1.65, coverColor: '#6982d0', accentColor: '#d1ae75', tilt: -0.022, gapAfter: 0.016 },
    { width: 0.28, height: 2.41, depth: 1.71, coverColor: '#5470bd', accentColor: '#cfa86e', tilt: -0.034 },
    { width: 0.29, height: 2.46, depth: 1.75, coverColor: '#7b95df', accentColor: '#dfc083', tilt: -0.048 },
    { width: 0.33, height: 2.51, depth: 1.79, coverColor: '#d28397', accentColor: '#f0d49b', tilt: -0.064, zOffset: 0.02 },
  ],
];

/**
 * Returns a set of books mesh
 * @param position coordinates of the leftmost book of the books
 * @returns books mesh
 */
const Books = ({
  hiddenBookIndex,
  position,
  shelfIndex = 0,
}: {
  hiddenBookIndex?: number;
  position: [number, number, number];
  shelfIndex?: number;
}) => {
  const baseBookHeight = 2.5;
  const shelfSink = 0.02;
  const books = SHELF_VARIANTS[shelfIndex % SHELF_VARIANTS.length];
  let cursorX = 0;

  return (
    <>
      {books.map((book, index) => {
        const width = book.width;
        const gap = book.gapAfter ?? 0.015;
        const x = position[0] + cursorX + width / 2;
        cursorX += width + gap;

        if (hiddenBookIndex === index) {
          return null;
        }

        return (
          <Book
            key={`${shelfIndex}-${index}`}
            position={[
              x,
              position[1] + (book.yOffset ?? (book.height - baseBookHeight) / 2) - shelfSink,
              position[2] + (book.zOffset ?? 0),
            ]}
            rotation={[0, 0, book.tilt ?? 0]}
            size={[book.width, book.height, book.depth]}
            coverColor={book.coverColor}
            pagesColor={book.pagesColor ?? '#e5dcc8'}
            accentColor={book.accentColor ?? '#d4af75'}
          />
        );
      })}
    </>
  );
}

export default Books
