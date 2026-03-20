import '../../App.css'
import type { CSSProperties, MouseEventHandler } from 'react';

const NavButton = ({
  onClick,
  style,
} : {
  onClick: MouseEventHandler<HTMLButtonElement>;
  style: CSSProperties;
}) => {

  return (
    <>
      <button id="viewShelf" className="hudButton viewShelf" onClick={onClick} style={style}>View Bookshelf</button>
    </>
  );
}

export default NavButton;
