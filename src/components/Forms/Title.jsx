import "./Title.css";

const Title = ({ text, title }) => {
  return title === "false" ? <p>{text}</p> : <h2>{text}</h2>;
};

export default Title;
