import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventInfos from "../components/Event/main/EventInfos";
import axios from "axios";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    // Get event infos
    const handleEvent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/event/${id}`
        );
        if (response.status === 200) {
          setEvent(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleEvent();
  }, [id]);

  return (
    <div className="event-container">
      <EventInfos event={event} />
    </div>
  );
};

export default Event;
