import { Link } from "react-router-dom";
import AddressAutocomplete from "../components/Forms/AddressInput";
import DateEvent from "../components/Forms/DateEvent";

const Home = () => {
  const handleAddressSelect = (address) => {
    console.log("Selected Address:", address);
  };

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
      <AddressAutocomplete onSelect={handleAddressSelect} />
      <DateEvent />
    </>
  );
};

export default Home;
