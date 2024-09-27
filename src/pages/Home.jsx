import { Link } from "react-router-dom";
import HomeButton from "../components/HomeButton/HomeButton";
import "./Home.css";
import homePage1 from "../assets/img/HonePage-image1.png";
import iphone15 from "../assets/img/iPhone 15.png";
import hostMessages from "../assets/img/host_messages.png";
import guestMessages from "../assets/img/guests_only.png";
import messages from "../assets/img/Messages.png";
import poolParty from "../assets/img/pool_party.png";

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
          <section className="home-section-event">
            <h3>
              Une page <span>unique</span> pour ton événement
            </h3>
            <div className="blur-iphone"></div>
            <img src={iphone15} alt="page event mockup" className="iphone15" />
          </section>
          <section className="home-section-messages">
            <h3>
              Garde tes invités <span>chauds</span> 🔥
            </h3>
            <p>Envoie des messages dans le canal de ton événement</p>
            <img
              src={hostMessages}
              alt="host messages preview"
              id="host-messages"
            />
            <p>
              ou organise une surprise pour l'organisateur en secret avec les
              autres invités 🤫
            </p>
            <img src={guestMessages} alt="guests messages preview" />
            <img src={messages} alt="messages preview" />
          </section>
          <section className="home-section-share">
            <h3>
              <span>Partage le lien</span> de l'événement où tu veux
            </h3>
            <img src={poolParty} alt="pool party picture" />
            <div className="home-button-container">
              <Link to={"/create"}>
                <HomeButton text={"Créer un évènement"} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
