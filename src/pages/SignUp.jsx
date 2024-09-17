import { Link } from "react-router-dom";

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
        <input type="text" placeholder="Nom" />
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
