import "./EventInfos.css";
import Avatar from "../../profile/Avatar";
import defaultImg from "../../../assets/img/life_is_a_party.jpg";
import colors from "../../../assets/colors/colors";

const EventInfos = ({ event }) => {
  console.log(event);
  // destructuring event
  const { name, event_date, location, description, hosts, event_picture } =
    event;
  const dateObj = new Date(event_date);
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(dateObj);
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
                return <Avatar key={index} user={host} size={"24px"} />;
              })}
            </div>
            <div className="hosts-name">
              {hosts.map((host, index) => {
                return (
                  <span key={index}>
                    <p className="event-host-name">
                      {host.name} {index < hosts.length - 1 && " & "}
                    </p>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="event-details-container">
        <p className="event-date">{formattedDate}</p>
        <div className="event-location-container">
          <p className="event-location">{location}</p>
          <p className="event-button-map" style={{ color: `${colors.Green}` }}>
            - Voir sur maps
          </p>
        </div>
        <div className="event-description-container">
          <p style={{ fontWeight: "bold" }}>Description</p>
          <p style={{ textAlign: "justify" }}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventInfos;
