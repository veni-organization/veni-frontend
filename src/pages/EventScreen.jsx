import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import confettiData from "../assets/animation/confetti.json";
import { AuthContext } from "../context/AuthContext";
import EventInfos from "../components/Event/main/EventInfos";
import Feed from "../components/Event/feed/Feed";
import "./EventScreen.css";

const Event = () => {
  const { id } = useParams();
  const { userId, token } = useContext(AuthContext);
  const [event, setEvent] = useState();
  const [response, setResponse] = useState(null);
  const [isUserHost, setIsUserHost] = useState(false);

  // États pour contrôler l'animation Lottie
  const [isStopped, setIsStopped] = useState(true); // L'animation est stoppée au départ
  const [isPaused, setIsPaused] = useState(true); // L'animation est en pause au départ

  // const lottieRef = useRef();

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: confettiData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleUserResponse = async (newResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/guest/response/${id}`,
        {
          userResponse: newResponse,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(newResponse);
      // Si la réponse est "true", démarrer l'animation
      if (newResponse === true) {
        setIsStopped(false); // Démarrer l'animation
        setIsPaused(false); // La laisser jouer
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Get event infos
    const handleEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/event/${id}`
        );
        if (response.status === 200) {
          setEvent(response.data);
          for (let i = 0; i < response.data.hosts.length; i++) {
            if (response.data.hosts[i]._id === userId) {
              setIsUserHost(true);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleEvent();
  }, [id, userId, isUserHost, response]);

  return (
    <div
      className="event-container"
      style={{ overflow: isStopped ? "hidden" : "visible" }}
    >
      {event && (
        <div className="event-content">
          <div
            className="animation-container"
            style={{ display: isStopped ? "none" : "block" }}
          >
            <Lottie
              options={defaultOptions}
              height={"100%"}
              width={"100%"}
              isStopped={isStopped} // Contrôle si l'animation est arrêtée
              isPaused={isPaused} // Contrôle si l'animation est en pause
            />
          </div>
          <EventInfos
            event={event}
            response={response}
            setResponse={setResponse}
            handleUserResponse={handleUserResponse}
            userId={userId}
            isUserHost={isUserHost}
          />
          <Feed eventId={id} response={response} isUserHost={isUserHost} />
        </div>
      )}
    </div>
  );
};

export default Event;
