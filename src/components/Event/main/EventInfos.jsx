import "./EventInfos.css";
import Avatar from "../../profile/Avatar";
import defaultImg from "../../../assets/img/life_is_a_party.jpg";

const EventInfos = ({ event }) => {
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
      <div
        className="event-blur-background"
        style={{ backgroundImage: `url(${defaultImg})` }}
      ></div>
      <div
        className="event-picture"
        style={{
          backgroundImage: `url(${event_picture ? event_picture : defaultImg})`,
        }}
      ></div>
      <div className="event-main-infos-container">
        <div
          className="host-title-container"
          style={{
            top:
              window.innerWidth < 1200
                ? name.length > 23
                  ? "355px"
                  : "385px" // Mobile
                : "", // Desktop
          }}
        >
          <h1 className="event-name">{name}</h1>
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
        <div className="event-details-container">
          <p className="event-date">{formattedDate}</p>
          <div className="event-location-container">
            <p className="event-location">{location}</p>
            <p className="event-button-map">- Voir sur maps</p>
          </div>
          <div className="event-description-container">
            <p style={{ fontWeight: "bold" }}>Description</p>
            <p style={{ textAlign: "justify" }}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfos;
