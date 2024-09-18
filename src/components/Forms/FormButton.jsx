import "./FormButton.css";

const FormButton = ({ disabled = false, text, setStep, step }) => {
  return (
    <button
      onClick={() => {
        setStep(step + 1);
      }}
      disabled={disabled}
      className="form-button"
    >
      {text}
    </button>
  );
};

export default FormButton;
