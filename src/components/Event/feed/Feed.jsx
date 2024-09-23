import { useEffect, useState } from "react";
import axios from "axios";
import FeedList from "./FeedList";
import Chat from "./Chat";
import "./Feed.css";

const Feed = ({ eventId, response }) => {
  const [actualFeed, setActualFeed] = useState("host");
  const [hostChat, setHostChat] = useState([]);
  const [globalChat, setGlobalChat] = useState([]);

  useEffect(() => {
    const handleChats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/message/${eventId}`
        );
        setHostChat(response.data.hostFeed);
        setGlobalChat(response.data.globalFeed);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    handleChats();
  }, [eventId]);

  return (
    <div className="feed-container">
      <p style={{ fontWeight: "bold", marginBottom: "20px" }}>Flux</p>
      <FeedList actualFeed={actualFeed} setActualFeed={setActualFeed} />
      {actualFeed === "host" ? (
        <Chat chat={hostChat} response={response} />
      ) : (
        <Chat chat={globalChat} response={response} />
      )}
    </div>
  );
};

export default Feed;
