import { Link } from "react-router-dom";

import Input from "../components/Forms/Input";
import PhoneNumber from "../components/Forms/PhoneNumber";

const SignUp = () => {
  return (
    <>
      <div>
        <h2>Je suis sur la page SignUp</h2>
      </div>
      <Link to="/signIn">
        <h3>J'ai déjà un compte</h3>
      </Link>
      <form>
        <Input type="text" placeholder="Mon nom" />
        <PhoneNumber />
        <input type="tel" />
        <input type="date" name="" id="" />
        <input type="file" name="" id="" />
      </form>
      <Link to={"/event/:id"}>
        <button>Valider l'event </button>
      </Link>
    </>
  );
};

export default SignUp;
