import "./EventFormButton.css";

const EventFormButton = ({ text, setStep, step, data }) => {
  return (
    <button
      type="button"
      disabled={!data}
      onClick={() => {
        setStep(step + 1);
        console.log(step);
      }}
      className={data ? "form-button" : "empty-form-button"}
    >
      {text}
    </button>
  );
};

export default EventFormButton;
