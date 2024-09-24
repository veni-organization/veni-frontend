import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import confettiData from "../assets/animation/confetti.json";
import { AuthContext } from "../context/AuthContext";
import EventInfos from "../components/Event/main/EventInfos";
import Feed from "../components/Event/feed/Feed";
import "./EventScreen.css";
import { useRef } from "react";

const Event = () => {
  const { id } = useParams();
  const { userId, token } = useContext(AuthContext);
  const [event, setEvent] = useState();
  const [response, setResponse] = useState(null);
  const [isUserHost, setIsUserHost] = useState(false);
  const lottieRef = useRef();

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: confettiData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const playAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndPlay(0); // Repart de zéro et lance l'animation
    }
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
      if (newResponse === true) {
        playAnimation();
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
    <div className="event-container">
      {event && (
        <div className="event-content">
          <Lottie
            options={defaultOptions}
            height={200}
            width={200}
            ref={lottieRef}
          />
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
