import { Link } from "react-router-dom";
import DateEvent from "../components/Forms/DateEvent";
import TimeEvent from "../components/Forms/TimeEvent";
import AddressInput from "../components/Forms/AddressInput";
import Poster from "../components/Forms/Poster";
import MainButton from "../components/MainButton/MainButton";
import TitleEvent from "../components/Forms/TitleEvent";
import Toggle from "../components/OptionsEvent/Toggle";
import Option from "../components/OptionsEvent/Option";
import Description from "../components/OptionsEvent/Description";

const Create = () => {
  return (
    <div>
      <h2>Je suis sur la page Create</h2>
      <form>
        <TitleEvent />
        <DateEvent />
        <TimeEvent label="Heure de début" />
        <TimeEvent label="Heure de fin" />
        <AddressInput />
        <Poster />
        <Option
          label="Send auto-reminders"
          labelDesc="Guests will receive a text 1 week & 1 day before the event."
        />
        <Option
          label="Accept +1"
          labelDesc="Guest can add a “+1” when they reply."
        />
        <Option
          label="Guest approval"
          labelDesc="Approve every guest before they can access to the event page."
        />
        <Description />
        <Link to="/signUp">
          <MainButton text="Valider" />
        </Link>
      </form>
    </div>
  );
};

export default Create;
