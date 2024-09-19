import "./EventInfos.css";
import defaultImg from "../../../assets/img/life_is_a_party.jpg";

const EventInfos = ({ event }) => {
  console.log(event);
  // destructuring event
  const { name, event_date, location, description, hosts, event_picture } =
    event;
  console.log(name.length);
  return (
    <div className="event-infos-container">
      <div className="event-main-infos">
        <div
          className="event-picture"
          style={{
            backgroundImage: `url(${
              event_picture ? event_picture : defaultImg
            })`,
          }}
        >
          <div className="linear-gradient"></div>
          <h1
            className="event-name"
            style={{ top: name.length > 23 ? "368px" : "400px" }}
          >
            {name}
          </h1>
          <div className="hosts-infos">
            <div className="hosts-avatar">
              {hosts.map((host, index) => {
                return host.avatar ? (
                  <div
                    key={index}
                    style={{ backgroundImage: `url(${host.avatar})` }}
                  ></div>
                ) : (
                  <div key={index} className="default-avatar"></div>
                );
              })}
            </div>
            <div className="hosts-avatar">
              {hosts.map((host, index) => {
                return <div key={index}>{host.name}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfos;
