import "./FormButton.css";

const FormButton = ({
  text,
  setStep,
  step,
  data,
  handleSignUp,
  handleVerify,
  checkCode,
}) => {
  return (
    <button
      type="button"
      disabled={!data}
      onClick={async () => {
        if (step === 2 && checkCode) {
          return await handleVerify();
        }
        if (step === 2) {
          await handleSignUp();
        } else if (data) {
          setStep(step + 1);
        }
      }}
      className={data ? "form-button" : "empty-form-button"}
    >
      {text}
    </button>
  );
};

export default FormButton;
