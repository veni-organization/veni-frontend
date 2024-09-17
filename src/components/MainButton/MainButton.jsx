const MainButton = ({ onClick, disabled = false, text }) => {
  <button onClick={onClick} disabled={disabled} className="main-button">
    {text}
  </button>;
};

export default MainButton;
