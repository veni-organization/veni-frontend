import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h2>Page Home</h2>
      <Link to={"/profile"}>
        <button>Aller sur la page Profil</button>
      </Link>
      <Link to={"/create"}>
        <button>Créer un évènement</button>
      </Link>
      <Link to="/event/:id">
        <button>Page invité</button>
      </Link>
    </>
  );
};

export default Home;
