import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { IoIosArrowBack } from "react-icons/io";

import { AuthContext } from "../context/AuthContext";
import BlurBackground from "../components/Event/main/img/BlurBackground";
import SharePhotosButton from "../components/Event/photos/SharePhotosButton";
import defaultImg from "../assets/img/life_is_a_party.jpg";
import "./GaleryScreen.css";

const GaleryScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [event, setEvent] = useState();

  useEffect(() => {
    const handleImageEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/event/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setEvent(response.data);
        console.log(response.data.event_picture);
      } catch (error) {
        console.log(error);
      }
    };
    handleImageEvent();
  }, [id, token]);

  return (
    event && (
      <div className="galery-container">
        <div className="galery-content">
          <BlurBackground
            event_picture={event.event_picture}
            defaultImg={defaultImg}
          />
          <div
            className="galery-event-header"
            onClick={() => navigate(`/event/${id}`)}
            style={{ cursor: "pointer" }}
          >
            <IoIosArrowBack size={24} />
            <span
              style={{
                fontSize: "20px",
                fontFamily: "Raleway",
              }}
            >
              Galerie
            </span>
          </div>
          <div className="content-galery">
            <div className="galery-img-list-container">
              {event.guests_pictures.map((picture, index) => (
                <div key={index} className="column">
                  <img src={picture.url} className="rectangular-img-galery" />
                </div>
              ))}
            </div>
          </div>
          <div className="fixed-button-galery">
            <SharePhotosButton eventId={id} />
          </div>
        </div>
      </div>
    )
  );
};

export default GaleryScreen;
