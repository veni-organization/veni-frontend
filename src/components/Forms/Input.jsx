import "./Input.css";

const Input = ({ type, placeholder, className, username, setUsername }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      value={username}
      onChange={(e) => {
        setUsername(e.target.value);
      }}
    />
  );
};

export default Input;
