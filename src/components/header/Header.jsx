import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const handleEventIdSignUp = () => {
    const match = path.match(/^\/event\/([a-zA-Z0-9]+)/);
    const eventId = match ? match[1] : null;

    // Si un eventId est trouvé, on redirige vers "/signUp" avec l'état "event: eventId"
    if (eventId) {
      navigate("/signUp", { state: { event: eventId } });
    } else {
      // Si aucun eventId n'est trouvé, rediriger simplement vers "/signUp"
      navigate("/signUp");
    }
  };

  return (
    <div className="header-container">
      <div className="header-content">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="veni-logo">veni</span>
        </Link>
        {!token && (
          // <Link
          //   to="/signUp"
          //   style={{ textDecoration: "none", color: "white", marginTop: "5px" }}
          // >
          <span
            style={{
              textDecoration: "none",
              color: "white",
              marginTop: "5px",
              cursor: "pointer",
            }}
            onClick={handleEventIdSignUp}
          >
            S'inscrire / Se connecter
          </span>
          // </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
