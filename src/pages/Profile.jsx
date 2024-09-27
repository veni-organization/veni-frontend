import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaPlus } from "react-icons/fa6";

// import "../components/profile/avatar.css";
import "./Profile.css";
import defaultImage from "../assets/img/life_is_a_party.jpg";
import EventList from "../components/profile/EventList";
import ProfileCard from "../components/profile/ProfileCard";
import Avatar from "../components/profile/Avatar";

const Profile = () => {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [typeEvent, setTypeEvent] = useState("actual");

  const { token, id } = useContext(AuthContext);

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
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getUser();
  }, [token]);

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <div className="profile-container">
      <div className="top-profile">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <span className="edit-veni-logo">veni</span>
        </Link>
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
              navigate(`/edit-profile/${data._id}`);
            }}
          >
            <Avatar user={[data]} size={"40px"} />

            {/* <img className="avatar-picture" src={data.avatar} /> */}
          </button>
        </div>
      </div>
      <p className="profile-title">Bonjour {data.name} !</p>
      <div className="top-desktop">
        <p className="profile-title-desktop">Bonjour {data.name} !</p>
        <div className="button-desktop">
          <button
            className="button-plus"
            onClick={() => {
              navigate("/create");
            }}
          >
            <FaPlus className="profile-plus" />
          </button>
          {console.log(id)}
          <button
            className="avatar-button"
            onClick={() => {
              navigate(`/edit-profile/${data._id}`);
            }}
          >
            <Avatar user={[data]} size={"40px"} />{" "}
          </button>
        </div>
      </div>
      <div className="profile-button">
        <EventList typeEvent={typeEvent} setTypeEvent={setTypeEvent} />
      </div>
      <div className="event-profile-container">
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
            <div
              key={event._id}
              className="event-card"
              onClick={() => {
                navigate(`/event/${event._id}`);
              }}
            >
              <div className="profile-event-description">
                <img src={event.event_picture} />
                <div className="event-top">
                  <p className="profile-event-title">{event.name}</p>
                  <ProfileCard
                    users={event.hosts}
                    defaultImage={defaultImage}
                  />
                </div>
              </div>
              <div style={{}}>
                <div className="event-bottom">
                  <p className="profile-event-date">{formattedDate}</p>
                  <p>{event.location}</p>
                  <ProfileCard users={event.guests} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
