import "./FeedList.css";

const FeedList = ({ actualFeed, setActualFeed }) => {
  return (
    <div className="feed-list-container">
      <div
        className={`feed-button ${
          actualFeed === "host" ? "feed-selected" : ""
        }`}
        onClick={() => setActualFeed("host")}
      >
        Hôte 🔔
      </div>
      <div
        className={`feed-button ${
          actualFeed === "global" ? "feed-selected" : ""
        }`}
        onClick={() => setActualFeed("global")}
      >
        Chat général
      </div>
    </div>
  );
};

export default FeedList;
