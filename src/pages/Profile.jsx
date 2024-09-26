import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaPlus } from "react-icons/fa6";

// import "../components/profile/avatar.css";
import "./Profile.css";
import EventList from "../components/profile/EventList";
import ProfileCard from "../components/profile/ProfileCard";
import Avatar from "../components/profile/Avatar";

const Profile = () => {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [typeEvent, setTypeEvent] = useState("actual");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }, []);

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <>
      <div className="top-profile">
        <span className="edit-veni-logo">veni</span>
        <div className="top-right">
          <button
            className="button-plus"
            onClick={() => {
              navigate("/create");
            }}
          >
            <FaPlus className="profile-plus" />
          </button>
          <button
            className="avatar-button"
            onClick={() => {
              navigate("/edit-profile");
            }}
          >
            <Avatar user={[data]} size={"40px"} />

            {/* <img className="avatar-picture" src={data.avatar} /> */}
          </button>
        </div>
      </div>
      <div>
        <p className="profile-title">Bonjour {data.name} !</p>
        <div className="profile-button">
          <EventList typeEvent={typeEvent} setTypeEvent={setTypeEvent} />
        </div>
      </div>
      <div className="event-container">
        {data.participating_events.map((event) => {
          const dateObj = new Date(event.event_date);
          const formattedDate = new Intl.DateTimeFormat("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(dateObj);

          return (
            <div key={event._id} className="event-card">
              <img src={event.event_picture} />
              <div className="profile-event">
                <p className="profile-event-title">{event.name}</p>
                <ProfileCard users={event.hosts} />
                <p className="profile-event-date">{formattedDate}</p>
                <p>{event.location}</p>
                <ProfileCard users={event.guests} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
