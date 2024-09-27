import { useEffect, useState } from "react";
import defaultImg from "../../../assets/img/life_is_a_party.jpg";
import ProfileCard from "../../profile/ProfileCard";
import BlurBackground from "./img/BlurBackground";
import EventPicture from "./img/eventPicture";
import PhotosPreview from "../photos/PhotosPreview";
import Rsvp from "./rsvp/Rsvp";
import "./EventInfos.css";

const EventInfos = ({
  event,
  response,
  setResponse,
  handleUserResponse,
  userId,
  isUserHost,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isLoading, setIsLoading] = useState(false);
  const [top, setTop] = useState("385px");
  const {
    name,
    event_date,
    location,
    description,
    hosts,
    event_picture,
    guests,
    refused_guests,
    guests_pictures,
  } = event;
  const dateObj = new Date(event_date);

  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(dateObj);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      setIsMobile(isMobile);

      // Dynamic based on the name length and window width
      if (isMobile) {
        if (window.innerWidth < 676) {
          setTop(name.length <= 22 ? "387px" : "357px");
        } else {
          setTop("387px");
        }
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
  }, [name, response, setResponse, handleUserResponse, isLoading]); // Re-run when the name length changes
  const dynamicStyle = {
    top: top,
    ...(isMobile && {
      backdropFilter: "blur(6px)",
      background: "linear-gradient(to top, #2a2e2e, rgba(255, 255, 255, 0))",
    }),
  };
  return (
    <div className="event-infos-container">
      <BlurBackground event_picture={event_picture} defaultImg={defaultImg} />
      <div className="event-main-infos-container">
        <EventPicture
          isUserHost={isUserHost}
          event_picture={event_picture}
          defaultImg={defaultImg}
          event={event}
        />
        <div className="host-title-container" style={dynamicStyle}>
          <h1 className="event-name">{name}</h1>
          <ProfileCard users={hosts} />
        </div>
        <PhotosPreview
          guests_pictures={guests_pictures}
          eventId={event._id}
          eventDate={event_date}
        />
        <div className="event-details-container">
          <div className="event-date-container">
            <p
              className="event-date"
              style={{
                color:
                  response === null
                    ? isUserHost
                      ? "#FFBB12"
                      : "#e193ee"
                    : response
                    ? "#56dbbb"
                    : "#ed4343",
              }}
            >
              {formattedDate}
            </p>
            <Rsvp
              guests={guests}
              refused_guests={refused_guests}
              userId={userId}
              isUserHost={isUserHost}
              response={response}
              setResponse={setResponse}
              handleUserResponse={handleUserResponse}
            />
          </div>
          <div className="event-location-container">
            <p className="event-location">{location}</p>
          </div>
          <ProfileCard users={guests} />
          <div className="event-description-container">
            <p style={{ fontWeight: "bold" }}>Description</p>
            {/* pre-line to keep the line breaks */}
            <p style={{ textAlign: "justify", whiteSpace: "pre-line" }}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfos;
