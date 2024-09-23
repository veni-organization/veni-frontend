import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import EventInfos from "../components/Event/main/EventInfos";
import Feed from "../components/Event/feed/Feed";
import "./EventScreen.css";

const Event = () => {
  const { id } = useParams();
  const { userId } = useContext(AuthContext);
  const [event, setEvent] = useState();
  const [response, setResponse] = useState(null);
  const [isUserHost, setIsUserHost] = useState(false);

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
  }, [id, userId, isUserHost]);

  return (
    <div className="event-container">
      {event && (
        <div className="event-content">
          <EventInfos
            event={event}
            response={response}
            setResponse={setResponse}
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
