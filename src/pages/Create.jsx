import { Link } from "react-router-dom";
import DateEvent from "../components/Forms/DateEvent";
import TimeEvent from "../components/Forms/TimeEvent";
import AddressInput from "../components/Forms/AddressInput";
import Poster from "../components/Forms/Poster";
import Title from "../components/Forms/Title";
import MainButton from "../components/MainButton/MainButton";

const Create = () => {
  return (
    <div>
      <h2>Je suis sur la page Create</h2>
      <form>
        <Title />
        <DateEvent />
        <TimeEvent label="Heure de début" />
        <TimeEvent label="Heure de fin" />
        <AddressInput />
        <Poster />
        <input type="checkbox" name="" id="" />
        <input type="checkbox" name="" id="" />
        <input type="checkbox" name="" id="" />
        <Link to="/signUp">
          <MainButton text="Valider" />
        </Link>
      </form>
    </div>
  );
};

export default Create;
