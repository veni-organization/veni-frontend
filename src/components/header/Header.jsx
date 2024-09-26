import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="veni-logo">veni</span>
        </Link>
        <Link
          to="/signUp"
          style={{ textDecoration: "none", color: "white", marginTop: "5px" }}
        >
          <span>S'inscrire / Se Connecter</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
