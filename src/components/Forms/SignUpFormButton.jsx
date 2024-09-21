import "./SignUpFormButton.css";

const SignUpFormButton = ({ text, setStep, step, data, handleSignUp }) => {
  return (
    <button
      type="button"
      disabled={!data}
      onClick={async () => {
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

export default SignUpFormButton;
