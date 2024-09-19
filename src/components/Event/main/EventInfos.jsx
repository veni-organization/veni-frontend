const EventInfos = ({ event }) => {
  console.log(event);
  // destructuring event
  const { name, event_date, location, description, hosts, event_picture } =
    event;
  return <div className="event-info-container">EventInfos</div>;
};

export default EventInfos;
