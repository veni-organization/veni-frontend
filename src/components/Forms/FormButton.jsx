import "./FormButton.css";

const FormButton = ({
  text,
  setStep,
  step,
  data,
  handleSignUp,
  handleVerify,
  checkCode,
  handleCompleteProfile,
  isDateChanged,
}) => {
  return (
    <button
      type="button"
      disabled={!data || (step === 3 && !isDateChanged)}
      onClick={async () => {
        if (step === 4) {
          return await handleCompleteProfile();
        }
        if (step === 2 && checkCode) {
          return await handleVerify();
        }
        if (step === 2) {
          await handleSignUp();
        } else if (data) {
          setStep(step + 1);
        }
      }}
      className={
        step === 3
          ? isDateChanged
            ? "form-button"
            : "empty-form-button"
          : data
          ? "form-button"
          : "empty-form-button"
      }
    >
      {text}
    </button>
  );
};

export default FormButton;
