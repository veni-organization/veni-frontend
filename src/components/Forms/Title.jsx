import "./Title.css";

const Title = ({ text, title, step }) => {
  return title === "false" ? (
    <p className="title">{text}</p>
  ) : (
    <h2 className="title">
      {step === 1 && "Entre ton nom ici !"}
      {step === 2 && "Entre ton numéro de téléphone !"}
      {step === 3 && "Entre ta date de naissance !"}
      {step === 4 && "Ajoute ta photo !"}
    </h2>
  );
};

export default Title;
