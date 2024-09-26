import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="header-container">
      <div className="header-content">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="veni-logo">veni</span>
        </Link>
        {!token && (
          <Link
            to="/signUp"
            style={{ textDecoration: "none", color: "white", marginTop: "5px" }}
          >
            <span>S'inscrire / Se Connecter</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
