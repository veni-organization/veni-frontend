import "./FeedList.css";

const FeedList = ({ actualFeed, setActualFeed, isUserHost }) => {
  return (
    <div className="feed-list-container">
      <div
        className={`feed-button ${
          actualFeed === "host" ? "feed-selected" : ""
        }`}
        onClick={() => setActualFeed("host")}
      >
        Actualités 🔔
      </div>
      {!isUserHost && (
        <div
          className={`feed-button ${
            actualFeed === "global" ? "feed-selected" : ""
          }`}
          onClick={() => setActualFeed("global")}
        >
          Entre invités 🤫
        </div>
      )}
    </div>
  );
};

export default FeedList;
