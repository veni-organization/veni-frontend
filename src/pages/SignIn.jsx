import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <h2>Je suis sur la page SignIn</h2>
      <Link to="/event/:id">
        <button>Je me connecte</button>
      </Link>
    </>
  );
};

export default SignIn;
