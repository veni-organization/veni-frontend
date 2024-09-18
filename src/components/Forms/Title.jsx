import "./Title.css";

const Title = ({ text, title }) => {
  return title === "false" ? (
    <p className="title">{text}</p>
  ) : (
    <h2 className="title">{text}</h2>
  );
};

export default Title;
