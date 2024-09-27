import "./Title.css";

const Title = ({ text, title, step }) => {
  return title === "false" ? (
    <p className="title">{text}</p>
  ) : (
    <h2 className="title">
      {step === 1 && "Qui es-tu ?"}
      {step === 2 && "Quel est ton numéro de téléphone ?"}
      {step === 3 && "Ta date de naissance ?"}
      {step === 4 && "Ajoute ta photo !"}
      {!step && text}
    </h2>
  );
};

export default Title;
