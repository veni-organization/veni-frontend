import { Link } from "react-router-dom";

const Create = () => {
  return (
    <div>
      <h2>Je suis sur la page Create</h2>
      <form>
        <input type="text" placeholder="nom" />
        <input type="date" name="" id="" />
        <input type="text" placeholder="lieu" />
        <input type="file" name="" id="" />
        <input type="checkbox" name="" id="" />
        <input type="checkbox" name="" id="" />
        <input type="checkbox" name="" id="" />
        <Link to="/signUp">
          <button>Valider l'event</button>
        </Link>
      </form>
    </div>
  );
};

export default Create;
