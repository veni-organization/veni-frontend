import "./EventInfos.css";
import Avatar from "../../profile/Avatar";
import defaultImg from "../../../assets/img/life_is_a_party.jpg";
import { useEffect, useState } from "react";

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
  const [top, setTop] = useState("385px");

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;

      // Dynamic based on the name length and window width
      if (isMobile) {
        setTop(name.length > 23 ? "355px" : "385px");
      } else {
        setTop(""); // No need for specific top for desktop
      }
    };

    // Initial call to set position on load
    handleResize();

    // Listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [name]); // Re-run when the name length changes

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
            top,
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
