import '../../App.css'

const NavButton = ({
  onClick
} : {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {

  return (
    <>
      <button id="viewShelf" className="viewShelf" onClick={onClick}>View Bookshelf</button>
    </>
  );
}

export default NavButton;
