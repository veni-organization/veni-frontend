import { Link } from "react-router-dom";

const Event = () => {
  return (
    <div>
      <h2>Je suis sur la page Event</h2>
      <Link to="/edit/:id">
        <button>Je modifie mon event</button>
      </Link>
    </div>
  );
};

export default Event;
