import '../../App.css'

const NavButton = ({
  onClick
} : {
  onClick: any;
}) => {

  return (
    <>
      <button id="viewShelf" className="viewShelf" onClick={onClick}>View Bookshelf</button>
    </>
  );
}

export default NavButton;
