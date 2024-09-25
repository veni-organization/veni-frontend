import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();

  // États pour contrôler l'animation Lottie
  const [isStopped, setIsStopped] = useState(true); // L'animation est stoppée au départ
  const [isPaused, setIsPaused] = useState(true); // L'animation est en pause au départ
  const [isAnimationVisible, setIsAnimationVisible] = useState(false); // Nouvel état pour gérer la visibilité

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

      if (res.status === 202 || res.status === 200) {
        setResponse(newResponse);
        // Si la réponse est "true", démarrer l'animation
        if (newResponse === true) {
          setIsStopped(false); // Démarrer l'animation
          setIsPaused(false); // La laisser jouer
          setIsAnimationVisible(true); // Rendre l'animation visible

          // Masquer l'animation après 5 secondes (ou la durée de l'animation si connue)
          setTimeout(() => {
            setIsAnimationVisible(false); // Masquer l'animation
            setIsStopped(true); // Réinitialiser l'état pour permettre un redémarrage si nécessaire
            setIsPaused(true); // Mettre en pause après la fin
          }, 4000); // Temps en millisecondes (5000ms = 5s)
        }
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
          for (let i = 0; i < response.data.guests.length; i++) {
            if (response.data.guests[i]._id === userId) {
              setResponse(true);
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
      // style={{ overflow: isStopped ? "hidden" : "visible" }}
    >
      {event && (
        <div className="event-content">
          <div
            className="animation-container"
            style={{ display: isAnimationVisible ? "block" : "none" }}
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

          <div
            onClick={() => {
              navigate(`/edit/${id}`, { state: { event: event } });
            }}
          >
            <p>Go to edit</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
