import "./EventPicture.css";

const EventPicture = ({ event_picture, defaultImg }) => {
  return (
    <div
      className="event-picture"
      style={{
        backgroundImage: `url(${event_picture ? event_picture : defaultImg})`,
        backgroundPosition: "center",
      }}
    ></div>
  );
};

export default EventPicture;
