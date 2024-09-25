import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BackButton from "../components/Forms/BackButton";
import Poster from "../components/Forms/Poster";
import poster from "../assets/img/life_is_a_party.jpg";
import Links from "../components/OptionsEvent/Links";
import AddressInput from "../components/Forms/AddressInput";
import BlurBackground from "../components/Event/main/img/BlurBackground";
import "./EditEventScreen.css";
import Description from "../components/OptionsEvent/Description";

const EditEvent = () => {
  // declare relevent variables
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const { id } = useParams();
  const { userId, token } = useContext(AuthContext);
  const location = useLocation();
  const data = location.state;
  //   console.log("DATA= >>>>", data);

  // format work
  // make sure pictures are readable at every steps
  const isCloudinaryUrl = (url) =>
    typeof url === "string" && url.startsWith("https://res.cloudinary.com");
  // format the date from the back correctly to display in the input
  const eventDate = new Date(data.event.event_date);
  const formattedDate = eventDate.toISOString().split("T")[0];
  //format the time
  const hours = String(eventDate.getUTCHours()).padStart(2, "0"); // Extract hours
  const minutes = String(eventDate.getUTCMinutes()).padStart(2, "0"); // Extract minutes
  const formattedTime = `${hours}:${minutes}`;

  // set initiam values
  const [initialValues] = useState({
    eventName: data.event.name,
    dateEvent: formattedDate,
    timeEvent: formattedTime,
    address: data.event.location,
    description: data.event.description,
    links: data.event.links || [],
    picture: data.event.event_picture,
  });

  // declare states

  const [eventName, setEventName] = useState(initialValues.eventName);
  const [picture, setPicture] = useState(initialValues.picture);
  const [dateEvent, setDateEvent] = useState(initialValues.dateEvent);
  const [timeEvent, setTimeEvent] = useState(initialValues.timeEvent);
  const [address, setAddress] = useState(initialValues.address);
  const [links, setLinks] = useState(initialValues.links);
  const [description, setDescription] = useState(initialValues.description);
  const [searchBox, setSearchBox] = useState(null);

  // compare initialvalues to see modifications
  const isModified =
    eventName !== initialValues.eventName ||
    dateEvent !== initialValues.dateEvent ||
    timeEvent !== initialValues.timeEvent ||
    address !== initialValues.address ||
    description !== initialValues.description ||
    links.length !== initialValues.links.length ||
    picture !== initialValues.picture;

  const handleEditEvent = async () => {
    try {
      const formData = new FormData();

      formData.append("name", eventName);
      formData.append("eventDate", dateEvent);
      formData.append("eventTime", timeEvent);
      formData.append("location", address);
      formData.append("description", description);
      formData.append("links", JSON.stringify(links));
      if (picture && !isCloudinaryUrl(picture)) {
        formData.append("eventPicture", picture);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/event/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate(`/event/${id}`);
      }
    } catch (error) {
      console.error("Error updating event:", error.message);
    }
  };
  //   console.log(id);

  return (
    <>
      <BlurBackground
        event_picture={
          isCloudinaryUrl(picture) ? picture : URL.createObjectURL(picture)
        }
        defaultImg={poster}
      />
      {/* {console.log("picture --->", picture)} */}
      <header className="edit-event-header">
        <BackButton />
        <h2>Modifier</h2>
        <button
          className={isModified ? "confirm-edit-cta" : "hidden"}
          onClick={handleEditEvent}
        >
          Valider
        </button>
      </header>
      <main className="edit-event-screen">
        <div className="poster-edit">
          <Poster picture={picture} setPicture={setPicture} />
        </div>
        <div className="form-edit">
          <div className="event-name-edit">
            <label htmlFor="event-name">Titre</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              id="event-name"
            />
          </div>
          <div className="date-event-edit">
            <div className="date-hours-block-edit">
              <label htmlFor="event-date">Date</label>
              <input
                type="date"
                value={dateEvent}
                onChange={(e) => setDateEvent(e.target.value)}
                style={{ position: "relative" }}
                id="event-date"
                min={today}
              />
            </div>
            <div className="date-hours-block-edit">
              <label htmlFor="event-time">Heure de début</label>
              <input
                type="time"
                value={timeEvent}
                onChange={(e) => {
                  setTimeEvent(e.target.value);
                }}
                style={{ position: "relative" }}
                id="event-time"
              />
            </div>
          </div>
          <div className="location-event-edit">
            <AddressInput
              searchBox={searchBox}
              setSearchBox={setSearchBox}
              address={address}
              setAddress={setAddress}
            />
          </div>
          <div className="description-event-edit">
            <Description
              description={description}
              setDescription={setDescription}
            />
          </div>
          <div className="links-event-edit">
            <Links links={links} setLinks={setLinks} />
          </div>
        </div>
      </main>
    </>
  );
};

export default EditEvent;
