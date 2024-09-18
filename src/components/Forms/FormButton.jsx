import "./FormButton.css";

const FormButton = ({ onClick, disabled = false, text }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="form-button">
      {text}
    </button>
  );
};

export default FormButton;
