import { useEffect, useState } from "react";
import FeedList from "./FeedList";
import Chat from "./Chat";
import "./Feed.css";

const Feed = ({ eventId }) => {
  const [actualFeed, setActualFeed] = useState("host");
  const [hostChat, setHostChat] = useState([]);
  const [globalChat, setGlobalChat] = useState([]);

  useEffect(() => {
    const handleChats = async () => {};
    handleChats();
  });

  return (
    <div className="feed-container">
      <p style={{ fontWeight: "bold", marginBottom: "20px" }}>Flux</p>
      <FeedList actualFeed={actualFeed} setActualFeed={setActualFeed} />
      {actualFeed === "host" ? (
        <Chat chat={hostChat} />
      ) : (
        <Chat chat={globalChat} />
      )}
    </div>
  );
};

export default Feed;
