import "./MainButton.css";

const MainButton = ({ onClick, disabled = false, text }) => {
  return (
    <footer>
      <button onClick={onClick} disabled={disabled} className="main-button">
        {text}
      </button>
    </footer>
  );
};

export default MainButton;
