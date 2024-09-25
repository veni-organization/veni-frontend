import "./EventList.css";

const EventList = ({ typeEvent, setTypeEvent }) => {
  return (
    <div className="event-list-container">
      <div
        className={`event-button ${
          typeEvent === "actual" ? "event-selected" : ""
        }`}
        onClick={() => setTypeEvent("actual")}
      >
        A venir
      </div>
      <div
        className={`event-button ${
          typeEvent === "past" ? "event-selected" : ""
        }`}
        onClick={() => setTypeEvent("past")}
      >
        Passé(s)
      </div>
    </div>
  );
};

export default EventList;
