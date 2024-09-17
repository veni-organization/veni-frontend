import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <h2>Je suis sur la page Profil</h2>
      <button>Modifier son profil</button>
      <Link to="/">
        <button>Retourner sur la page Home</button>
      </Link>
    </>
  );
};

export default Profile;
