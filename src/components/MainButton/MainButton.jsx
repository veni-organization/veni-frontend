import "./MainButton.css";

const MainButton = ({ onClick, disabled = false, text }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="main-button">
      {text}
    </button>
  );
};

export default MainButton;
