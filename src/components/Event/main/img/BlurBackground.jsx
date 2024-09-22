import "./BlurBackground.css";

const blurBackground = ({ event_picture, defaultImg }) => {
  return (
    <div
      className="event-blur-background"
      style={{
        backgroundImage: `url(${event_picture ? event_picture : defaultImg})`,
      }}
    ></div>
  );
};

export default blurBackground;
