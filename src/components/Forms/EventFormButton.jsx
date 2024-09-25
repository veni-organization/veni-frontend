import "./EventFormButton.css";

const EventFormButton = ({ text, setStep, step, data }) => {
  return (
    <>
      <button
        type="button"
        disabled={!data}
        onClick={() => {
          setStep(step + 1);
          console.log(step);
        }}
        className={data ? "event-form-button" : "empty-event-form-button"}
      >
        {text}
      </button>
      <p className="none">Choisir parmis notre collection</p>
    </>
  );
};

export default EventFormButton;
