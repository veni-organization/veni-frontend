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
  handleSignIn,
}) => {
  return (
    <footer>
      <button
        type="button"
        disabled={!data || (step === 3 && !isDateChanged)}
        onClick={async () => {
          // if the user add a picture(or pass this step) the function complete the user profile
          if (step === 4) {
            return await handleCompleteProfile();
          }
          // if the user send is phone number with the associate code, the function verify and allow if it's ok
          if (step === 2 && checkCode) {
            return await handleVerify();
          }
          // when the user send his phone number, he receive the verification code
          if (step === 2) {
            await handleSignUp();
            // when the user has complete an input, he can skip to next step
          } else if (data) {
            if (step) {
              setStep(step + 1);
            } else {
              // on the signIn flow, check if its the right code
              if (checkCode) {
                await handleVerify();
              } else {
                // on the signIn flow, check if the number exists in database
                await handleSignIn();
              }
            }
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
    </footer>
  );
};

export default FormButton;
