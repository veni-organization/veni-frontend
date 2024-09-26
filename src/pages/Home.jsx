import { Link } from "react-router-dom";
import HomeButton from "../components/HomeButton/HomeButton";
import "./Home.css";
import homePage1 from "../assets/img/HonePage-image1.png";

const Home = () => {
  return (
    <>
      <div className="header-container-home">
        <div className="header-content-home">
          <span className="veni-logo-home">veni</span>
          <Link to={"/signIn"}>
            <button>Se connecter</button>
          </Link>
        </div>
      </div>
      <div className="main-container-home">
        <div className="main-content-home">
          <div className="home-container-text">
            <h2>Pour des moments qui restent</h2>
            <div className="home-paragraph-1">
              <p>Crée ton événement en quelques secondes.</p>
              <p>Garde les souvenirs pour toujours</p>
            </div>
          </div>
          <div className="home-image-1">
            <img src={homePage1} alt="examples of events" />
          </div>
          <div className="home-button-link">
            <div className="home-button-container">
              <Link to={"/create"}>
                <HomeButton text={"Créer un évènement"} />
              </Link>
            </div>
            <p className="home-event-code-link">
              J'ai été invité à un événement <strong>veni</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
