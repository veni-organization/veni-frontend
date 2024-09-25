import "./EventFormButton.css";

const EventFormButton = ({ text, setStep, step, data }) => {
  return (
    <footer>
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
      <p className={step === 4 ? "hidden" : "browse-poster"}>
        Choisir parmis notre collection
      </p>
    </footer>
  );
};

export default EventFormButton;
